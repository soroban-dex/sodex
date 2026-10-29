import { describe, it, expect } from 'vitest';
import { loadFixtureFromFile } from '../../src/fixtures/loader.js';
import { resolve } from 'node:path';

describe('Fixture Loader', () => {
  it('should load and validate the example pagination fixture from disk', async () => {
    const fixturePath = resolve(process.cwd(), 'examples/fixtures/pagination-test.json');
    const fixture = await loadFixtureFromFile(fixturePath);

    expect(fixture.version).toBe('0.1.0');
    expect(fixture.scenarioId).toBe('pagination-boundary-01');
    expect(fixture.inputEvents).toHaveLength(3);
    expect(fixture.expectedRecords).toHaveLength(1);
  });
});
