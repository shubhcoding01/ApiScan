"""
Celery Task: Execute Test Run (Worker)

Responsibilities:
- Execute HTTP test cases
- Collect raw results
- Send results back to backend API
"""

import os
import requests

from worker.app.celery_app import celery_app
from worker.app.runner.result_parser import ResultParser

BACKEND_API = os.getenv("BACKEND_API_URL", "http://localhost:8000/api")


@celery_app.task(
    name="tasks.execute_test_run",
    bind=True,
    autoretry_for=(Exception,),
    retry_backoff=10,
    retry_kwargs={"max_retries": 3},
)
def execute_test_run(self, payload: dict):
    """
    payload = {
        "test_run_id": "uuid",
        "base_url": "https://api.example.com",
        "test_cases": [
            {
                "id": "TC-001",
                "name": "Get Users",
                "method": "GET",
                "endpoint": "/users",
                "headers": {},
                "body": null
            }
        ]
    }
    """

    test_run_id = payload["test_run_id"]
    base_url = payload["base_url"]
    test_cases = payload["test_cases"]

    raw_results = []

    for tc in test_cases:
        try:
            response = requests.request(
                method=tc["method"],
                url=f"{base_url}{tc['endpoint']}",
                headers=tc.get("headers", {}),
                json=tc.get("body"),
                timeout=10,
            )

            raw_results.append({
                "test_case_id": tc["id"],
                "name": tc["name"],
                "method": tc["method"],
                "endpoint": tc["endpoint"],
                "status_code": response.status_code,
                "result": "PASS" if 200 <= response.status_code < 300 else "FAIL",
                "response_body": response.text[:2000],
                "duration_ms": response.elapsed.total_seconds() * 1000,
            })

        except Exception as e:
            raw_results.append({
                "test_case_id": tc["id"],
                "name": tc["name"],
                "method": tc["method"],
                "endpoint": tc["endpoint"],
                "status_code": 0,
                "result": "ERROR",
                "error_message": str(e),
            })

    # Parse results (metrics, counts, summary)
    parsed_results = ResultParser.parse(raw_results)

    # Send results back to backend
    requests.post(
        f"{BACKEND_API}/test-runs/{test_run_id}/complete",
        json=parsed_results,
        timeout=10,
    )

    return {
    "test_run_id": test_run_id,
    "status": "PASSED" if parsed_results["failed"] == 0 else "FAILED",
}