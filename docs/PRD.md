# Sodex — Product Requirements Document

**Status:** Draft — research validation required  
**Version:** 0.1.0  
**Product type:** Open-source developer infrastructure  
**Language:** TypeScript / Node.js  
**License:** Apache-2.0  
**Target ecosystem:** Stellar / Soroban  
**Repository:** `sodex`

## 1. Executive summary

Sodex is a proposed open-source conformance-testing toolkit for Soroban event indexers.

It will help developers test whether an indexer's externally observable behavior is correct and predictable when processing contract events, serving query results, handling pagination, and recovering from interruptions.

Rather than replacing existing indexers, Sodex will provide reusable test scenarios, deterministic fixtures, adapter interfaces, and machine-readable reports that indexer maintainers can use to evaluate their implementations.

The project will begin with a small, reproducible test suite and expand only after its usefulness and uniqueness have been validated with existing maintainers.

## 2. Problem statement

Applications built on Soroban may depend on indexed contract events to display transaction histories, monitor contract activity, and support application-specific queries.

An indexer can appear healthy while still returning inconsistent or incomplete results. For example, a query might omit an event at a pagination boundary, return duplicates after replay, or behave differently after a restart.

Existing indexers implement different architectures and APIs, making it difficult to reuse the same correctness tests across multiple implementations.

Sodex proposes a common testing interface and a reusable set of behavioral checks.

**Research caveat:** These are plausible failure modes, not a claim that all existing indexers exhibit them. The initial research phase must compare existing test suites and confirm a specific gap before implementation proceeds.

## 3. Vision

Make it easier for developers to verify the correctness and reliability of Soroban event-indexing systems through repeatable, implementation-independent tests.

## 4. Target users

- Soroban indexer maintainers.
- Developers building Stellar applications that depend on indexed events.
- Infrastructure teams evaluating indexers.
- Open-source contributors maintaining event ingestion and query services.

## 5. Goals

1. Define a documented interface for testing indexer behavior.
2. Provide deterministic fixtures with known expected results.
3. Test query correctness, filtering, and pagination.
4. Test duplicate handling and replay behavior where the target implementation exposes the required controls.
5. Produce human-readable and machine-readable test reports.
6. Support continuous integration.
7. Allow additional indexers to integrate without rewriting the core test suite.

## 6. Non-goals

The initial release will not:

- Operate a hosted indexing service.
- Replace Soroban RPC, Horizon, Galexie, or existing indexers.
- Guarantee that an indexer has captured every event on the network.
- Claim formal verification or security certification.
- Require a frontend or dashboard.
- Automatically repair an indexer's data.
- Assume every indexer supports the same API or internal architecture.

## 7. Proposed technical design

### Core components

**A. Fixture library**

Contains deterministic test datasets and expected results. Fixtures must document their source, assumptions, and intended assertions.

**B. Adapter interface**

Defines how a test runner queries a target indexer. The interface should separate the test logic from the target's API and response format.

**C. Conformance runner**

Executes named test scenarios against an adapter and records pass, fail, or unsupported outcomes.

**D. Reporting**

Generates readable terminal output and JSON reports suitable for CI. JUnit XML may be added if it proves useful.

**E. Optional integration adapters**

Adapters for individual indexers should be separate modules or packages. Each adapter must document supported capabilities and limitations.

### Proposed architecture

Fixture dataset → Conformance runner → Indexer adapter → Target indexer API → Assertions → Test report

The initial architecture should remain small and avoid unnecessary distributed services, databases, or smart contracts.

## 8. Functional requirements

### FR-1: Deterministic fixtures

The toolkit must load versioned fixtures containing input records, expected results, and scenario metadata.

Acceptance criteria:
- Fixtures have a documented schema.
- Invalid fixtures produce actionable validation errors.
- Tests produce consistent results for the same inputs and configuration.

### FR-2: Adapter contract

The toolkit must define a TypeScript interface for retrieving relevant records from an indexer.

Acceptance criteria:
- Adapter inputs and outputs have explicit types.
- Errors are represented consistently.
- Unsupported capabilities are reported rather than silently skipped.
- A mock adapter can be used without connecting to a live network.

### FR-3: Filtering and pagination

The toolkit must test supported query filters and pagination behavior against known datasets.

Acceptance criteria:
- Expected records are compared with returned records.
- Tests detect duplicates and omissions within the test dataset.
- Boundary conditions are included.
- Unsupported query capabilities are marked clearly.

### FR-4: Replay and idempotency scenarios

Where the target system exposes a suitable test interface, Sodex must support scenarios that repeat an ingestion range or replay the same fixture data.

Acceptance criteria:
- The test defines the expected record count and identity rules.
- Duplicate behavior is checked against explicit assertions.
- The report distinguishes a failed assertion from an unsupported test capability.

### FR-5: Recovery scenarios

A later release may test resumption after an interrupted ingestion process.

Acceptance criteria:
- The test environment can simulate an interruption deterministically.
- The expected checkpoint and final dataset are documented.
- The test does not assume internal checkpoint behavior when only black-box access is available.

### FR-6: Reporting

The runner must provide a non-zero exit code when required assertions fail.

Acceptance criteria:
- Each scenario has a stable identifier.
- The report includes the scenario, result, and useful failure details.
- JSON output has a documented schema.
- CI can consume the output without parsing terminal formatting.

## 9. Non-functional requirements

- Written in TypeScript with strict type checking.
- Compatible with a supported Node.js LTS release.
- Reproducible local development and CI.
- No secrets required for fixture-only tests.
- No private keys or account credentials stored in fixtures.
- Clear error messages and documented limitations.
- Tests should not require production-network access by default.
- Dependencies should be limited and maintained.
- Public APIs should be versioned deliberately.

## 10. Security and data integrity

Sodex is a testing tool, not a source of blockchain truth by itself.

The project must distinguish between:
- fixture correctness;
- behavior observed through an indexer's API;
- comparison against an authoritative reference dataset;
- complete historical coverage, which cannot be claimed without sufficient source data.

Tests involving live networks must be opt-in, rate-conscious, and clearly separated from deterministic unit tests.

## 11. MVP scope

The first release should contain:

1. A strict TypeScript package.
2. A documented adapter interface.
3. A fixture schema and validator.
4. A small set of deterministic query and pagination tests.
5. A mock indexer implementation for testing the runner itself.
6. A CLI command to run the suite.
7. JSON output and non-zero exit codes for failures.
8. Automated tests and continuous integration.
9. One real indexer adapter only after the project has validated compatibility and received maintainer feedback.

The MVP must not claim comprehensive Soroban indexer conformance.

## 12. Success metrics

Initial success will be measured by verifiable engineering outcomes:

- The full local test suite runs from a clean checkout.
- A deliberately faulty mock indexer triggers the expected failures.
- A valid mock indexer passes the expected scenarios.
- Test reports can be consumed by CI.
- At least one external developer can implement or run an adapter using the documentation.
- The project has a documented gap analysis against existing solutions.

Stars, downloads, and approval status are useful signals but are not measures of correctness.

## 13. Roadmap

### Phase 0 — Research and validation

- Inspect existing Soroban indexers and their tests.
- Document overlapping functionality.
- Discuss the proposed interface with at least one maintainer.
- Publish a gap analysis and a decision to proceed, narrow, or stop.

### Phase 1 — Foundation

- Set up the TypeScript repository.
- Define fixture and adapter schemas.
- Implement deterministic test execution.
- Add unit tests and CI.

### Phase 2 — Initial conformance scenarios

- Implement filtering and pagination assertions.
- Add duplicate and omission detection for controlled datasets.
- Test report generation and exit codes.

### Phase 3 — First integration

- Integrate one existing indexer using its documented interface.
- Document the adapter's supported scenarios.
- Run reproducible tests and publish limitations.

### Phase 4 — Recovery and ecosystem adoption

- Add restart and replay scenarios where technically testable.
- Invite other maintainers to implement adapters.
- Publish versioned reports and integration documentation.
- Expand only when real users identify useful missing scenarios.

## 14. Risks and mitigations

**Existing tools already solve the problem.**  
Mitigation: complete the gap analysis before expanding implementation.

**Different indexers expose different APIs.**  
Mitigation: use capability-based adapters rather than forcing one universal API.

**A test dataset cannot prove complete network coverage.**  
Mitigation: document data provenance and limit claims to what the test actually verifies.

**The project becomes too broad.**  
Mitigation: keep the MVP focused on deterministic fixtures, query correctness, and reporting.

**Maintainers do not want another tool.**  
Mitigation: request feedback early and be prepared to contribute the same tests upstream instead.

## 15. Open questions

- Which indexer should be the first integration target?
- Which failures are not already covered by its tests?
- Is a black-box conformance suite more useful than reusable test utilities inside each indexer?
- What authoritative datasets can be used to validate event completeness?
- Which report formats do maintainers want in CI?

## 16. Release criteria

Version 0.1.0 may be tagged when:
- The adapter and fixture contracts are documented.
- Core tests pass in CI.
- Deliberately faulty implementations fail as expected.
- The CLI produces valid reports.
- Installation and usage instructions work from a clean checkout.
- Limitations and unsupported scenarios are documented.
- The project makes no unsupported claims about completeness or security.

## 17. Project status statement

Sodex is an independent open-source proposal in the research and specification stage. Its scope, name, and implementation may change based on ecosystem research and maintainer feedback. It is not an official Stellar product and is not affiliated with Stellar Development Foundation.
