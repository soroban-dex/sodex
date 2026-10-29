import { ConformanceRunner } from '../core/runner.js';
import { MockIndexerAdapter } from '../adapters/mock.js';
import { JsonReporter } from '../reporters/json.js';
import type { FixtureScenario } from '../fixtures/schema.js';

// Example built-in default scenario for CLI demonstration
const defaultScenario: FixtureScenario = {
  version: '0.1.0',
  scenarioId: 'cli-default-scenario',
  description: 'Default CLI conformance check using mock adapter',
  inputEvents: [
    { id: 'evt-cli-1', contractId: 'C1', topic: 'transfer', ledgerSequence: 1000, createdAt: new Date().toISOString(), data: { status: 'ok' } }
  ],
  expectedRecords: [
    { id: 'evt-cli-1', contractId: 'C1', topic: 'transfer', ledgerSequence: 1000, createdAt: new Date().toISOString(), data: { status: 'ok' } }
  ]
};

async function main() {
  console.log('🚀 Running Sodex Conformance Toolkit...');

  const adapter = new MockIndexerAdapter(defaultScenario.expectedRecords);
  const runner = new ConformanceRunner(adapter);
  const reporter = new JsonReporter();

  const result = await runner.runScenario(defaultScenario);
  const jsonReport = reporter.toString([result]);

  console.log(jsonReport);

  if (!result.passed) {
    console.error('❌ Conformance checks failed.');
    process.exit(1);
  } else {
    console.log('✨ All conformance checks passed successfully.');
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Fatal CLI error:', err);
  process.exit(1);
});
