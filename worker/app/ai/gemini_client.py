"""
Gemini Client Wrapper for ApiScan

This module handles all communication with Google Gemini
and returns raw AI-generated content.

Responsibilities:
- Initialize Gemini SDK
- Send prompts
- Return text output (no parsing here)
"""

import os
import google.generativeai as genai
from dotenv import load_dotenv

# --------------------------------------------------
# ENV SETUP
# --------------------------------------------------
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY not found in environment variables")

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)

# Default model (stable + cheap)
MODEL_NAME = "models/gemini-1.5-flash"

# --------------------------------------------------
# CLIENT
# --------------------------------------------------

class GeminiClient:
    """
    Thin wrapper around Google Gemini API.
    """

    def __init__(self, model_name: str = MODEL_NAME):
        self.model = genai.GenerativeModel(model_name)

    def generate(self, prompt: str, temperature: float = 0.3) -> str:
        """
        Send a prompt to Gemini and return plain text.

        Args:
            prompt (str): Full prompt text
            temperature (float): Creativity level (0.0–1.0)

        Returns:
            str: AI-generated text
        """
        try:
            response = self.model.generate_content(
                prompt,
                generation_config={
                    "temperature": temperature,
                    "max_output_tokens": 2048,
                }
            )

            if not response or not response.text:
                raise ValueError("Empty response from Gemini")

            return response.text.strip()

        except Exception as e:
            # IMPORTANT: Never crash the worker
            return f"[GEMINI_ERROR] {str(e)}"


# --------------------------------------------------
# QUICK TEST (optional)
# --------------------------------------------------
if __name__ == "__main__":
    client = GeminiClient()
    output = client.generate(
        "Generate 3 test cases for a login API with email and password."
    )
    print(output)
