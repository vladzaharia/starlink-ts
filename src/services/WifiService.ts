import { BaseService } from './BaseService';
import { StarlinkClient } from '../client';
import * as Device from '../types';
import { create } from '@bufbuild/protobuf';
import { RequestSchema, GetStatusRequestSchema } from '../../lib/ts/device/device_pb';
import {
  WifiGetClientsRequestSchema,
  WifiGetConfigRequestSchema,
  WifiSetConfigRequestSchema,
  WifiSetupRequestSchema,
  WifiGetPingMetricsRequestSchema,
  WifiGetClientHistoryRequestSchema,
  WifiSetClientGivenNameRequestSchema,
  WifiSelfTestRequestSchema,
  WifiRunSelfTestRequestSchema,
  WifiGetFirewallRequestSchema,
  WifiGuestInfoRequestSchema,
} from '../../lib/ts/device/wifi_pb';

/**
 * WiFi service for router operations
 *
 * Provides methods for:
 * - Client management
 * - WiFi configuration
 * - Mesh networking
 * - Diagnostics
 * - Performance testing
 */
export class WifiService extends BaseService {
  constructor(client: StarlinkClient) {
    super(client);
  }

  /**
   * Get connected WiFi clients
   *
   * @example
   * ```typescript
   * const clients = await client.wifi.getClients({});
   * console.log('Connected clients:', clients);
   * ```
   */
  async getClients(request?: Device.WiFi.WifiGetClientsRequest): Promise<Device.WiFi.WifiGetClientsResponse> {
    this.debug('Getting WiFi clients', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'wifiGetClients', value: create(WifiGetClientsRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'wifiGetClients') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
  }

  /**
   * Get WiFi configuration
   *
   * @example
   * ```typescript
   * const config = await client.wifi.getConfig({});
   * console.log('WiFi Config:', config);
   * ```
   */
  async getConfig(request?: Device.WiFi.WifiGetConfigRequest): Promise<Device.WiFi.WifiGetConfigResponse> {
    this.debug('Getting WiFi config', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'wifiGetConfig', value: create(WifiGetConfigRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'wifiGetConfig') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
  }

  /**
   * Set WiFi configuration
   *
   * @example
   * ```typescript
   * await client.wifi.setConfig({ config: {...} });
   * ```
   */
  async setConfig(request: Device.WiFi.WifiSetConfigRequest): Promise<Device.WiFi.WifiSetConfigResponse> {
    this.debug('Setting WiFi config', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'wifiSetConfig', value: create(WifiSetConfigRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'wifiSetConfig') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
  }

  /**
   * Setup WiFi
   *
   * @example
   * ```typescript
   * await client.wifi.setup({...});
   * ```
   */
  async setup(request: Device.WiFi.WifiSetupRequest): Promise<Device.WiFi.WifiSetupResponse> {
    this.debug('Setting up WiFi', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'wifiSetup', value: create(WifiSetupRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'wifiSetup') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
  }

  /**
   * Get WiFi status
   *
   * @example
   * ```typescript
   * const status = await client.wifi.getStatus({});
   * console.log('WiFi Status:', status);
   * ```
   */
  async getStatus(): Promise<Device.WiFi.WifiGetStatusResponse> {
    this.debug('Getting WiFi status');
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'getStatus', value: create(GetStatusRequestSchema) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'wifiGetStatus') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
  }

  /**
   * Get ping metrics
   *
   * @example
   * ```typescript
   * const metrics = await client.wifi.getPingMetrics({});
   * console.log('Ping Metrics:', metrics);
   * ```
   */
  async getPingMetrics(request?: Device.WiFi.WifiGetPingMetricsRequest): Promise<Device.WiFi.WifiGetPingMetricsResponse> {
    this.debug('Getting ping metrics', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'wifiGetPingMetrics', value: create(WifiGetPingMetricsRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'wifiGetPingMetrics') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
  }

  /**
   * Get client history
   *
   * @example
   * ```typescript
   * const history = await client.wifi.getClientHistory({});
   * console.log('Client History:', history);
   * ```
   */
  async getClientHistory(request?: Device.WiFi.WifiGetClientHistoryRequest): Promise<Device.WiFi.WifiGetClientHistoryResponse> {
    this.debug('Getting client history', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'wifiGetClientHistory', value: create(WifiGetClientHistoryRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'wifiGetClientHistory') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
  }

  /**
   * Set client given name
   *
   * @example
   * ```typescript
   * await client.wifi.setClientGivenName({ clientId: '...', givenName: 'My Device' });
   * ```
   */
  async setClientGivenName(request: Device.WiFi.WifiSetClientGivenNameRequest): Promise<void> {
    this.debug('Setting client given name', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'wifiSetClientGivenName', value: create(WifiSetClientGivenNameRequestSchema, request) },
    });
    await this.grpcClient.handle(req);
  }

  /**
   * Get WiFi diagnostics
   *
   * @example
   * ```typescript
   * const diag = await client.wifi.getDiagnostics({});
   * console.log('Diagnostics:', diag);
   * ```
   */
  async getDiagnostics(request?: Device.WiFi.WifiSelfTestRequest): Promise<Device.WiFi.WifiSelfTestResponse> {
    this.debug('Getting WiFi diagnostics', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'wifiSelfTest', value: create(WifiSelfTestRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'wifiSelfTest') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
  }

  /**
   * Run WiFi self test
   *
   * @example
   * ```typescript
   * const result = await client.wifi.runSelfTest({});
   * console.log('Test passed:', result.passed);
   * ```
   */
  async runSelfTest(request: Device.WiFi.WifiRunSelfTestRequest): Promise<Device.WiFi.WifiSelfTestResponse> {
    this.debug('Running WiFi self test', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'wifiRunSelfTest', value: create(WifiRunSelfTestRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'wifiSelfTest') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
  }

  /**
   * Get firewall settings
   *
   * @example
   * ```typescript
   * const firewall = await client.wifi.getFirewall({});
   * console.log('Firewall:', firewall);
   * ```
   */
  async getFirewall(request: Device.WiFi.WifiGetFirewallRequest): Promise<Device.WiFi.WifiGetFirewallResponse> {
    this.debug('Getting firewall settings', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'wifiGetFirewall', value: create(WifiGetFirewallRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'wifiGetFirewall') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
  }

  /**
   * Get guest info
   *
   * @example
   * ```typescript
   * const guest = await client.wifi.getGuestInfo({});
   * console.log('Guest Info:', guest);
   * ```
   */
  async getGuestInfo(request: Device.WiFi.WifiGuestInfoRequest): Promise<Device.WiFi.WifiGuestInfoResponse> {
    this.debug('Getting guest info', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'wifiGuestInfo', value: create(WifiGuestInfoRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'wifiGuestInfo') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
  }
}
