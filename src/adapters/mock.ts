import type { SorobanEventRecord } from '../fixtures/schema.js';

export interface QueryOptions {
  contractId?: string;
  topic?: string;
  limit?: number;
  cursor?: string;
}

export interface IndexerAdapter {
  name: string;
  getSupportedCapabilities(): string[];
  queryEvents(options: QueryOptions): Promise<SorobanEventRecord[]>;
}

export class MockIndexerAdapter implements IndexerAdapter {
  public name = 'mock-indexer';
  private records: SorobanEventRecord[];

  constructor(records: SorobanEventRecord[] = []) {
    this.records = records;
  }

  public getSupportedCapabilities(): string[] {
    return ['query', 'filtering', 'pagination', 'mock-replay'];
  }

  public async queryEvents(options: QueryOptions): Promise<SorobanEventRecord[]> {
    let results = [...this.records];

    if (options.contractId) {
      results = results.filter(r => r.contractId === options.contractId);
    }

    if (options.topic) {
      results = results.filter(r => r.topic === options.topic);
    }

    if (options.cursor) {
      const cursorIndex = results.findIndex(r => r.id === options.cursor);
      if (cursorIndex !== -1) {
        results = results.slice(cursorIndex + 1);
      }
    }

    const limit = options.limit ?? results.length;
    return results.slice(0, limit);
  }
}
