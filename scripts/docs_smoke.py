#!/usr/bin/env python3
"""M1 PR2 smoke check for 3C Marketing Workbench docs and safe frontend shell."""

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

REQUIRED_PR2_PHRASES = [
    "M1 PR2",
    "React/Vite/TypeScript",
    "frontend shell",
    "no backend",
    "no SocialSense adapter",
    "no real simulation",
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

IGNORED_DIRS = {".git", "node_modules", "dist", "coverage"}
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
        fail("missing required PR2 docs: " + ", ".join(missing_docs))

    missing_frontend = [path for path in EXPECTED_FRONTEND_FILES if not (ROOT / path).is_file()]
    if missing_frontend:
        fail("missing expected PR2 frontend files: " + ", ".join(missing_frontend))

    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    agents = (ROOT / "AGENTS.md").read_text(encoding="utf-8")

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

    missing_pr2 = [phrase for phrase in REQUIRED_PR2_PHRASES if phrase not in readme]
    if missing_pr2:
        fail("README missing PR2 status phrases: " + ", ".join(missing_pr2))

    compiled = [re.compile(pattern, re.IGNORECASE) for pattern in FORBIDDEN_PATH_PATTERNS]
    forbidden_paths = [path for path in iter_repo_paths() if any(pattern.search(path) for pattern in compiled)]
    if forbidden_paths:
        fail("forbidden backend/live/auth/credential files present in PR2: " + ", ".join(sorted(forbidden_paths)))

    print("PASS: required PR2 docs exist")
    print("PASS: README links resolve")
    print("PASS: README and AGENTS include required safety boundaries")
    print("PASS: expected React/Vite/TypeScript frontend shell files exist")
    print("PASS: no forbidden backend/live/auth/credential files detected")


if __name__ == "__main__":
    main()
