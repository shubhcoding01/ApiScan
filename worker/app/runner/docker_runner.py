"""
Docker Runner (Execution Engine) for ApiScan

Responsibilities:
- Execute HTTP test cases defined in a Test Blueprint
- Handle GET / POST / PUT / DELETE automatically
- Inject headers, params, body
- Use ContextManager for variable chaining
- Return structured execution results

NOTE:
This version uses `requests` directly.
Later, this can be replaced with real Docker-based isolation.
"""

import requests
import time
from typing import Dict, Any, List

from worker.app.runner.context_manager import ContextManager


class DockerRunner:
    """
    Executes API test cases sequentially.
    """

    def __init__(self, base_url: str, timeout: int = 10):
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout
        self.context = ContextManager()

    # --------------------------------------------------
    # MAIN ENTRY
    # --------------------------------------------------

    def run(self, test_cases: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Execute all test cases and return results.
        """

        results = []

        for test_case in test_cases:
            result = self._execute_test_case(test_case)
            results.append(result)

        return results

    # --------------------------------------------------
    # EXECUTION
    # --------------------------------------------------

    def _execute_test_case(self, test_case: Dict[str, Any]) -> Dict[str, Any]:
        """
        Execute a single test case.
        """

        method = test_case["method"].upper()
        endpoint = self.context.resolve(test_case["endpoint"])
        url = f"{self.base_url}{endpoint}"

        headers = self.context.resolve(test_case.get("headers", {}))
        params = self.context.resolve(test_case.get("params", {}))
        body = self.context.resolve(test_case.get("body"))

        start_time = time.time()

        try:
            response = requests.request(
                method=method,
                url=url,
                headers=headers,
                params=params,
                json=body,
                timeout=self.timeout
            )

            duration = time.time() - start_time

            # Extract variables if defined
            extract_rules = test_case.get("extract", {})
            if extract_rules and response.headers.get("content-type", "").startswith("application/json"):
                self.context.extract_from_response(response.json(), extract_rules)

            expected_status = test_case.get("expected_status", 200)
            passed = response.status_code == expected_status

            return {
                "test_case_id": test_case.get("id"),
                "name": test_case.get("name"),
                "method": method,
                "endpoint": endpoint,
                "status_code": response.status_code,
                "result": "PASS" if passed else "FAIL",
                "response_body": response.text[:2000],
                "error_message": None,
                "duration_ms": int(duration * 1000),
            }

        except Exception as e:
            return {
                "test_case_id": test_case.get("id"),
                "name": test_case.get("name"),
                "method": method,
                "endpoint": endpoint,
                "status_code": None,
                "result": "ERROR",
                "response_body": None,
                "error_message": str(e),
                "duration_ms": None,
            }


# --------------------------------------------------
# DEMO RUN
# --------------------------------------------------
if __name__ == "__main__":
    runner = DockerRunner(base_url="https://jsonplaceholder.typicode.com")

    demo_tests = [
        {
            "id": "TC-001",
            "name": "Get Posts",
            "method": "GET",
            "endpoint": "/posts/1",
            "expected_status": 200
        }
    ]

    results = runner.run(demo_tests)
    print(results)
