/**
 * Tests for BaseService
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { StarlinkClient, createStarlinkClient } from '../../src/client';
import { BaseService } from '../../src/services/BaseService';
import { DeviceService } from '../../src/services/DeviceService';
import { DishService } from '../../src/services/DishService';
import { WifiService } from '../../src/services/WifiService';
import { TransceiverService } from '../../src/services/TransceiverService';

describe('BaseService', () => {
  let client: StarlinkClient;

  beforeEach(() => {
    client = createStarlinkClient({ debug: false });
  });

  afterEach(async () => {
    await client.close().catch(() => {});
  });

  describe('initialization', () => {
    it('should initialize with client reference', () => {
      const service = new DeviceService(client);
      expect(service).toBeDefined();
      expect(service).toBeInstanceOf(BaseService);
    });

    it('should store client reference', () => {
      const service = new DeviceService(client);
      // Access protected property through any cast for testing
      expect((service as any).client).toBe(client);
    });

    it('should store config reference', () => {
      const service = new DeviceService(client);
      const config = (service as any).config;
      expect(config).toBeDefined();
      expect(config.address).toBe('192.168.100.1:9200');
    });

    it('should store grpc client reference', () => {
      const service = new DeviceService(client);
      const grpcClient = (service as any).grpcClient;
      expect(grpcClient).toBeDefined();
    });
  });

  describe('debug method', () => {
    it('should delegate to client debug', () => {
      const consoleSpy = vi.spyOn(console, 'debug');
      const debugClient = createStarlinkClient({ debug: true });
      const service = new DeviceService(debugClient);
      (service as any).debug('test message', { key: 'value' });
      expect(consoleSpy).toHaveBeenCalledWith('[StarlinkClient] test message', { key: 'value' });
      consoleSpy.mockRestore();
      debugClient.close().catch(() => {});
    });

    it('should not log when debug is disabled', () => {
      const consoleSpy = vi.spyOn(console, 'debug');
      const service = new DeviceService(client);
      (service as any).debug('test message');
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('isReady method', () => {
    it('should return false when not connected', () => {
      const service = new DeviceService(client);
      expect((service as any).isReady()).toBe(false);
    });

    it('should return true when connected', async () => {
      await client.waitForReady();
      const service = new DeviceService(client);
      expect((service as any).isReady()).toBe(true);
    });

    it('should reflect client state changes', async () => {
      const service = new DeviceService(client);
      expect((service as any).isReady()).toBe(false);
      await client.waitForReady();
      expect((service as any).isReady()).toBe(true);
      await client.close();
      expect((service as any).isReady()).toBe(false);
    });
  });

  describe('service inheritance', () => {
    it('should be inherited by DeviceService', () => {
      const service = new DeviceService(client);
      expect(service).toBeInstanceOf(BaseService);
    });

    it('should be inherited by DishService', () => {
      const service = new DishService(client);
      expect(service).toBeInstanceOf(BaseService);
    });

    it('should be inherited by WifiService', () => {
      const service = new WifiService(client);
      expect(service).toBeInstanceOf(BaseService);
    });

    it('should be inherited by TransceiverService', () => {
      const service = new TransceiverService(client);
      expect(service).toBeInstanceOf(BaseService);
    });
  });

  describe('multiple service instances', () => {
    it('should share same client', () => {
      const deviceService = new DeviceService(client);
      const dishService = new DishService(client);
      expect((deviceService as any).client).toBe((dishService as any).client);
    });

    it('should share same config', () => {
      const deviceService = new DeviceService(client);
      const wifiService = new WifiService(client);
      expect((deviceService as any).config).toBe((wifiService as any).config);
    });

    it('should share same grpc client', () => {
      const deviceService = new DeviceService(client);
      const transceiverService = new TransceiverService(client);
      expect((deviceService as any).grpcClient).toBe((transceiverService as any).grpcClient);
    });

    it('should all reflect same ready state', async () => {
      const deviceService = new DeviceService(client);
      const dishService = new DishService(client);
      const wifiService = new WifiService(client);
      const transceiverService = new TransceiverService(client);

      expect((deviceService as any).isReady()).toBe(false);
      expect((dishService as any).isReady()).toBe(false);
      expect((wifiService as any).isReady()).toBe(false);
      expect((transceiverService as any).isReady()).toBe(false);

      await client.waitForReady();

      expect((deviceService as any).isReady()).toBe(true);
      expect((dishService as any).isReady()).toBe(true);
      expect((wifiService as any).isReady()).toBe(true);
      expect((transceiverService as any).isReady()).toBe(true);
    });
  });

  describe('config access', () => {
    it('should have access to address', () => {
      const service = new DeviceService(client);
      const config = (service as any).config;
      expect(config.address).toBe('192.168.100.1:9200');
    });

    it('should have access to timeouts', () => {
      const service = new DeviceService(client);
      const config = (service as any).config;
      expect(config.requestTimeout).toBe(30000);
      expect(config.connectionTimeout).toBe(10000);
    });

    it('should have access to retry config', () => {
      const service = new DeviceService(client);
      const config = (service as any).config;
      expect(config.maxRetries).toBe(3);
      expect(config.autoReconnect).toBe(true);
    });

    it('should have access to backoff config', () => {
      const service = new DeviceService(client);
      const config = (service as any).config;
      expect(config.reconnectBackoffMs).toBe(1000);
      expect(config.maxReconnectBackoffMs).toBe(30000);
    });
  });
});

