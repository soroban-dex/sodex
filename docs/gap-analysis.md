# Sodex — Gap Analysis & Ecosystem Comparison

## 1. Ecosystem Context & Codebase Inspection
The Stellar Soroban ecosystem features specialized indexers and monitoring utilities:
- **Wraith:** Focuses on high-throughput event ingestion and duplicate-safe database inserts for Soroban token transfers. Its tests target internal database states and checkpoint resume logic.
- **SoroScan:** Focuses on explorer interfaces, search APIs, and transaction visualization.
- **SoroTrail & SoroBeacon:** Handle long-term event storage beyond RPC windows and node health alerting.

## 2. Identified Gap
While existing tools address data ingestion, persistence, and querying, there is a distinct lack of an **ecosystem-agnostic, black-box conformance-testing harness**. 

Specific capabilities missing from existing tool test suites include:
1. **Pagination Boundary Consistency:** Reusable assertions verifying that queries across limit/cursor boundaries do not drop or duplicate records across distinct indexer API schemas.
2. **Replay Idempotency:** Standardized checks confirming predictable state behavior after block range re-ingestion.
3. **Filter Compliance:** Automated tests validating strict adherence to contract and topic filtering parameters.

## 3. Decision
**Proceed with Sodex** as a standalone testing toolkit. Sodex does not duplicate the indexing logic of Wraith or SoroScan; instead, it provides maintainers with a reusable test harness and CI-ready reports to validate external API reliability.
