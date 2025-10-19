import { StarlinkClient } from '../client';
import { NormalizedClientConfig } from '../types/ClientConfig';
import { Device } from '../../lib/ts/device/device_pb';
import { createClient } from '@connectrpc/connect';

/**
 * Base class for all service implementations
 *
 * Provides common functionality for interacting with the Starlink device
 */
export abstract class BaseService {
  protected client: StarlinkClient;
  protected config: NormalizedClientConfig;
  protected grpcClient: ReturnType<typeof createClient<typeof Device>>;

  constructor(client: StarlinkClient) {
    this.client = client;
    this.config = client.getConfig();
    this.grpcClient = client.getGrpcClient();
  }

  /**
   * Log debug message
   */
  protected debug(message: string, data?: unknown): void {
    this.client.debug(message, data);
  }

  /**
   * Check if client is ready
   */
  protected isReady(): boolean {
    return this.client.isReady();
  }
}
