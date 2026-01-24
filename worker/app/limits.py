"""
Execution & Safety Limits for ApiScan Worker

This file centralizes all hard limits used by:
- AI blueprint generation
- Test execution runner
- Spec ingestion
- Context chaining

Purpose:
- Prevent abuse
- Avoid infinite loops
- Control cost & performance
"""

# ----------------------------------------------------
# 🔐 GENERAL SAFETY LIMITS
# ----------------------------------------------------

# Maximum API endpoints allowed in a single spec
MAX_ENDPOINTS_PER_SPEC = 200

# Maximum schemas allowed in OpenAPI
MAX_SCHEMAS_PER_SPEC = 150

# Maximum request size (bytes)
MAX_REQUEST_BODY_SIZE = 100 * 1024  # 100 KB

# Maximum response body stored per test
MAX_RESPONSE_BODY_SIZE = 2_000      # characters


# ----------------------------------------------------
# 🧠 AI / BLUEPRINT LIMITS
# ----------------------------------------------------

# Max test cases AI can generate per blueprint
MAX_TEST_CASES_PER_BLUEPRINT = 50

# Max prompt size sent to AI (characters)
MAX_AI_PROMPT_SIZE = 12_000

# Max tokens allowed in AI response
MAX_AI_RESPONSE_TOKENS = 2_000

# Allowed HTTP methods AI can use
ALLOWED_HTTP_METHODS = {"GET", "POST", "PUT", "PATCH", "DELETE"}

# Forbidden headers AI must never generate
FORBIDDEN_HEADERS = {
    "Authorization",   # handled via secrets
    "Cookie",
    "Set-Cookie",
    "X-Internal-Token",
}


# ----------------------------------------------------
# ▶️ TEST RUN EXECUTION LIMITS
# ----------------------------------------------------

# Max total test runs per blueprint
MAX_TEST_RUNS_PER_BLUEPRINT = 20

# Max test execution time per run (seconds)
MAX_TEST_RUN_DURATION = 300  # 5 minutes

# Max retries per individual test case
MAX_TEST_RETRIES = 1

# HTTP request timeout per test case
HTTP_REQUEST_TIMEOUT = 10  # seconds

# Max concurrent requests inside a run
MAX_PARALLEL_REQUESTS = 5


# ----------------------------------------------------
# 🔁 CONTEXT CHAINING LIMITS
# ----------------------------------------------------

# Max variables stored between test cases
MAX_CONTEXT_VARIABLES = 25

# Max context size (JSON characters)
MAX_CONTEXT_SIZE = 5_000

# Keys that are allowed to be persisted in context
ALLOWED_CONTEXT_KEYS = {
    "id",
    "token",
    "access_token",
    "refresh_token",
    "user_id",
    "session_id",
}


# ----------------------------------------------------
# 🐳 DOCKER / RUNNER LIMITS
# ----------------------------------------------------

# Docker container limits
DOCKER_CPU_LIMIT = 0.5        # 50% CPU
DOCKER_MEMORY_LIMIT = "512m"  # 512 MB
DOCKER_PIDS_LIMIT = 100

# Max containers spawned per run
MAX_DOCKER_CONTAINERS = 1


# ----------------------------------------------------
# 🚨 FAIL-SAFE RULES
# ----------------------------------------------------

# Auto-fail run if too many errors
FAIL_RUN_AFTER_ERRORS = 10

# Stop execution if consecutive failures exceed this
MAX_CONSECUTIVE_FAILURES = 5


# ----------------------------------------------------
# 🧪 DEVELOPMENT MODE FLAGS
# ----------------------------------------------------

# If True → skips Docker, runs locally (DEV only)
DEV_RUNNER_MODE = False

# If True → disables AI and uses rule-based generator
DISABLE_AI = False
