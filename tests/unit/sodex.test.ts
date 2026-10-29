import { describe, it, expect } from 'vitest';
import { validateFixture, type FixtureScenario } from '../../src/fixtures/schema.js';
import { MockIndexerAdapter } from '../../src/adapters/mock.js';

describe('Sodex Core Unit Tests', () => {
  const sampleFixture: FixtureScenario = {
    version: '0.1.0',
    scenarioId: 'test-pagination-01',
    description: 'Test event pagination and filtering',
    inputEvents: [
      { id: 'evt-1', contractId: 'C1', topic: 'transfer', ledgerSequence: 100, createdAt: '2026-10-29T00:00:00Z', data: { amount: 50 } },
      { id: 'evt-2', contractId: 'C1', topic: 'mint', ledgerSequence: 101, createdAt: '2026-10-29T00:01:00Z', data: { amount: 100 } },
      { id: 'evt-3', contractId: 'C2', topic: 'transfer', ledgerSequence: 102, createdAt: '2026-10-29T00:02:00Z', data: { amount: 200 } }
    ],
    expectedRecords: [
      { id: 'evt-1', contractId: 'C1', topic: 'transfer', ledgerSequence: 100, createdAt: '2026-10-29T00:00:00Z', data: { amount: 50 } }
    ]
  };

  describe('Fixture Validator', () => {
    it('should validate a correct fixture scenario', () => {
      expect(() => validateFixture(sampleFixture)).not.toThrow();
    });

    it('should throw an error for missing version', () => {
      const invalid = { ...sampleFixture, version: '' };
      expect(() => validateFixture(invalid)).toThrow('missing or invalid "version"');
    });

    it('should throw an error for non-array inputEvents', () => {
      const invalid = { ...sampleFixture, inputEvents: 'not-an-array' };
      expect(() => validateFixture(invalid)).toThrow('"inputEvents" must be an array');
    });
  });

  describe('MockIndexerAdapter', () => {
    const adapter = new MockIndexerAdapter(sampleFixture.inputEvents);

    it('should report correct supported capabilities', () => {
      expect(adapter.getSupportedCapabilities()).toContain('query');
      expect(adapter.getSupportedCapabilities()).toContain('pagination');
    });

    it('should query all events when no options are provided', async () => {
      const results = await adapter.queryEvents({});
      expect(results).toHaveLength(3);
    });

    it('should filter events by contractId', async () => {
      const results = await adapter.queryEvents({ contractId: 'C1' });
      expect(results).toHaveLength(2);
      expect(results.every(r => r.contractId === 'C1')).toBe(true);
    });

    it('should filter events by topic and respect limit', async () => {
      const results = await adapter.queryEvents({ topic: 'transfer', limit: 1 });
      expect(results).toHaveLength(1);
      expect(results[0]?.id).toBe('evt-1');
    });

    it('should handle pagination cursor correctly', async () => {
      const results = await adapter.queryEvents({ cursor: 'evt-1' });
      expect(results).toHaveLength(2);
      expect(results[0]?.id).toBe('evt-2');
      expect(results[1]?.id).toBe('evt-3');
    });
  });
});
