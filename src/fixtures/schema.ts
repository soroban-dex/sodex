export interface SorobanEventRecord {
  id: string;
  contractId: string;
  topic: string;
  ledgerSequence: number;
  createdAt: string;
  data: Record<string, unknown>;
}

export interface FixtureScenario {
  version: string;
  scenarioId: string;
  description: string;
  inputEvents: SorobanEventRecord[];
  expectedRecords: SorobanEventRecord[];
}

export function validateFixture(data: unknown): asserts data is FixtureScenario {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid fixture: must be an object');
  }
  
  const fixture = data as Partial<FixtureScenario>;
  
  if (typeof fixture.version !== 'string' || !fixture.version) {
    throw new Error('Invalid fixture: missing or invalid "version"');
  }
  if (typeof fixture.scenarioId !== 'string' || !fixture.scenarioId) {
    throw new Error('Invalid fixture: missing or invalid "scenarioId"');
  }
  if (!Array.isArray(fixture.inputEvents)) {
    throw new Error('Invalid fixture: "inputEvents" must be an array');
  }
  if (!Array.isArray(fixture.expectedRecords)) {
    throw new Error('Invalid fixture: "expectedRecords" must be an array');
  }
}
