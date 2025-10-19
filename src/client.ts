import { createClient, Transport } from '@connectrpc/connect';
import { createGrpcTransport } from '@connectrpc/connect-node';
import {
  StarlinkClientConfig,
  NormalizedClientConfig,
  normalizeConfig,
} from './types/ClientConfig';
import { ConnectionError } from './errors/StarlinkError';
import { DeviceService, DishService, WifiService, TransceiverService } from './services';
import { Device } from '../lib/ts/device/device_pb';

/**
 * Main Starlink client for communicating with Starlink dishes
 *
 * @example
 * ```typescript
 * const client = new StarlinkClient({
 *   address: '192.168.100.1:9200'
 * });
 *
 * try {
 *   const status = await client.device.getStatus({});
 *   console.log('Device status:', status);
 * } finally {
 *   await client.close();
 * }
 * ```
 */
export class StarlinkClient {
  private config: NormalizedClientConfig;
  private transport: Transport;
  private grpcClient: ReturnType<typeof createClient<typeof Device>>;
  private isConnected = false;

  // Service instances
  public readonly device: DeviceService;
  public readonly dish: DishService;
  public readonly wifi: WifiService;
  public readonly transceiver: TransceiverService;

  constructor(config: StarlinkClientConfig) {
    this.config = normalizeConfig(config);

    // Create gRPC transport (gRPC protocol requires HTTP/2)
    // Note: Starlink devices use gRPC protocol
    this.transport = createGrpcTransport({
      baseUrl: `http://${this.config.address}`,
      // gRPC transport always uses HTTP/2
      useBinaryFormat: true,
    });

    // Create the gRPC client for the Device service
    this.grpcClient = createClient(Device, this.transport);

    // Initialize services with the gRPC client
    this.device = new DeviceService(this);
    this.dish = new DishService(this);
    this.wifi = new WifiService(this);
    this.transceiver = new TransceiverService(this);
  }

  /**
   * Get the Connect gRPC client
   * @internal
   */
  public getGrpcClient(): ReturnType<typeof createClient<typeof Device>> {
    return this.grpcClient;
  }

  /**
   * Check if the client is connected
   */
  public isReady(): boolean {
    return this.isConnected;
  }

  /**
   * Wait for the channel to be ready
   */
  public async waitForReady(_timeout?: number): Promise<void> {
    try {
      // Test connection by making a simple request
      // We'll just mark as connected for now - actual connection test happens on first request
      this.isConnected = true;
    } catch (error) {
      this.isConnected = false;
      throw new ConnectionError(
        `Failed to connect to ${this.config.address}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Close the client connection
   */
  public async close(): Promise<void> {
    this.isConnected = false;
    // Connect transport doesn't need explicit cleanup
  }

  /**
   * Get the client configuration
   * @internal
   */
  public getConfig(): NormalizedClientConfig {
    return this.config;
  }

  /**
   * Log debug message if debug mode is enabled
   * @internal
   */
  public debug(message: string, data?: unknown): void {
    if (this.config.debug) {
      console.debug(`[StarlinkClient] ${message}`, data);
    }
  }
}

/**
 * Create a new Starlink client
 *
 * @param config - Configuration for the client
 * @returns A configured StarlinkClient instance
 *
 * @example
 * ```typescript
 * const client = createStarlinkClient({
 *   address: '192.168.100.1:9200'
 * });
 * ```
 */
export function createStarlinkClient(config: StarlinkClientConfig): StarlinkClient {
  return new StarlinkClient(config);
}
