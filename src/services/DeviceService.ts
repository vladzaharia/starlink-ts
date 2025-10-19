import { BaseService } from './BaseService';
import { StarlinkClient } from '../client';
import * as Device from '../types';
import {
  GetDeviceInfoRequestSchema,
  GetDeviceInfoResponseSchema,
  GetStatusRequestSchema,
  RebootRequestSchema,
  RebootResponseSchema,
  GetLogRequestSchema,
  GetLogResponseSchema,
  GetLocationRequestSchema,
  GetLocationResponseSchema,
  SpeedTestRequestSchema,
  SpeedTestResponseSchema,
  GetPingRequestSchema,
  GetPingResponseSchema,
  PingHostRequestSchema,
  PingHostResponseSchema,
  GetConnectionsRequestSchema,
  GetConnectionsResponseSchema,
} from '../../lib/ts/device/device_pb';
import { DishGetStatusResponseSchema } from '../../lib/ts/device/dish_pb';

/**
 * Device service for general device operations
 *
 * Provides methods for:
 * - Device information and status
 * - System operations (reboot, factory reset)
 * - Diagnostics and logging
 * - Network operations
 * - Speed testing
 * - Authentication
 */
export class DeviceService extends BaseService {
  constructor(client: StarlinkClient) {
    super(client);
  }

  /**
   * Get device information
   *
   * @example
   * ```typescript
   * const info = await client.device.getInfo({});
   * console.log('Device ID:', info.id);
   * console.log('Hardware Version:', info.hardwareVersion);
   * ```
   */
  async getInfo(
    request?: Device.Device.GetDeviceInfoRequest
  ): Promise<Device.Device.GetDeviceInfoResponse> {
    return this.call(
      'getDeviceInfo',
      GetDeviceInfoRequestSchema,
      request,
      GetDeviceInfoResponseSchema,
      'getDeviceInfo',
      'Getting device info'
    );
  }

  /**
   * Get device status
   *
   * @example
   * ```typescript
   * const status = await client.device.getStatus({});
   * console.log('Uptime:', status.uptimeS);
   * ```
   */
  async getStatus(
    request?: Device.Device.GetStatusRequest
  ): Promise<Device.Dish.DishGetStatusResponse> {
    return this.call(
      'getStatus',
      GetStatusRequestSchema,
      request,
      DishGetStatusResponseSchema,
      'dishGetStatus',
      'Getting device status'
    );
  }

  /**
   * Reboot the device
   *
   * @example
   * ```typescript
   * await client.device.reboot({});
   * ```
   */
  async reboot(request?: Device.Device.RebootRequest): Promise<Device.Device.RebootResponse> {
    return this.call(
      'reboot',
      RebootRequestSchema,
      request,
      RebootResponseSchema,
      'reboot',
      'Rebooting device'
    );
  }

  /**
   * Get device logs
   *
   * @example
   * ```typescript
   * const logs = await client.device.getLogs({});
   * console.log('Syslog:', logs.syslog);
   * ```
   */
  async getLogs(request?: Device.Device.GetLogRequest): Promise<Device.Device.GetLogResponse> {
    return this.call(
      'getLog',
      GetLogRequestSchema,
      request,
      GetLogResponseSchema,
      'getLog',
      'Getting device logs'
    );
  }

  /**
   * Get device location
   *
   * @example
   * ```typescript
   * const location = await client.device.getLocation({ source: PositionSource.GPS });
   * console.log('Latitude:', location.latitude);
   * console.log('Longitude:', location.longitude);
   * ```
   */
  async getLocation(
    request?: Device.Device.GetLocationRequest
  ): Promise<Device.Device.GetLocationResponse> {
    return this.call(
      'getLocation',
      GetLocationRequestSchema,
      request,
      GetLocationResponseSchema,
      'getLocation',
      'Getting device location'
    );
  }

  /**
   * Perform a speed test
   *
   * @example
   * ```typescript
   * const result = await client.device.speedTest(request);
   * console.log('Download:', result.downloadMbps);
   * console.log('Upload:', result.uploadMbps);
   * ```
   */
  async speedTest(
    request?: Device.Device.SpeedTestRequest
  ): Promise<Device.Device.SpeedTestResponse> {
    return this.call(
      'speedTest',
      SpeedTestRequestSchema,
      request,
      SpeedTestResponseSchema,
      'speedTest',
      'Running speed test'
    );
  }

  /**
   * Get ping statistics
   *
   * @example
   * ```typescript
   * const ping = await client.device.getPing({});
   * console.log('Results:', ping.results);
   * ```
   */
  async getPing(request?: Device.Device.GetPingRequest): Promise<Device.Device.GetPingResponse> {
    return this.call(
      'getPing',
      GetPingRequestSchema,
      request,
      GetPingResponseSchema,
      'getPing',
      'Getting ping statistics'
    );
  }

  /**
   * Ping a specific host
   *
   * @example
   * ```typescript
   * const result = await client.device.pingHost({ address: '8.8.8.8' });
   * console.log('Latency:', result.latencyMs);
   * ```
   */
  async pingHost(request: Device.Device.PingHostRequest): Promise<Device.Device.PingHostResponse> {
    return this.call(
      'pingHost',
      PingHostRequestSchema,
      request,
      PingHostResponseSchema,
      'pingHost',
      'Pinging host'
    );
  }

  /**
   * Get network interfaces
   *
   * @example
   * ```typescript
   * const interfaces = await client.device.getNetworkInterfaces({});
   * console.log('Interfaces:', interfaces);
   * ```
   */
  async getNetworkInterfaces(
    request: Device.Device.GetConnectionsRequest
  ): Promise<Device.Device.GetConnectionsResponse> {
    return this.call(
      'getConnections',
      GetConnectionsRequestSchema,
      request,
      GetConnectionsResponseSchema,
      'getConnections',
      'Getting network interfaces'
    );
  }
}
