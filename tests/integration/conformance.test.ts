import { describe, it, expect } from 'vitest';
import { validateFixture, type FixtureScenario } from '../../src/fixtures/schema.js';
import { MockIndexerAdapter } from '../../src/adapters/mock.js';
import { ConformanceRunner } from '../../src/core/runner.js';
import { JsonReporter } from '../../src/reporters/json.js';

describe('Sodex End-to-End Conformance Integration', () => {
  it('should execute a complete fixture conformance cycle successfully', async () => {
    // 1. Define fixture scenario payload
    const scenario: FixtureScenario = {
      version: '0.1.0',
      scenarioId: 'integration-e2e-01',
      description: 'End-to-end integration test for Soroban event indexing conformance',
      inputEvents: [
        {
          id: 'tx-ev-101',
          contractId: 'C_SOROBAN_TOKEN_99',
          topic: 'TRANSFER',
          ledgerSequence: 504200,
          createdAt: '2026-10-29T12:00:00Z',
          data: { from: 'Alice', to: 'Bob', amount: '1000' }
        }
      ],
      expectedRecords: [
        {
          id: 'tx-ev-101',
          contractId: 'C_SOROBAN_TOKEN_99',
          topic: 'TRANSFER',
          ledgerSequence: 504200,
          createdAt: '2026-10-29T12:00:00Z',
          data: { from: 'Alice', to: 'Bob', amount: '1000' }
        }
      ]
    };

    // 2. Validate fixture schema
    expect(() => validateFixture(scenario)).not.toThrow();

    // 3. Initialize adapter with the expected input records
    const adapter = new MockIndexerAdapter(scenario.inputEvents);

    // 4. Run through conformance runner
    const runner = new ConformanceRunner(adapter);
    const executionResult = await runner.runScenario(scenario);

    expect(executionResult.passed).toBe(true);
    expect(executionResult.unsupported).toBe(false);
    expect(executionResult.scenarioId).toBe('integration-e2e-01');

    // 5. Generate JSON report
    const reporter = new JsonReporter();
    const report = reporter.generateReport([executionResult]);

    expect(report.summary.passed).toBe(1);
    expect(report.summary.failed).toBe(0);
    expect(report.results).toHaveLength(1);
  });
});
