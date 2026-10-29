# Sodex Roadmap

Sodex follows an evidence-first development process. Roadmap items are proposals until their scope and acceptance criteria are confirmed.

## Milestone 0 — Problem validation

- [ ] Compare existing indexers and conformance-testing approaches.
- [ ] Identify existing test coverage and duplicated capabilities.
- [ ] Document the specific gap Sodex intends to address.
- [ ] Request feedback from relevant maintainers.
- [ ] Decide whether a standalone toolkit is justified.

**Exit condition:** A documented gap and a feasible initial integration path.

## Milestone 1 — Core foundation

- [ ] Set up strict TypeScript configuration.
- [ ] Define fixture schema.
- [ ] Define adapter interface.
- [ ] Build a mock indexer.
- [ ] Add unit tests and CI.

**Exit condition:** The test foundation runs reproducibly from a clean checkout.

## Milestone 2 — Initial conformance scenarios

- [ ] Add filtering assertions.
- [ ] Add pagination assertions.
- [ ] Add duplicate and omission detection.
- [ ] Add stable test result identifiers.
- [ ] Produce JSON reports.

**Exit condition:** Faulty mock implementations fail for the expected reasons.

## Milestone 3 — First real integration

- [ ] Select an existing indexer with maintainer feedback.
- [ ] Implement a documented adapter.
- [ ] Run the test suite against a controlled dataset.
- [ ] Publish limitations and reproducible results.

**Exit condition:** At least one external implementation can be evaluated using documented scenarios.

## Milestone 4 — Recovery and ecosystem adoption

- [ ] Add restart and replay scenarios where supported.
- [ ] Evaluate optional CI and JUnit integrations.
- [ ] Invite additional adapter contributors.
- [ ] Version public interfaces and reports.
- [ ] Prioritize new scenarios based on evidence and user feedback.

**Exit condition:** Additional implementations can integrate without changing the core runner for every new target.
