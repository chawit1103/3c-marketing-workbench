#!/usr/bin/env python3
"""M1 PR4 smoke check for 3C Marketing Workbench docs and safe vertical slice files."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

REQUIRED_DOCS = [
    "docs/product/OLD_MARKETING_SIMULATION_UX_AUDIT.md",
    "docs/product/3C_PRODUCT_PRINCIPLES.md",
    "docs/architecture/PRODUCT_ARCHITECTURE.md",
    "docs/architecture/CROSS_REPOSITORY_DEPENDENCY_MAP.md",
    "docs/product/ROADMAP.md",
    "docs/product/PRODUCT_HEALTH_DASHBOARD.md",
    "docs/product/SOCIALSENSE_INTEGRATION.md",
    "README.md",
    "AGENTS.md",
]

EXPECTED_FRONTEND_FILES = [
    "package.json",
    "package-lock.json",
    "index.html",
    "vite.config.ts",
    "tsconfig.json",
    "tsconfig.app.json",
    "tsconfig.node.json",
    "eslint.config.js",
    "src/main.tsx",
    "src/App.tsx",
    "src/App.test.tsx",
    "src/views.tsx",
    "src/styles.css",
    "src/app/shell/AppShell.tsx",
    "src/app/routes/routeResolver.ts",
    "src/app/routes/routeResolver.test.ts",
    "src/components/product/SafetyLabels.tsx",
    "src/components/product/ObjectiveCard.tsx",
    "src/components/product/PlaceholderResultCard.tsx",
    "src/product/safety/safetyLabels.ts",
    "src/test/setup.ts",
]

EXPECTED_PR3_FILES = [
    "integrations/__init__.py",
    "integrations/socialsense/__init__.py",
    "integrations/socialsense/adapter.py",
    "scripts/socialsense_adapter_smoke.py",
    "tests/test_socialsense_adapter.py",
]

EXPECTED_PR4_FILES = [
    "scripts/generate_product_launch_fixture.py",
    "src/product/fixtures/productLaunchResult.json",
    "tests/test_product_launch_fixture_generator.py",
]

REQUIRED_SAFETY_PHRASES = [
    "live APIs",
    "scraping",
    "credentials",
    "CRM/customer lists",
    "PII",
    "private messages/groups",
    "voter lists",
    "microtargeting",
    "persuasion optimization",
    "conversion guarantees",
    "production campaign claims",
]

REQUIRED_PR3_PHRASES = [
    "M1 PR3",
    "SocialSense public SDK",
    "product-owned adapter",
    "public_sdk_only",
    "product_launch",
    "executive_json",
]

REQUIRED_PR4_PHRASES = [
    "M1 PR4",
    "Product Launch Simulation",
    "generated offline sample",
    "src/product/fixtures/productLaunchResult.json",
    "scripts/generate_product_launch_fixture.py",
]

FORBIDDEN_PATH_PATTERNS = [
    r"^backend(/|$)",
    r"^server(/|$)",
    r"^api(/|$)",
    r"^auth(/|$)",
    r"^credentials?(/|\.|$)",
    r"^secrets?(/|\.|$)",
    r"^\.env(\.|$)",
    r"(^|/)\.env(\.|$)",
    r"(^|/)(api|auth|credential|credentials|secret|secrets|token|tokens)\.(ts|tsx|js|jsx|py|json|yaml|yml|toml)$",
    r"(^|/)(server|backend)\.(ts|tsx|js|jsx|py)$",
    r"(^|/)(fastapi|express)\.(ts|tsx|js|jsx|py)$",
]

FORBIDDEN_ADAPTER_CONTENT = [
    "app.civicsense",
    "socialsense.domain_packs",
    "socialsense.workbench",
    "socialsense.bridge",
    "socialsense.plugins",
    "socialsense.scenarios",
    "api_key",
    "customer_list",
    "voter_list",
]

IGNORED_DIRS = {".git", "node_modules", "dist", "coverage", "__pycache__"}
README_LINK_PATTERN = re.compile(r"\[[^\]]+\]\((?!https?://|mailto:|#)([^)]+)\)")


def fail(message: str) -> None:
    print(f"FAIL: {message}")
    sys.exit(1)


def iter_repo_paths() -> list[str]:
    paths: list[str] = []
    for path in ROOT.rglob("*"):
        rel = path.relative_to(ROOT)
        if any(part in IGNORED_DIRS for part in rel.parts):
            continue
        paths.append(rel.as_posix())
    return paths


def main() -> None:
    missing_docs = [path for path in REQUIRED_DOCS if not (ROOT / path).is_file()]
    if missing_docs:
        fail("missing required M1 docs: " + ", ".join(missing_docs))

    missing_frontend = [path for path in EXPECTED_FRONTEND_FILES if not (ROOT / path).is_file()]
    if missing_frontend:
        fail("missing expected frontend shell files: " + ", ".join(missing_frontend))

    missing_pr3 = [path for path in EXPECTED_PR3_FILES if not (ROOT / path).is_file()]
    if missing_pr3:
        fail("missing expected PR3 adapter files: " + ", ".join(missing_pr3))

    missing_pr4 = [path for path in EXPECTED_PR4_FILES if not (ROOT / path).is_file()]
    if missing_pr4:
        fail("missing expected PR4 vertical slice files: " + ", ".join(missing_pr4))

    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    agents = (ROOT / "AGENTS.md").read_text(encoding="utf-8")
    integration_doc = (ROOT / "docs/product/SOCIALSENSE_INTEGRATION.md").read_text(encoding="utf-8")
    adapter = (ROOT / "integrations/socialsense/adapter.py").read_text(encoding="utf-8")

    unresolved_links: list[str] = []
    for target in README_LINK_PATTERN.findall(readme):
        clean_target = target.split("#", 1)[0]
        if clean_target and not (ROOT / clean_target).exists():
            unresolved_links.append(target)
    if unresolved_links:
        fail("README links do not resolve: " + ", ".join(unresolved_links))

    for doc_name, content in {"README.md": readme, "AGENTS.md": agents}.items():
        missing_phrases = [phrase for phrase in REQUIRED_SAFETY_PHRASES if phrase not in content]
        if missing_phrases:
            fail(f"{doc_name} missing safety phrases: " + ", ".join(missing_phrases))

    combined_pr3_text = "\n".join([readme, agents, integration_doc])
    missing_pr3_phrases = [phrase for phrase in REQUIRED_PR3_PHRASES if phrase not in combined_pr3_text]
    if missing_pr3_phrases:
        fail("PR3 docs missing status phrases: " + ", ".join(missing_pr3_phrases))

    combined_pr4_text = "\n".join([readme, agents, integration_doc])
    missing_pr4_phrases = [phrase for phrase in REQUIRED_PR4_PHRASES if phrase not in combined_pr4_text]
    if missing_pr4_phrases:
        fail("PR4 docs missing status phrases: " + ", ".join(missing_pr4_phrases))

    if "from socialsense import load_domain_pack" not in adapter:
        fail("adapter does not import SocialSense through the public facade")
    forbidden_adapter_hits = [phrase for phrase in FORBIDDEN_ADAPTER_CONTENT if phrase in adapter]
    if forbidden_adapter_hits:
        fail("adapter references forbidden SocialSense/private/live content: " + ", ".join(forbidden_adapter_hits))

    fixture_generator = (ROOT / "scripts/generate_product_launch_fixture.py").read_text(encoding="utf-8")
    if "from integrations.socialsense import export_executive_report, run_product_launch_simulation" not in fixture_generator:
        fail("fixture generator does not use the PR3 product adapter")
    if "from socialsense" in fixture_generator:
        fail("fixture generator must not import SocialSense directly")

    fixture = (ROOT / "src/product/fixtures/productLaunchResult.json").read_text(encoding="utf-8")
    for phrase in ["Product Launch", "Synthetic aggregate sample", "Ready for human review"]:
        if phrase not in fixture:
            fail(f"PR4 fixture missing expected UI phrase: {phrase}")

    compiled = [re.compile(pattern, re.IGNORECASE) for pattern in FORBIDDEN_PATH_PATTERNS]
    forbidden_paths = [path for path in iter_repo_paths() if any(pattern.search(path) for pattern in compiled)]
    if forbidden_paths:
        fail("forbidden backend/live/auth/credential files present: " + ", ".join(sorted(forbidden_paths)))

    print("PASS: required M1/PR4 docs exist")
    print("PASS: README links resolve")
    print("PASS: README and AGENTS include required safety boundaries")
    print("PASS: expected React/Vite/TypeScript frontend shell files exist")
    print("PASS: expected PR3 SocialSense adapter files exist")
    print("PASS: expected PR4 Product Launch vertical slice files exist")
    print("PASS: adapter uses SocialSense public facade and avoids forbidden internals")
    print("PASS: fixture generator uses PR3 adapter and fixture has PR4 UI contract")
    print("PASS: no forbidden backend/live/auth/credential files detected")


if __name__ == "__main__":
    main()
