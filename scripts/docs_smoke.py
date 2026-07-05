#!/usr/bin/env python3
"""Smoke check for 3C Marketing Workbench docs and safe vertical slice files."""

from __future__ import annotations

import re
import subprocess
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

REQUIRED_M4_DOCS = [
    "docs/product/INFORMATION_ARCHITECTURE.md",
    "docs/product/NAVIGATION_MODEL.md",
    "docs/product/WORKFLOW_ORGANIZATION.md",
    "docs/product/DESIGN_SYSTEM_REVIEW.md",
    "docs/product/DESIGN_TOKENS.md",
    "docs/product/COMPONENT_REUSE_MATRIX.md",
    "docs/product/EXECUTIVE_UX_REVIEW.md",
]

REQUIRED_M5_DOCS = [
    "docs/product/CAMPAIGN_REFERENCE_WORKFLOW.md",
    "docs/product/COMPONENT_REUSE_AUDIT.md",
]

REQUIRED_M5_PHRASES = [
    "M5 Campaign Message Test",
    "Campaign Message Test",
    "dashboard reuse >80%",
    "component reuse >80%",
    "No backend",
    "No live APIs",
    "Recommended Next Action",
]

REQUIRED_M4_PHRASES = [
    "M4 Information Architecture",
    "Information Architecture",
    "Navigation Model",
    "Workflow Organization",
    "Design System Review",
    "Design Tokens",
    "Component Reuse Matrix",
    "Executive UX Review",
    "no implementation",
    "backend",
    "SocialSense",
    "Campaign Message Test",
]

REQUIRED_M4_DOC_PHRASES = [
    "Status:",
    "Scope:",
    "No",
    "implementation",
]

REQUIRED_M4_README_LINKS = [
    "docs/product/INFORMATION_ARCHITECTURE.md",
    "docs/product/NAVIGATION_MODEL.md",
    "docs/product/WORKFLOW_ORGANIZATION.md",
    "docs/product/DESIGN_SYSTEM_REVIEW.md",
    "docs/product/DESIGN_TOKENS.md",
    "docs/product/COMPONENT_REUSE_MATRIX.md",
    "docs/product/EXECUTIVE_UX_REVIEW.md",
]

M4_FORBIDDEN_IMPLEMENTATION_PATH_PREFIXES = [
    "src/",
    "backend/",
    "server/",
    "api/",
    "auth/",
    "integrations/",
]

M4_ALLOWED_SCRIPT_CHANGES = {
    "scripts/docs_smoke.py",
}

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

EXPECTED_M5_FILES = [
    "scripts/generate_campaign_message_test_fixture.py",
    "src/product/fixtures/campaignMessageTestResult.json",
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


def changed_paths_from_main() -> list[str]:
    try:
        output = subprocess.check_output(
            ["git", "diff", "--name-only", "origin/main...HEAD"],
            cwd=ROOT,
            text=True,
            stderr=subprocess.DEVNULL,
        )
    except (subprocess.CalledProcessError, FileNotFoundError):
        return []
    return [line.strip() for line in output.splitlines() if line.strip()]


def current_branch_name() -> str:
    try:
        return subprocess.check_output(
            ["git", "branch", "--show-current"],
            cwd=ROOT,
            text=True,
            stderr=subprocess.DEVNULL,
        ).strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        return ""


def main() -> None:
    missing_docs = [path for path in REQUIRED_DOCS if not (ROOT / path).is_file()]
    if missing_docs:
        fail("missing required M1 docs: " + ", ".join(missing_docs))

    missing_m4_docs = [path for path in REQUIRED_M4_DOCS if not (ROOT / path).is_file()]
    if missing_m4_docs:
        fail("missing required M4 docs: " + ", ".join(missing_m4_docs))

    missing_m5_docs = [path for path in REQUIRED_M5_DOCS if not (ROOT / path).is_file()]
    if missing_m5_docs:
        fail("missing required M5 docs: " + ", ".join(missing_m5_docs))

    missing_frontend = [path for path in EXPECTED_FRONTEND_FILES if not (ROOT / path).is_file()]
    if missing_frontend:
        fail("missing expected frontend shell files: " + ", ".join(missing_frontend))

    missing_pr3 = [path for path in EXPECTED_PR3_FILES if not (ROOT / path).is_file()]
    if missing_pr3:
        fail("missing expected PR3 adapter files: " + ", ".join(missing_pr3))

    missing_pr4 = [path for path in EXPECTED_PR4_FILES if not (ROOT / path).is_file()]
    if missing_pr4:
        fail("missing expected PR4 vertical slice files: " + ", ".join(missing_pr4))

    missing_m5 = [path for path in EXPECTED_M5_FILES if not (ROOT / path).is_file()]
    if missing_m5:
        fail("missing expected M5 Campaign Message Test files: " + ", ".join(missing_m5))

    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    agents = (ROOT / "AGENTS.md").read_text(encoding="utf-8")
    roadmap = (ROOT / "docs/product/ROADMAP.md").read_text(encoding="utf-8")
    health_dashboard = (ROOT / "docs/product/PRODUCT_HEALTH_DASHBOARD.md").read_text(encoding="utf-8")
    integration_doc = (ROOT / "docs/product/SOCIALSENSE_INTEGRATION.md").read_text(encoding="utf-8")
    adapter = (ROOT / "integrations/socialsense/adapter.py").read_text(encoding="utf-8")
    m4_docs_by_path = {path: (ROOT / path).read_text(encoding="utf-8") for path in REQUIRED_M4_DOCS}
    m4_text = "\n".join(m4_docs_by_path.values())
    m5_docs_by_path = {path: (ROOT / path).read_text(encoding="utf-8") for path in REQUIRED_M5_DOCS}
    m5_text = "\n".join(m5_docs_by_path.values())

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

    combined_m4_text = "\n".join([readme, agents, m4_text])
    missing_m4_phrases = [phrase for phrase in REQUIRED_M4_PHRASES if phrase not in combined_m4_text]
    if missing_m4_phrases:
        fail("M4 docs missing status/scope phrases: " + ", ".join(missing_m4_phrases))

    for path, content in m4_docs_by_path.items():
        missing_doc_phrases = [phrase for phrase in REQUIRED_M4_DOC_PHRASES if phrase not in content]
        if missing_doc_phrases:
            fail(f"{path} missing M4 doc phrases: " + ", ".join(missing_doc_phrases))

    missing_m4_links = [path for path in REQUIRED_M4_README_LINKS if f"]({path})" not in readme]
    if missing_m4_links:
        fail("README missing M4 doc links: " + ", ".join(missing_m4_links))

    missing_m5_links = [path for path in REQUIRED_M5_DOCS if f"]({path})" not in readme]
    if missing_m5_links:
        fail("README missing M5 doc links: " + ", ".join(missing_m5_links))

    combined_m5_text = "\n".join([readme, agents, roadmap, health_dashboard, m5_text])
    missing_m5_phrases = [phrase for phrase in REQUIRED_M5_PHRASES if phrase not in combined_m5_text]
    if missing_m5_phrases:
        fail("M5 docs missing status/reuse phrases: " + ", ".join(missing_m5_phrases))

    for phrase in ["M5 Campaign Message Test", "M4 Information Architecture", "Campaign Message Test"]:
        if phrase not in roadmap:
            fail(f"ROADMAP.md missing M5 freshness phrase: {phrase}")

    for phrase in ["M5 Campaign Message Test", "INFORMATION_ARCHITECTURE.md", "NAVIGATION_MODEL.md", "COMPONENT_REUSE_AUDIT.md", "dashboard reuse >80%", "component reuse >80%"]:
        if phrase not in health_dashboard:
            fail(f"PRODUCT_HEALTH_DASHBOARD.md missing M5 freshness phrase: {phrase}")

    hierarchy_text = "\n".join([m4_text, health_dashboard])
    forbidden_hierarchy_phrases = [
        "under Campaigns, Research, Comparison",
        "Group into Campaigns, Research, Comparison",
        "Home → Comparison → A/B Message Comparison",
        "| Product Feedback | Research → Feedback",
        "| Research Campaign | Research → Research Campaign",
        "| A/B Message Comparison | Comparison |",
    ]
    hierarchy_hits = [phrase for phrase in forbidden_hierarchy_phrases if phrase in hierarchy_text]
    if hierarchy_hits:
        fail("M4 IA hierarchy still treats Research/Comparison as top-level: " + ", ".join(hierarchy_hits))

    changed_paths = changed_paths_from_main()
    m5_files_present = all((ROOT / path).is_file() for path in EXPECTED_M5_FILES)
    m5_paths_changed = any(path in changed_paths for path in ["src/views.tsx", "src/product/fixtures/campaignMessageTestResult.json"])
    if not (m5_files_present and (m5_paths_changed or current_branch_name() == "main")):
        fail("M5 implementation paths are not present in branch diff or merged main")

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

    campaign_fixture = (ROOT / "src/product/fixtures/campaignMessageTestResult.json").read_text(encoding="utf-8")
    for phrase in ["Campaign Message Test", "Synthetic aggregate sample", "Ready for human review"]:
        if phrase not in campaign_fixture:
            fail(f"M5 fixture missing expected UI phrase: {phrase}")

    compiled = [re.compile(pattern, re.IGNORECASE) for pattern in FORBIDDEN_PATH_PATTERNS]
    forbidden_paths = [path for path in iter_repo_paths() if any(pattern.search(path) for pattern in compiled)]
    if forbidden_paths:
        fail("forbidden backend/live/auth/credential files present: " + ", ".join(sorted(forbidden_paths)))

    print("PASS: required M1/PR4 docs exist")
    print("PASS: required M4 IA/design-system docs exist and include status/scope phrases")
    print("PASS: required M5 Campaign Message Test docs exist and include reuse/status phrases")
    print("PASS: README links resolve")
    print("PASS: README and AGENTS include required safety boundaries")
    print("PASS: expected React/Vite/TypeScript frontend shell files exist")
    print("PASS: expected PR3 SocialSense adapter files exist")
    print("PASS: expected PR4 Product Launch vertical slice files exist")
    print("PASS: expected M5 Campaign Message Test files exist")
    print("PASS: adapter uses SocialSense public facade and avoids forbidden internals")
    print("PASS: fixture generator uses PR3 adapter and fixture has PR4 UI contract")
    print("PASS: M5 branch includes Campaign Message Test implementation paths")
    print("PASS: no forbidden backend/live/auth/credential files detected")


if __name__ == "__main__":
    main()
