# """
# Result Parser for ApiScan

# Responsibilities:
# - Convert raw runner execution output into:
#   - Aggregated run stats
#   - Normalized test results
# - Compute pass/fail counts
# - Compute reliability score
# """

# from typing import List, Dict, Any


# class ResultParser:
#     """
#     Parses raw execution results into structured data.
#     """

#     @staticmethod
#     def parse(results: List[Dict[str, Any]]) -> Dict[str, Any]:
#         """
#         Entry point for parsing execution results.

#         Returns:
#         {
#             summary: {...},
#             results: [...]
#         }
#         """

#         total = len(results)
#         passed = 0
#         failed = 0
#         errored = 0

#         parsed_results = []

#         for result in results:
#             outcome = result.get("result")

#             if outcome == "PASS":
#                 passed += 1
#             elif outcome == "FAIL":
#                 failed += 1
#             else:
#                 errored += 1

#             parsed_results.append(ResultParser._parse_single_result(result))

#         reliability_score = ResultParser._calculate_score(
#             total, passed, failed, errored
#         )

#         return {
#             "summary": {
#                 "total_tests": total,
#                 "passed_tests": passed,
#                 "failed_tests": failed,
#                 "errored_tests": errored,
#                 "reliability_score": reliability_score,
#             },
#             "results": parsed_results,
#         }

#     # --------------------------------------------------
#     # SINGLE RESULT NORMALIZATION
#     # --------------------------------------------------

#     @staticmethod
#     def _parse_single_result(result: Dict[str, Any]) -> Dict[str, Any]:
#         """
#         Normalize a single test result.
#         """

#         return {
#             "test_case_id": result.get("test_case_id"),
#             "name": result.get("name"),
#             "method": result.get("method"),
#             "endpoint": result.get("endpoint"),
#             "status_code": result.get("status_code"),
#             "result": result.get("result"),
#             "response_body": result.get("response_body"),
#             "error_message": result.get("error_message"),
#             "duration_ms": result.get("duration_ms"),
#         }

#     # --------------------------------------------------
#     # RELIABILITY SCORE
#     # --------------------------------------------------

#     @staticmethod
#     def _calculate_score(
#         total: int, passed: int, failed: int, errored: int
#     ) -> int:
#         """
#         Compute reliability score (0–100).
#         Errors penalize more than failures.
#         """

#         if total == 0:
#             return 0

#         score = (passed * 1.0 + failed * 0.4 + errored * 0.0) / total
#         return int(score * 100)


"""
Result Parser for ApiScan
"""

from typing import List, Dict, Any


class ResultParser:
    """
    Parses raw execution results into structured data.
    """

    @staticmethod
    def parse(results: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Entry point for parsing execution results.
        
        NOW RETURNS FLATTENED STRUCTURE (Crucial for Worker compatibility):
        {
            "total": 10,
            "passed": 8,
            "failed": 2,
            "results": [...]
        }
        """

        total = len(results)
        passed = 0
        failed = 0
        errored = 0

        parsed_results = []

        for result in results:
            outcome = result.get("result")

            # Count Logic
            if outcome == "PASS":
                passed += 1
            elif outcome == "FAIL":
                failed += 1
            else:
                errored += 1
                # Treat errors as failures for the final count
                failed += 1 

            parsed_results.append(ResultParser._parse_single_result(result))

        reliability_score = ResultParser._calculate_score(
            total, passed, failed, errored
        )

        # 👇 FIX: Return flat keys directly (Worker expects 'failed', 'passed', 'total' here)
        return {
            "total": total,
            "passed": passed,
            "failed": failed,  # <--- The Worker looks for this specific key
            "errored": errored,
            "reliability_score": reliability_score,
            "results": parsed_results,
        }

    # --------------------------------------------------
    # SINGLE RESULT NORMALIZATION
    # --------------------------------------------------

    @staticmethod
    def _parse_single_result(result: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "test_case_id": result.get("test_case_id"),
            "name": result.get("name", "Unknown Test"),
            "method": result.get("method"),
            "endpoint": result.get("endpoint"),
            "status_code": result.get("status_code", 0),
            "result": result.get("result", "ERROR"),
            "response_body": result.get("response_body", ""),
            "error_message": result.get("error_message"),
            "duration_ms": result.get("duration_ms", 0),
        }

    # --------------------------------------------------
    # RELIABILITY SCORE
    # --------------------------------------------------

    @staticmethod
    def _calculate_score(total: int, passed: int, failed: int, errored: int) -> int:
        if total == 0:
            return 0
        # Simple scoring logic
        score = (passed * 1.0) / total
        return int(score * 100)