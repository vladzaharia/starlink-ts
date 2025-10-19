import { ChannelCredentials } from '@grpc/grpc-js';

/**
 * Configuration options for the Starlink client
 */
export interface StarlinkClientConfig {
  /**
   * The address of the Starlink dish (e.g., '192.168.100.1:9200')
   * @default '192.168.100.1:9200'
   */
  address?: string;

  /**
   * Optional channel credentials for secure connections
   * Defaults to insecure credentials
   */
  credentials?: ChannelCredentials;

  /**
   * Request timeout in milliseconds
   * @default 30000 (30 seconds)
   */
  requestTimeout?: number;

  /**
   * Connection timeout in milliseconds
   * @default 10000 (10 seconds)
   */
  connectionTimeout?: number;

  /**
   * Maximum number of retries for failed requests
   * @default 3
   */
  maxRetries?: number;

  /**
   * Enable automatic reconnection
   * @default true
   */
  autoReconnect?: boolean;

  /**
   * Initial backoff delay for reconnection in milliseconds
   * @default 1000
   */
  reconnectBackoffMs?: number;

  /**
   * Maximum backoff delay for reconnection in milliseconds
   * @default 30000
   */
  maxReconnectBackoffMs?: number;

  /**
   * Enable debug logging
   * @default false
   */
  debug?: boolean;
}

/**
 * Normalized client configuration with defaults applied
 */
export interface NormalizedClientConfig extends Required<StarlinkClientConfig> {
  credentials: ChannelCredentials;
}

/**
 * Apply defaults to client configuration
 */
export function normalizeConfig(config: StarlinkClientConfig): NormalizedClientConfig {
  return {
    address: config.address ?? '192.168.100.1:9200',
    credentials: config.credentials || ChannelCredentials.createInsecure(),
    requestTimeout: config.requestTimeout ?? 30000,
    connectionTimeout: config.connectionTimeout ?? 10000,
    maxRetries: config.maxRetries ?? 3,
    autoReconnect: config.autoReconnect ?? true,
    reconnectBackoffMs: config.reconnectBackoffMs ?? 1000,
    maxReconnectBackoffMs: config.maxReconnectBackoffMs ?? 30000,
    debug: config.debug ?? false,
  };
}
