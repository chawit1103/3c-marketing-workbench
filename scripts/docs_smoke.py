#!/usr/bin/env python3
"""PR1 docs smoke check for 3C Marketing Workbench."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

REQUIRED_FILES = [
    "docs/product/OLD_MARKETING_SIMULATION_UX_AUDIT.md",
    "docs/product/3C_PRODUCT_PRINCIPLES.md",
    "docs/architecture/PRODUCT_ARCHITECTURE.md",
    "docs/architecture/CROSS_REPOSITORY_DEPENDENCY_MAP.md",
    "docs/product/ROADMAP.md",
    "docs/product/PRODUCT_HEALTH_DASHBOARD.md",
    "README.md",
    "AGENTS.md",
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

FORBIDDEN_SCAFFOLD_PATHS = [
    "package.json",
    "pnpm-lock.yaml",
    "package-lock.json",
    "yarn.lock",
    "pyproject.toml",
    "requirements.txt",
    "src",
    "app",
    "frontend",
    "backend",
]

README_LINK_PATTERN = re.compile(r"\[[^\]]+\]\((?!https?://|mailto:|#)([^)]+)\)")


def fail(message: str) -> None:
    print(f"FAIL: {message}")
    sys.exit(1)


def main() -> None:
    missing = [path for path in REQUIRED_FILES if not (ROOT / path).is_file()]
    if missing:
        fail("missing required files: " + ", ".join(missing))

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

    scaffold_found = [path for path in FORBIDDEN_SCAFFOLD_PATHS if (ROOT / path).exists()]
    if scaffold_found:
        fail("app scaffold/package files present in PR1: " + ", ".join(scaffold_found))

    print("PASS: required docs exist")
    print("PASS: README links resolve")
    print("PASS: README and AGENTS include required safety boundaries")
    print("PASS: no app scaffold/package files detected")


if __name__ == "__main__":
    main()
