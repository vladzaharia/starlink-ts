import { BaseService } from './BaseService';
import { StarlinkClient } from '../client';
import * as Device from '../types';
import { create } from '@bufbuild/protobuf';
import { RequestSchema, GetStatusRequestSchema } from '../../lib/ts/device/device_pb';
import {
  WifiGetClientsRequestSchema,
  WifiGetClientsResponseSchema,
  WifiGetConfigRequestSchema,
  WifiGetConfigResponseSchema,
  WifiSetConfigRequestSchema,
  WifiSetConfigResponseSchema,
  WifiSetupRequestSchema,
  WifiSetupResponseSchema,
  WifiGetStatusResponseSchema,
  WifiGetPingMetricsRequestSchema,
  WifiGetPingMetricsResponseSchema,
  WifiGetClientHistoryRequestSchema,
  WifiGetClientHistoryResponseSchema,
  WifiSetClientGivenNameRequestSchema,
  WifiSelfTestRequestSchema,
  WifiSelfTestResponseSchema,
  WifiRunSelfTestRequestSchema,
  WifiGetFirewallRequestSchema,
  WifiGetFirewallResponseSchema,
  WifiGuestInfoRequestSchema,
  WifiGuestInfoResponseSchema,
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
  async getClients(
    request?: Device.WiFi.WifiGetClientsRequest
  ): Promise<Device.WiFi.WifiGetClientsResponse> {
    return this.call(
      'wifiGetClients',
      WifiGetClientsRequestSchema,
      request,
      WifiGetClientsResponseSchema,
      'wifiGetClients',
      'Getting WiFi clients'
    );
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
  async getConfig(
    request?: Device.WiFi.WifiGetConfigRequest
  ): Promise<Device.WiFi.WifiGetConfigResponse> {
    return this.call(
      'wifiGetConfig',
      WifiGetConfigRequestSchema,
      request,
      WifiGetConfigResponseSchema,
      'wifiGetConfig',
      'Getting WiFi config'
    );
  }

  /**
   * Set WiFi configuration
   *
   * @example
   * ```typescript
   * await client.wifi.setConfig({ config: {...} });
   * ```
   */
  async setConfig(
    request: Device.WiFi.WifiSetConfigRequest
  ): Promise<Device.WiFi.WifiSetConfigResponse> {
    return this.call(
      'wifiSetConfig',
      WifiSetConfigRequestSchema,
      request,
      WifiSetConfigResponseSchema,
      'wifiSetConfig',
      'Setting WiFi config'
    );
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
    return this.call(
      'wifiSetup',
      WifiSetupRequestSchema,
      request,
      WifiSetupResponseSchema,
      'wifiSetup',
      'Setting up WiFi'
    );
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
    return this.call(
      'getStatus',
      GetStatusRequestSchema,
      undefined,
      WifiGetStatusResponseSchema,
      'wifiGetStatus',
      'Getting WiFi status'
    );
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
  async getPingMetrics(
    request?: Device.WiFi.WifiGetPingMetricsRequest
  ): Promise<Device.WiFi.WifiGetPingMetricsResponse> {
    return this.call(
      'wifiGetPingMetrics',
      WifiGetPingMetricsRequestSchema,
      request,
      WifiGetPingMetricsResponseSchema,
      'wifiGetPingMetrics',
      'Getting ping metrics'
    );
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
  async getClientHistory(
    request?: Device.WiFi.WifiGetClientHistoryRequest
  ): Promise<Device.WiFi.WifiGetClientHistoryResponse> {
    return this.call(
      'wifiGetClientHistory',
      WifiGetClientHistoryRequestSchema,
      request,
      WifiGetClientHistoryResponseSchema,
      'wifiGetClientHistory',
      'Getting client history'
    );
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
      request: {
        case: 'wifiSetClientGivenName',
        value: create(WifiSetClientGivenNameRequestSchema, request),
      },
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
  async getDiagnostics(
    request?: Device.WiFi.WifiSelfTestRequest
  ): Promise<Device.WiFi.WifiSelfTestResponse> {
    return this.call(
      'wifiSelfTest',
      WifiSelfTestRequestSchema,
      request,
      WifiSelfTestResponseSchema,
      'wifiSelfTest',
      'Getting WiFi diagnostics'
    );
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
  async runSelfTest(
    request: Device.WiFi.WifiRunSelfTestRequest
  ): Promise<Device.WiFi.WifiSelfTestResponse> {
    return this.call(
      'wifiRunSelfTest',
      WifiRunSelfTestRequestSchema,
      request,
      WifiSelfTestResponseSchema,
      'wifiSelfTest',
      'Running WiFi self test'
    );
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
  async getFirewall(
    request: Device.WiFi.WifiGetFirewallRequest
  ): Promise<Device.WiFi.WifiGetFirewallResponse> {
    return this.call(
      'wifiGetFirewall',
      WifiGetFirewallRequestSchema,
      request,
      WifiGetFirewallResponseSchema,
      'wifiGetFirewall',
      'Getting firewall settings'
    );
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
  async getGuestInfo(
    request: Device.WiFi.WifiGuestInfoRequest
  ): Promise<Device.WiFi.WifiGuestInfoResponse> {
    return this.call(
      'wifiGuestInfo',
      WifiGuestInfoRequestSchema,
      request,
      WifiGuestInfoResponseSchema,
      'wifiGuestInfo',
      'Getting guest info'
    );
  }
}
