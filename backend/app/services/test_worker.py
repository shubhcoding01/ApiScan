# backend/app/services/test_worker.py

import requests
from sqlalchemy.orm import Session
from datetime import datetime

from app.models.test_run import TestRun, TestResult
from app.models.test_blueprint import TestBlueprint


def execute_test_run(db: Session, test_run_id):
    """
    This is the WORKER.
    It executes the test run synchronously (MVP style).
    """

    test_run = db.query(TestRun).filter(TestRun.id == test_run_id).first()
    if not test_run:
        return

    blueprint = db.query(TestBlueprint).filter(
        TestBlueprint.id == test_run.blueprint_id
    ).first()

    test_run.status = "RUNNING"
    test_run.started_at = datetime.utcnow()
    db.commit()

    passed = 0
    failed = 0

    # 👉 DEMO STRATEGY (later AI generated)
    test_cases = blueprint.ai_strategy_json.get("tests", [])

    for case in test_cases:
        try:
            response = requests.request(
                method=case["method"],
                url=case["url"],
                json=case.get("body"),
                headers=case.get("headers", {})
            )

            status = "PASS" if response.status_code < 400 else "FAIL"
            passed += status == "PASS"
            failed += status == "FAIL"

            result = TestResult(
                test_run_id=str(test_run.id),
                test_case_id=case["id"],
                name=case["name"],
                method=case["method"],
                endpoint=case["url"],
                status_code=response.status_code,
                result=status,
                response_body=response.text[:2000]
            )

            db.add(result)

        except Exception as e:
            failed += 1
            db.add(TestResult(
                test_run_id=str(test_run.id),
                test_case_id=case["id"],
                name=case["name"],
                method=case["method"],
                endpoint=case["url"],
                status_code=0,
                result="FAIL",
                error_message=str(e)
            ))

    test_run.status = "PASSED" if failed == 0 else "FAILED"
    test_run.finished_at = datetime.utcnow()
    test_run.reliability_score = int((passed / max(1, passed + failed)) * 100)

    db.commit()
