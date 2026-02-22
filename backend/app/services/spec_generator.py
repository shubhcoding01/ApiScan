# backend/app/services/spec_generator.py

import json
import hashlib
import os
from sqlalchemy.orm import Session
from google import genai

from app.models.api_version import ApiVersion
from app.config import settings

def generate_swagger_from_text(db: Session, project_id: str, description: str) -> ApiVersion:
    """
    Uses Google Gemini to generate a valid OpenAPI 3.0 JSON specification
    based on a text description, and saves it to the database.
    """
    # 1. Initialize the new GenAI client
    # Make sure GEMINI_API_KEY is in your .env file!
    api_key = getattr(settings, "GEMINI_API_KEY", os.environ.get("GEMINI_API_KEY"))
    if not api_key:
        raise ValueError("GEMINI_API_KEY is missing. Please add it to your .env file.")

    client = genai.Client(api_key=api_key)

    # 2. Strict Prompting for JSON output
    prompt = f"""
    You are an expert API designer. Based on the following description, 
    generate a complete, valid OpenAPI 3.0 specification in JSON format.
    Only output the raw JSON, without any markdown formatting, backticks, or extra text.
    
    Description:
    {description}
    """

    try:
        # 3. Call the Gemini 2.5 Flash model
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt
        )
        
        # 4. Clean up the response (Gemini sometimes wraps JSON in ```json ... ``` despite instructions)
        raw_text = response.text.strip()
        if raw_text.startswith("```json"):
            raw_text = raw_text[7:]
        if raw_text.startswith("```"):
            raw_text = raw_text[3:]
        if raw_text.endswith("```"):
            raw_text = raw_text[:-3]
            
        spec_json = json.loads(raw_text.strip())
        
    except Exception as e:
        raise ValueError(f"Failed to generate or parse OpenAPI spec from AI: {str(e)}")

    # 5. Hash the generated spec for de-duplication
    spec_str = json.dumps(spec_json, sort_keys=True)
    spec_hash = hashlib.sha256(spec_str.encode("utf-8")).hexdigest()

    # 6. Save to Database
    new_spec = ApiVersion(
        project_id=project_id,
        version="1.0.0-ai", # Give AI-generated specs a distinct initial version tag
        spec_hash=spec_hash,
        spec_json=spec_json,
        status="READY"
    )
    
    db.add(new_spec)
    db.commit()
    db.refresh(new_spec)
    
    return new_spec