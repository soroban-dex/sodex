import type { SorobanEventRecord } from '../fixtures/schema.js';
import type { IndexerAdapter, QueryOptions } from './mock.js';

export interface SorobanRpcConfig {
  rpcUrl: string;
  fetchImpl?: typeof fetch;
}

export class SorobanRpcAdapter implements IndexerAdapter {
  public name = 'soroban-rpc-adapter';
  private rpcUrl: string;
  private fetch: typeof fetch;

  constructor(config: SorobanRpcConfig) {
    this.rpcUrl = config.rpcUrl;
    this.fetch = config.fetchImpl ?? globalThis.fetch;
  }

  public getSupportedCapabilities(): string[] {
    return ['query', 'filtering', 'pagination', 'rpc-integration'];
  }

  public async queryEvents(options: QueryOptions): Promise<SorobanEventRecord[]> {
    // Translates standard Sodex query options into Soroban JSON-RPC getEvents request payload
    const response = await this.fetch(this.rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getEvents',
        params: {
          filters: [
            ...(options.contractId ? [{ contractIds: [options.contractId] }] : []),
            ...(options.topic ? [{ topics: [[options.topic]] }] : [])
          ],
          pagination: {
            ...(options.limit ? { limit: options.limit } : {}),
            ...(options.cursor ? { cursor: options.cursor } : {})
          }
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Soroban RPC request failed with status ${response.status}`);
    }

    const data = (await response.json()) as { result?: { events?: Array<Record<string, unknown>> } };
    const rawEvents = data.result?.events ?? [];

    // Map raw RPC events to Sodex standard SorobanEventRecord schema
    return rawEvents.map((evt, index) => ({
      id: String(evt.id ?? `rpc-evt-${index}`),
      contractId: String(evt.contractId ?? ''),
      topic: String(Array.isArray(evt.topics) ? evt.topics[0] ?? '' : ''),
      ledgerSequence: Number(evt.ledger ?? 0),
      createdAt: new Date().toISOString(),
      data: (evt.value as Record<string, unknown>) ?? {}
    }));
  }
}
