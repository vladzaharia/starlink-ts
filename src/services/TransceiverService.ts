import { BaseService } from './BaseService';
import { StarlinkClient } from '../client';
import * as Device from '../types';
import { create } from '@bufbuild/protobuf';
import { RequestSchema } from '../../lib/ts/device/device_pb';
import {
  TransceiverGetStatusRequestSchema,
  TransceiverGetTelemetryRequestSchema,
  TransceiverIFLoopbackTestRequestSchema,
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
  async getStatus(request?: Device.Transceiver.TransceiverGetStatusRequest): Promise<Device.Transceiver.TransceiverGetStatusResponse> {
    this.debug('Getting transceiver status', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'transceiverGetStatus', value: create(TransceiverGetStatusRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'transceiverGetStatus') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
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
  async getTelemetry(request?: Device.Transceiver.TransceiverGetTelemetryRequest): Promise<Device.Transceiver.TransceiverGetTelemetryResponse> {
    this.debug('Getting transceiver telemetry', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'transceiverGetTelemetry', value: create(TransceiverGetTelemetryRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'transceiverGetTelemetry') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
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
  async ifLoopbackTest(request: Device.Transceiver.TransceiverIFLoopbackTestRequest): Promise<Device.Transceiver.TransceiverIFLoopbackTestResponse> {
    this.debug('Running IF loopback test', request);
    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: { case: 'transceiverIfLoopbackTest', value: create(TransceiverIFLoopbackTestRequestSchema, request) },
    });
    const response = await this.grpcClient.handle(req);
    if (response.response.case === 'transceiverIfLoopbackTest') {
      return response.response.value;
    }
    throw new Error(`Unexpected response type: ${response.response.case}`);
  }
}
