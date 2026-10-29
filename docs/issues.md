# Sodex Contributor Issues

## Issue #1 — Implement JUnit XML Reporter for CI Integration
**[Reporting] [Enhancement] Implement JUnit XML Reporter for CI Integration #1**

### 📁 Implementation Directory
`src/reporters/junit.ts` & `tests/unit/junit-reporter.test.ts`

### 🎯 Goal
Enable native CI test result visualization in GitHub Actions by adding a standard JUnit XML output format.

### 📝 Description
While Sodex currently supports JSON reports, many CI/CD environments and GitHub Actions extensions natively parse JUnit XML reports for test failure visualization. We need a `JUnitReporter` class that converts `ScenarioExecutionResult[]` into a valid XML string conforming to the JUnit schema. Explain the problem being solved and how success will be tested in your PR description.

### 📋 Requirements
- Create `JUnitReporter` implementing report generation logic.
- Ensure proper XML escaping for scenario IDs and failure messages.
- Add unit tests verifying XML structure, test suites count, and failure tags.

### 🔧 Technical Scope
- TypeScript / Node.js
- Vitest Unit Testing

### 🌿 Branch
`git checkout -b feature/junit-reporter`

### ✅ Acceptance Criteria & PR Requirements
- **Strict Modular Architecture (Non-Negotiable):** Implement using established domain separation (`src/reporters/`).
- **Primary Concern:** Address one primary concern; avoid unrelated formatting or refactoring.
- **Tests Required:** Include tests for changed behavior. **Do not claim an indexer passes a scenario unless the test actually runs and the result is reproducible.**
- **Documentation:** Update documentation if public behavior changes, and explain important design decisions.
- **Proof of Work:** Upload proof of work (CLI execution success or test pass logs).
- **PR Content:** Must include `Closes #1` with a work done summary.
- ⚠️ *Assignment required before starting — comment on this issue to request assignment.*

---

## Issue #2 — Add Replay Idempotency Conformance Scenario
**[Conformance] [Enhancement] Add Replay Idempotency Conformance Scenario #2**

### 📁 Implementation Directory
`examples/fixtures/11-replay-idempotency.json` & `tests/integration/replay.test.ts`

### 🎯 Goal
Verify whether target indexers handle block/event range re-ingestion idempotently without duplicating stored events.

### 📝 Description
Indexers must handle repeated ingestion ranges safely. We need to define a new deterministic fixture (`11-replay-idempotency.json`) that simulates replaying the same ingestion range twice, asserting that the target adapter returns identical record counts and identity hashes without duplicating records.

### 📋 Requirements
- Create `11-replay-idempotency.json` with version `0.1.0`.
- Add integration assertions verifying idempotency behavior.

### 🔧 Technical Scope
- Conformance Testing
- JSON Fixture Management

### 🌿 Branch
`git checkout -b test/replay-idempotency`

### ✅ Acceptance Criteria & PR Requirements
- **Strict Modular Architecture (Non-Negotiable):** Follow established fixture and runner schemas.
- **Primary Concern:** Address one primary concern; avoid unrelated formatting or refactoring.
- **Tests Required:** Include tests for changed behavior. **Do not claim an indexer passes a scenario unless the test actually runs and the result is reproducible.**
- **Documentation:** Update documentation if public behavior changes, and explain important design decisions.
- **Proof of Work:** Terminal execution output showing successful test pass.
- **PR Content:** Must include `Closes #2` with a work done summary.
- ⚠️ *Assignment required before starting — comment on this issue to request assignment.*

---

## Issue #3 — Implement Soroban RPC Live Integration Adapter
**[Adapters] [Feature] Implement Soroban RPC Live Integration Adapter #3**

### 📁 Implementation Directory
`src/adapters/soroban-rpc.ts` & `tests/integration/rpc-adapter.test.ts`

### 🎯 Goal
Provide production-ready live RPC integration testing for Soroban JSON-RPC nodes.

### 📝 Description
To evaluate live or local Soroban nodes, Sodex requires a concrete adapter communicating with Soroban JSON-RPC `getEvents`. We need to flesh out `SorobanRpcAdapter` with robust error handling and mock fetch integration tests.

### 📋 Requirements
- Implement robust request formatting for `getEvents` JSON-RPC calls.
- Handle pagination cursors and filter parameters correctly.
- Add mock fetch integration tests simulating RPC response codes.

### 🔧 Technical Scope
- TypeScript Networking / Fetch API
- Integration Testing

### 🌿 Branch
`git checkout -b feature/soroban-rpc-adapter`

### ✅ Acceptance Criteria & PR Requirements
- **Strict Modular Architecture (Non-Negotiable):** Maintain adapter boundary contract (`src/adapters/`).
- **Primary Concern:** Address one primary concern; avoid unrelated formatting or refactoring.
- **Tests Required:** Include tests for changed behavior. **Do not claim an indexer passes a scenario unless the test actually runs and the result is reproducible.**
- **Documentation:** Update documentation if public behavior changes, and explain important design decisions.
- **Proof of Work:** Test execution screenshot.
- **PR Content:** Must include `Closes #3` with a work done summary.
- ⚠️ *Assignment required before starting — comment on this issue to request assignment.*

---

## Issue #4 — Add CLI Command-Line Flags for Output Formatting
**[CLI] [Enhancement] Add CLI Command-Line Flags for Output Formatting #4**

### 📁 Implementation Directory
`src/cli/index.ts` & `tests/unit/cli.test.ts`

### 🎯 Goal
Improve developer experience by supporting configurable output formats (`--format json|pretty`) and file export (`--output <path>`).

### 📝 Description
CI pipelines and developers inspecting logs locally require different formatting options. We need to update the CLI parser in `src/cli/index.ts` to accept `--format` and `--output` flags to write test reports directly to disk.

### 📋 Requirements
- Implement flag parsing for `--format` and `--output`.
- Write test reports to disk when `--output` is provided.
- Maintain existing non-zero exit codes on failure.

### 🔧 Technical Scope
- Node.js CLI / File System Operations
- Unit Testing

### 🌿 Branch
`git checkout -b feature/cli-formatting-flags`

### ✅ Acceptance Criteria & PR Requirements
- **Strict Modular Architecture (Non-Negotiable):** Keep CLI entrypoint lean by delegating to reporters.
- **Primary Concern:** Address one primary concern; avoid unrelated formatting or refactoring.
- **Tests Required:** Include tests for changed behavior. **Do not claim an indexer passes a scenario unless the test actually runs and the result is reproducible.**
- **Documentation:** Update documentation if public behavior changes, and explain important design decisions.
- **Proof of Work:** CLI execution demonstration.
- **PR Content:** Must include `Closes #4` with a work done summary.
- ⚠️ *Assignment required before starting — comment on this issue to request assignment.*
