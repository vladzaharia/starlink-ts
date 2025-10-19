import { describe, it, expect } from 'vitest';
import { ChannelCredentials } from '@grpc/grpc-js';
import {
  StarlinkClientConfig,
  NormalizedClientConfig,
  normalizeConfig,
} from '../src/types/ClientConfig';

describe('Client Configuration', () => {
  describe('normalizeConfig', () => {
    it('should apply all defaults to empty config', () => {
      const config = normalizeConfig({});

      expect(config.address).toBe('192.168.100.1:9200');
      expect(config.requestTimeout).toBe(30000);
      expect(config.connectionTimeout).toBe(10000);
      expect(config.maxRetries).toBe(3);
      expect(config.autoReconnect).toBe(true);
      expect(config.reconnectBackoffMs).toBe(1000);
      expect(config.maxReconnectBackoffMs).toBe(30000);
      expect(config.debug).toBe(false);
    });

    it('should use insecure credentials by default', () => {
      const config = normalizeConfig({});
      expect(config.credentials).toBeDefined();
      // Verify it's insecure credentials (no SSL)
      expect(config.credentials).toEqual(ChannelCredentials.createInsecure());
    });

    it('should override address', () => {
      const config = normalizeConfig({ address: 'custom:9200' });
      expect(config.address).toBe('custom:9200');
    });

    it('should override requestTimeout', () => {
      const config = normalizeConfig({ requestTimeout: 60000 });
      expect(config.requestTimeout).toBe(60000);
    });

    it('should override connectionTimeout', () => {
      const config = normalizeConfig({ connectionTimeout: 20000 });
      expect(config.connectionTimeout).toBe(20000);
    });

    it('should override maxRetries', () => {
      const config = normalizeConfig({ maxRetries: 5 });
      expect(config.maxRetries).toBe(5);
    });

    it('should override autoReconnect', () => {
      const config = normalizeConfig({ autoReconnect: false });
      expect(config.autoReconnect).toBe(false);
    });

    it('should override reconnectBackoffMs', () => {
      const config = normalizeConfig({ reconnectBackoffMs: 2000 });
      expect(config.reconnectBackoffMs).toBe(2000);
    });

    it('should override maxReconnectBackoffMs', () => {
      const config = normalizeConfig({ maxReconnectBackoffMs: 60000 });
      expect(config.maxReconnectBackoffMs).toBe(60000);
    });

    it('should override debug', () => {
      const config = normalizeConfig({ debug: true });
      expect(config.debug).toBe(true);
    });

    it('should use provided credentials', () => {
      const credentials = ChannelCredentials.createInsecure();
      const config = normalizeConfig({ credentials });
      expect(config.credentials).toBe(credentials);
    });

    it('should handle all custom values', () => {
      const credentials = ChannelCredentials.createInsecure();
      const customConfig: StarlinkClientConfig = {
        address: 'test:9200',
        credentials,
        requestTimeout: 45000,
        connectionTimeout: 15000,
        maxRetries: 7,
        autoReconnect: false,
        reconnectBackoffMs: 3000,
        maxReconnectBackoffMs: 45000,
        debug: true,
      };

      const config = normalizeConfig(customConfig);

      expect(config.address).toBe('test:9200');
      expect(config.credentials).toBe(credentials);
      expect(config.requestTimeout).toBe(45000);
      expect(config.connectionTimeout).toBe(15000);
      expect(config.maxRetries).toBe(7);
      expect(config.autoReconnect).toBe(false);
      expect(config.reconnectBackoffMs).toBe(3000);
      expect(config.maxReconnectBackoffMs).toBe(45000);
      expect(config.debug).toBe(true);
    });

    it('should return NormalizedClientConfig type', () => {
      const config = normalizeConfig({});
      // Verify all required properties exist
      expect(config).toHaveProperty('address');
      expect(config).toHaveProperty('credentials');
      expect(config).toHaveProperty('requestTimeout');
      expect(config).toHaveProperty('connectionTimeout');
      expect(config).toHaveProperty('maxRetries');
      expect(config).toHaveProperty('autoReconnect');
      expect(config).toHaveProperty('reconnectBackoffMs');
      expect(config).toHaveProperty('maxReconnectBackoffMs');
      expect(config).toHaveProperty('debug');
    });

    it('should handle zero values correctly', () => {
      const config = normalizeConfig({
        requestTimeout: 0,
        connectionTimeout: 0,
        maxRetries: 0,
        reconnectBackoffMs: 0,
        maxReconnectBackoffMs: 0,
      });

      expect(config.requestTimeout).toBe(0);
      expect(config.connectionTimeout).toBe(0);
      expect(config.maxRetries).toBe(0);
      expect(config.reconnectBackoffMs).toBe(0);
      expect(config.maxReconnectBackoffMs).toBe(0);
    });

    it('should handle false values correctly', () => {
      const config = normalizeConfig({
        autoReconnect: false,
        debug: false,
      });

      expect(config.autoReconnect).toBe(false);
      expect(config.debug).toBe(false);
    });

    it('should handle empty string address', () => {
      const config = normalizeConfig({ address: '' });
      // Empty string is preserved as-is (not treated as falsy by ?? operator)
      expect(config.address).toBe('');
    });

    it('should preserve non-empty string address', () => {
      const config = normalizeConfig({ address: 'localhost:9200' });
      expect(config.address).toBe('localhost:9200');
    });

    it('should handle partial config override', () => {
      const config = normalizeConfig({
        address: 'custom:9200',
        debug: true,
        // Other values should use defaults
      });

      expect(config.address).toBe('custom:9200');
      expect(config.debug).toBe(true);
      expect(config.requestTimeout).toBe(30000); // default
      expect(config.maxRetries).toBe(3); // default
    });

    it('should not mutate input config', () => {
      const input: StarlinkClientConfig = { address: 'test:9200' };
      const original = { ...input };
      normalizeConfig(input);
      expect(input).toEqual(original);
    });

    it('should handle large timeout values', () => {
      const config = normalizeConfig({
        requestTimeout: 300000,
        connectionTimeout: 100000,
      });

      expect(config.requestTimeout).toBe(300000);
      expect(config.connectionTimeout).toBe(100000);
    });

    it('should handle large retry values', () => {
      const config = normalizeConfig({ maxRetries: 100 });
      expect(config.maxRetries).toBe(100);
    });
  });

  describe('StarlinkClientConfig interface', () => {
    it('should allow all optional properties', () => {
      const config: StarlinkClientConfig = {
        address: '192.168.100.1:9200',
        credentials: ChannelCredentials.createInsecure(),
        requestTimeout: 30000,
        connectionTimeout: 10000,
        maxRetries: 3,
        autoReconnect: true,
        reconnectBackoffMs: 1000,
        maxReconnectBackoffMs: 30000,
        debug: false,
      };

      expect(config).toBeDefined();
    });

    it('should allow empty config', () => {
      const config: StarlinkClientConfig = {};
      expect(config).toBeDefined();
    });
  });

  describe('NormalizedClientConfig interface', () => {
    it('should have all required properties', () => {
      const config = normalizeConfig({});
      const normalized: NormalizedClientConfig = config;

      expect(normalized.address).toBeDefined();
      expect(normalized.credentials).toBeDefined();
      expect(normalized.requestTimeout).toBeDefined();
      expect(normalized.connectionTimeout).toBeDefined();
      expect(normalized.maxRetries).toBeDefined();
      expect(normalized.autoReconnect).toBeDefined();
      expect(normalized.reconnectBackoffMs).toBeDefined();
      expect(normalized.maxReconnectBackoffMs).toBeDefined();
      expect(normalized.debug).toBeDefined();
    });
  });
});
