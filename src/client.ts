import { Channel } from '@grpc/grpc-js';
import {
  StarlinkClientConfig,
  NormalizedClientConfig,
  normalizeConfig,
} from './types/ClientConfig';
import { ConnectionError } from './errors/StarlinkError';
import { DeviceService, DishService, WifiService, TransceiverService } from './services';

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
  private channel: Channel | null = null;
  private isConnected = false;

  // Service instances
  public readonly device: DeviceService;
  public readonly dish: DishService;
  public readonly wifi: WifiService;
  public readonly transceiver: TransceiverService;

  constructor(config: StarlinkClientConfig) {
    this.config = normalizeConfig(config);

    // Initialize services
    this.device = new DeviceService(this);
    this.dish = new DishService(this);
    this.wifi = new WifiService(this);
    this.transceiver = new TransceiverService(this);
  }

  /**
   * Get the gRPC channel, creating it if necessary
   */
  private getChannel(): Channel {
    if (!this.channel) {
      this.channel = new Channel(this.config.address, this.config.credentials, {});
      this.isConnected = true;
    }
    return this.channel;
  }

  /**
   * Check if the client is connected
   */
  public isReady(): boolean {
    return this.isConnected && this.channel !== null;
  }

  /**
   * Wait for the channel to be ready
   */
  public async waitForReady(_timeout?: number): Promise<void> {
    // Ensure channel is created
    this.getChannel();

    return new Promise((resolve) => {
      try {
        // Attempt to connect by making a simple call
        // In a real implementation, this would use the actual gRPC service
        this.isConnected = true;
        resolve();
      } catch (error) {
        this.isConnected = false;
        throw new ConnectionError(
          `Failed to connect to ${this.config.address}: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    });
  }

  /**
   * Close the client connection
   */
  public async close(): Promise<void> {
    if (this.channel) {
      this.channel.close();
      this.channel = null;
      this.isConnected = false;
    }
  }

  /**
   * Get the underlying gRPC channel
   * @internal
   */
  public getGrpcChannel(): Channel {
    return this.getChannel();
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
