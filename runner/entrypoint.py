"""
ApiScan Runner Entrypoint

This file runs INSIDE the Docker container.
It receives a test plan + secrets via environment variables,
executes API tests safely, and prints structured JSON output.
"""

import os
import json
import requests
import traceback
from datetime import datetime


def load_test_plan():
    """
    Test plan is injected as JSON via environment variable.
    """
    plan = os.getenv("TEST_PLAN")
    if not plan:
        raise RuntimeError("TEST_PLAN environment variable not provided")
    return json.loads(plan)


def load_secrets():
    """
    Secrets are injected as JSON via environment variable.
    """
    secrets = os.getenv("SECRETS", "{}")
    return json.loads(secrets)


def execute_test_case(test_case, secrets):
    """
    Executes a single API test case.
    """
    method = test_case.get("method", "GET").upper()
    url = test_case["url"]
    headers = test_case.get("headers", {}).copy()
    body = test_case.get("body")

    # Inject secrets into headers if needed
    for key, value in secrets.items():
        if key.startswith("HEADER_"):
            headers[key.replace("HEADER_", "")] = value

    try:
        response = requests.request(
            method=method,
            url=url,
            headers=headers,
            json=body,
            timeout=10,
        )

        passed = 200 <= response.status_code < 300

        return {
            "test_case_id": test_case.get("id"),
            "name": test_case.get("name"),
            "method": method,
            "endpoint": url,
            "status_code": response.status_code,
            "result": "PASS" if passed else "FAIL",
            "response_body": response.text[:2000],
        }

    except Exception as e:
        return {
            "test_case_id": test_case.get("id"),
            "name": test_case.get("name"),
            "method": method,
            "endpoint": url,
            "status_code": 0,
            "result": "ERROR",
            "error_message": str(e),
        }


def main():
    start_time = datetime.utcnow()

    try:
        test_plan = load_test_plan()
        secrets = load_secrets()

        test_cases = test_plan.get("test_cases", [])
        results = []

        passed = 0
        failed = 0

        for tc in test_cases:
            result = execute_test_case(tc, secrets)
            results.append(result)

            if result["result"] == "PASS":
                passed += 1
            else:
                failed += 1

        output = {
            "status": "COMPLETED" if failed == 0 else "FAILED",
            "started_at": start_time.isoformat(),
            "finished_at": datetime.utcnow().isoformat(),
            "total_tests": len(test_cases),
            "passed_tests": passed,
            "failed_tests": failed,
            "results": results,
        }

        print(json.dumps(output))

    except Exception as e:
        error_output = {
            "status": "FAILED",
            "error": str(e),
            "traceback": traceback.format_exc(),
        }
        print(json.dumps(error_output))
        exit(1)


if __name__ == "__main__":
    main()
