# backend/app/services/policy_service.py

from typing import List, Dict

from app.models.project import Project
from app.models.test_blueprint import TestBlueprint
from app.models.test_run import TestRun


# ---------------------------------------------------------
# CI / GOVERNANCE POLICIES
# ---------------------------------------------------------

MIN_RELIABILITY_SCORE = 95
PROD_FORBIDDEN_METHODS = {"DELETE", "PUT", "PATCH"}


# ---------------------------------------------------------
# SPEC / CI POLICIES
# ---------------------------------------------------------

def should_block_ci(
    project: Project,
    breaking_changes: List[Dict]
) -> bool:
    """
    Determines whether CI should be blocked based on breaking changes.
    """

    if not project.ci_enabled:
        return False

    for change in breaking_changes:
        if change["change_type"] == "CRITICAL":
            return True

    return False


# ---------------------------------------------------------
# AI GOVERNANCE POLICIES
# ---------------------------------------------------------

def can_auto_approve_blueprint(
    project: Project,
    blueprint: TestBlueprint
) -> bool:
    """
    Determines whether an AI-generated blueprint
    can be auto-approved.
    """

    # Auto-approval disabled in production systems
    if project.base_url and "prod" in project.base_url.lower():
        return False

    # If blueprint is simple & low-risk
    if blueprint.risk_level == "LOW":
        return True

    return False


# ---------------------------------------------------------
# EXECUTION SAFETY POLICIES
# ---------------------------------------------------------

def is_request_allowed(
    http_method: str,
    environment: str
) -> bool:
    """
    Prevents destructive requests in production environments.
    """

    if environment.upper() == "PROD":
        if http_method.upper() in PROD_FORBIDDEN_METHODS:
            return False

    return True


# ---------------------------------------------------------
# RELIABILITY SCORE POLICY
# ---------------------------------------------------------

def is_reliability_acceptable(
    test_run: TestRun
) -> bool:
    """
    Determines whether a test run meets reliability standards.
    """

    if test_run.reliability_score is None:
        return False

    return test_run.reliability_score >= MIN_RELIABILITY_SCORE


# ---------------------------------------------------------
# FINAL CI DECISION
# ---------------------------------------------------------

def should_fail_ci_after_run(
    project: Project,
    test_run: TestRun
) -> bool:
    """
    Final CI decision after execution.
    """

    if not project.ci_enabled:
        return False

    if not is_reliability_acceptable(test_run):
        return True

    if test_run.status == "FAILED":
        return True

    return False
