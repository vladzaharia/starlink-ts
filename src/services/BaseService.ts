import { StarlinkClient } from '../client';
import { NormalizedClientConfig } from '../types/ClientConfig';
import { Channel } from '@grpc/grpc-js';

/**
 * Base class for all service implementations
 *
 * Provides common functionality for interacting with the Starlink device
 */
export abstract class BaseService {
  protected client: StarlinkClient;
  protected config: NormalizedClientConfig;

  constructor(client: StarlinkClient) {
    this.client = client;
    this.config = client.getConfig();
  }

  /**
   * Get the underlying gRPC channel
   */
  protected getChannel(): Channel {
    return this.client.getGrpcChannel();
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
