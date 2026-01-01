# backend/app/services/diff_service.py

from deepdiff import DeepDiff
from typing import List, Dict


# ---------------------------------------------------------
# CHANGE CLASSIFICATION RULES
# ---------------------------------------------------------

CRITICAL_KEYWORDS = [
    "dictionary_item_removed",
    "iterable_item_removed",
    "type_changes",
]

MAJOR_KEYWORDS = [
    "values_changed",
]

MINOR_KEYWORDS = [
    "dictionary_item_added",
    "iterable_item_added",
]

INFO_KEYWORDS = [
    "attribute_added",
    "attribute_removed",
]


# ---------------------------------------------------------
# PUBLIC API
# ---------------------------------------------------------

def detect_breaking_changes(
    old_spec: dict,
    new_spec: dict
) -> List[Dict]:
    """
    Compares two OpenAPI specs and returns a list of classified changes.

    Output format:
    [
        {
            "change_type": "CRITICAL",
            "field_path": "paths./checkout.post",
            "description": "Endpoint was removed",
            "category": "ENDPOINT_REMOVED"
        }
    ]
    """

    diff = DeepDiff(
        old_spec,
        new_spec,
        ignore_order=True,
        report_repetition=True,
        verbose_level=2
    )

    changes: List[Dict] = []

    for diff_type, diff_items in diff.items():
        for path, detail in normalize_diff_items(diff_items):

            classification = classify_change(diff_type, path, detail)

            changes.append({
                "change_type": classification["change_type"],
                "field_path": path,
                "description": classification["description"],
                "category": classification["category"]
            })

    return changes


# ---------------------------------------------------------
# INTERNAL HELPERS
# ---------------------------------------------------------

def normalize_diff_items(diff_items):
    """
    Normalizes DeepDiff output into iterable (path, detail) pairs.
    """
    if isinstance(diff_items, dict):
        return diff_items.items()
    if isinstance(diff_items, list):
        return [(str(item), None) for item in diff_items]
    return []


def classify_change(diff_type: str, path: str, detail) -> Dict:
    """
    Classifies a diff entry into severity + description.
    """

    # -------------------------------
    # CRITICAL BREAKING CHANGES
    # -------------------------------
    if diff_type in CRITICAL_KEYWORDS:
        if "paths" in path:
            return {
                "change_type": "CRITICAL",
                "description": "API endpoint structure changed or removed",
                "category": "ENDPOINT_CHANGED"
            }

        return {
            "change_type": "CRITICAL",
            "description": "Breaking structural or type change detected",
            "category": "STRUCTURE_CHANGED"
        }

    # -------------------------------
    # MAJOR CHANGES
    # -------------------------------
    if diff_type in MAJOR_KEYWORDS:
        return {
            "change_type": "MAJOR",
            "description": "Existing value modified",
            "category": "VALUE_CHANGED"
        }

    # -------------------------------
    # MINOR CHANGES
    # -------------------------------
    if diff_type in MINOR_KEYWORDS:
        return {
            "change_type": "MINOR",
            "description": "New field or endpoint added",
            "category": "FIELD_ADDED"
        }

    # -------------------------------
    # INFORMATIONAL
    # -------------------------------
    return {
        "change_type": "INFO",
        "description": "Non-breaking metadata or documentation change",
        "category": "DOC_CHANGE"
    }
