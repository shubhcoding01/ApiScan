import requests
import logging
from sqlalchemy.orm import Session
from datetime import datetime
from app.models.test_blueprint import TestBlueprint
from app.models.test_run import TestRun, TestResult
# from app.models.api_version import ApiVersion

logger = logging.getLogger(__name__)

def execute_test_run(db: Session, blueprint_id: str):
    """
    1. Fetches the Blueprint.
    2. Creates a TestRun record.
    3. Loops through every test case and FIRES the request.
    4. Saves the result (PASS/FAIL).
    """
    
    # 1. Setup
    blueprint = db.query(TestBlueprint).filter(TestBlueprint.id == blueprint_id).first()
    if not blueprint:
        raise ValueError("Blueprint not found")
        
    # Get the Base URL from the API Version
    # ⚠️ IMPORTANT: Change this to match your running API's URL
    BASE_URL = "http://localhost:8000" 
    
    # 2. Create Run Record
    run = TestRun(blueprint_id=blueprint_id, status="RUNNING")
    db.add(run)
    db.commit()
    
    strategy = blueprint.ai_strategy_json
    scenarios = strategy.get("test_scenarios", [])
    
    total = 0
    passed = 0
    failed = 0

    # 3. Execution Loop
    for scenario in scenarios:
        endpoint = scenario.get("endpoint")
        method = scenario.get("method", "GET")
        
        for case in scenario.get("test_cases", []):
            total += 1
            
            # Prepare Request
            url = f"{BASE_URL}{endpoint}"
            expected_status = case.get("expected_status", 200)
            payload = case.get("body")
            params = case.get("query_params")
            
            # Execute
            result_status = "FAIL"
            actual_status = 0
            response_text = ""
            error_msg = None
            
            try:
                logger.info(f"🚀 Executing {method} {url}...")
                response = requests.request(
                    method=method,
                    url=url,
                    json=payload,
                    params=params,
                    timeout=5 # Safety timeout
                )
                
                actual_status = response.status_code
                response_text = response.text[:500] # Store first 500 chars
                
                # Check Result
                if actual_status == expected_status:
                    result_status = "PASS"
                    passed += 1
                else:
                    result_status = "FAIL"
                    error_msg = f"Expected {expected_status}, got {actual_status}"
                    failed += 1
                    
            except Exception as e:
                result_status = "ERROR"
                error_msg = str(e)
                failed += 1

            # 4. Save Result
            result_record = TestResult(
                test_run_id=run.id,
                test_case_id=case.get("name", "Unknown"),
                name=case.get("name"),
                endpoint=endpoint,
                method=method,
                status_code=actual_status,
                response_body=response_text,
                result=result_status,
                error_message=error_msg
            )
            db.add(result_record)

    # 5. Finish Run
    run.status = "COMPLETED"
    run.completed_at = datetime.utcnow()
    run.total_tests = total
    run.passed_tests = passed
    run.failed_tests = failed
    
    db.commit()
    return run