import os
import json
import logging
import google.generativeai as genai # type: ignore
from fastapi import HTTPException

# Import the prompt generator we just created
from app.ai.prompts import get_blueprint_prompt # type: ignore

# Setup Logger
logger = logging.getLogger(__name__)

class GeminiClient:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            logger.warning("⚠️ GEMINI_API_KEY not found in environment variables.")
        else:
            genai.configure(api_key=self.api_key)
            
    def generate_blueprint(self, spec_json: dict) -> dict:
        """
        Sends the OpenAPI spec to Google Gemini and returns a parsed JSON test plan.
        """
        if not self.api_key:
            raise HTTPException(
                status_code=500, 
                detail="Server configuration error: Missing AI API Key."
            )

        try:
            # 1. Initialize Model
            # 'gemini-pro' is the standard text model. 
            # Use 'gemini-1.5-flash' if you want faster/cheaper results later.
            model = genai.GenerativeModel('gemini-pro')

            # 2. Prepare the Prompt
            # We get the 'System' instructions from your prompts.py file
            system_instruction = get_blueprint_prompt(use_simple=False)
            
            # We convert the user's spec to a string
            spec_str = json.dumps(spec_json)
            
            # Combine them
            full_prompt = f"{system_instruction}\n\n### TARGET API SPECIFICATION:\n{spec_str}"

            # 3. Generate Content
            logger.info("🤖 Sending request to Gemini...")
            response = model.generate_content(full_prompt)
            
            # 4. Process Response
            return self._clean_and_parse_json(response.text)

        except Exception as e:
            logger.error(f"❌ Gemini Error: {str(e)}")
            raise HTTPException(
                status_code=500, 
                detail=f"AI Generation Failed: {str(e)}"
            )

    def _clean_and_parse_json(self, raw_text: str) -> dict:
        """
        Helper to strip markdown formatting and parse JSON.
        """
        try:
            # Remove ```json ... ``` wrappers if present
            clean_text = raw_text.replace("```json", "").replace("```", "").strip()
            
            # Parse
            return json.loads(clean_text)
            
        except json.JSONDecodeError:
            logger.error(f"❌ Failed to parse AI response as JSON. Raw: {raw_text[:200]}...")
            raise HTTPException(
                status_code=500, 
                detail="AI response was not valid JSON. Please try again."
            )

# Create a singleton instance to be imported elsewhere
gemini_client = GeminiClient()