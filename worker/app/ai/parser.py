# """
# AI Output Parser for ApiScan

# This module converts raw AI-generated text into
# structured, executable Test Blueprints.

# Philosophy:
# - AI output is unreliable
# - Parser must be defensive
# - Never crash the worker
# """

# import json
# import re
# from typing import List, Dict, Any


# class BlueprintParser:
#     """
#     Parses Gemini AI output into a structured blueprint.
#     """

#     def parse(self, ai_text: str) -> Dict[str, Any]:
#         """
#         Entry point for parsing AI output.

#         Returns a normalized blueprint dictionary.
#         """

#         if not ai_text or ai_text.startswith("[GEMINI_ERROR]"):
#             return self._fallback_blueprint(
#                 reason="AI generation failed"
#             )

#         # 1️⃣ Try JSON extraction first (best case)
#         json_data = self._extract_json(ai_text)
#         if json_data:
#             return self._normalize(json_data)

#         # 2️⃣ Try markdown / bullet parsing
#         steps = self._parse_bullets(ai_text)
#         if steps:
#             return self._build_from_steps(steps)

#         # 3️⃣ Fallback
#         return self._fallback_blueprint(
#             reason="Unable to parse AI response"
#         )

#     # --------------------------------------------------
#     # JSON PARSING
#     # --------------------------------------------------

#     def _extract_json(self, text: str) -> Dict | None:
#         """
#         Extract JSON object from AI output.
#         """
#         try:
#             match = re.search(r"\{.*\}", text, re.DOTALL)
#             if not match:
#                 return None
#             return json.loads(match.group())
#         except Exception:
#             return None

#     # --------------------------------------------------
#     # BULLET / TEXT PARSING
#     # --------------------------------------------------

#     def _parse_bullets(self, text: str) -> List[Dict]:
#         """
#         Parse bullet-point test cases.
#         """
#         lines = text.splitlines()
#         steps = []

#         for idx, line in enumerate(lines, start=1):
#             line = line.strip()
#             if not line or len(line) < 10:
#                 continue

#             if line.startswith(("-", "*", "•")):
#                 steps.append({
#                     "id": f"TC-{idx:03}",
#                     "name": line.lstrip("-*• ").strip(),
#                     "method": "GET",
#                     "endpoint": "/unknown",
#                     "assertions": ["status_code != 500"]
#                 })

#         return steps

#     # --------------------------------------------------
#     # NORMALIZATION
#     # --------------------------------------------------

#     def _normalize(self, data: Dict) -> Dict[str, Any]:
#         """
#         Normalize AI JSON into ApiScan blueprint schema.
#         """

#         return {
#             "summary": data.get(
#                 "summary",
#                 "AI-generated test strategy"
#             ),
#             "test_cases": data.get(
#                 "test_cases",
#                 []
#             ) or data.get("cases", []),
#             "metadata": {
#                 "source": "gemini",
#                 "version": "v1"
#             }
#         }

#     def _build_from_steps(self, steps: List[Dict]) -> Dict[str, Any]:
#         """
#         Build blueprint from extracted steps.
#         """
#         return {
#             "summary": "AI-generated test plan (heuristic)",
#             "test_cases": steps,
#             "metadata": {
#                 "source": "gemini",
#                 "fallback": True
#             }
#         }

#     # --------------------------------------------------
#     # FALLBACK
#     # --------------------------------------------------

#     def _fallback_blueprint(self, reason: str) -> Dict[str, Any]:
#         """
#         Always return a valid blueprint.
#         """
#         return {
#             "summary": f"Fallback blueprint ({reason})",
#             "test_cases": [
#                 {
#                     "id": "TC-001",
#                     "name": "Basic availability check",
#                     "method": "GET",
#                     "endpoint": "/health",
#                     "assertions": ["status_code < 500"]
#                 }
#             ],
#             "metadata": {
#                 "source": "fallback",
#                 "reason": reason
#             }
#         }


# # --------------------------------------------------
# # QUICK LOCAL TEST
# # --------------------------------------------------
# if __name__ == "__main__":
#     parser = BlueprintParser()

#     sample = """
#     - Test login with valid credentials
#     - Test login with invalid password
#     - Test SQL injection attack
#     """

#     parsed = parser.parse(sample)
#     print(json.dumps(parsed, indent=2))


import json
import re
import logging
from typing import List, Dict, Any

logger = logging.getLogger(__name__)


class BlueprintParser:
    """
    Parses Gemini AI output into a structured blueprint.
    """

    def parse(self, ai_text: str) -> Dict[str, Any]:
        """
        Entry point for parsing AI output.
        Returns a normalized blueprint dictionary.
        """

        if not ai_text or ai_text.startswith("[GEMINI_ERROR]"):
            return self._fallback_blueprint(reason="AI generation failed")

        # 1️⃣ Try JSON extraction first (best case)
        json_data = self._extract_json(ai_text)
        if json_data:
            return self._normalize(json_data)

        # 2️⃣ Try markdown / bullet parsing (if JSON failed)
        steps = self._parse_bullets(ai_text)
        if steps:
            return self._build_from_steps(steps)

        # 3️⃣ Fallback (Total Failure)
        logger.warning("AI output matched no known patterns. Triggering fallback.")
        return self._fallback_blueprint(reason="Unable to parse AI response")

    # --------------------------------------------------
    # JSON PARSING
    # --------------------------------------------------

    def _extract_json(self, text: str) -> Dict | None:
        """
        Extract JSON object from AI output, handling Markdown wrappers.
        """
        # Clean up markdown code blocks if the AI added them
        cleaned_text = text.strip()
        if cleaned_text.startswith("```json"):
            cleaned_text = cleaned_text[7:]
        if cleaned_text.startswith("```"):
            cleaned_text = cleaned_text[3:]
        if cleaned_text.endswith("```"):
            cleaned_text = cleaned_text[:-3]
            
        cleaned_text = cleaned_text.strip()

        # Try to parse the entire cleaned string first
        try:
            return json.loads(cleaned_text)
        except json.JSONDecodeError:
            pass # Move on to regex extraction

        # If it's mixed text and JSON, try to extract just the JSON object
        try:
            # Non-greedy regex to find the first valid-looking JSON block
            match = re.search(r"\{.*?\}", cleaned_text, re.DOTALL)
            if match:
                return json.loads(match.group())
        except json.JSONDecodeError as e:
            logger.error(f"Failed to decode extracted JSON block: {e}")
            return None
        except Exception as e:
            logger.error(f"Unexpected error during JSON extraction: {e}")
            return None
            
        return None

    # --------------------------------------------------
    # BULLET / TEXT PARSING
    # --------------------------------------------------

    def _parse_bullets(self, text: str) -> List[Dict]:
        """
        Parse bullet-point test cases.
        """
        lines = text.splitlines()
        steps = []

        for idx, line in enumerate(lines, start=1):
            line = line.strip()
            if not line or len(line) < 10:
                continue

            if line.startswith(("-", "*", "•")):
                steps.append({
                    "id": f"TC-{idx:03}",
                    "name": line.lstrip("-*• ").strip(),
                    "method": "GET",
                    "endpoint": "/unknown",
                    "expected_status": 200 # <-- Added expected_status for the Runner
                })

        return steps

    # --------------------------------------------------
    # NORMALIZATION
    # --------------------------------------------------

    def _normalize(self, data: Dict) -> Dict[str, Any]:
        """
        Normalize AI JSON into ApiScan blueprint schema.
        """
        return {
            "summary": data.get("summary", "AI-generated test strategy"),
            "test_cases": data.get("test_cases", []) or data.get("cases", []),
            "metadata": {
                "source": "gemini",
                "version": "v1"
            }
        }

    def _build_from_steps(self, steps: List[Dict]) -> Dict[str, Any]:
        """
        Build blueprint from extracted steps.
        """
        return {
            "summary": "AI-generated test plan (heuristic)",
            "test_cases": steps,
            "metadata": {
                "source": "gemini",
                "fallback": True
            }
        }

    # --------------------------------------------------
    # FALLBACK
    # --------------------------------------------------

    def _fallback_blueprint(self, reason: str) -> Dict[str, Any]:
        """
        Always return a valid blueprint.
        """
        return {
            "summary": f"Fallback blueprint ({reason})",
            "test_cases": [
                {
                    "id": "TC-001",
                    "name": "Basic availability check",
                    "method": "GET",
                    "endpoint": "/", # <-- Safer default than /health
                    "expected_status": 200
                }
            ],
            "metadata": {
                "source": "fallback",
                "reason": reason
            }
        }


# --------------------------------------------------
# QUICK LOCAL TEST
# --------------------------------------------------
if __name__ == "__main__":
    parser = BlueprintParser()

    # Test Markdown wrapped JSON
    sample_json = """
    Sure, here is your blueprint!
    ```json
    {
      "summary": "Auth Testing",
      "test_cases": [
        {"id": "TC-01", "name": "Login", "method": "POST", "endpoint": "/login"}
      ]
    }
    ```
    """

    parsed = parser.parse(sample_json)
    print("--- JSON PARSING ---")
    print(json.dumps(parsed, indent=2))
    
    # Test Fallback Bullet Parsing
    sample_bullets = """
    - Test login with valid credentials
    - Test login with invalid password
    - Test SQL injection attack
    """
    
    parsed_bullets = parser.parse(sample_bullets)
    print("\n--- BULLET PARSING ---")
    print(json.dumps(parsed_bullets, indent=2))