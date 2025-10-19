import { BaseService } from './BaseService';
import { StarlinkClient } from '../client';
import * as Device from '../types';
import {
  TransceiverGetStatusRequestSchema,
  TransceiverGetStatusResponseSchema,
  TransceiverGetTelemetryRequestSchema,
  TransceiverGetTelemetryResponseSchema,
  TransceiverIFLoopbackTestRequestSchema,
  TransceiverIFLoopbackTestResponseSchema,
} from '../../lib/ts/device/transceiver_pb';

/**
 * Transceiver service for RF transceiver operations
 *
 * Provides methods for:
 * - Transceiver status monitoring
 * - Loopback testing
 * - Telemetry collection
 */
export class TransceiverService extends BaseService {
  constructor(client: StarlinkClient) {
    super(client);
  }

  /**
   * Get transceiver status
   *
   * @example
   * ```typescript
   * const status = await client.transceiver.getStatus({});
   * console.log('Modulator State:', status.modState);
   * console.log('Demodulator State:', status.demodState);
   * ```
   */
  async getStatus(
    request?: Device.Transceiver.TransceiverGetStatusRequest
  ): Promise<Device.Transceiver.TransceiverGetStatusResponse> {
    return this.call(
      'transceiverGetStatus',
      TransceiverGetStatusRequestSchema,
      request,
      TransceiverGetStatusResponseSchema,
      'transceiverGetStatus',
      'Getting transceiver status'
    );
  }

  /**
   * Get transceiver telemetry
   *
   * @example
   * ```typescript
   * const telemetry = await client.transceiver.getTelemetry({});
   * console.log('Telemetry:', telemetry);
   * ```
   */
  async getTelemetry(
    request?: Device.Transceiver.TransceiverGetTelemetryRequest
  ): Promise<Device.Transceiver.TransceiverGetTelemetryResponse> {
    return this.call(
      'transceiverGetTelemetry',
      TransceiverGetTelemetryRequestSchema,
      request,
      TransceiverGetTelemetryResponseSchema,
      'transceiverGetTelemetry',
      'Getting transceiver telemetry'
    );
  }

  /**
   * Run IF loopback test
   *
   * @example
   * ```typescript
   * const result = await client.transceiver.ifLoopbackTest({ enableIfLoopback: true });
   * console.log('BER:', result.berLoopbackTest);
   * console.log('SNR:', result.snrLoopbackTest);
   * ```
   */
  async ifLoopbackTest(
    request: Device.Transceiver.TransceiverIFLoopbackTestRequest
  ): Promise<Device.Transceiver.TransceiverIFLoopbackTestResponse> {
    return this.call(
      'transceiverIfLoopbackTest',
      TransceiverIFLoopbackTestRequestSchema,
      request,
      TransceiverIFLoopbackTestResponseSchema,
      'transceiverIfLoopbackTest',
      'Running IF loopback test'
    );
  }
}
