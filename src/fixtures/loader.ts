import { readFile } from 'node:fs/promises';
import { validateFixture, type FixtureScenario } from './schema.js';

export async function loadFixtureFromFile(filePath: string): Promise<FixtureScenario> {
  const fileContent = await readFile(filePath, 'utf-8');
  const parsed: unknown = JSON.parse(fileContent);
  validateFixture(parsed);
  return parsed;
}
