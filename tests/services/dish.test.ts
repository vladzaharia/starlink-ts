/**
 * Tests for DishService
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { StarlinkClient, createStarlinkClient } from '../../src/client';
import { DishService } from '../../src/services/DishService';
import { mockDishContext, mockDeviceStatus, mockEmptyResponse } from '../fixtures/responses';

describe('DishService', () => {
  let client: StarlinkClient;
  let service: DishService;

  beforeEach(() => {
    client = createStarlinkClient({ debug: false });
    service = client.dish;
  });

  afterEach(async () => {
    await client.close().catch(() => {});
  });

  describe('initialization', () => {
    it('should be instance of DishService', () => {
      expect(service).toBeInstanceOf(DishService);
    });

    it('should be accessible from client', () => {
      expect(client.dish).toBeDefined();
      expect(client.dish).toBe(service);
    });
  });

  describe('getContext', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockDishContext);
      await service.getContext({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockDishContext);
      await service.getContext();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should return dish context', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockDishContext);
      const result = await service.getContext({});
      expect(result).toEqual(mockDishContext);
      spy.mockRestore();
    });
  });

  describe('getStatus', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockDeviceStatus);
      await service.getStatus({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockDeviceStatus);
      await service.getStatus();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should return dish status', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockDeviceStatus);
      const result = await service.getStatus({});
      expect(result).toEqual(mockDeviceStatus);
      spy.mockRestore();
    });
  });

  describe('stow', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockEmptyResponse);
      await service.stow({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockEmptyResponse);
      await service.stow();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('getObstructionMap', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue({ map: [] });
      await service.getObstructionMap({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue({ map: [] });
      await service.getObstructionMap();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('clearObstructionMap', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockEmptyResponse);
      await service.clearObstructionMap({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockEmptyResponse);
      await service.clearObstructionMap();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('getEmc', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue({ mode: 'NORMAL' });
      await service.getEmc({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue({ mode: 'NORMAL' });
      await service.getEmc();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('setEmc', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockEmptyResponse);
      await service.setEmc({ mode: 'NORMAL' });
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('getConfig', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue({ config: {} });
      await service.getConfig({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue({ config: {} });
      await service.getConfig();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('setConfig', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockEmptyResponse);
      await service.setConfig({ config: {} });
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('setPowerSave', () => {
    it('should be callable', async () => {
      const grpcClient = (service as any).grpcClient;
      const spy = vi.spyOn(grpcClient, 'handle').mockResolvedValue({});
      await service.setPowerSave({ enablePowerSave: true });
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('activateRssiScan', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockEmptyResponse);
      await service.activateRssiScan({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockEmptyResponse);
      await service.activateRssiScan();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('getRssiScanResult', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue({ results: [] });
      await service.getRssiScanResult({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue({ results: [] });
      await service.getRssiScanResult();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('getDiagnostics', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue({ diagnostics: {} });
      await service.getDiagnostics({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue({ diagnostics: {} });
      await service.getDiagnostics();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('method chaining', () => {
    it('should allow multiple sequential calls', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockDishContext);
      await service.getContext({});
      await service.getContext({});
      expect(spy).toHaveBeenCalledTimes(2);
      spy.mockRestore();
    });
  });
});

