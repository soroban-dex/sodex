# Contributing to Sodex

Thank you for your interest in contributing.

## Branching Strategy & Naming Conventions
All contributions must be developed on dedicated branches branched off `main`:
- **Features:** `feature/<short-description>` (e.g., `feature/junit-reporter`)
- **Bug Fixes:** `bugfix/<short-description>` (e.g., `bugfix/cursor-boundary`)
- **Tests & Fixtures:** `test/<short-description>` (e.g., `test/replay-idempotency`)
- **Documentation:** `docs/<short-description>` (e.g., `docs/update-prd`)

## Before starting

1. Read the README and product requirements document (`docs/PRD.md`).
2. Search existing issues and pull requests.
3. For substantial changes, open an issue or discussion first.
4. Explain the problem being solved and how success will be tested.
5. **Assignment Required:** Comment on an issue to request assignment before starting work.

## Development

Requirements:
- Node.js >= 22
- pnpm

Install dependencies:
    pnpm ci

Run checks:
    pnpm run check
    pnpm run build

## Pull requests

Each pull request should:
- Address one primary concern.
- Include tests for changed behavior.
- Update documentation when public behavior changes.
- Explain important design decisions.
- Avoid unrelated formatting or refactoring.

**Important Rule:** Do not claim an indexer passes a scenario unless the test actually runs and the result is reproducible.
