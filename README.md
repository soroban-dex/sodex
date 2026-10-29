# Sodex

**Test the data your indexer delivers.**

Sodex is a proposed open-source TypeScript toolkit for testing the correctness and reliability of Soroban event indexers in the Stellar ecosystem.

It aims to provide reusable fixtures, a common adapter interface, deterministic conformance scenarios, and machine-readable reports so developers can test indexer behavior without rewriting the same checks for every implementation.

> **Project status:** Research and specification. The first release is not yet available.

## Why Sodex?

Applications built on indexed blockchain events need predictable query behavior. Sodex is designed to help developers test questions such as:

- Do filtered queries return the expected records?
- Does pagination produce consistent results without omissions or duplicates in a known dataset?
- Does repeated ingestion behave according to the expected identity rules?
- Can an implementation recover correctly in a controlled restart-and-replay scenario?
- Can test results be published in CI?

These are intended test capabilities. Their usefulness and uniqueness are being validated against existing Stellar ecosystem tooling.

## Design principles

- **Test existing infrastructure:** Sodex is not intended to replace existing indexers.
- **Deterministic first:** Core tests should run locally without production credentials.
- **Explicit evidence:** Reports must distinguish verified assertions from unsupported capabilities.
- **Composable:** Integrations should be implemented through documented adapters.
- **Honest scope:** Passing a fixture suite does not prove complete network coverage or security.

## Planned architecture

```text
Fixtures
   |
   v
Conformance Runner
   |
   v
Indexer Adapter
   |
   v
Target Indexer API
   |
   v
Assertions and Reports
```

## Planned technology

- TypeScript
- Node.js
- Vitest
- A lightweight CLI
- JSON reports
- GitHub Actions

Exact dependencies and supported runtime versions will be finalized during implementation.

## Project roadmap

1. Validate the problem and compare existing tools.
2. Define the fixture schema and adapter interface.
3. Implement deterministic test scenarios.
4. Add reporting and CI support.
5. Integrate one existing indexer.
6. Expand recovery and replay tests based on maintainer feedback.

## Contributing

Contributions are welcome once the initial scope is confirmed. Please read [CONTRIBUTING.md](CONTRIBUTING.md) and check the issue tracker before starting substantial work.

## Security

Sodex is a testing toolkit, not a security certification or a guarantee of complete blockchain data. See [SECURITY.md](SECURITY.md) for reporting guidance.

## License

Licensed under Apache-2.0. See [LICENSE](LICENSE).

## Disclaimer

Sodex is an independent community project. It is not an official Stellar product and is not affiliated with Stellar Development Foundation.


## Quick Start
```bash
pnpm install
pnpm run check
pnpm run sodex:run

License

Licensed under Apache-2.0.
