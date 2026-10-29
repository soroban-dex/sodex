# Contributing to Sodex

Thank you for your interest in contributing.

## Before starting

1. Read the README and product requirements document.
2. Search existing issues and pull requests.
3. For substantial changes, open an issue or discussion first.
4. Explain the problem being solved and how success will be tested.

## Development

Requirements:
- A supported Node.js release
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

Do not claim an indexer passes a scenario unless the test
actually runs and the result is reproducible.