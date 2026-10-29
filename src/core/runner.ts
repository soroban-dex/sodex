import type { FixtureScenario, SorobanEventRecord } from '../fixtures/schema.js';
import type { IndexerAdapter } from '../adapters/mock.js';

export interface ScenarioExecutionResult {
  scenarioId: string;
  passed: boolean;
  unsupported: boolean;
  error?: string;
  details?: {
    expectedCount: number;
    actualCount: number;
  };
}

export class ConformanceRunner {
  private adapter: IndexerAdapter;

  constructor(adapter: IndexerAdapter) {
    this.adapter = adapter;
  }

  public async runScenario(scenario: FixtureScenario): Promise<ScenarioExecutionResult> {
    try {
      const capabilities = this.adapter.getSupportedCapabilities();
      if (!capabilities.includes('query')) {
        return {
          scenarioId: scenario.scenarioId,
          passed: false,
          unsupported: true,
          error: 'Adapter does not support core "query" capability'
        };
      }

      // Execute query against the target adapter using scenario query options
      const queryOpts = scenario.queryOptions ?? {};
      const actualRecords = await this.adapter.queryEvents(queryOpts);
      const expected = scenario.expectedRecords;
      const passed = this.compareRecords(expected, actualRecords);

      return {
        scenarioId: scenario.scenarioId,
        passed,
        unsupported: false,
        details: {
          expectedCount: expected.length,
          actualCount: actualRecords.length
        }
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      return {
        scenarioId: scenario.scenarioId,
        passed: false,
        unsupported: false,
        error: errorMessage
      };
    }
  }

  private compareRecords(expected: SorobanEventRecord[], actual: SorobanEventRecord[]): boolean {
    if (expected.length !== actual.length) return false;
    for (let i = 0; i < expected.length; i++) {
      const exp = expected[i];
      const act = actual[i];
      if (!exp || !act || exp.id !== act.id || exp.contractId !== act.contractId || exp.topic !== act.topic) {
        return false;
      }
    }
    return true;
  }
}
