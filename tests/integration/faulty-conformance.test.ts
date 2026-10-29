import { describe, it, expect } from 'vitest';
import { ConformanceRunner } from '../../src/core/runner.js';
import { MockIndexerAdapter } from '../../src/adapters/mock.js';
import type { FixtureScenario } from '../../src/fixtures/schema.js';

// Deliberately faulty adapter that drops records or returns duplicates
class FaultyIndexerAdapter extends MockIndexerAdapter {
  constructor(records: any[], private faultType: 'drop' | 'duplicate') {
    super(records);
  }

  public async queryEvents(options: any): Promise<any[]> {
    const records = await super.queryEvents(options);
    if (this.faultType === 'drop') {
      return []; // Intentionally drops all records
    }
    if (this.faultType === 'duplicate' && records.length > 0) {
      return [records[0], records[0]]; // Intentionally duplicates the first record
    }
    return records;
  }
}

describe('Sodex Defect Demonstration', () => {
  const scenario: FixtureScenario = {
    version: '0.1.0',
    scenarioId: 'defect-detection-test',
    description: 'Verify Sodex catches record omission and duplication',
    inputEvents: [
      { id: 'evt-1', contractId: 'C1', topic: 'TRANSFER', ledgerSequence: 100, createdAt: '2026-10-29T00:00:00Z', data: {} }
    ],
    expectedRecords: [
      { id: 'evt-1', contractId: 'C1', topic: 'TRANSFER', ledgerSequence: 100, createdAt: '2026-10-29T00:00:00Z', data: {} }
    ]
  };

  it('should catch dropped records and report failure', async () => {
    const faultyAdapter = new FaultyIndexerAdapter(scenario.expectedRecords, 'drop');
    const runner = new ConformanceRunner(faultyAdapter);

    const result = await runner.runScenario(scenario);
    expect(result.passed).toBe(false);
    expect(result.details?.actualCount).toBe(0);
    expect(result.details?.expectedCount).toBe(1);
  });

  it('should catch duplicated records and report failure', async () => {
    const faultyAdapter = new FaultyIndexerAdapter(scenario.expectedRecords, 'duplicate');
    const runner = new ConformanceRunner(faultyAdapter);

    const result = await runner.runScenario(scenario);
    expect(result.passed).toBe(false);
    expect(result.details?.actualCount).toBe(2);
  });
});
