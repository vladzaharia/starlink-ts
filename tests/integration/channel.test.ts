import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createStarlinkClient, StarlinkClient } from '../../src/client';
import { ChannelCredentials } from '@grpc/grpc-js';

describe('gRPC Channel Integration', () => {
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

  describe('Channel Creation', () => {
    it('should create channel on first access', () => {
      const channel = client.getGrpcChannel();
      expect(channel).toBeDefined();
    });

    it('should return same channel on multiple accesses', () => {
      const channel1 = client.getGrpcChannel();
      const channel2 = client.getGrpcChannel();
      expect(channel1).toBe(channel2);
    });

    it('should create channel with default address', () => {
      const config = client.getConfig();
      expect(config.address).toBe('192.168.100.1:9200');
      const channel = client.getGrpcChannel();
      expect(channel).toBeDefined();
    });

    it('should create channel with custom address', () => {
      const customClient = createStarlinkClient({
        address: 'custom:9200',
      });
      const config = customClient.getConfig();
      expect(config.address).toBe('custom:9200');
      const channel = customClient.getGrpcChannel();
      expect(channel).toBeDefined();
      customClient.close().catch(() => {
        // Ignore
      });
    });

    it('should create channel with insecure credentials by default', () => {
      const config = client.getConfig();
      expect(config.credentials).toBeDefined();
      expect(config.credentials).toEqual(ChannelCredentials.createInsecure());
    });

    it('should create channel with custom credentials', () => {
      const credentials = ChannelCredentials.createInsecure();
      const customClient = createStarlinkClient({
        credentials,
      });
      const config = customClient.getConfig();
      expect(config.credentials).toBe(credentials);
      customClient.close().catch(() => {
        // Ignore
      });
    });
  });

  describe('Channel Lifecycle', () => {
    it('should not be ready initially', () => {
      expect(client.isReady()).toBe(false);
    });

    it('should be ready after waitForReady', async () => {
      expect(client.isReady()).toBe(false);
      await client.waitForReady();
      expect(client.isReady()).toBe(true);
    });

    it('should not be ready after close', async () => {
      await client.waitForReady();
      expect(client.isReady()).toBe(true);
      await client.close();
      expect(client.isReady()).toBe(false);
    });

    it('should handle multiple close calls', async () => {
      await client.waitForReady();
      await client.close();
      await expect(client.close()).resolves.toBeUndefined();
    });
  });

  describe('Channel Sharing Across Services', () => {
    it('should share channel with all services', () => {
      const clientChannel = client.getGrpcChannel();
      expect(clientChannel).toBeDefined();

      // All services should be able to access the channel
      expect(client.device).toBeDefined();
      expect(client.dish).toBeDefined();
      expect(client.wifi).toBeDefined();
      expect(client.transceiver).toBeDefined();
    });

    it('should maintain single channel for multiple service calls', async () => {
      const channel1 = client.getGrpcChannel();

      await client.device.getInfo({});
      const channel2 = client.getGrpcChannel();

      await client.dish.getContext({});
      const channel3 = client.getGrpcChannel();

      expect(channel1).toBe(channel2);
      expect(channel2).toBe(channel3);
    });
  });

  describe('Channel Configuration', () => {
    it('should respect request timeout configuration', () => {
      const customClient = createStarlinkClient({
        requestTimeout: 60000,
      });
      const config = customClient.getConfig();
      expect(config.requestTimeout).toBe(60000);
      customClient.close().catch(() => {
        // Ignore
      });
    });

    it('should respect connection timeout configuration', () => {
      const customClient = createStarlinkClient({
        connectionTimeout: 20000,
      });
      const config = customClient.getConfig();
      expect(config.connectionTimeout).toBe(20000);
      customClient.close().catch(() => {
        // Ignore
      });
    });

    it('should respect retry configuration', () => {
      const customClient = createStarlinkClient({
        maxRetries: 5,
      });
      const config = customClient.getConfig();
      expect(config.maxRetries).toBe(5);
      customClient.close().catch(() => {
        // Ignore
      });
    });

    it('should respect auto-reconnect configuration', () => {
      const customClient = createStarlinkClient({
        autoReconnect: false,
      });
      const config = customClient.getConfig();
      expect(config.autoReconnect).toBe(false);
      customClient.close().catch(() => {
        // Ignore
      });
    });
  });

  describe('Multiple Clients', () => {
    it('should create independent channels for different clients', () => {
      const client1 = createStarlinkClient({ address: 'client1:9200' });
      const client2 = createStarlinkClient({ address: 'client2:9200' });

      const channel1 = client1.getGrpcChannel();
      const channel2 = client2.getGrpcChannel();

      expect(channel1).not.toBe(channel2);

      client1.close().catch(() => {
        // Ignore
      });
      client2.close().catch(() => {
        // Ignore
      });
    });

    it('should maintain independent state for different clients', async () => {
      const client1 = createStarlinkClient({ address: 'client1:9200' });
      const client2 = createStarlinkClient({ address: 'client2:9200' });

      expect(client1.isReady()).toBe(false);
      expect(client2.isReady()).toBe(false);

      await client1.waitForReady();
      expect(client1.isReady()).toBe(true);
      expect(client2.isReady()).toBe(false);

      await client2.waitForReady();
      expect(client1.isReady()).toBe(true);
      expect(client2.isReady()).toBe(true);

      await client1.close();
      expect(client1.isReady()).toBe(false);
      expect(client2.isReady()).toBe(true);

      client2.close().catch(() => {
        // Ignore
      });
    });
  });

  describe('Channel Error Handling', () => {
    it('should handle channel creation errors gracefully', () => {
      // Even with invalid address, channel should be created
      const customClient = createStarlinkClient({
        address: 'invalid:99999',
      });
      const channel = customClient.getGrpcChannel();
      expect(channel).toBeDefined();
      customClient.close().catch(() => {
        // Ignore
      });
    });

    it('should handle close on unopened channel', async () => {
      const customClient = createStarlinkClient({});
      // Don't call waitForReady, just close
      await expect(customClient.close()).resolves.toBeUndefined();
    });
  });

  describe('Channel Persistence', () => {
    it('should persist channel across multiple operations', async () => {
      const channel1 = client.getGrpcChannel();

      await client.device.getInfo({});
      await client.device.getStatus({});
      await client.device.reboot({});

      const channel2 = client.getGrpcChannel();
      expect(channel1).toBe(channel2);
    });

    it('should persist channel across service transitions', async () => {
      const channel1 = client.getGrpcChannel();

      await client.device.getInfo({});
      await client.dish.getContext({});
      await client.wifi.getClients({});
      await client.transceiver.getStatus({});

      const channel2 = client.getGrpcChannel();
      expect(channel1).toBe(channel2);
    });
  });
});
