"""Tests for the M15 Creative Comparison fixture generator."""

from __future__ import annotations

import ast
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GENERATOR_PATH = ROOT / "scripts" / "generate_creative_comparison_fixture.py"
FIXTURE_PATH = ROOT / "src" / "product" / "fixtures" / "creativeComparisonResult.json"


class CreativeComparisonFixtureGeneratorTests(unittest.TestCase):
    def test_generator_uses_existing_public_adapter_message_comparison_path(self) -> None:
        self.assertTrue(GENERATOR_PATH.is_file(), "M15 generator must exist")
        source = GENERATOR_PATH.read_text(encoding="utf-8")
        tree = ast.parse(source)
        import_from_modules = [node.module for node in ast.walk(tree) if isinstance(node, ast.ImportFrom)]

        self.assertIn("integrations.socialsense", import_from_modules)
        self.assertIn("run_message_comparison", source)
        self.assertIn("export_executive_report", source)
        self.assertNotIn("from socialsense", source)
        self.assertNotIn("socialsense.domain_packs", source)
        self.assertNotIn("app.civicsense", source)

    def test_fixture_has_m15_creative_comparison_contract_and_safety_status(self) -> None:
        self.assertTrue(FIXTURE_PATH.is_file(), "Run scripts/generate_creative_comparison_fixture.py before tests")
        fixture = json.loads(FIXTURE_PATH.read_text(encoding="utf-8"))

        self.assertEqual(fixture["schemaVersion"], "m15-creative-comparison-ui-v1")
        self.assertEqual(fixture["objective"], "Creative Comparison")
        self.assertEqual(fixture["runId"], "3c-m15-creative-comparison-reference-workflow")
        self.assertEqual(fixture["sourceChecks"]["publicAdapterOnly"], True)
        self.assertEqual(fixture["sourceChecks"]["adapterFunction"], "run_message_comparison")
        self.assertEqual(fixture["sourceChecks"]["offlineExecution"], True)
        self.assertEqual(fixture["sourceChecks"]["liveApiAccess"], False)
        self.assertEqual(fixture["sourceChecks"]["credentialsRequired"], False)
        self.assertEqual(fixture["sourceChecks"]["productionReady"], False)
        self.assertEqual([item["label"] for item in fixture["exports"]["formats"]], ["JSON", "Markdown", "Executive Summary"])
        self.assertEqual(len(fixture["creativeSummaries"]), 2)
        self.assertEqual(len(fixture["comparisonDashboard"]), 8)
        self.assertIn("No live APIs or credentials", fixture["safetyLabels"])
        self.assertIn("No winner selected", fixture["comparisonMethod"]["decisionStatus"])
        self.assertIn("inconclusive", fixture["comparisonMethod"]["rationale"].lower())
        self.assertIn("closest existing marketing/experiment path", fixture["reviewMetadata"]["limitations"][-1])
        self.assertNotIn("message_theme", "\n".join(fixture["reviewMetadata"]["assumptions"]))


if __name__ == "__main__":
    unittest.main()
