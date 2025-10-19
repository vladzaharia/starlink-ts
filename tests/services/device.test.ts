/**
 * Tests for DeviceService
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { StarlinkClient, createStarlinkClient } from '../../src/client';
import { DeviceService } from '../../src/services/DeviceService';
import { mockDeviceInfo, mockDeviceStatus, mockLocation, mockSpeedTest, mockPing } from '../fixtures/responses';

describe('DeviceService', () => {
  let client: StarlinkClient;
  let service: DeviceService;

  beforeEach(() => {
    client = createStarlinkClient({ debug: false });
    service = client.device;
  });

  afterEach(async () => {
    await client.close().catch(() => {});
  });

  describe('initialization', () => {
    it('should be instance of DeviceService', () => {
      expect(service).toBeInstanceOf(DeviceService);
    });

    it('should be accessible from client', () => {
      expect(client.device).toBeDefined();
      expect(client.device).toBe(service);
    });
  });

  describe('getInfo', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockDeviceInfo);
      await service.getInfo({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockDeviceInfo);
      await service.getInfo();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should return device info', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockDeviceInfo);
      const result = await service.getInfo({});
      expect(result).toEqual(mockDeviceInfo);
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

    it('should return device status', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockDeviceStatus);
      const result = await service.getStatus({});
      expect(result).toEqual(mockDeviceStatus);
      spy.mockRestore();
    });
  });

  describe('reboot', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue({ success: true });
      await service.reboot({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue({ success: true });
      await service.reboot();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('getLogs', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue({ syslog: 'logs' });
      await service.getLogs({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue({ syslog: 'logs' });
      await service.getLogs();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('getLocation', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockLocation);
      await service.getLocation({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockLocation);
      await service.getLocation();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should return location', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockLocation);
      const result = await service.getLocation({});
      expect(result).toEqual(mockLocation);
      spy.mockRestore();
    });
  });

  describe('speedTest', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockSpeedTest);
      await service.speedTest({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockSpeedTest);
      await service.speedTest();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should return speed test results', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockSpeedTest);
      const result = await service.speedTest({});
      expect(result).toEqual(mockSpeedTest);
      spy.mockRestore();
    });
  });

  describe('getPing', () => {
    it('should be callable', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockPing);
      await service.getPing({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should accept optional request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockPing);
      await service.getPing();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should return ping results', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockPing);
      const result = await service.getPing({});
      expect(result).toEqual(mockPing);
      spy.mockRestore();
    });
  });

  describe('pingHost', () => {
    it('should be callable with required request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockPing);
      await service.pingHost({ address: '8.8.8.8' });
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should return ping results', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockPing);
      const result = await service.pingHost({ address: '8.8.8.8' });
      expect(result).toEqual(mockPing);
      spy.mockRestore();
    });
  });

  describe('getNetworkInterfaces', () => {
    it('should be callable with required request', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue({ connections: [] });
      await service.getNetworkInterfaces({});
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should return network interfaces', async () => {
      const mockConnections = { connections: [] };
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockConnections);
      const result = await service.getNetworkInterfaces({});
      expect(result).toEqual(mockConnections);
      spy.mockRestore();
    });
  });

  describe('method chaining', () => {
    it('should allow multiple sequential calls', async () => {
      const spy = vi.spyOn(service as any, 'call').mockResolvedValue(mockDeviceInfo);
      await service.getInfo({});
      await service.getInfo({});
      expect(spy).toHaveBeenCalledTimes(2);
      spy.mockRestore();
    });
  });
});

