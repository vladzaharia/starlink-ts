/**
 * Tests for TransceiverService
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { StarlinkClient, createStarlinkClient } from '../../src/client';
import { TransceiverService } from '../../src/services/TransceiverService';
import { mockTransceiverStatus, mockEmptyResponse } from '../fixtures/responses';

describe('TransceiverService', () => {
  let client: StarlinkClient;
  let service: TransceiverService;

  beforeEach(() => {
    client = createStarlinkClient({ debug: false });
    service = client.transceiver;
  });

  afterEach(async () => {
    await client.close().catch(() => {});
  });

  describe('initialization', () => {
    it('should be instance of TransceiverService', () => {
      expect(service).toBeInstanceOf(TransceiverService);
    });

    it('should be accessible from client', () => {
      expect(client.transceiver).toBeDefined();
      expect(client.transceiver).toBe(service);
    });
  });

  describe('getStatus', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockTransceiverStatus);
      await service.getStatus({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockTransceiverStatus);
      await service.getStatus();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should return transceiver status', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockTransceiverStatus);
      const result = await service.getStatus({});
      expect(result).toEqual(mockTransceiverStatus);
      spy.mockRestore();
    });
  });

  describe('getTelemetry', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue({ telemetry: {} });
      await service.getTelemetry({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue({ telemetry: {} });
      await service.getTelemetry();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should return telemetry data', async () => {
      const mockTelemetry = { telemetry: {} };
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockTelemetry);
      const result = await service.getTelemetry({});
      expect(result).toEqual(mockTelemetry);
      spy.mockRestore();
    });
  });

  describe('ifLoopbackTest', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockEmptyResponse);
      await service.ifLoopbackTest({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockEmptyResponse);
      await service.ifLoopbackTest();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('method chaining', () => {
    it('should allow multiple sequential calls', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockTransceiverStatus);
      await service.getStatus({});
      await service.getStatus({});
      expect(spy).toHaveBeenCalledTimes(2);
      spy.mockRestore();
    });
  });

  describe('service integration', () => {
    it('should share client with other services', () => {
      const deviceService = client.device;
      expect((service as any).client).toBe((deviceService as any).client);
    });

    it('should share grpc client with other services', () => {
      const dishService = client.dish;
      expect((service as any).grpcClient).toBe((dishService as any).grpcClient);
    });
  });
});

