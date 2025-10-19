import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createStarlinkClient, StarlinkClient } from '../src/client';
import { ChannelCredentials } from '@grpc/grpc-js';

describe('StarlinkClient', () => {
  let client: StarlinkClient;

  beforeEach(() => {
    client = createStarlinkClient({
      debug: false,
    });
  });

  afterEach(async () => {
    if (client) {
      await client.close().catch(() => {
        // Ignore errors during cleanup
      });
    }
  });

  describe('Client Creation', () => {
    it('should create a client with default configuration', () => {
      expect(client).toBeDefined();
      expect(client).toBeInstanceOf(StarlinkClient);
    });

    it('should have all service modules', () => {
      expect(client.device).toBeDefined();
      expect(client.dish).toBeDefined();
      expect(client.wifi).toBeDefined();
      expect(client.transceiver).toBeDefined();
    });

    it('should initialize with default address', () => {
      const config = client.getConfig();
      expect(config.address).toBe('192.168.100.1:9200');
    });

    it('should apply default configuration values', () => {
      const config = client.getConfig();
      expect(config.requestTimeout).toBe(30000);
      expect(config.connectionTimeout).toBe(10000);
      expect(config.maxRetries).toBe(3);
      expect(config.autoReconnect).toBe(true);
      expect(config.debug).toBe(false);
    });

    it('should allow custom configuration', () => {
      const customClient = createStarlinkClient({
        address: 'custom:9200',
        requestTimeout: 60000,
        maxRetries: 5,
        debug: true,
      });

      const config = customClient.getConfig();
      expect(config.address).toBe('custom:9200');
      expect(config.requestTimeout).toBe(60000);
      expect(config.maxRetries).toBe(5);
      expect(config.debug).toBe(true);

      customClient.close().catch(() => {
        // Ignore
      });
    });

    it('should create factory function correctly', () => {
      const factoryClient = createStarlinkClient({});
      expect(factoryClient).toBeInstanceOf(StarlinkClient);
      factoryClient.close().catch(() => {
        // Ignore
      });
    });

    it('should accept custom credentials', () => {
      const credentials = ChannelCredentials.createInsecure();
      const customClient = createStarlinkClient({ credentials });
      const config = customClient.getConfig();
      expect(config.credentials).toBe(credentials);
      customClient.close().catch(() => {
        // Ignore
      });
    });

    it('should initialize all services with client reference', () => {
      expect(client.device).toBeDefined();
      expect(client.dish).toBeDefined();
      expect(client.wifi).toBeDefined();
      expect(client.transceiver).toBeDefined();
      // Services should be able to access client methods
      expect(typeof client.device.getInfo).toBe('function');
    });
  });

  describe('Connection Management', () => {
    it('should not be ready initially', () => {
      expect(client.isReady()).toBe(false);
    });

    it('should handle close gracefully', async () => {
      await expect(client.close()).resolves.toBeUndefined();
    });

    it('should handle multiple close calls', async () => {
      await client.close();
      await expect(client.close()).resolves.toBeUndefined();
    });

    it('should set isConnected to false after close', async () => {
      await client.close();
      expect(client.isReady()).toBe(false);
    });

    it('should handle waitForReady', async () => {
      await expect(client.waitForReady()).resolves.toBeUndefined();
    });

    it('should be ready after waitForReady', async () => {
      await client.waitForReady();
      expect(client.isReady()).toBe(true);
    });

    it('should handle waitForReady with timeout parameter', async () => {
      await expect(client.waitForReady(5000)).resolves.toBeUndefined();
    });
  });

  describe('Debug Logging', () => {
    it('should not log when debug is disabled', () => {
      const consoleSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
      client.debug('test message');
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should log when debug is enabled', () => {
      const debugClient = createStarlinkClient({
        address: 'localhost:9200',
        debug: true,
      });

      const consoleSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
      debugClient.debug('test message', { data: 'test' });
      expect(consoleSpy).toHaveBeenCalledWith('[StarlinkClient] test message', { data: 'test' });
      consoleSpy.mockRestore();

      debugClient.close().catch(() => {
        // Ignore
      });
    });

    it('should log without data parameter', () => {
      const debugClient = createStarlinkClient({
        debug: true,
      });

      const consoleSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
      debugClient.debug('test message');
      expect(consoleSpy).toHaveBeenCalledWith('[StarlinkClient] test message', undefined);
      consoleSpy.mockRestore();

      debugClient.close().catch(() => {
        // Ignore
      });
    });
  });

  describe('Internal Methods', () => {
    it('should provide getConfig method', () => {
      const config = client.getConfig();
      expect(config).toBeDefined();
      expect(config.address).toBeDefined();
    });

    it('should provide getGrpcChannel method', () => {
      const channel = client.getGrpcChannel();
      expect(channel).toBeDefined();
    });

    it('should return same channel on multiple calls', () => {
      const channel1 = client.getGrpcChannel();
      const channel2 = client.getGrpcChannel();
      expect(channel1).toBe(channel2);
    });
  });
});
