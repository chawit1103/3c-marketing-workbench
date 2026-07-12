"""Regression tests for the cross-repository public-SDK adapter smoke."""

from __future__ import annotations

import contextlib
import importlib.util
import io
import sys
import unittest
from pathlib import Path
from types import ModuleType
from unittest.mock import patch

from tests.test_socialsense_adapter import install_fake_socialsense

ROOT = Path(__file__).resolve().parents[1]
SMOKE_PATH = ROOT / "scripts" / "socialsense_adapter_smoke.py"


def load_smoke_module() -> ModuleType:
    spec = importlib.util.spec_from_file_location("socialsense_adapter_smoke_under_test", SMOKE_PATH)
    assert spec is not None
    assert spec.loader is not None
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class SocialSenseAdapterSmokeTests(unittest.TestCase):
    def setUp(self) -> None:
        install_fake_socialsense()
        for module_name in [
            "integrations.socialsense.adapter",
            "integrations.socialsense",
            "socialsense_adapter_smoke_under_test",
        ]:
            sys.modules.pop(module_name, None)
        self.smoke = load_smoke_module()

    def test_smoke_fails_when_submitted_configuration_is_not_runtime_consumed(self) -> None:
        product_result = {
            "status": "ok",
            "run_status": "completed",
            "scenario": "product_launch",
            "platform_mix": ["LINE", "TikTok"],
            "exports": {},
            "safety": {},
            "provenance": {},
            "limitations": [],
            "evidence_gaps": [],
            "public_sdk_only": True,
        }
        configuration_only_result = {
            "status": "configuration_only",
            "runtime_status": "configuration_only",
            "runtime_consumed": False,
        }

        with (
            patch.object(self.smoke, "run_product_launch_simulation", return_value=product_result),
            patch.object(self.smoke, "run_submitted_simulation_configuration", return_value=configuration_only_result),
            contextlib.redirect_stdout(io.StringIO()),
            self.assertRaises(SystemExit) as raised,
        ):
            self.smoke.main()

        self.assertNotEqual(raised.exception.code, 0)

    def test_smoke_fails_when_consumption_flags_lack_valid_fixture_contract(self) -> None:
        product_result = {
            "status": "ok",
            "run_status": "completed",
            "scenario": "product_launch",
            "platform_mix": ["LINE", "TikTok"],
            "exports": {},
            "safety": {},
            "provenance": {},
            "limitations": [],
            "evidence_gaps": [],
            "public_sdk_only": True,
        }
        falsely_consumed_result = {
            "status": "configuration_only",
            "runtime_status": "consumed_by_runtime",
            "runtime_consumed": True,
        }

        with (
            patch.object(self.smoke, "run_product_launch_simulation", return_value=product_result),
            patch.object(self.smoke, "run_submitted_simulation_configuration", return_value=falsely_consumed_result),
            contextlib.redirect_stdout(io.StringIO()),
            self.assertRaises(SystemExit) as raised,
        ):
            self.smoke.main()

        self.assertNotEqual(raised.exception.code, 0)

    def test_smoke_fails_when_an_otherwise_valid_contract_omits_completion_status(self) -> None:
        product_result = {
            "status": "ok",
            "run_status": "completed",
            "scenario": "product_launch",
            "platform_mix": ["LINE", "TikTok"],
            "exports": {},
            "safety": {},
            "provenance": {},
            "limitations": [],
            "evidence_gaps": [],
            "public_sdk_only": True,
        }
        consumed_result_without_completion = {
            "status": "ok",
            "runtime_status": "consumed_by_runtime",
            "runtime_consumed": True,
            "runtime_contract": {
                "simulation_profile": "product_launch",
                "selected_platforms": ["Facebook", "LINE", "X"],
                "per_platform_participant_allocation": {"Facebook": 80, "LINE": 120, "X": 150},
                "total_synthetic_participants": 350,
                "evidence_depth": "standard",
                "evidence_tier": "fixture_offline_aggregate_only",
                "confidence": {"level": "not_calibrated"},
            },
            "provenance": {
                "fixture_only": True,
                "live_api_access": False,
                "credentials_required": False,
            },
        }

        with (
            patch.object(self.smoke, "run_product_launch_simulation", return_value=product_result),
            patch.object(
                self.smoke,
                "run_submitted_simulation_configuration",
                return_value=consumed_result_without_completion,
            ),
            contextlib.redirect_stdout(io.StringIO()),
            self.assertRaises(SystemExit) as raised,
        ):
            self.smoke.main()

        self.assertNotEqual(raised.exception.code, 0)


if __name__ == "__main__":
    unittest.main()
