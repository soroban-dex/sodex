import { ConformanceRunner } from '../core/runner.js';
import { MockIndexerAdapter } from '../adapters/mock.js';
import { JsonReporter } from '../reporters/json.js';
import { loadFixtureFromFile } from '../fixtures/loader.js';
import type { FixtureScenario } from '../fixtures/schema.js';
import { resolve } from 'node:path';
import { readdir } from 'node:fs/promises';

async function main() {
  const args = process.argv.slice(2);
  let specificFixture: string | undefined;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--fixture' && args[i + 1]) {
      specificFixture = args[i + 1];
      break;
    }
  }

  const scenarios: FixtureScenario[] = [];

  if (specificFixture) {
    const resolvedPath = resolve(process.cwd(), specificFixture);
    console.log(`📂 Loading single fixture: ${resolvedPath}`);
    scenarios.push(await loadFixtureFromFile(resolvedPath));
  } else {
    const fixturesDir = resolve(process.cwd(), 'examples/fixtures');
    console.log(`📂 Discovering fixtures in directory: ${fixturesDir}`);
    const files = await readdir(fixturesDir);
    const jsonFiles = files.filter(f => f.endsWith('.json')).sort();

    for (const file of jsonFiles) {
      const filePath = resolve(fixturesDir, file);
      const scenario = await loadFixtureFromFile(filePath);
      scenarios.push(scenario);
    }
    console.log(`✨ Loaded ${scenarios.length} conformance scenarios.`);
  }

  console.log(`🚀 Running Sodex Conformance Suite...`);

  const reporter = new JsonReporter();
  const executionResults = [];

  for (const scenario of scenarios) {
    const adapter = new MockIndexerAdapter(scenario.inputEvents);
    const runner = new ConformanceRunner(adapter);
    const result = await runner.runScenario(scenario);
    executionResults.push(result);
    console.log(`   - Scenario [${scenario.scenarioId}]: ${result.passed ? '✅ PASSED' : '❌ FAILED'}`);
  }

  const jsonReport = reporter.toString(executionResults);
  console.log('\n📊 Aggregated JSON Report:');
  console.log(jsonReport);

  const hasFailures = executionResults.some(r => !r.passed);

  if (hasFailures) {
    console.error('\n❌ Some conformance checks failed.');
    process.exit(1);
  } else {
    console.log('\n✨ All conformance checks passed successfully.');
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Fatal CLI error:', err);
  process.exit(1);
});
