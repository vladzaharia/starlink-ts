import { BaseService } from './BaseService';
import { StarlinkClient } from '../client';
import * as Device from '../types';
import { create } from '@bufbuild/protobuf';
import {
  RequestSchema,
  GetStatusRequestSchema,
  DishGetEmcRequestSchema,
  DishSetEmcRequestSchema,
  DishSetEmcResponseSchema,
  DishGetEmcResponseSchema,
  DishPowerSaveRequestSchema,
  GetDiagnosticsRequestSchema,
  DishGetDiagnosticsResponseSchema,
} from '../../lib/ts/device/device_pb';
import {
  DishStowRequestSchema,
  DishStowResponseSchema,
  DishGetContextRequestSchema,
  DishGetContextResponseSchema,
  DishGetStatusResponseSchema,
  DishGetObstructionMapRequestSchema,
  DishGetObstructionMapResponseSchema,
  DishClearObstructionMapRequestSchema,
  DishClearObstructionMapResponseSchema,
  DishSetConfigRequestSchema,
  DishSetConfigResponseSchema,
  DishGetConfigRequestSchema,
  DishGetConfigResponseSchema,
  DishActivateRssiScanRequestSchema,
  DishActivateRssiScanResponseSchema,
  DishGetRssiScanResultRequestSchema,
  DishGetRssiScanResultResponseSchema,
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
    return this.call(
      'dishGetContext',
      DishGetContextRequestSchema,
      request,
      DishGetContextResponseSchema,
      'dishGetContext',
      'Getting dish context'
    );
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
    return this.call(
      'getStatus',
      GetStatusRequestSchema,
      undefined,
      DishGetStatusResponseSchema,
      'dishGetStatus',
      'Getting dish status'
    );
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
    return this.call(
      'dishStow',
      DishStowRequestSchema,
      request,
      DishStowResponseSchema,
      'dishStow',
      'Stowing dish'
    );
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
    return this.call(
      'dishGetObstructionMap',
      DishGetObstructionMapRequestSchema,
      request,
      DishGetObstructionMapResponseSchema,
      'dishGetObstructionMap',
      'Getting obstruction map'
    );
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
    return this.call(
      'dishClearObstructionMap',
      DishClearObstructionMapRequestSchema,
      request,
      DishClearObstructionMapResponseSchema,
      'dishClearObstructionMap',
      'Clearing obstruction map'
    );
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
    return this.call(
      'dishGetEmc',
      DishGetEmcRequestSchema,
      request,
      DishGetEmcResponseSchema,
      'dishGetEmc',
      'Getting EMC settings'
    );
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
    return this.call(
      'dishSetEmc',
      DishSetEmcRequestSchema,
      request,
      DishSetEmcResponseSchema,
      'dishSetEmc',
      'Setting EMC settings'
    );
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
    return this.call(
      'dishGetConfig',
      DishGetConfigRequestSchema,
      request,
      DishGetConfigResponseSchema,
      'dishGetConfig',
      'Getting dish config'
    );
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
    return this.call(
      'dishSetConfig',
      DishSetConfigRequestSchema,
      request,
      DishSetConfigResponseSchema,
      'dishSetConfig',
      'Setting dish config'
    );
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
    return this.call(
      'dishActivateRssiScan',
      DishActivateRssiScanRequestSchema,
      request,
      DishActivateRssiScanResponseSchema,
      'dishActivateRssiScan',
      'Activating RSSI scan'
    );
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
    return this.call(
      'dishGetRssiScanResult',
      DishGetRssiScanResultRequestSchema,
      request,
      DishGetRssiScanResultResponseSchema,
      'dishGetRssiScanResult',
      'Getting RSSI scan results'
    );
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
    return this.call(
      'getDiagnostics',
      GetDiagnosticsRequestSchema,
      undefined,
      DishGetDiagnosticsResponseSchema,
      'dishGetDiagnostics',
      'Getting dish diagnostics'
    );
  }
}
