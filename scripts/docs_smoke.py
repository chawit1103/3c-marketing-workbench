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

REQUIRED_M6_DOCS = [
    "docs/product/EXPERIMENT_DOMAIN_ANALYSIS.md",
    "docs/product/EXPERIMENT_TAXONOMY.md",
    "docs/product/EXPERIMENT_DATA_MODEL.md",
    "docs/product/EXPERIMENT_WORKFLOW_MAPPING.md",
    "docs/product/EXPERIMENT_CONSUMER_MAPPING.md",
    "docs/product/EXPERIMENT_WORKFLOW_COMPATIBILITY.md",
]

REQUIRED_M8_DOCS = [
    "docs/product/MARKETING_JOURNEY_ANALYSIS.md",
    "docs/product/MARKETING_JOURNEY_MODEL.md",
    "docs/product/JOURNEY_WORKFLOW_MAPPING.md",
    "docs/product/WORKSPACE_MODEL.md",
    "docs/product/EXECUTIVE_JOURNEY.md",
    "docs/product/FUTURE_WORKFLOW_PLACEMENT.md",
]

REQUIRED_M9_DOCS = [
    "docs/product/CAMPAIGN_WORKSPACE_ANALYSIS.md",
    "docs/product/CAMPAIGN_WORKSPACE_MODEL.md",
    "docs/product/CAMPAIGN_WORKSPACE_NAVIGATION.md",
    "docs/product/CAMPAIGN_WORKSPACE_DASHBOARD.md",
    "docs/product/CAMPAIGN_WORKSPACE_JOURNEY.md",
    "docs/product/CAMPAIGN_EXECUTIVE_WORKSPACE.md",
    "docs/product/CAMPAIGN_WORKSPACE_PLACEMENT.md",
]

REQUIRED_M9_PHRASES = [
    "M9 Campaign Workspace Foundation",
    "Campaign Workspace",
    "Campaign",
    "Journey",
    "Runs",
    "Reports",
    "Exports",
    "History",
    "Templates",
    "Evidence",
    "Recommendations",
    "Creative Comparison",
    "No Architecture Gate",
]

REQUIRED_M9_DOC_PHRASES = [
    "Status:",
    "Scope:",
    "does not implement",
]

M9_ALLOWED_CHANGED_PATHS = {"README.md", "AGENTS.md", "scripts/docs_smoke.py"}

M10_ALLOWED_CHANGED_PATHS = {
    "README.md",
    "AGENTS.md",
    "scripts/docs_smoke.py",
    "docs/product/ROADMAP.md",
    "docs/product/PRODUCT_HEALTH_DASHBOARD.md",
    "src/App.tsx",
    "src/App.test.tsx",
    "src/app/routes/routeResolver.ts",
    "src/app/routes/routeResolver.test.ts",
    "src/views.tsx",
    "src/styles.css",
}

REQUIRED_M11_DOCS = [
    "docs/product/M11_PRODUCT_VALIDATION_REPORT.md",
    "docs/product/M11_PERSONA_EVIDENCE.md",
    "docs/product/M11_UX_FRICTION_REGISTER.md",
    "docs/product/M11_PRODUCT_BACKLOG.md",
    "docs/product/M11_EXECUTIVE_PRODUCT_REVIEW.md",
]

REQUIRED_M11_PHRASES = [
    "M11 Continuous Product Validation",
    "Synthetic Dogfooding",
    "Product Launch",
    "Campaign Message Test",
    "A/B Experiment",
    "Campaign Workspace",
    "Product Health Score",
    "UX Friction Register",
    "Product Backlog",
    "Executive Product Review",
    "Creative Comparison",
    "Architecture Gate",
]

REQUIRED_M11_DOC_PHRASES = [
    "Status:",
    "Scope:",
]

M11_ALLOWED_CHANGED_PATHS = {
    "README.md",
    "AGENTS.md",
    "scripts/docs_smoke.py",
    "docs/product/ROADMAP.md",
    "docs/product/PRODUCT_HEALTH_DASHBOARD.md",
    *REQUIRED_M11_DOCS,
}

M11_FORBIDDEN_CHANGED_PREFIXES = (
    "src/",
    "backend/",
    "server/",
    "api/",
    "auth/",
    "integrations/",
)

REQUIRED_M16_DOCS = [
    "docs/product/FEATURE_FREEZE_V0_1.md",
    "docs/product/DEMO_SCRIPT_5_MIN.md",
    "docs/product/DEMO_WORKSPACE.md",
    "docs/product/HUMAN_DOGFOODING_PLAN.md",
    "docs/product/FEEDBACK_CAPTURE_TEMPLATE.md",
    "docs/product/RELEASE_CANDIDATE_CHECKLIST.md",
]

M16_ALLOWED_CHANGED_PATHS = {
    "README.md",
    "AGENTS.md",
    "scripts/docs_smoke.py",
    "docs/product/ROADMAP.md",
    "docs/product/PRODUCT_HEALTH_DASHBOARD.md",
    *REQUIRED_M16_DOCS,
}

REQUIRED_M16_PHRASES = [
    "Feature Freeze v0.1",
    "Product Launch",
    "Campaign Message Test",
    "A/B Experiment",
    "Creative Comparison",
    "Campaign Workspace",
    "Executive Summary",
    "Export Readiness Preview",
    "Safety Labels",
    "Frozen workflows",
    "Allowed changes",
    "Blocked changes",
    "Release scope",
    "Rollback expectations",
    "5-Minute Executive Demo Script",
    "Demo Workspace",
    "Human Dogfooding Plan",
    "Feedback Capture Template",
    "Release Candidate Readiness Checklist",
    "Time to first result",
    "Confusion points",
    "Trust concerns",
    "Safety label comprehension",
    "Dashboard readability",
    "Executive usefulness",
    "Export usefulness",
    "Missing capabilities",
    "Willingness to use again",
    "Demo readiness",
    "Executive readability",
    "Human dogfooding readiness",
    "Feature freeze compliance",
    "Trust readiness",
    "Export readiness",
    "Known blockers",
    "Release candidate readiness",
    "No new workflow",
    "Architecture Gate: Not triggered",
]

REQUIRED_M17_DOCS = [
    "docs/product/EXECUTIVE_EXPERIENCE_PROGRAM.md",
    "docs/product/M17_EXECUTIVE_DASHBOARD_PLAN.md",
]

M17_ALLOWED_CHANGED_PATHS = {
    "README.md",
    "AGENTS.md",
    "scripts/docs_smoke.py",
    "docs/product/ROADMAP.md",
    "docs/product/PRODUCT_HEALTH_DASHBOARD.md",
    *REQUIRED_M17_DOCS,
}

M17_PR2_ALLOWED_CHANGED_PATHS = {
    *M17_ALLOWED_CHANGED_PATHS,
    "src/views.tsx",
    "src/styles.css",
    "src/App.test.tsx",
}

REQUIRED_M17_PR2_PHRASES = [
    "executive KPI dashboard",
    "Overall Campaign Score",
    "Message Acceptance",
    "Brand Perception",
    "Audience Engagement",
    "Synthetic Purchase Intent",
    "Evidence Coverage",
    "Review Readiness",
    "Confidence",
    "Risk Level",
    "Recommendation",
    "Formula:",
    "Evidence tier: E1 synthetic/offline fixture",
    "Platform comparison",
    "Audience comparison",
    "Journey progress",
    "synthetic",
    "offline",
    "not live social",
]

REQUIRED_M17_PHRASES = [
    "Executive Experience & Marketing Simulation Enhancement",
    "M17 Executive Dashboard & Reporting",
    "M18 Thai-first Internationalization",
    "M19 Synthetic Social Platform Engagement Simulation",
    "architecture freeze",
    "epics/features/tasks/PR order",
    "business, consumer, and executive value",
    "PR sequencing",
    "Architecture Gate triggers",
    "safety boundaries",
    "validation and review gates",
    "M17 PR2+ implementation was explicitly future work",
    "not delivered in this PR",
    "docs/smoke only",
    "no source UI/runtime changes",
    "Measurable KPI framework",
    "Evidence/confidence methodology",
    "M19 PR3 implementation gate",
]

REQUIRED_M17_PROGRAM_KPIS = [
    "Product Health",
    "UX Health",
    "Executive Readiness",
    "Dashboard Quality",
    "Report Quality",
    "I18N Readiness",
    "Simulation Readiness",
    "Trust",
    "Transparency",
    "Release Readiness",
]

REQUIRED_M17_ARCHITECTURE_GATE_TRIGGERS = [
    "SocialSense redesign/API change",
    "workspace/workflow/IA/design-system redesign",
    "backend",
    "persistence",
    "auth",
    "external services",
    "live APIs",
]

REQUIRED_M17_QUALITY_GATES = [
    "QA Review",
    "Code Review",
    "Safety Review",
    "Product Review",
    "UX Review",
    "Research Review",
]

REQUIRED_M15_FILES = [
    "src/product/fixtures/creativeComparisonResult.json",
    "scripts/generate_creative_comparison_fixture.py",
    "tests/test_creative_comparison_fixture_generator.py",
    "docs/product/M15_CREATIVE_COMPARISON_CLOSEOUT_REPORT.md",
]

M15_ALLOWED_CHANGED_PATHS = {
    "README.md",
    "AGENTS.md",
    "scripts/docs_smoke.py",
    "docs/product/ROADMAP.md",
    "docs/product/PRODUCT_HEALTH_DASHBOARD.md",
    "docs/product/M15_CREATIVE_COMPARISON_CLOSEOUT_REPORT.md",
    "src/App.tsx",
    "src/App.test.tsx",
    "src/views.tsx",
    "src/app/routes/routeResolver.ts",
    "src/app/routes/routeResolver.test.ts",
    "src/product/fixtures/creativeComparisonResult.json",
    "scripts/generate_creative_comparison_fixture.py",
    "tests/test_creative_comparison_fixture_generator.py",
}

REQUIRED_M15_PHRASES = [
    "M15 Creative Comparison Vertical Slice",
    "/workbench/creative-comparison",
    "Creative Comparison Dashboard",
    "Creative A summary",
    "Creative B summary",
    "Comparison highlights",
    "Differentiators",
    "Audience fit",
    "Brand fit",
    "Message clarity",
    "Risk / caveats",
    "Evidence notes",
    "Recommended next action",
    "No winner selected",
    "Workflow reuse %",
    "Component reuse %",
    "Dashboard reuse %",
    "Export reuse %",
    "Navigation changes",
    "SocialSense changes",
    "Backend endpoints",
    "Architecture Gate: Not triggered",
]

REQUIRED_M14_DOCS = [
    "docs/product/M14_CREATIVE_COMPARISON_DISCOVERY.md",
    "docs/product/M14_CREATIVE_COMPARISON_USER_STORIES.md",
    "docs/product/M14_CREATIVE_COMPARISON_UX_FLOW.md",
    "docs/product/M14_CREATIVE_COMPARISON_INFORMATION_ARCHITECTURE.md",
    "docs/product/M14_CREATIVE_COMPARISON_ACCEPTANCE_CRITERIA.md",
    "docs/product/M14_CREATIVE_COMPARISON_IMPLEMENTATION_PLAN.md",
]

M14_ALLOWED_CHANGED_PATHS = {
    "README.md",
    "AGENTS.md",
    "scripts/docs_smoke.py",
    "docs/product/ROADMAP.md",
    "docs/product/PRODUCT_HEALTH_DASHBOARD.md",
    *REQUIRED_M14_DOCS,
}

REQUIRED_M14_PHRASES = [
    "M14 Creative Comparison",
    "documentation/discovery only",
    "Problem Statement",
    "Goals",
    "Non-goals",
    "Personas",
    "User Journey",
    "UX Flow",
    "Navigation Flow",
    "Information Architecture",
    "Screen Inventory",
    "Conceptual Data Model",
    "Comparison Dimensions",
    "Trust Boundaries",
    "Transparency Rules",
    "Research Constraints",
    "Fixture Requirements",
    "Error States",
    "Empty States",
    "Accessibility Notes",
    "Success Metrics",
    "Acceptance Criteria",
    "Future API considerations",
    "Future persistence considerations",
    "No Creative Comparison implementation",
]

M13_ALLOWED_CHANGED_PATHS = {
    "README.md",
    "AGENTS.md",
    "scripts/docs_smoke.py",
    "docs/product/ROADMAP.md",
    "docs/product/PRODUCT_HEALTH_DASHBOARD.md",
    "docs/product/M13_PRODUCT_TRUST_READINESS_GATE.md",
}

REQUIRED_M13_PHRASES = [
    "M13 Product Trust Readiness",
    "Product Trust",
    "UX Clarity",
    "Research Transparency",
    "Regression Stability",
    "Creative Comparison Planning",
    "GO — planning only",
    "Do not implement Creative Comparison",
    "no new capability",
    "No live execution",
    "Run unavailable",
    "Export unavailable",
]

M12_ALLOWED_CHANGED_PATHS = {
    "README.md",
    "AGENTS.md",
    "scripts/docs_smoke.py",
    "docs/product/ROADMAP.md",
    "docs/product/PRODUCT_HEALTH_DASHBOARD.md",
    "docs/product/M11_EXECUTIVE_PRODUCT_REVIEW.md",
    "docs/product/M12_TRUST_VALIDATION_REPORT.md",
    "src/App.test.tsx",
    "src/views.tsx",
}

REQUIRED_M12_PHRASES = [
    "M12 Campaign Workspace Trust & Validation",
    "Product Health 7.4 baseline",
    "UX Health",
    "Trust Score",
    "Transparency Score",
    "Validation Score",
    "Dashboard Clarity",
    "Overall Readiness",
    "Engineering KPI",
    "Run unavailable",
    "Export unavailable",
    "Fixture transparency",
    "Reference Fixture",
    "User Review Session",
    "No live execution",
    "No Architecture Gate",
]

REQUIRED_M10_PHRASES = [
    "M10 Campaign Workspace MVP",
    "/campaign-workspace",
    "Campaign Overview",
    "Current Journey Stage",
    "Recent Runs",
    "Evidence Summary",
    "Executive Summary",
    "Recommended Next Action",
    "Available Workflow Actions",
]

REQUIRED_M8_PHRASES = [
    "M8 Marketing Journey Framework",
    "Marketing Journey",
    "Idea",
    "Campaign Definition",
    "Campaign Message Test",
    "A/B Experiment",
    "Executive Decision",
    "Export / Handoff",
    "Creative Comparison",
    "No Architecture Gate",
]

REQUIRED_M8_DOC_PHRASES = [
    "Status:",
    "Scope:",
    "does not implement",
]

M8_ALLOWED_CHANGED_PATHS = {"README.md", "AGENTS.md", "scripts/docs_smoke.py"}

REQUIRED_M6_PHRASES = [
    "M6 Experiment Framework",
    "Experiment Framework",
    "A/B Message Comparison",
    "Multivariate Testing",
    "No backend",
    "No live APIs",
    "No Architecture Gate",
]

M6_ALLOWED_CHANGED_PATHS = {"README.md", "AGENTS.md", "scripts/docs_smoke.py"}

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

EXPECTED_M7_FILES = [
    "scripts/generate_ab_experiment_fixture.py",
    "src/product/fixtures/abExperimentResult.json",
    "docs/product/AB_EXPERIMENT_REUSE_AUDIT.md",
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
    paths: set[str] = set()
    commands = [
        ["git", "diff", "--name-only", "origin/main...HEAD"],
        ["git", "diff", "--name-only", "--cached"],
        ["git", "diff", "--name-only"],
    ]
    for command in commands:
        try:
            output = subprocess.check_output(
                command,
                cwd=ROOT,
                text=True,
                stderr=subprocess.DEVNULL,
            )
        except (subprocess.CalledProcessError, FileNotFoundError):
            continue
        paths.update(line.strip() for line in output.splitlines() if line.strip())
    return sorted(paths)


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


def current_milestone_number() -> int | None:
    match = re.match(r"m(\d+)-", current_branch_name())
    return int(match.group(1)) if match else None


def branch_at_or_after(milestone: int) -> bool:
    current = current_milestone_number()
    return current is not None and current >= milestone


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

    missing_m6_docs = [path for path in REQUIRED_M6_DOCS if not (ROOT / path).is_file()]
    if missing_m6_docs:
        fail("missing required M6 docs: " + ", ".join(missing_m6_docs))

    missing_m8_docs = [path for path in REQUIRED_M8_DOCS if not (ROOT / path).is_file()]
    if missing_m8_docs:
        fail("missing required M8 docs: " + ", ".join(missing_m8_docs))

    missing_m9_docs = [path for path in REQUIRED_M9_DOCS if not (ROOT / path).is_file()]
    if missing_m9_docs:
        fail("missing required M9 docs: " + ", ".join(missing_m9_docs))

    missing_m11_docs = [path for path in REQUIRED_M11_DOCS if not (ROOT / path).is_file()]
    if missing_m11_docs:
        fail("missing required M11 docs: " + ", ".join(missing_m11_docs))

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

    missing_m7 = [path for path in EXPECTED_M7_FILES if not (ROOT / path).is_file()]
    if missing_m7:
        fail("missing expected M7 A/B Experiment files: " + ", ".join(missing_m7))

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
    m6_docs_by_path = {path: (ROOT / path).read_text(encoding="utf-8") for path in REQUIRED_M6_DOCS}
    m6_text = "\n".join(m6_docs_by_path.values())
    m8_docs_by_path = {path: (ROOT / path).read_text(encoding="utf-8") for path in REQUIRED_M8_DOCS}
    m8_text = "\n".join(m8_docs_by_path.values())
    m9_docs_by_path = {path: (ROOT / path).read_text(encoding="utf-8") for path in REQUIRED_M9_DOCS}
    m9_text = "\n".join(m9_docs_by_path.values())
    m11_docs_by_path = {path: (ROOT / path).read_text(encoding="utf-8") for path in REQUIRED_M11_DOCS}
    m11_text = "\n".join(m11_docs_by_path.values())
    m17_docs_by_path = {
        path: (ROOT / path).read_text(encoding="utf-8")
        for path in REQUIRED_M17_DOCS
        if (ROOT / path).is_file()
    }
    m17_text = "\n".join(m17_docs_by_path.values())

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

    missing_m6_links = [path for path in REQUIRED_M6_DOCS if f"]({path})" not in readme]
    if missing_m6_links:
        fail("README missing M6 doc links: " + ", ".join(missing_m6_links))

    missing_m8_links = [path for path in REQUIRED_M8_DOCS if f"]({path})" not in readme]
    if missing_m8_links:
        fail("README missing M8 doc links: " + ", ".join(missing_m8_links))

    missing_m9_links = [path for path in REQUIRED_M9_DOCS if f"]({path})" not in readme]
    if missing_m9_links:
        fail("README missing M9 doc links: " + ", ".join(missing_m9_links))

    missing_m11_links = [path for path in REQUIRED_M11_DOCS if f"]({path})" not in readme]
    if missing_m11_links:
        fail("README missing M11 doc links: " + ", ".join(missing_m11_links))

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

    combined_m6_text = "\n".join([readme, agents, roadmap, health_dashboard, m6_text])
    missing_m6_phrases = [phrase for phrase in REQUIRED_M6_PHRASES if phrase not in combined_m6_text]
    if missing_m6_phrases:
        fail("M6 docs missing framework/scope phrases: " + ", ".join(missing_m6_phrases))

    for path, content in m6_docs_by_path.items():
        for phrase in ["Status:", "Scope:", "does not implement"]:
            if phrase not in content:
                fail(f"{path} missing M6 scope phrase: {phrase}")

    for phrase in ["M6 Experiment Framework", "A/B Message Comparison implementation only after M6", "Multivariate Testing", "SocialSense runtime changes"]:
        if phrase not in roadmap + health_dashboard + readme:
            fail(f"M6 current-state docs missing phrase: {phrase}")

    changed_paths = changed_paths_from_main()
    m6_context_active = any(path in changed_paths for path in REQUIRED_M6_DOCS) or "M6 Experiment Framework" in "\n".join([readme, agents, roadmap, health_dashboard])
    if m6_context_active and not branch_at_or_after(7):
        if current_branch_name() != "main" and not changed_paths:
            fail("M6 planning changed-path guard could not compare against origin/main")
        non_docs = [path for path in changed_paths if not (path in M6_ALLOWED_CHANGED_PATHS or path.startswith("docs/product/"))]
        if non_docs:
            fail("M6 planning changed forbidden runtime/frontend/backend paths: " + ", ".join(non_docs))

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
    if not (m5_files_present and (m5_paths_changed or current_branch_name() == "main" or branch_at_or_after(6))):
        fail("M5 implementation paths are not present in branch diff or merged main")

    if "from socialsense import load_domain_pack" not in adapter:
        fail("adapter does not import SocialSense through the public facade")
    forbidden_adapter_hits = [phrase for phrase in FORBIDDEN_ADAPTER_CONTENT if phrase in adapter]
    if forbidden_adapter_hits:
        fail("adapter references forbidden SocialSense/private/live content: " + ", ".join(forbidden_adapter_hits))

    fixture_generator = (ROOT / "scripts/generate_product_launch_fixture.py").read_text(encoding="utf-8")
    if "from integrations.socialsense import export_executive_report, run_product_launch_simulation" not in fixture_generator:
        fail("Product Launch fixture generator does not use the PR3 product adapter")
    if "from socialsense" in fixture_generator:
        fail("Product Launch fixture generator must not import SocialSense directly")

    campaign_fixture_generator = (ROOT / "scripts/generate_campaign_message_test_fixture.py").read_text(encoding="utf-8")
    if "from integrations.socialsense import export_executive_report, run_campaign_message_test" not in campaign_fixture_generator:
        fail("Campaign Message Test fixture generator does not use the PR3 product adapter")
    if "from socialsense" in campaign_fixture_generator:
        fail("Campaign Message Test fixture generator must not import SocialSense directly")
    forbidden_campaign_generator_hits = [phrase for phrase in FORBIDDEN_ADAPTER_CONTENT if phrase in campaign_fixture_generator]
    if forbidden_campaign_generator_hits:
        fail("Campaign Message Test fixture generator references forbidden SocialSense/private/live content: " + ", ".join(forbidden_campaign_generator_hits))

    fixture = (ROOT / "src/product/fixtures/productLaunchResult.json").read_text(encoding="utf-8")
    for phrase in ["Product Launch", "Synthetic aggregate sample", "Ready for human review"]:
        if phrase not in fixture:
            fail(f"PR4 fixture missing expected UI phrase: {phrase}")

    campaign_fixture = (ROOT / "src/product/fixtures/campaignMessageTestResult.json").read_text(encoding="utf-8")
    for phrase in ["Campaign Message Test", "Synthetic aggregate sample", "Ready for human review"]:
        if phrase not in campaign_fixture:
            fail(f"M5 fixture missing expected UI phrase: {phrase}")

    ab_generator = (ROOT / "scripts/generate_ab_experiment_fixture.py").read_text(encoding="utf-8")
    if "from integrations.socialsense import export_executive_report, run_message_comparison" not in ab_generator:
        fail("A/B Experiment fixture generator does not use the product adapter run_message_comparison")
    if "from socialsense" in ab_generator:
        fail("A/B Experiment fixture generator must not import SocialSense directly")
    ab_fixture = (ROOT / "src/product/fixtures/abExperimentResult.json").read_text(encoding="utf-8")
    for phrase in ["A/B Experiment", "Synthetic aggregate sample", "Ready for human review", "run_message_comparison"]:
        if phrase not in ab_fixture:
            fail(f"M7 fixture missing expected UI phrase: {phrase}")
    ab_audit = (ROOT / "docs/product/AB_EXPERIMENT_REUSE_AUDIT.md").read_text(encoding="utf-8")
    for phrase in ["workflow reuse: 92%", "component reuse: 93%", "dashboard reuse: 91%", "export reuse: 100%", "navigation: unchanged"]:
        if phrase not in ab_audit:
            fail(f"M7 reuse audit missing required threshold phrase: {phrase}")
    for phrase in ["M7 A/B Experiment", "A/B Experiment", "abExperimentResult.json", "run_message_comparison"]:
        if phrase not in "\n".join([readme, agents, roadmap, health_dashboard, ab_audit]):
            fail(f"M7 freshness docs missing phrase: {phrase}")

    combined_m8_text = "\n".join([readme, agents, roadmap, health_dashboard, m8_text])
    missing_m8_phrases = [phrase for phrase in REQUIRED_M8_PHRASES if phrase not in combined_m8_text]
    if missing_m8_phrases:
        fail("M8 docs missing journey/scope phrases: " + ", ".join(missing_m8_phrases))
    for path, content in m8_docs_by_path.items():
        missing_doc_phrases = [phrase for phrase in REQUIRED_M8_DOC_PHRASES if phrase not in content]
        if missing_doc_phrases:
            fail(f"{path} missing M8 scope phrase: " + ", ".join(missing_doc_phrases))
    if not (branch_at_or_after(9) or "M9 Campaign Workspace Foundation" in "\n".join([readme, agents, roadmap, health_dashboard])):
        for phrase in ["Marketing Journey", "Workspace", "Executive Journey", "Future Workflow Placement", "Creative Comparison only if M8"]:
            if phrase not in combined_m8_text:
                fail(f"M8 current-state docs missing phrase: {phrase}")
    for stale_phrase in ["current M6 non-goals", "Before M6 handoff", "0 in M6", "before any A/B implementation"]:
        if stale_phrase in "\n".join([readme, health_dashboard]):
            fail(f"M8 current-state docs contain stale phrase: {stale_phrase}")
    if not (branch_at_or_after(9) or "M9 Campaign Workspace Foundation" in "\n".join([readme, agents, roadmap, health_dashboard])):
        for phrase in ["M8 review gates", "Before M8 handoff", "Marketing Journey Framework remains documentation-only"]:
            if phrase not in readme:
                fail(f"README missing M8 review gate phrase: {phrase}")
    for path in REQUIRED_M8_DOCS:
        for linked_path in REQUIRED_M8_DOCS:
            linked_name = Path(linked_path).name
            if linked_name not in (ROOT / path).read_text(encoding="utf-8"):
                fail(f"{path} missing M8 companion link to {linked_name}")
    m8_context_active = any(path in changed_paths for path in REQUIRED_M8_DOCS) or "M8 Marketing Journey Framework" in combined_m8_text
    if m8_context_active and not branch_at_or_after(9):
        if current_branch_name() != "main" and not changed_paths:
            fail("M8 planning changed-path guard could not compare against origin/main")
        non_docs = [path for path in changed_paths if not (path in M8_ALLOWED_CHANGED_PATHS or path.startswith("docs/product/"))]
        if non_docs:
            fail("M8 planning changed forbidden runtime/frontend/backend paths: " + ", ".join(non_docs))

    combined_m9_text = "\n".join([readme, agents, roadmap, health_dashboard, m9_text])
    missing_m9_phrases = [phrase for phrase in REQUIRED_M9_PHRASES if phrase not in combined_m9_text]
    if missing_m9_phrases:
        fail("M9 docs missing workspace/scope phrases: " + ", ".join(missing_m9_phrases))
    for path, content in m9_docs_by_path.items():
        missing_doc_phrases = [phrase for phrase in REQUIRED_M9_DOC_PHRASES if phrase not in content]
        if missing_doc_phrases:
            fail(f"{path} missing M9 scope phrase: " + ", ".join(missing_doc_phrases))
    if not (branch_at_or_after(10) or "M10 Campaign Workspace MVP" in "\n".join([readme, agents, roadmap, health_dashboard])):
        for phrase in ["Campaign Workspace", "Workspace model", "Workspace navigation", "Workspace dashboard", "Executive Workspace", "Creative Comparison only if M9"]:
            if phrase not in combined_m9_text:
                fail(f"M9 current-state docs missing phrase: {phrase}")
    for stale_phrase in ["current M8 non-goals", "Before M8 handoff", "0 in M8", "Creative Comparison only if M8", "after M8 GO", "M8 docs validation", "M8 docs smoke"]:
        if stale_phrase in "\n".join([readme, health_dashboard, roadmap]):
            fail(f"M9 current-state docs contain stale phrase: {stale_phrase}")
    if not current_branch_name().startswith("m10-"):
        if not (branch_at_or_after(10) or "M10 Campaign Workspace MVP" in "\n".join([readme, agents, roadmap, health_dashboard])):
            for phrase in ["M9 review gates", "Before M9 handoff", "Campaign Workspace Foundation remains documentation-only"]:
                if phrase not in readme:
                    fail(f"README missing M9 review gate phrase: {phrase}")
    for path in REQUIRED_M9_DOCS:
        for linked_path in REQUIRED_M9_DOCS:
            linked_name = Path(linked_path).name
            if linked_name not in (ROOT / path).read_text(encoding="utf-8"):
                fail(f"{path} missing M9 companion link to {linked_name}")
    m9_context_active = any(path in changed_paths for path in REQUIRED_M9_DOCS) or "M9 Campaign Workspace Foundation" in combined_m9_text
    if m9_context_active and not branch_at_or_after(10):
        if current_branch_name() != "main" and not changed_paths:
            fail("M9 planning changed-path guard could not compare against origin/main")
        non_docs = [path for path in changed_paths if not (path in M9_ALLOWED_CHANGED_PATHS or path.startswith("docs/product/"))]
        if non_docs:
            fail("M9 planning changed forbidden runtime/frontend/backend paths: " + ", ".join(non_docs))



    if current_branch_name().startswith("m10-") or "M10 Campaign Workspace MVP" in "\n".join([readme, agents, roadmap, health_dashboard]):
        src_text = "\n".join(
            [
                (ROOT / "src/App.tsx").read_text(encoding="utf-8"),
                (ROOT / "src/app/routes/routeResolver.ts").read_text(encoding="utf-8"),
                (ROOT / "src/views.tsx").read_text(encoding="utf-8"),
                (ROOT / "src/App.test.tsx").read_text(encoding="utf-8"),
                (ROOT / "src/app/routes/routeResolver.test.ts").read_text(encoding="utf-8"),
            ]
        )
        combined_m10_text = "\n".join([readme, agents, roadmap, health_dashboard, src_text])
        missing_m10_phrases = [phrase for phrase in REQUIRED_M10_PHRASES if phrase not in combined_m10_text]
        if missing_m10_phrases:
            fail("M10 docs/source missing Campaign Workspace MVP phrases: " + ", ".join(missing_m10_phrases))
        if "campaignWorkspace" not in src_text or "CampaignWorkspaceView" not in src_text:
            fail("M10 source missing campaignWorkspace route wiring")
        if current_branch_name().startswith("m10-") and "Creative Comparison" in (ROOT / "src/views.tsx").read_text(encoding="utf-8"):
            fail("M10 visible workspace source must not include Creative Comparison")
        if current_branch_name().startswith("m10-") and not changed_paths:
            fail("M10 changed-path guard could not compare against origin/main")
        forbidden_m10_changes = [path for path in changed_paths if path not in M10_ALLOWED_CHANGED_PATHS] if current_branch_name().startswith("m10-") else []
        if forbidden_m10_changes:
            fail("M10 changed unexpected paths: " + ", ".join(forbidden_m10_changes))

    if current_branch_name().startswith("m11-") or "M11 Continuous Product Validation" in "\n".join([readme, agents, roadmap, health_dashboard, m11_text]):
        combined_m11_text = "\n".join([readme, agents, roadmap, health_dashboard, m11_text])
        missing_m11_phrases = [phrase for phrase in REQUIRED_M11_PHRASES if phrase not in combined_m11_text]
        if missing_m11_phrases:
            fail("M11 docs missing validation/evidence phrases: " + ", ".join(missing_m11_phrases))
        for path, content in m11_docs_by_path.items():
            missing_doc_phrases = [phrase for phrase in REQUIRED_M11_DOC_PHRASES if phrase not in content]
            if missing_doc_phrases:
                fail(f"{path} missing M11 doc phrase: " + ", ".join(missing_doc_phrases))
        for phrase in ["Product Health Score: 7.4 / 10", "no new workflows", "no SocialSense changes"]:
            if phrase not in combined_m11_text:
                fail(f"M11 current-state docs missing phrase: {phrase}")
        if not any(phrase in combined_m11_text for phrase in ["Creative Comparison remains blocked", "M15 Creative Comparison Vertical Slice"]):
            fail("M11 current-state docs missing Creative Comparison disposition")
        if not any(phrase in combined_m11_text for phrase in ["M12 Campaign Workspace Trust & Validation Fixes", "M12 Campaign Workspace Trust & Validation"]):
            fail("M11 current-state docs missing M12 Campaign Workspace Trust & Validation guidance")
        for phrase in ["Marketing Director", "First-time user", "Marketing Research Specialist", "Power user", "Governance reviewer", "Future maintainer"]:
            if phrase not in m11_text:
                fail(f"M11 persona evidence missing role: {phrase}")
        for phrase in ["Product Launch", "Campaign Message Test", "A/B Experiment", "Campaign Workspace"]:
            if phrase not in m11_text:
                fail(f"M11 scenario evidence missing workflow: {phrase}")
        forbidden_m11_changes = [path for path in changed_paths if path not in M11_ALLOWED_CHANGED_PATHS] if current_branch_name().startswith("m11-") else []
        if forbidden_m11_changes:
            fail("M11 changed unexpected runtime/non-doc paths: " + ", ".join(forbidden_m11_changes))
        forbidden_m11_prefix_changes = [path for path in changed_paths if path.startswith(M11_FORBIDDEN_CHANGED_PREFIXES)] if current_branch_name().startswith("m11-") else []
        if forbidden_m11_prefix_changes:
            fail("M11 changed forbidden runtime/backend/SocialSense paths: " + ", ".join(forbidden_m11_prefix_changes))

    if current_branch_name().startswith("m12-") or "M12 Campaign Workspace Trust & Validation" in "\n".join([readme, agents, roadmap, health_dashboard]):
        src_m12_text = "\n".join([
            (ROOT / "src/views.tsx").read_text(encoding="utf-8"),
            (ROOT / "src/App.test.tsx").read_text(encoding="utf-8"),
        ])
        m12_report_text = (ROOT / "docs/product/M12_TRUST_VALIDATION_REPORT.md").read_text(encoding="utf-8")
        combined_m12_text = "\n".join([readme, agents, roadmap, health_dashboard, m11_text, m12_report_text, src_m12_text])
        if "](docs/product/M12_TRUST_VALIDATION_REPORT.md)" not in readme:
            fail("README missing M12 Trust Validation report link")
        missing_m12_phrases = [phrase for phrase in REQUIRED_M12_PHRASES if phrase not in combined_m12_text]
        if missing_m12_phrases:
            fail("M12 docs/source missing trust validation phrases: " + ", ".join(missing_m12_phrases))
        if "M7 A/B Experiment workflow readiness" in (ROOT / "src/views.tsx").read_text(encoding="utf-8"):
            fail("M12 /health source still contains stale M7 wording")
        if "includes('" + "campaign-message" in src_m12_text or "includes('" + "ab-experiment" in src_m12_text:
            fail("M12 run/export matching must not use broad substring fallback")
        if current_branch_name().startswith("m12-") and not changed_paths:
            fail("M12 changed-path guard could not compare against origin/main")
        forbidden_m12_changes = [path for path in changed_paths if path not in M12_ALLOWED_CHANGED_PATHS] if current_branch_name().startswith("m12-") else []
        if forbidden_m12_changes:
            fail("M12 changed unexpected paths: " + ", ".join(forbidden_m12_changes))

    if current_branch_name().startswith("m13-") or "M13 Product Trust Readiness" in "\n".join([readme, agents, roadmap, health_dashboard]):
        m13_report_path = ROOT / "docs/product/M13_PRODUCT_TRUST_READINESS_GATE.md"
        if not m13_report_path.is_file():
            fail("missing M13 readiness report")
        m13_text = m13_report_path.read_text(encoding="utf-8")
        combined_m13_text = "\n".join([readme, agents, roadmap, health_dashboard, m13_text])
        if "](docs/product/M13_PRODUCT_TRUST_READINESS_GATE.md)" not in readme:
            fail("README missing M13 readiness report link")
        missing_m13_phrases = [phrase for phrase in REQUIRED_M13_PHRASES if phrase not in combined_m13_text]
        if missing_m13_phrases:
            fail("M13 docs missing product trust readiness phrases: " + ", ".join(missing_m13_phrases))
        if "Creative Comparison implementation" not in combined_m13_text or "blocked" not in combined_m13_text:
            fail("M13 docs must keep Creative Comparison implementation blocked")
        forbidden_m13_changes = [path for path in changed_paths if path not in M13_ALLOWED_CHANGED_PATHS] if current_branch_name().startswith("m13-") else []
        if forbidden_m13_changes:
            fail("M13 changed unexpected implementation paths: " + ", ".join(forbidden_m13_changes))

    if current_branch_name().startswith("m14-") or "M14 Creative Comparison" in "\n".join([readme, agents, roadmap, health_dashboard]):
        missing_m14_docs = [path for path in REQUIRED_M14_DOCS if not (ROOT / path).is_file()]
        if missing_m14_docs:
            fail("missing M14 Creative Comparison docs: " + ", ".join(missing_m14_docs))
        m14_docs = {path: (ROOT / path).read_text(encoding="utf-8") for path in REQUIRED_M14_DOCS}
        combined_m14_text = "\n".join([readme, agents, roadmap, health_dashboard, *m14_docs.values()])
        for path in REQUIRED_M14_DOCS:
            link = "]("
            if f"]({path})" not in readme:
                fail(f"README missing M14 docs link: {path}")
        missing_m14_phrases = [phrase for phrase in REQUIRED_M14_PHRASES if phrase not in combined_m14_text]
        if missing_m14_phrases:
            fail("M14 docs missing Creative Comparison discovery phrases: " + ", ".join(missing_m14_phrases))
        for phrase in ["Implementation remains HOLD", "Architecture Gate: Not triggered", "documentation/discovery only"]:
            if phrase not in combined_m14_text:
                fail(f"M14 docs missing non-implementation boundary: {phrase}")
        if not any(phrase in combined_m14_text for phrase in ["Do NOT implement Creative Comparison", "Do not implement Creative Comparison", "no Creative Comparison implementation"]):
            fail("M14 docs missing non-implementation boundary: Do not implement Creative Comparison")
        forbidden_m14_changes = [path for path in changed_paths if path not in M14_ALLOWED_CHANGED_PATHS] if current_branch_name().startswith("m14-") else []
        if forbidden_m14_changes:
            fail("M14 changed unexpected implementation paths: " + ", ".join(forbidden_m14_changes))

    if current_branch_name().startswith("m15-") or "M15 Creative Comparison" in "\n".join([readme, agents, roadmap, health_dashboard]):
        missing_m15_files = [path for path in REQUIRED_M15_FILES if not (ROOT / path).is_file()]
        if missing_m15_files:
            fail("missing M15 Creative Comparison implementation files: " + ", ".join(missing_m15_files))
        m15_text_parts = [
            readme,
            agents,
            roadmap,
            health_dashboard,
            (ROOT / "docs/product/M15_CREATIVE_COMPARISON_CLOSEOUT_REPORT.md").read_text(encoding="utf-8"),
            (ROOT / "src/views.tsx").read_text(encoding="utf-8"),
            (ROOT / "src/App.test.tsx").read_text(encoding="utf-8"),
            (ROOT / "src/app/routes/routeResolver.ts").read_text(encoding="utf-8"),
            (ROOT / "scripts/generate_creative_comparison_fixture.py").read_text(encoding="utf-8"),
            (ROOT / "tests/test_creative_comparison_fixture_generator.py").read_text(encoding="utf-8"),
        ]
        combined_m15_text = "\n".join(m15_text_parts)
        if "](docs/product/M15_CREATIVE_COMPARISON_CLOSEOUT_REPORT.md)" not in readme:
            fail("README missing M15 closeout report link")
        missing_m15_phrases = [phrase for phrase in REQUIRED_M15_PHRASES if phrase not in combined_m15_text]
        if missing_m15_phrases:
            fail("M15 docs/source missing Creative Comparison implementation phrases: " + ", ".join(missing_m15_phrases))
        if "creativeComparison" not in combined_m15_text or "3c-m15-creative-comparison-reference-workflow" not in combined_m15_text:
            fail("M15 source missing Creative Comparison route/run id wiring")
        if "run_message_comparison" not in combined_m15_text:
            fail("M15 generator must document/use closest existing public adapter path")
        forbidden_m15_changes = [path for path in changed_paths if path not in M15_ALLOWED_CHANGED_PATHS] if current_branch_name().startswith("m15-") else []
        if forbidden_m15_changes:
            fail("M15 changed unexpected paths: " + ", ".join(forbidden_m15_changes))

    if current_branch_name().startswith("m16-") or "M16 Feature Freeze" in "\n".join([readme, agents, roadmap, health_dashboard]):
        missing_m16_docs = [path for path in REQUIRED_M16_DOCS if not (ROOT / path).is_file()]
        if missing_m16_docs:
            fail("missing M16 release readiness docs: " + ", ".join(missing_m16_docs))
        m16_docs = {path: (ROOT / path).read_text(encoding="utf-8") for path in REQUIRED_M16_DOCS}
        combined_m16_text = "\n".join([readme, agents, roadmap, health_dashboard, *m16_docs.values()])
        for path in REQUIRED_M16_DOCS:
            if f"]({path})" not in readme:
                fail(f"README missing M16 docs link: {path}")
        missing_m16_phrases = [phrase for phrase in REQUIRED_M16_PHRASES if phrase not in combined_m16_text]
        if missing_m16_phrases:
            fail("M16 docs missing release-readiness phrases: " + ", ".join(missing_m16_phrases))
        blocked_phrases = [
            "new workflow",
            "new backend",
            "new SocialSense capability",
            "new live API",
            "persistence",
            "authentication",
            "CRM/customer data",
            "PII/private data",
            "production automation",
        ]
        for phrase in blocked_phrases:
            if phrase not in combined_m16_text:
                fail(f"M16 feature freeze docs missing blocked scope: {phrase}")
        forbidden_m16_changes = [path for path in changed_paths if path not in M16_ALLOWED_CHANGED_PATHS] if current_branch_name().startswith("m16-") else []
        if forbidden_m16_changes:
            fail("M16 changed unexpected paths during feature freeze: " + ", ".join(forbidden_m16_changes))

    if (
        current_branch_name().startswith("m17-")
        or "M17 Executive Dashboard" in "\n".join([readme, agents, roadmap, health_dashboard, m17_text])
        or "Executive Experience & Marketing Simulation Enhancement" in "\n".join([readme, agents, roadmap, health_dashboard, m17_text])
    ):
        missing_m17_docs = [path for path in REQUIRED_M17_DOCS if not (ROOT / path).is_file()]
        if missing_m17_docs:
            fail("missing M17 executive experience docs: " + ", ".join(missing_m17_docs))
        m17_docs = {path: (ROOT / path).read_text(encoding="utf-8") for path in REQUIRED_M17_DOCS}
        combined_m17_text = "\n".join([readme, agents, roadmap, health_dashboard, *m17_docs.values()])
        for path in REQUIRED_M17_DOCS:
            if f"]({path})" not in readme:
                fail(f"README missing M17 docs link: {path}")
        missing_m17_phrases = [phrase for phrase in REQUIRED_M17_PHRASES if phrase not in combined_m17_text]
        if missing_m17_phrases:
            fail("M17 docs missing program kickoff phrases: " + ", ".join(missing_m17_phrases))
        missing_m17_kpis = [phrase for phrase in REQUIRED_M17_PROGRAM_KPIS if phrase not in combined_m17_text]
        if missing_m17_kpis:
            fail("M17 docs missing program KPIs: " + ", ".join(missing_m17_kpis))
        missing_m17_triggers = [phrase for phrase in REQUIRED_M17_ARCHITECTURE_GATE_TRIGGERS if phrase not in combined_m17_text]
        if missing_m17_triggers:
            fail("M17 docs missing exact Architecture Gate triggers: " + ", ".join(missing_m17_triggers))
        missing_m17_gates = [phrase for phrase in REQUIRED_M17_QUALITY_GATES if phrase not in combined_m17_text]
        if missing_m17_gates:
            fail("M17 docs missing quality gates: " + ", ".join(missing_m17_gates))
        for phrase in [
            "PR1 program kickoff docs",
            "PR2 Executive KPI cards",
            "PR3 marketing charts/evidence/confidence visualization",
            "PR4 executive report/export improvements",
            "PR5 M17 validation/closeout",
        ]:
            if phrase not in combined_m17_text:
                fail(f"M17 docs missing PR sequence phrase: {phrase}")
        if current_branch_name() == "m17-executive-dashboard-kpis":
            m17_pr2_source_text = "\n".join(
                [
                    (ROOT / "src/views.tsx").read_text(encoding="utf-8"),
                    (ROOT / "src/styles.css").read_text(encoding="utf-8"),
                    (ROOT / "src/App.test.tsx").read_text(encoding="utf-8"),
                ]
            )
            combined_m17_pr2_text = "\n".join([combined_m17_text, m17_pr2_source_text])
            missing_m17_pr2_phrases = [phrase for phrase in REQUIRED_M17_PR2_PHRASES if phrase not in combined_m17_pr2_text]
            if missing_m17_pr2_phrases:
                fail("M17 PR2 docs/source missing executive KPI dashboard phrases: " + ", ".join(missing_m17_pr2_phrases))
            forbidden_m17_changes = [path for path in changed_paths if path not in M17_PR2_ALLOWED_CHANGED_PATHS]
        elif current_branch_name().startswith("m17-"):
            forbidden_m17_changes = [path for path in changed_paths if path not in M17_ALLOWED_CHANGED_PATHS]
        else:
            forbidden_m17_changes = []
        if forbidden_m17_changes:
            fail("M17 program kickoff changed unexpected runtime/non-doc paths: " + ", ".join(forbidden_m17_changes))

    compiled = [re.compile(pattern, re.IGNORECASE) for pattern in FORBIDDEN_PATH_PATTERNS]
    forbidden_paths = [path for path in iter_repo_paths() if any(pattern.search(path) for pattern in compiled)]
    if forbidden_paths:
        fail("forbidden backend/live/auth/credential files present: " + ", ".join(sorted(forbidden_paths)))

    print("PASS: required M1/PR4 docs exist")
    print("PASS: required M4 IA/design-system docs exist and include status/scope phrases")
    print("PASS: required M5 Campaign Message Test docs exist and include reuse/status phrases")
    print("PASS: required M6 Experiment Framework docs exist and include scope/status phrases")
    print("PASS: required M8 Marketing Journey Framework docs exist and include scope/status phrases")
    print("PASS: required M9 Campaign Workspace Foundation docs exist and include scope/status phrases")
    print("PASS: required M11 Continuous Product Validation docs exist and include evidence/backlog/readiness phrases")
    print("PASS: M12 Campaign Workspace Trust & Validation docs/source include KPI and trust guard phrases")
    print("PASS: M13 Product Trust Readiness docs include capability gate and non-implementation boundaries")
    print("PASS: M14 Creative Comparison discovery docs include required specification content and non-implementation boundaries")
    print("PASS: M15 Creative Comparison vertical slice files include route, fixture, KPI, and safety boundaries")
    print("PASS: M16 Feature Freeze and Demo Readiness docs include freeze, demo, dogfooding, feedback, RC, and blocked-scope boundaries")
    if current_branch_name().startswith("m17-") or "Executive Experience & Marketing Simulation Enhancement" in "\n".join([readme, agents, roadmap, health_dashboard, m17_text]):
        print("PASS: M17 Executive Experience program docs include M17-M19 plan, KPIs, Architecture Gate triggers, PR sequence, and PR1 historical docs-only boundary")
        if current_branch_name() == "m17-executive-dashboard-kpis":
            print("PASS: M17 PR2 runtime slice acceptance includes allowlist, KPI/formula/source phrases, first-class evidence/readiness cards, and offline/synthetic boundaries")
    print("PASS: README links resolve")
    print("PASS: README and AGENTS include required safety boundaries")
    print("PASS: expected React/Vite/TypeScript frontend shell files exist")
    print("PASS: expected PR3 SocialSense adapter files exist")
    print("PASS: expected PR4 Product Launch vertical slice files exist")
    print("PASS: expected M5 Campaign Message Test files exist")
    print("PASS: expected M7 A/B Experiment files exist")
    print("PASS: adapter uses SocialSense public facade and avoids forbidden internals")
    print("PASS: fixture generators use PR3 adapter and fixtures have PR4/M5 UI contracts")
    print("PASS: M7 A/B Experiment uses product adapter, generated fixture, and reuse audit thresholds")
    print("PASS: Campaign Message Test implementation paths are present")
    print("PASS: no forbidden backend/live/auth/credential files detected")


if __name__ == "__main__":
    main()
