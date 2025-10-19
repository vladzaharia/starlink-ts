/**
 * Tests for client configuration
 */

import { describe, it, expect } from 'vitest';
import { normalizeConfig, StarlinkClientConfig } from '../src/types/ClientConfig';
import { ChannelCredentials } from '@grpc/grpc-js';

describe('Configuration', () => {
  describe('normalizeConfig', () => {
    it('should apply all defaults with empty config', () => {
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

    it('should use custom address', () => {
      const config = normalizeConfig({ address: '10.0.0.1:9200' });
      expect(config.address).toBe('10.0.0.1:9200');
    });

    it('should use custom request timeout', () => {
      const config = normalizeConfig({ requestTimeout: 60000 });
      expect(config.requestTimeout).toBe(60000);
    });

    it('should use custom connection timeout', () => {
      const config = normalizeConfig({ connectionTimeout: 20000 });
      expect(config.connectionTimeout).toBe(20000);
    });

    it('should use custom max retries', () => {
      const config = normalizeConfig({ maxRetries: 5 });
      expect(config.maxRetries).toBe(5);
    });

    it('should use custom auto reconnect', () => {
      const config = normalizeConfig({ autoReconnect: false });
      expect(config.autoReconnect).toBe(false);
    });

    it('should use custom reconnect backoff', () => {
      const config = normalizeConfig({ reconnectBackoffMs: 2000 });
      expect(config.reconnectBackoffMs).toBe(2000);
    });

    it('should use custom max reconnect backoff', () => {
      const config = normalizeConfig({ maxReconnectBackoffMs: 60000 });
      expect(config.maxReconnectBackoffMs).toBe(60000);
    });

    it('should use custom debug flag', () => {
      const config = normalizeConfig({ debug: true });
      expect(config.debug).toBe(true);
    });

    it('should use custom credentials', () => {
      const creds = ChannelCredentials.createInsecure();
      const config = normalizeConfig({ credentials: creds });
      expect(config.credentials).toBe(creds);
    });

    it('should create insecure credentials by default', () => {
      const config = normalizeConfig({});
      expect(config.credentials).toBeDefined();
    });

    it('should handle zero timeout values', () => {
      const config = normalizeConfig({
        requestTimeout: 0,
        connectionTimeout: 0,
      });
      expect(config.requestTimeout).toBe(0);
      expect(config.connectionTimeout).toBe(0);
    });

    it('should handle zero retry values', () => {
      const config = normalizeConfig({ maxRetries: 0 });
      expect(config.maxRetries).toBe(0);
    });

    it('should handle false boolean values', () => {
      const config = normalizeConfig({
        autoReconnect: false,
        debug: false,
      });
      expect(config.autoReconnect).toBe(false);
      expect(config.debug).toBe(false);
    });

    it('should handle large timeout values', () => {
      const config = normalizeConfig({
        requestTimeout: 300000,
        connectionTimeout: 60000,
      });
      expect(config.requestTimeout).toBe(300000);
      expect(config.connectionTimeout).toBe(60000);
    });

    it('should handle large retry values', () => {
      const config = normalizeConfig({ maxRetries: 10 });
      expect(config.maxRetries).toBe(10);
    });

    it('should not mutate input config', () => {
      const input: StarlinkClientConfig = { address: '10.0.0.1:9200' };
      const config = normalizeConfig(input);
      expect(input).toEqual({ address: '10.0.0.1:9200' });
      expect(config.address).toBe('10.0.0.1:9200');
    });

    it('should handle partial config override', () => {
      const config = normalizeConfig({
        address: '10.0.0.1:9200',
        requestTimeout: 60000,
      });
      expect(config.address).toBe('10.0.0.1:9200');
      expect(config.requestTimeout).toBe(60000);
      expect(config.connectionTimeout).toBe(10000); // default
      expect(config.maxRetries).toBe(3); // default
    });

    it('should handle all custom values', () => {
      const creds = ChannelCredentials.createInsecure();
      const config = normalizeConfig({
        address: '10.0.0.1:9200',
        credentials: creds,
        requestTimeout: 60000,
        connectionTimeout: 20000,
        maxRetries: 5,
        autoReconnect: false,
        reconnectBackoffMs: 2000,
        maxReconnectBackoffMs: 60000,
        debug: true,
      });
      expect(config.address).toBe('10.0.0.1:9200');
      expect(config.credentials).toBe(creds);
      expect(config.requestTimeout).toBe(60000);
      expect(config.connectionTimeout).toBe(20000);
      expect(config.maxRetries).toBe(5);
      expect(config.autoReconnect).toBe(false);
      expect(config.reconnectBackoffMs).toBe(2000);
      expect(config.maxReconnectBackoffMs).toBe(60000);
      expect(config.debug).toBe(true);
    });

    it('should return NormalizedClientConfig type', () => {
      const config = normalizeConfig({});
      // All properties should be defined (not optional)
      expect(config.address).toBeDefined();
      expect(config.credentials).toBeDefined();
      expect(config.requestTimeout).toBeDefined();
      expect(config.connectionTimeout).toBeDefined();
      expect(config.maxRetries).toBeDefined();
      expect(config.autoReconnect).toBeDefined();
      expect(config.reconnectBackoffMs).toBeDefined();
      expect(config.maxReconnectBackoffMs).toBeDefined();
      expect(config.debug).toBeDefined();
    });
  });
});

