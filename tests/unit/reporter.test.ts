import { describe, it, expect } from 'vitest';
import { JsonReporter } from '../../src/reporters/json.js';
import type { ScenarioExecutionResult } from '../../src/core/runner.js';

describe('JsonReporter', () => {
  it('should generate a correct summary and JSON structure', () => {
    const executionResults: ScenarioExecutionResult[] = [
      { scenarioId: 'scen-1', passed: true, unsupported: false, details: { expectedCount: 1, actualCount: 1 } },
      { scenarioId: 'scen-2', passed: false, unsupported: false, error: 'Mismatch' },
      { scenarioId: 'scen-3', passed: false, unsupported: true, error: 'Unsupported capability' }
    ];

    const reporter = new JsonReporter();
    const report = reporter.generateReport(executionResults);

    expect(report.summary.total).toBe(3);
    expect(report.summary.passed).toBe(1);
    expect(report.summary.failed).toBe(1);
    expect(report.summary.unsupported).toBe(1);
    expect(report.results).toHaveLength(3);

    const jsonString = reporter.toString(executionResults);
    expect(typeof jsonString).toBe('string');
    expect(JSON.parse(jsonString)).toEqual(report);
  });
});
