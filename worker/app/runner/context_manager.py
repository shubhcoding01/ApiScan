"""
Context Manager for ApiScan Test Execution

Purpose:
- Maintain shared state across test cases
- Extract values from responses (token, id, etc.)
- Inject values into subsequent requests

Example:
Login → extract access_token
Next request → Authorization: Bearer {{access_token}}
"""

import re
from typing import Dict, Any


class ContextManager:
    """
    Stores and resolves dynamic variables during a test run.
    """

    def __init__(self):
        # Shared runtime context
        self.context: Dict[str, Any] = {}

    # --------------------------------------------------
    # CONTEXT SET / GET
    # --------------------------------------------------

    def set(self, key: str, value: Any):
        """Save a variable into context."""
        self.context[key] = value

    def get(self, key: str, default=None):
        """Get a variable from context."""
        return self.context.get(key, default)

    def dump(self) -> Dict[str, Any]:
        """Return full context (for debugging/logs)."""
        return self.context.copy()

    # --------------------------------------------------
    # VARIABLE EXTRACTION
    # --------------------------------------------------

    def extract_from_response(
        self,
        response_json: Dict[str, Any],
        rules: Dict[str, str]
    ):
        """
        Extract variables from response JSON using dot-notation.

        rules example:
        {
            "access_token": "access_token",
            "user_id": "user.id"
        }
        """

        for var_name, path in rules.items():
            value = self._get_by_path(response_json, path)
            if value is not None:
                self.set(var_name, value)

    def _get_by_path(self, data: Dict, path: str):
        """
        Traverse JSON using dot notation.
        """
        try:
            for key in path.split("."):
                data = data[key]
            return data
        except Exception:
            return None

    # --------------------------------------------------
    # TEMPLATE RESOLUTION
    # --------------------------------------------------

    def resolve(self, payload: Any) -> Any:
        """
        Replace {{variable}} placeholders with actual values.

        Works for:
        - strings
        - dicts
        - lists
        """

        if isinstance(payload, str):
            return self._resolve_string(payload)

        if isinstance(payload, dict):
            return {
                k: self.resolve(v)
                for k, v in payload.items()
            }

        if isinstance(payload, list):
            return [self.resolve(item) for item in payload]

        return payload

    def _resolve_string(self, text: str) -> str:
        """
        Replace {{var}} placeholders in strings.
        """

        def replacer(match):
            key = match.group(1)
            return str(self.context.get(key, match.group(0)))

        return re.sub(r"\{\{(\w+)\}\}", replacer, text)


# --------------------------------------------------
# QUICK DEMO
# --------------------------------------------------
if __name__ == "__main__":
    ctx = ContextManager()

    # Simulate login response
    ctx.extract_from_response(
        {"access_token": "abc123", "user": {"id": 42}},
        {
            "token": "access_token",
            "user_id": "user.id"
        }
    )

    request_headers = {
        "Authorization": "Bearer {{token}}",
        "X-User": "{{user_id}}"
    }

    print(ctx.resolve(request_headers))
