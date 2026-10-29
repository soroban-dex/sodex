import { describe, it, expect } from 'vitest';
import { ConformanceRunner } from '../../src/core/runner.js';
import { MockIndexerAdapter } from '../../src/adapters/mock.js';
import type { FixtureScenario } from '../../src/fixtures/schema.js';

describe('ConformanceRunner', () => {
  const scenario: FixtureScenario = {
    version: '0.1.0',
    scenarioId: 'runner-test-01',
    description: 'Verify runner evaluation',
    inputEvents: [
      { id: 'e-1', contractId: 'C1', topic: 'mint', ledgerSequence: 10, createdAt: '2026-10-29T00:00:00Z', data: {} }
    ],
    expectedRecords: [
      { id: 'e-1', contractId: 'C1', topic: 'mint', ledgerSequence: 10, createdAt: '2026-10-29T00:00:00Z', data: {} }
    ]
  };

  it('should pass when adapter returns matching expected records', async () => {
    const adapter = new MockIndexerAdapter(scenario.expectedRecords);
    const runner = new ConformanceRunner(adapter);

    const result = await runner.runScenario(scenario);
    expect(result.passed).toBe(true);
    expect(result.unsupported).toBe(false);
    expect(result.scenarioId).toBe('runner-test-01');
  });

  it('should fail when adapter returns mismatched records', async () => {
    const adapter = new MockIndexerAdapter([
      { id: 'e-99', contractId: 'C9', topic: 'wrong', ledgerSequence: 99, createdAt: '2026-10-29T00:00:00Z', data: {} }
    ]);
    const runner = new ConformanceRunner(adapter);

    const result = await runner.runScenario(scenario);
    expect(result.passed).toBe(false);
  });
});
