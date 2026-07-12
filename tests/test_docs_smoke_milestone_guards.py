"""Regression tests for milestone-aware docs smoke guards."""

from __future__ import annotations

import importlib.util
import unittest
from pathlib import Path
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
DOCS_SMOKE_PATH = ROOT / "scripts" / "docs_smoke.py"

spec = importlib.util.spec_from_file_location("docs_smoke", DOCS_SMOKE_PATH)
assert spec is not None
assert spec.loader is not None
docs_smoke = importlib.util.module_from_spec(spec)
spec.loader.exec_module(docs_smoke)


class MilestoneGuardTests(unittest.TestCase):
    def test_milestone_number_is_parsed_from_branch_prefix(self) -> None:
        self.assertEqual(docs_smoke.milestone_number_from_branch("m6-experiment-framework"), 6)
        self.assertEqual(docs_smoke.milestone_number_from_branch("m18-thai-first-i18n"), 18)
        self.assertIsNone(docs_smoke.milestone_number_from_branch("feature/docs-cleanup"))

    def test_m6_planning_guard_is_inactive_for_m18_and_later(self) -> None:
        with patch.object(docs_smoke, "current_branch_name", return_value="m18-thai-first-i18n"):
            self.assertTrue(docs_smoke.branch_at_or_after(7))
            self.assertFalse(docs_smoke.branch_before_milestone(7))

        with patch.object(docs_smoke, "current_branch_name", return_value="m19-synthetic-social-platform-engagement"):
            self.assertTrue(docs_smoke.branch_at_or_after(7))
            self.assertFalse(docs_smoke.branch_before_milestone(7))

    def test_m6_planning_guard_remains_active_for_m6_era_branches(self) -> None:
        with patch.object(docs_smoke, "current_branch_name", return_value="m6-experiment-framework"):
            self.assertFalse(docs_smoke.branch_at_or_after(7))
            self.assertTrue(docs_smoke.branch_before_milestone(7))

    def test_m18_guard_is_active_only_for_m18_branches(self) -> None:
        with patch.object(docs_smoke, "current_branch_name", return_value="m18-thai-first-i18n"):
            self.assertTrue(docs_smoke.branch_is_milestone(18))

        with patch.object(docs_smoke, "current_branch_name", return_value="m19-synthetic-social-platform-engagement"):
            self.assertFalse(docs_smoke.branch_is_milestone(18))

    def test_unknown_pr_branch_with_m18_files_infers_m18_context(self) -> None:
        changed_paths = [
            "docs/product/TRANSLATION_STYLE_GUIDE.md",
            "src/i18n/localize.ts",
            "src/views.tsx",
            "src/App.test.tsx",
        ]
        with (
            patch.object(docs_smoke, "current_branch_name", return_value="pr-30-current"),
            patch.object(docs_smoke, "changed_paths_from_main", return_value=changed_paths),
        ):
            self.assertEqual(docs_smoke.current_milestone_number(), 18)
            self.assertFalse(docs_smoke.branch_before_milestone(7))
            self.assertTrue(docs_smoke.branch_is_milestone(18))

    def test_unknown_branch_with_m6_docs_keeps_m6_planning_guard_meaningful(self) -> None:
        with (
            patch.object(docs_smoke, "current_branch_name", return_value="experiment-planning"),
            patch.object(docs_smoke, "changed_paths_from_main", return_value=["docs/product/EXPERIMENT_TAXONOMY.md"]),
        ):
            self.assertEqual(docs_smoke.current_milestone_number(), 6)
            self.assertTrue(docs_smoke.branch_before_milestone(7))
            self.assertFalse(docs_smoke.branch_is_milestone(18))

    def test_unknown_branch_with_m20_contract_paths_infers_authorized_m20_context(self) -> None:
        changed_paths = [
            "docs/product/M20_PR3_SOCIALSENSE_SDK_INTEGRATION_BOUNDARY.md",
            "integrations/socialsense/adapter.py",
            "src/product/simulationConfig.ts",
        ]
        with (
            patch.object(docs_smoke, "current_branch_name", return_value="pull/40/merge"),
            patch.object(docs_smoke, "changed_paths_from_main", return_value=changed_paths),
        ):
            self.assertEqual(docs_smoke.current_milestone_number(), 20)
            self.assertTrue(docs_smoke.is_authorized_m20_pr4_context())

    def test_m20_marker_with_unauthorized_runtime_path_is_not_authorized(self) -> None:
        changed_paths = [
            "docs/product/M20_PR3_SOCIALSENSE_SDK_INTEGRATION_BOUNDARY.md",
            "integrations/socialsense/adapter.py",
            "src/product/simulationConfig.ts",
            "backend/runtime.py",
        ]
        with (
            patch.object(docs_smoke, "current_branch_name", return_value="pull/40/merge"),
            patch.object(docs_smoke, "changed_paths_from_main", return_value=changed_paths),
        ):
            self.assertEqual(docs_smoke.current_milestone_number(), 20)
            self.assertFalse(docs_smoke.is_authorized_m20_pr4_context())

    def test_m19_runtime_path_guard_is_not_exempt_without_authorized_m20_context(self) -> None:
        with (
            patch.object(docs_smoke, "current_branch_name", return_value="work"),
            patch.object(docs_smoke, "changed_paths_from_main", return_value=["src/views.tsx"]),
        ):
            self.assertFalse(docs_smoke.is_authorized_m20_pr4_context())


if __name__ == "__main__":
    unittest.main()
