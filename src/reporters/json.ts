import type { ScenarioExecutionResult } from '../core/runner.js';

export interface TestSuiteReport {
  version: string;
  timestamp: string;
  summary: {
    total: number;
    passed: number;
    failed: number;
    unsupported: number;
  };
  results: ScenarioExecutionResult[];
}

export class JsonReporter {
  public generateReport(results: ScenarioExecutionResult[]): TestSuiteReport {
    const total = results.length;
    const passed = results.filter(r => r.passed).length;
    const unsupported = results.filter(r => r.unsupported).length;
    const failed = total - passed - unsupported;

    return {
      version: '0.1.0',
      timestamp: new Date().toISOString(),
      summary: {
        total,
        passed,
        failed,
        unsupported
      },
      results
    };
  }

  public toString(input: ScenarioExecutionResult[] | TestSuiteReport): string {
    const report = Array.isArray(input) ? this.generateReport(input) : input;
    return JSON.stringify(report, null, 2);
  }
}
