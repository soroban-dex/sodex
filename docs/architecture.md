# Sodex — Gap Analysis & Ecosystem Comparison

## 1. Ecosystem Context
The Stellar Soroban ecosystem features several robust indexers and monitoring tools:
- **Wraith:** Handles incoming Soroban token transfers and event ingestion with duplicate-safe inserts.
- **SoroScan:** Provides comprehensive event indexing, search APIs, and explorer interfaces.
- **SoroTrail:** Stores Soroban events beyond the standard RPC retention window.
- **SoroBeacon:** Provides health monitoring and alerting for indexer nodes.

## 2. Identified Gap
While existing tools solve *data ingestion, storage, and querying*, there is currently no standardized, ecosystem-agnostic **conformance-testing toolkit** to verify whether different indexers handle edge cases correctly. 

Specifically, maintainers lack a reusable test harness to verify:
1. **Pagination Boundary Consistency:** Ensuring queries across limit/cursor boundaries do not drop or duplicate records.
2. **Replay Idempotency:** Confirming that re-ingesting block ranges does not corrupt state or duplicate events.
3. **Filter Compliance:** Validating that contract and topic filters strictly adhere to expected query parameters.

## 3. Decision
**Proceed with Sodex** as a lightweight, black-box testing toolkit. Sodex does not compete with Wraith or SoroScan; instead, it provides maintainers with automated test suites to validate their indexers' reliability.

3. docs/architecture.md
Markdown

# Sodex — Architecture & Design Patterns

## 1. Layered Architecture
Sodex strictly adheres to a layered architecture design pattern to maintain clear separation of concerns:

[CLI / Test Runner Entrypoint] (src/cli/)
│
▼
[Conformance Core Engine]    (src/core/)
│
├──────► [Fixture Schemas & Validator] (src/fixtures/)
├──────► [Adapter Interface Contracts] (src/adapters/)
└──────► [Result Reporters / JSON]    (src/reporters/)


## 2. Module Breakdown
- **`src/core/`**: Contains the `ConformanceRunner`, orchestrating test scenario execution and record comparison.
- **`src/adapters/`**: Defines the `IndexerAdapter` interface and reference `MockIndexerAdapter` for testing without network dependencies.
- **`src/fixtures/`**: Manages fixture schemas and strict runtime validation (`validateFixture`).
- **`src/reporters/`**: Generates structured JSON reports (`JsonReporter`) for CI/CD pipeline consumption.
- **`src/cli/`**: Provides the executable command-line interface with proper non-zero exit codes.