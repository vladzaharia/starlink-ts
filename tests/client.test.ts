/**
 * Tests for client lifecycle and initialization
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { StarlinkClient, createStarlinkClient } from '../src/client';
import { DeviceService } from '../src/services/DeviceService';
import { DishService } from '../src/services/DishService';
import { WifiService } from '../src/services/WifiService';
import { TransceiverService } from '../src/services/TransceiverService';
import { ChannelCredentials } from '@grpc/grpc-js';

describe('StarlinkClient', () => {
  let client: StarlinkClient;

  afterEach(async () => {
    if (client) {
      await client.close().catch(() => {});
    }
  });

  describe('constructor', () => {
    it('should create client with default config', () => {
      client = new StarlinkClient({});
      expect(client).toBeDefined();
      expect(client).toBeInstanceOf(StarlinkClient);
    });

    it('should create client with custom address', () => {
      client = new StarlinkClient({ address: '10.0.0.1:9200' });
      expect(client).toBeDefined();
    });

    it('should create client with custom credentials', () => {
      const creds = ChannelCredentials.createInsecure();
      client = new StarlinkClient({ credentials: creds });
      expect(client).toBeDefined();
    });

    it('should create client with debug enabled', () => {
      const consoleSpy = vi.spyOn(console, 'debug');
      client = new StarlinkClient({ debug: true });
      client.debug('test message');
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should create client with debug disabled', () => {
      const consoleSpy = vi.spyOn(console, 'debug');
      client = new StarlinkClient({ debug: false });
      client.debug('test message');
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('service initialization', () => {
    beforeEach(() => {
      client = new StarlinkClient({});
    });

    it('should initialize device service', () => {
      expect(client.device).toBeDefined();
      expect(client.device).toBeInstanceOf(DeviceService);
    });

    it('should initialize dish service', () => {
      expect(client.dish).toBeDefined();
      expect(client.dish).toBeInstanceOf(DishService);
    });

    it('should initialize wifi service', () => {
      expect(client.wifi).toBeDefined();
      expect(client.wifi).toBeInstanceOf(WifiService);
    });

    it('should initialize transceiver service', () => {
      expect(client.transceiver).toBeDefined();
      expect(client.transceiver).toBeInstanceOf(TransceiverService);
    });

    it('should have all services as readonly', () => {
      // Services are defined as readonly public properties
      // Verify all services are initialized and accessible
      expect(client.device).toBeInstanceOf(DeviceService);
      expect(client.dish).toBeInstanceOf(DishService);
      expect(client.wifi).toBeInstanceOf(WifiService);
      expect(client.transceiver).toBeInstanceOf(TransceiverService);
    });
  });

  describe('connection state', () => {
    beforeEach(() => {
      client = new StarlinkClient({});
    });

    it('should start not connected', () => {
      expect(client.isReady()).toBe(false);
    });

    it('should mark as connected after waitForReady', async () => {
      await client.waitForReady();
      expect(client.isReady()).toBe(true);
    });

    it('should mark as not connected after close', async () => {
      await client.waitForReady();
      expect(client.isReady()).toBe(true);
      await client.close();
      expect(client.isReady()).toBe(false);
    });
  });

  describe('waitForReady', () => {
    beforeEach(() => {
      client = new StarlinkClient({});
    });

    it('should resolve successfully', async () => {
      await expect(client.waitForReady()).resolves.toBeUndefined();
    });

    it('should set isConnected to true', async () => {
      expect(client.isReady()).toBe(false);
      await client.waitForReady();
      expect(client.isReady()).toBe(true);
    });

    it('should accept optional timeout parameter', async () => {
      await expect(client.waitForReady(5000)).resolves.toBeUndefined();
    });

    it('should be callable multiple times', async () => {
      await client.waitForReady();
      await client.waitForReady();
      expect(client.isReady()).toBe(true);
    });
  });

  describe('close', () => {
    beforeEach(() => {
      client = new StarlinkClient({});
    });

    it('should close successfully', async () => {
      await expect(client.close()).resolves.toBeUndefined();
    });

    it('should set isConnected to false', async () => {
      await client.waitForReady();
      expect(client.isReady()).toBe(true);
      await client.close();
      expect(client.isReady()).toBe(false);
    });

    it('should be callable multiple times', async () => {
      await client.close();
      await client.close();
      expect(client.isReady()).toBe(false);
    });

    it('should be callable without waitForReady', async () => {
      await expect(client.close()).resolves.toBeUndefined();
    });
  });

  describe('getConfig', () => {
    it('should return normalized config', () => {
      client = new StarlinkClient({ address: '10.0.0.1:9200' });
      const config = client.getConfig();
      expect(config.address).toBe('10.0.0.1:9200');
    });

    it('should return config with defaults', () => {
      client = new StarlinkClient({});
      const config = client.getConfig();
      expect(config.address).toBe('192.168.100.1:9200');
      expect(config.requestTimeout).toBe(30000);
    });
  });

  describe('getGrpcClient', () => {
    beforeEach(() => {
      client = new StarlinkClient({});
    });

    it('should return grpc client', () => {
      const grpcClient = client.getGrpcClient();
      expect(grpcClient).toBeDefined();
    });

    it('should return same client on multiple calls', () => {
      const grpcClient1 = client.getGrpcClient();
      const grpcClient2 = client.getGrpcClient();
      expect(grpcClient1).toBe(grpcClient2);
    });
  });

  describe('debug', () => {
    it('should log when debug is enabled', () => {
      const consoleSpy = vi.spyOn(console, 'debug');
      client = new StarlinkClient({ debug: true });
      client.debug('test message', { key: 'value' });
      expect(consoleSpy).toHaveBeenCalledWith('[StarlinkClient] test message', { key: 'value' });
      consoleSpy.mockRestore();
    });

    it('should not log when debug is disabled', () => {
      const consoleSpy = vi.spyOn(console, 'debug');
      client = new StarlinkClient({ debug: false });
      client.debug('test message');
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should log without data', () => {
      const consoleSpy = vi.spyOn(console, 'debug');
      client = new StarlinkClient({ debug: true });
      client.debug('test message');
      expect(consoleSpy).toHaveBeenCalledWith('[StarlinkClient] test message', undefined);
      consoleSpy.mockRestore();
    });
  });
});

describe('createStarlinkClient', () => {
  let client: StarlinkClient;

  afterEach(async () => {
    if (client) {
      await client.close().catch(() => {});
    }
  });

  it('should create client instance', () => {
    client = createStarlinkClient({});
    expect(client).toBeInstanceOf(StarlinkClient);
  });

  it('should pass config to constructor', () => {
    client = createStarlinkClient({ address: '10.0.0.1:9200' });
    expect(client.getConfig().address).toBe('10.0.0.1:9200');
  });

  it('should create client with default config', () => {
    client = createStarlinkClient({});
    const config = client.getConfig();
    expect(config.address).toBe('192.168.100.1:9200');
  });

  it('should be equivalent to new StarlinkClient', () => {
    const client1 = createStarlinkClient({ address: '10.0.0.1:9200' });
    const client2 = new StarlinkClient({ address: '10.0.0.1:9200' });
    expect(client1.getConfig().address).toBe(client2.getConfig().address);
    client1.close().catch(() => {});
    client2.close().catch(() => {});
  });
});

