
# """
# Celery Task: Execute Test Run (Worker)

# Responsibilities:
# - Execute HTTP test cases from the Strategy
# - Collect raw results
# - Send results back to backend API
# """

# import os
# import requests
# import logging
# from worker.app.celery_app import celery_app
# from worker.app.runner.result_parser import ResultParser

# logger = logging.getLogger(__name__)

# BACKEND_API = os.getenv("BACKEND_API_URL", "http://localhost:8000/api")


# @celery_app.task(
#     name="tasks.execute_test_run",
#     bind=True,
#     autoretry_for=(Exception,),
#     retry_backoff=10,
#     retry_kwargs={"max_retries": 3},
# )
# def execute_test_run(self, payload: dict):
#     """
#     Executes tests from a 'strategy' payload.
#     """
    
#     test_run_id = payload["test_run_id"]
#     base_url = payload["base_url"]
    
#     # 👇 FIX 1: Look for 'strategy', not 'test_cases' directly
#     strategy = payload.get("strategy", {})
    
#     # 👇 FIX 2: Flatten the structure (Strategy -> Scenarios -> Test Cases)
#     test_cases_to_run = []
    
#     # 2a. Try to get scenarios (Standard AI Output)
#     scenarios = strategy.get("test_scenarios", [])
    
#     for scenario in scenarios:
#         sc_endpoint = scenario.get("endpoint", "")
#         sc_method = scenario.get("method", "GET")
        
#         for case in scenario.get("test_cases", []):
#             # Inherit endpoint/method if missing in the specific case
#             if "endpoint" not in case: 
#                 case["endpoint"] = sc_endpoint
#             if "method" not in case: 
#                 case["method"] = sc_method
            
#             test_cases_to_run.append(case)

#     # 2b. Fallback: If AI put test_cases at the root (Edge Case)
#     if not test_cases_to_run and "test_cases" in strategy:
#         test_cases_to_run = strategy["test_cases"]

#     logger.info(f"🚀 Executing {len(test_cases_to_run)} tests for Run {test_run_id}")

#     raw_results = []

#     # 3. Execution Loop
#     for tc in test_cases_to_run:
#         try:
#             # Construct full URL safely (handling double slashes)
#             endpoint = tc.get("endpoint", "")
#             full_url = f"{base_url.rstrip('/')}/{endpoint.lstrip('/')}"
            
#             response = requests.request(
#                 method=tc.get("method", "GET"),
#                 url=full_url,
#                 headers=tc.get("headers", {}),
#                 json=tc.get("body"),
#                 params=tc.get("query_params"),
#                 timeout=10,
#             )

#             raw_results.append({
#                 "test_case_id": tc.get("id", "unknown"),
#                 "name": tc.get("name", "Unknown Test"),
#                 "method": tc.get("method"),
#                 "endpoint": endpoint,
#                 "status_code": response.status_code,
#                 "result": "PASS" if 200 <= response.status_code < 300 else "FAIL",
#                 "response_body": response.text[:2000],
#                 "duration_ms": response.elapsed.total_seconds() * 1000,
#             })

#         except Exception as e:
#             raw_results.append({
#                 "test_case_id": tc.get("id", "unknown"),
#                 "name": tc.get("name", "Unknown Test"),
#                 "method": tc.get("method"),
#                 "endpoint": tc.get("endpoint"),
#                 "status_code": 0,
#                 "result": "ERROR",
#                 "error_message": str(e),
#             })

#     # 4. Parse & Send Results
#     parsed_results = ResultParser.parse(raw_results)

#     try:
#         requests.post(
#             f"{BACKEND_API}/test-runs/{test_run_id}/complete",
#             json=parsed_results,
#             timeout=10,
#         )
#     except Exception as e:
#         logger.error(f"Failed to report results to backend: {e}")

#     return {
#         "test_run_id": test_run_id,
#         "status": "PASSED" if parsed_results["failed"] == 0 else "FAILED",
#     }

"""
Celery Task: Execute Test Run (Worker)

Responsibilities:
- Execute HTTP test cases from the AI Strategy
- Inject authentication if provided
- Collect raw results
- Parse results
- Send results back to backend
"""

import os
import requests
import logging
from worker.app.celery_app import celery_app
from worker.app.runner.result_parser import ResultParser

logger = logging.getLogger(__name__)

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
    Executes tests from a strategy payload.
    """

    # ---------------------------------------------------------
    # 1. Required Payload Fields
    # ---------------------------------------------------------
    test_run_id = payload.get("test_run_id")
    base_url = payload.get("base_url")

    if not test_run_id or not base_url:
        raise ValueError("Payload must contain test_run_id and base_url")

    strategy = payload.get("strategy", {})

    # ---------------------------------------------------------
    # 2. Authentication Injection (Optional)
    # ---------------------------------------------------------
    global_headers = {}

    auth = strategy.get("auth", {})
    bearer_token = auth.get("bearer_token")

    if bearer_token:
        global_headers["Authorization"] = f"Bearer {bearer_token}"

    # ---------------------------------------------------------
    # 3. Flatten Strategy → Test Cases
    # ---------------------------------------------------------
    test_cases_to_run = []

    # Preferred structure: test_scenarios → test_cases
    for scenario in strategy.get("test_scenarios", []):
        scenario_endpoint = scenario.get("endpoint", "")
        scenario_method = scenario.get("method", "GET")

        for case in scenario.get("test_cases", []):
            case.setdefault("endpoint", scenario_endpoint)
            case.setdefault("method", scenario_method)
            test_cases_to_run.append(case)

    # Fallback: test_cases at root
    if not test_cases_to_run:
        test_cases_to_run = strategy.get("test_cases", [])

    logger.info(
        f"🚀 Executing {len(test_cases_to_run)} tests for Run {test_run_id}"
    )

    raw_results = []

    # ---------------------------------------------------------
    # 4. Execute Test Cases
    # ---------------------------------------------------------
    for tc in test_cases_to_run:
        try:
            endpoint = tc.get("endpoint", "")
            method = tc.get("method", "GET")

            full_url = f"{base_url.rstrip('/')}/{endpoint.lstrip('/')}"

            headers = {
                **global_headers,
                **tc.get("headers", {})
            }

            response = requests.request(
                method=method,
                url=full_url,
                headers=headers,
                json=tc.get("body"),
                params=tc.get("query_params"),
                timeout=10,
            )

            raw_results.append({
                "test_case_id": tc.get("id"),
                "name": tc.get("name", "Unnamed Test"),
                "method": method,
                "endpoint": endpoint,
                "status_code": response.status_code,
                "result": "PASS" if 200 <= response.status_code < 300 else "FAIL",
                "response_body": response.text[:2000],
            })

        except Exception as e:
            raw_results.append({
                "test_case_id": tc.get("id"),
                "name": tc.get("name", "Unnamed Test"),
                "method": tc.get("method"),
                "endpoint": tc.get("endpoint"),
                "status_code": 0,
                "result": "ERROR",
                "error_message": str(e),
            })

    # ---------------------------------------------------------
    # 5. Parse Results
    # ---------------------------------------------------------
    parsed_results = ResultParser.parse(raw_results)

    # Safety defaults (NO KeyError EVER)
    parsed_results.setdefault("passed", 0)
    parsed_results.setdefault("failed", 0)
    parsed_results.setdefault("total", len(raw_results))
    parsed_results.setdefault("results", raw_results)

    # ---------------------------------------------------------
    # 6. Send Results Back to Backend
    # ---------------------------------------------------------
    try:
        requests.post(
            f"{BACKEND_API}/test-runs/{test_run_id}/complete",
            json=parsed_results,
            timeout=10,
        )
    except Exception as e:
        logger.error(f"❌ Failed to report results to backend: {e}")

    # ---------------------------------------------------------
    # 7. Final Task Status
    # ---------------------------------------------------------
    return {
        "test_run_id": test_run_id,
        "status": "PASSED" if parsed_results["failed"] == 0 else "FAILED",
    }
