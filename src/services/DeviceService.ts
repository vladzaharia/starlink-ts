import { BaseService } from './BaseService';
import { StarlinkClient } from '../client';
import * as Device from '../types';
import { create } from '@bufbuild/protobuf';
import {
  RequestSchema,
  GetDeviceInfoRequestSchema,
  GetStatusRequestSchema,
  RebootRequestSchema,
  GetLogRequestSchema,
  GetLocationRequestSchema,
  SpeedTestRequestSchema,
  GetPingRequestSchema,
  PingHostRequestSchema,
  GetConnectionsRequestSchema,
} from '../../lib/ts/device/device_pb';

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
    this.debug('Getting device info', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'getDeviceInfo', value: create(GetDeviceInfoRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'getDeviceInfo') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
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
    this.debug('Getting device status', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'getStatus', value: create(GetStatusRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'dishGetStatus') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
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
    this.debug('Rebooting device', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'reboot', value: create(RebootRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'reboot') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
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
    this.debug('Getting device logs', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'getLog', value: create(GetLogRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'getLog') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
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
    this.debug('Getting device location', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'getLocation', value: create(GetLocationRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'getLocation') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
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
    this.debug('Running speed test', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'speedTest', value: create(SpeedTestRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'speedTest') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
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
    this.debug('Getting ping statistics', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'getPing', value: create(GetPingRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'getPing') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
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
    this.debug('Pinging host', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'pingHost', value: create(PingHostRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'pingHost') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
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
    this.debug('Getting network interfaces', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'getConnections', value: create(GetConnectionsRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'getConnections') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
  }
}
