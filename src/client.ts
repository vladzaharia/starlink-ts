import { ChannelCredentials } from '@grpc/grpc-js';
import { DeviceClient } from '../generated/proto/device';

/**
 * Configuration options for the Starlink client
 */
export interface StarlinkClientConfig {
  /**
   * The address of the Starlink dish (e.g., '192.168.100.1:9200')
   */
  address: string;

  /**
   * Optional channel credentials for secure connections
   * Defaults to insecure credentials
   */
  credentials?: ChannelCredentials;
}

/**
 * Creates a new Starlink Device client
 *
 * @param config - Configuration for the client
 * @returns A configured DeviceClient instance
 *
 * @example
 * ```typescript
 * const client = createStarlinkClient({
 *   address: '192.168.100.1:9200'
 * });
 *
 * client.getDeviceInfo({}, (err, response) => {
 *   if (err) {
 *     console.error('Error:', err);
 *     return;
 *   }
 *   console.log('Device ID:', response.id);
 * });
 * ```
 */
export function createStarlinkClient(config: StarlinkClientConfig): DeviceClient {
  const credentials = config.credentials || ChannelCredentials.createInsecure();
  return new DeviceClient(config.address, credentials);
}
