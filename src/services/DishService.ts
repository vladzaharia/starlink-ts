import { BaseService } from './BaseService';
import { StarlinkClient } from '../client';
import * as Device from '../types';
import { create } from '@bufbuild/protobuf';
import {
  RequestSchema,
  GetStatusRequestSchema,
  DishGetEmcRequestSchema,
  DishSetEmcRequestSchema,
  DishPowerSaveRequestSchema,
  GetDiagnosticsRequestSchema,
} from '../../lib/ts/device/device_pb';
import {
  DishStowRequestSchema,
  DishGetContextRequestSchema,
  DishGetObstructionMapRequestSchema,
  DishClearObstructionMapRequestSchema,
  DishSetConfigRequestSchema,
  DishGetConfigRequestSchema,
  DishActivateRssiScanRequestSchema,
  DishGetRssiScanResultRequestSchema,
} from '../../lib/ts/device/dish_pb';

/**
 * Dish service for satellite dish operations
 *
 * Provides methods for:
 * - Dish positioning and stowing
 * - Obstruction detection and mapping
 * - EMC (Electromagnetic Compatibility) configuration
 * - Dish configuration and status
 * - Power management
 * - RSSI scanning
 * - Diagnostics
 */
export class DishService extends BaseService {
  constructor(client: StarlinkClient) {
    super(client);
  }

  /**
   * Get dish context information
   *
   * @example
   * ```typescript
   * const context = await client.dish.getContext({});
   * console.log('Cell ID:', context.cellId);
   * console.log('Obstruction:', context.obstructionFraction);
   * ```
   */
  async getContext(
    request?: Device.Dish.DishGetContextRequest
  ): Promise<Device.Dish.DishGetContextResponse> {
    this.debug('Getting dish context', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'dishGetContext', value: create(DishGetContextRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'dishGetContext') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
  }

  /**
   * Get dish status
   *
   * @example
   * ```typescript
   * const status = await client.dish.getStatus({});
   * console.log('Boresight Azimuth:', status.boresightAzimuthDeg);
   * console.log('Boresight Elevation:', status.boresightElevationDeg);
   * ```
   */
  async getStatus(): Promise<Device.Dish.DishGetStatusResponse> {
    this.debug('Getting dish status');
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'getStatus', value: create(GetStatusRequestSchema) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'dishGetStatus') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
  }

  /**
   * Stow or unstow the dish
   *
   * @example
   * ```typescript
   * await client.dish.stow({ unstow: false });
   * ```
   */
  async stow(request?: Device.Dish.DishStowRequest): Promise<Device.Dish.DishStowResponse> {
    this.debug('Stowing dish', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'dishStow', value: create(DishStowRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'dishStow') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
  }

  /**
   * Get obstruction map
   *
   * @example
   * ```typescript
   * const map = await client.dish.getObstructionMap({});
   * console.log('Obstruction data:', map.snr);
   * ```
   */
  async getObstructionMap(
    request?: Device.Dish.DishGetObstructionMapRequest
  ): Promise<Device.Dish.DishGetObstructionMapResponse> {
    this.debug('Getting obstruction map', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: {
        case: 'dishGetObstructionMap',
        value: create(DishGetObstructionMapRequestSchema, request),
      },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'dishGetObstructionMap') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
  }

  /**
   * Clear obstruction map
   *
   * @example
   * ```typescript
   * await client.dish.clearObstructionMap({});
   * ```
   */
  async clearObstructionMap(
    request?: Device.Dish.DishClearObstructionMapRequest
  ): Promise<Device.Dish.DishClearObstructionMapResponse> {
    this.debug('Clearing obstruction map', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: {
        case: 'dishClearObstructionMap',
        value: create(DishClearObstructionMapRequestSchema, request),
      },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'dishClearObstructionMap') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
  }

  /**
   * Get EMC (Electromagnetic Compatibility) settings
   *
   * @example
   * ```typescript
   * const emc = await client.dish.getEmc({});
   * console.log('EMC settings:', emc);
   * ```
   */
  async getEmc(
    request?: Device.Device.DishGetEmcRequest
  ): Promise<Device.Device.DishGetEmcResponse> {
    this.debug('Getting EMC settings', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'dishGetEmc', value: create(DishGetEmcRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'dishGetEmc') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
  }

  /**
   * Set EMC (Electromagnetic Compatibility) settings
   *
   * @example
   * ```typescript
   * await client.dish.setEmc({ theta: 45.0, phi: 90.0 });
   * ```
   */
  async setEmc(
    request: Device.Device.DishSetEmcRequest
  ): Promise<Device.Device.DishSetEmcResponse> {
    this.debug('Setting EMC settings', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'dishSetEmc', value: create(DishSetEmcRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'dishSetEmc') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
  }

  /**
   * Get dish configuration
   *
   * @example
   * ```typescript
   * const config = await client.dish.getConfig({});
   * console.log('Config:', config);
   * ```
   */
  async getConfig(
    request?: Device.Dish.DishGetConfigRequest
  ): Promise<Device.Dish.DishGetConfigResponse> {
    this.debug('Getting dish config', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'dishGetConfig', value: create(DishGetConfigRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'dishGetConfig') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
  }

  /**
   * Set dish configuration
   *
   * @example
   * ```typescript
   * await client.dish.setConfig({ config: {...} });
   * ```
   */
  async setConfig(
    request: Device.Dish.DishSetConfigRequest
  ): Promise<Device.Dish.DishSetConfigResponse> {
    this.debug('Setting dish config', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'dishSetConfig', value: create(DishSetConfigRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'dishSetConfig') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
  }

  /**
   * Enable or disable power save mode
   *
   * @example
   * ```typescript
   * await client.dish.setPowerSave({
   *   enablePowerSave: true,
   *   powerSaveStartMinutes: 0,
   *   powerSaveDurationMinutes: 60
   * });
   * ```
   */
  async setPowerSave(request: Device.Device.DishPowerSaveRequest): Promise<void> {
    this.debug('Setting power save', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'dishPowerSave', value: create(DishPowerSaveRequestSchema, request) },
    });
    await this.grpcClient.handle(req);
  }

  /**
   * Activate RSSI scan
   *
   * @example
   * ```typescript
   * const result = await client.dish.activateRssiScan({...});
   * console.log('Scan success:', result.success);
   * ```
   */
  async activateRssiScan(
    request: Device.Dish.DishActivateRssiScanRequest
  ): Promise<Device.Dish.DishActivateRssiScanResponse> {
    this.debug('Activating RSSI scan', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: {
        case: 'dishActivateRssiScan',
        value: create(DishActivateRssiScanRequestSchema, request),
      },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'dishActivateRssiScan') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
  }

  /**
   * Get RSSI scan results
   *
   * @example
   * ```typescript
   * const results = await client.dish.getRssiScanResult({});
   * console.log('Results:', results);
   * ```
   */
  async getRssiScanResult(
    request?: Device.Dish.DishGetRssiScanResultRequest
  ): Promise<Device.Dish.DishGetRssiScanResultResponse> {
    this.debug('Getting RSSI scan results', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: {
        case: 'dishGetRssiScanResult',
        value: create(DishGetRssiScanResultRequestSchema, request),
      },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'dishGetRssiScanResult') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
  }

  /**
   * Get dish diagnostics
   *
   * @example
   * ```typescript
   * const diag = await client.dish.getDiagnostics({});
   * console.log('Diagnostics:', diag);
   * ```
   */
  async getDiagnostics(): Promise<Device.Device.DishGetDiagnosticsResponse> {
    this.debug('Getting dish diagnostics');
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'getDiagnostics', value: create(GetDiagnosticsRequestSchema) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'dishGetDiagnostics') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
  }
}
