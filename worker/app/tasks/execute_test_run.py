"""
Celery Task: Execute Test Run

This task executes an approved TestBlueprint by:
1. Reading test cases from blueprint JSON
2. Making real HTTP requests
3. Storing results back into database
4. Updating test run status
"""

import requests
from datetime import datetime

from celery_app import celery_app
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.test_run import TestRun, TestResult
from app.models.test_blueprint import TestBlueprint


@celery_app.task(
    name="tasks.execute_test_run",
    bind=True,
    autoretry_for=(Exception,),
    retry_backoff=10,
    retry_kwargs={"max_retries": 3},
)
def execute_test_run(self, test_run_id: str):
    """
    Executes a TestRun.

    Args:
        test_run_id (str): UUID of TestRun
    """

    db: Session = SessionLocal()

    try:
        # --------------------------------------------------
        # 1. Fetch Test Run
        # --------------------------------------------------
        test_run = db.query(TestRun).filter(TestRun.id == test_run_id).first()
        if not test_run:
            raise Exception("TestRun not found")

        blueprint = (
            db.query(TestBlueprint)
            .filter(TestBlueprint.id == test_run.blueprint_id)
            .first()
        )
        if not blueprint:
            raise Exception("Blueprint not found")

        # --------------------------------------------------
        # 2. Mark Run as RUNNING
        # --------------------------------------------------
        test_run.status = "RUNNING"
        test_run.started_at = datetime.utcnow()
        db.commit()

        test_cases = blueprint.ai_strategy_json.get("test_cases", [])
        results = []

        passed = 0
        failed = 0

        # --------------------------------------------------
        # 3. Execute Each Test Case
        # --------------------------------------------------
        for tc in test_cases:
            try:
                method = tc.get("method", "GET").upper()
                url = tc.get("url")
                headers = tc.get("headers", {})
                payload = tc.get("body")

                response = requests.request(
                    method=method,
                    url=url,
                    headers=headers,
                    json=payload,
                    timeout=10,
                )

                is_pass = 200 <= response.status_code < 300

                result = TestResult(
                    test_run_id=test_run.id,
                    test_case_id=tc.get("id"),
                    name=tc.get("name"),
                    method=method,
                    endpoint=url,
                    status_code=response.status_code,
                    result="PASS" if is_pass else "FAIL",
                    response_body=response.text[:2000],
                )

                db.add(result)

                if is_pass:
                    passed += 1
                else:
                    failed += 1

            except Exception as e:
                failed += 1
                db.add(
                    TestResult(
                        test_run_id=test_run.id,
                        test_case_id=tc.get("id"),
                        name=tc.get("name"),
                        method=tc.get("method"),
                        endpoint=tc.get("url"),
                        status_code=0,
                        result="ERROR",
                        error_message=str(e),
                    )
                )

        # --------------------------------------------------
        # 4. Finalize Run
        # --------------------------------------------------
        test_run.status = "COMPLETED" if failed == 0 else "FAILED"
        test_run.finished_at = datetime.utcnow()
        test_run.reliability_score = int(
            (passed / max(len(test_cases), 1)) * 100
        )

        db.commit()

    except Exception as e:
        test_run.status = "FAILED"
        test_run.logs = str(e)
        db.commit()
        raise

    finally:
        db.close()

    return {
        "test_run_id": test_run_id,
        "status": test_run.status,
        "passed": passed,
        "failed": failed,
    }
