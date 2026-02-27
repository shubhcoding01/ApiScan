# """
# Context Manager for ApiScan Test Execution

# Purpose:
# - Maintain shared state across test cases
# - Extract values from responses (token, id, etc.)
# - Inject values into subsequent requests

# Example:
# Login → extract access_token
# Next request → Authorization: Bearer {{access_token}}
# """

# import re
# from typing import Dict, Any


# class ContextManager:
#     """
#     Stores and resolves dynamic variables during a test run.
#     """

#     def __init__(self):
#         # Shared runtime context
#         self.context: Dict[str, Any] = {}

#     # --------------------------------------------------
#     # CONTEXT SET / GET
#     # --------------------------------------------------

#     def set(self, key: str, value: Any):
#         """Save a variable into context."""
#         self.context[key] = value

#     def get(self, key: str, default=None):
#         """Get a variable from context."""
#         return self.context.get(key, default)

#     def dump(self) -> Dict[str, Any]:
#         """Return full context (for debugging/logs)."""
#         return self.context.copy()

#     # --------------------------------------------------
#     # VARIABLE EXTRACTION
#     # --------------------------------------------------

#     def extract_from_response(
#         self,
#         response_json: Dict[str, Any],
#         rules: Dict[str, str]
#     ):
#         """
#         Extract variables from response JSON using dot-notation.

#         rules example:
#         {
#             "access_token": "access_token",
#             "user_id": "user.id"
#         }
#         """

#         for var_name, path in rules.items():
#             value = self._get_by_path(response_json, path)
#             if value is not None:
#                 self.set(var_name, value)

#     def _get_by_path(self, data: Dict, path: str):
#         """
#         Traverse JSON using dot notation.
#         """
#         try:
#             for key in path.split("."):
#                 data = data[key]
#             return data
#         except Exception:
#             return None

#     # --------------------------------------------------
#     # TEMPLATE RESOLUTION
#     # --------------------------------------------------

#     def resolve(self, payload: Any) -> Any:
#         """
#         Replace {{variable}} placeholders with actual values.

#         Works for:
#         - strings
#         - dicts
#         - lists
#         """

#         if isinstance(payload, str):
#             return self._resolve_string(payload)

#         if isinstance(payload, dict):
#             return {
#                 k: self.resolve(v)
#                 for k, v in payload.items()
#             }

#         if isinstance(payload, list):
#             return [self.resolve(item) for item in payload]

#         return payload

#     def _resolve_string(self, text: str) -> str:
#         """
#         Replace {{var}} placeholders in strings.
#         """

#         def replacer(match):
#             key = match.group(1)
#             return str(self.context.get(key, match.group(0)))

#         return re.sub(r"\{\{(\w+)\}\}", replacer, text)


# # --------------------------------------------------
# # QUICK DEMO
# # --------------------------------------------------
# if __name__ == "__main__":
#     ctx = ContextManager()

#     # Simulate login response
#     ctx.extract_from_response(
#         {"access_token": "abc123", "user": {"id": 42}},
#         {
#             "token": "access_token",
#             "user_id": "user.id"
#         }
#     )

#     request_headers = {
#         "Authorization": "Bearer {{token}}",
#         "X-User": "{{user_id}}"
#     }

#     print(ctx.resolve(request_headers))


import re
from typing import Dict, Any, List, Union


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
        """
        for var_name, path in rules.items():
            value = self._get_by_path(response_json, path)
            if value is not None:
                self.set(var_name, value)

    def _get_by_path(self, data: Union[Dict, List], path: str):
        """
        Traverse JSON using dot notation. Supports array indexing!
        Example: "data.users.0.id"
        """
        try:
            for key in path.split("."):
                # 👇 FIX 2: Safely handle JSON arrays
                if isinstance(data, list) and key.isdigit():
                    data = data[int(key)]
                else:
                    data = data[key]
            return data
        except (KeyError, IndexError, TypeError):
            return None

    # --------------------------------------------------
    # TEMPLATE RESOLUTION
    # --------------------------------------------------

    def resolve(self, payload: Any) -> Any:
        """
        Replace {{variable}} placeholders with actual values.
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

    def _resolve_string(self, text: str) -> Any:
        """
        Replace {{var}} placeholders. Preserves types if the exact string is a variable.
        """
        # 👇 FIX 1: Exact Match (Preserves int, bool, dict, etc.)
        # If text is strictly "{{user_id}}", return 42 (not "42")
        exact_match = re.fullmatch(r"\{\{(\w+)\}\}", text)
        if exact_match:
            key = exact_match.group(1)
            if key in self.context:
                return self.context[key]
            return text  # Leave unresolved if not found

        # Partial Match (e.g. "Bearer {{token}}")
        # Safe to stringify here because it's embedded in a larger string
        def replacer(match):
            key = match.group(1)
            return str(self.context.get(key, match.group(0)))

        return re.sub(r"\{\{(\w+)\}\}", replacer, text)


# --------------------------------------------------
# QUICK DEMO (Run this to see the magic!)
# --------------------------------------------------
if __name__ == "__main__":
    ctx = ContextManager()

    # Simulate an API response that has an array of users
    ctx.extract_from_response(
        {"access_token": "abc123", "users": [{"id": 42}]},
        {
            "token": "access_token",
            "user_id": "users.0.id" # <-- Array indexing works now!
        }
    )

    request_payload = {
        "headers": {
            "Authorization": "Bearer {{token}}" # String replacement
        },
        "body": {
            "id_to_delete": "{{user_id}}" # Preserves INTEGER type!
        }
    }

    resolved = ctx.resolve(request_payload)
    print(resolved)
    
    # OUTPUT WILL SHOW: 
    # {'headers': {'Authorization': 'Bearer abc123'}, 'body': {'id_to_delete': 42}} 
    # Notice `42` has no quotes!