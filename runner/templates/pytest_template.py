"""
ApiScan – Pytest Execution Template

This template is dynamically populated by the runner at runtime
using AI-generated test cases from the Test Blueprint.

DO NOT hardcode URLs, headers, or payloads here.
Everything is injected at runtime.
"""

import pytest
import requests

# These variables are injected dynamically by entrypoint.py
TEST_CASES = []
GLOBAL_HEADERS = {}


@pytest.mark.parametrize("test_case", TEST_CASES)
def test_api_endpoint(test_case):
    """
    Executes a single API test case.
    """

    method = test_case.get("method", "GET").upper()
    url = test_case["url"]
    headers = {**GLOBAL_HEADERS, **test_case.get("headers", {})}
    body = test_case.get("body")
    expected_status = test_case.get("expected_status")

    response = None
    error = None

    try:
        response = requests.request(
            method=method,
            url=url,
            headers=headers,
            json=body,
            timeout=10
        )
    except Exception as e:
        error = str(e)

    # -----------------------------
    # Assertions
    # -----------------------------
    if expected_status:
        assert response is not None, f"Request failed: {error}"
        assert (
            response.status_code == expected_status
        ), f"Expected {expected_status}, got {response.status_code}"

    # Optional schema or body checks
    expected_contains = test_case.get("response_contains")
    if expected_contains:
        assert expected_contains in response.text
