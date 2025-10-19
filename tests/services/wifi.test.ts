/**
 * Tests for WifiService
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { StarlinkClient, createStarlinkClient } from '../../src/client';
import { WifiService } from '../../src/services/WifiService';
import { mockWifiClients, mockWifiStatus, mockEmptyResponse } from '../fixtures/responses';

describe('WifiService', () => {
  let client: StarlinkClient;
  let service: WifiService;

  beforeEach(() => {
    client = createStarlinkClient({ debug: false });
    service = client.wifi;
  });

  afterEach(async () => {
    await client.close().catch(() => {});
  });

  describe('initialization', () => {
    it('should be instance of WifiService', () => {
      expect(service).toBeInstanceOf(WifiService);
    });

    it('should be accessible from client', () => {
      expect(client.wifi).toBeDefined();
      expect(client.wifi).toBe(service);
    });
  });

  describe('getClients', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockWifiClients);
      await service.getClients({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockWifiClients);
      await service.getClients();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should return wifi clients', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockWifiClients);
      const result = await service.getClients({});
      expect(result).toEqual(mockWifiClients);
      spy.mockRestore();
    });
  });

  describe('getConfig', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockWifiStatus);
      await service.getConfig({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockWifiStatus);
      await service.getConfig();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should return wifi config', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockWifiStatus);
      const result = await service.getConfig({});
      expect(result).toEqual(mockWifiStatus);
      spy.mockRestore();
    });
  });

  describe('setConfig', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockEmptyResponse);
      await service.setConfig({ ssid: 'Starlink' });
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('setup', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockEmptyResponse);
      await service.setup({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockEmptyResponse);
      await service.setup();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('getStatus', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockWifiStatus);
      await service.getStatus({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockWifiStatus);
      await service.getStatus();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should return wifi status', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockWifiStatus);
      const result = await service.getStatus({});
      expect(result).toEqual(mockWifiStatus);
      spy.mockRestore();
    });
  });

  describe('getPingMetrics', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue({ metrics: {} });
      await service.getPingMetrics({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue({ metrics: {} });
      await service.getPingMetrics();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('getClientHistory', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue({ history: [] });
      await service.getClientHistory({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue({ history: [] });
      await service.getClientHistory();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('setClientGivenName', () => {
    it('should be callable', async () => {
      const grpcClient = (service as any).grpcClient;
      const spy = vi.spyOn(grpcClient, 'handle').mockResolvedValue({});
      await service.setClientGivenName({ mac: '00:11:22:33:44:55', givenName: 'Device' });
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

  describe('runSelfTest', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue({ result: 'PASS' });
      await service.runSelfTest({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue({ result: 'PASS' });
      await service.runSelfTest();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('getFirewall', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue({ enabled: true });
      await service.getFirewall({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue({ enabled: true });
      await service.getFirewall();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('getGuestInfo', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue({ guestInfo: {} });
      await service.getGuestInfo({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue({ guestInfo: {} });
      await service.getGuestInfo();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('method chaining', () => {
    it('should allow multiple sequential calls', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockWifiClients);
      await service.getClients({});
      await service.getClients({});
      expect(spy).toHaveBeenCalledTimes(2);
      spy.mockRestore();
    });
  });
});

