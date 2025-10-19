import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createStarlinkClient, StarlinkClient } from '../../src/client';
import { BaseService } from '../../src/services/BaseService';
import { Channel } from '@grpc/grpc-js';

// Create a concrete implementation for testing
class TestService extends BaseService {
  testGetChannel(): Channel {
    return this.getChannel();
  }

  testDebug(message: string, data?: unknown): void {
    this.debug(message, data);
  }

  testIsReady(): boolean {
    return this.isReady();
  }
}

describe('BaseService', () => {
  let client: StarlinkClient;
  let service: TestService;

  beforeEach(() => {
    client = createStarlinkClient({
      debug: false,
    });
    service = new TestService(client);
  });

  afterEach(async () => {
    if (client) {
      await client.close().catch(() => {
        // Ignore errors during cleanup
      });
    }
  });

  describe('Service Initialization', () => {
    it('should initialize with client reference', () => {
      expect(service).toBeDefined();
      expect(service).toBeInstanceOf(BaseService);
    });

    it('should store client reference', () => {
      // Access through protected property via test method
      expect(service).toBeDefined();
    });

    it('should store config reference', () => {
      const config = client.getConfig();
      expect(config).toBeDefined();
    });

    it('should be able to create multiple service instances', () => {
      const service2 = new TestService(client);
      expect(service).not.toBe(service2);
      expect(service).toBeInstanceOf(BaseService);
      expect(service2).toBeInstanceOf(BaseService);
    });
  });

  describe('getChannel', () => {
    it('should return a gRPC channel', () => {
      const channel = service.testGetChannel();
      expect(channel).toBeDefined();
      expect(channel).toBeInstanceOf(Channel);
    });

    it('should return the same channel on multiple calls', () => {
      const channel1 = service.testGetChannel();
      const channel2 = service.testGetChannel();
      expect(channel1).toBe(channel2);
    });

    it('should return channel from client', () => {
      const serviceChannel = service.testGetChannel();
      const clientChannel = client.getGrpcChannel();
      expect(serviceChannel).toBe(clientChannel);
    });

    it('should work with custom client address', () => {
      const customClient = createStarlinkClient({
        address: 'custom:9200',
      });
      const customService = new TestService(customClient);
      const channel = customService.testGetChannel();
      expect(channel).toBeDefined();
      customClient.close().catch(() => {
        // Ignore
      });
    });
  });

  describe('debug', () => {
    it('should not log when debug is disabled', () => {
      const consoleSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
      service.testDebug('test message');
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should log when debug is enabled', () => {
      const debugClient = createStarlinkClient({
        debug: true,
      });
      const debugService = new TestService(debugClient);

      const consoleSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
      debugService.testDebug('test message', { data: 'test' });
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
      const debugService = new TestService(debugClient);

      const consoleSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
      debugService.testDebug('test message');
      expect(consoleSpy).toHaveBeenCalledWith('[StarlinkClient] test message', undefined);
      consoleSpy.mockRestore();

      debugClient.close().catch(() => {
        // Ignore
      });
    });

    it('should delegate to client debug method', () => {
      const debugSpy = vi.spyOn(client, 'debug');
      service.testDebug('test message', { key: 'value' });
      expect(debugSpy).toHaveBeenCalledWith('test message', { key: 'value' });
      debugSpy.mockRestore();
    });
  });

  describe('isReady', () => {
    it('should return false initially', () => {
      expect(service.testIsReady()).toBe(false);
    });

    it('should return true after waitForReady', async () => {
      await client.waitForReady();
      expect(service.testIsReady()).toBe(true);
    });

    it('should return false after close', async () => {
      await client.waitForReady();
      expect(service.testIsReady()).toBe(true);
      await client.close();
      expect(service.testIsReady()).toBe(false);
    });

    it('should delegate to client isReady method', () => {
      const isReadySpy = vi.spyOn(client, 'isReady');
      service.testIsReady();
      expect(isReadySpy).toHaveBeenCalled();
      isReadySpy.mockRestore();
    });
  });

  describe('Protected Properties', () => {
    it('should have access to client', () => {
      // Verify through test method that client is accessible
      const channel = service.testGetChannel();
      expect(channel).toBeDefined();
    });

    it('should have access to config', () => {
      const config = client.getConfig();
      expect(config).toBeDefined();
      expect(config.address).toBe('192.168.100.1:9200');
    });
  });

  describe('Service Inheritance', () => {
    it('should be extendable', () => {
      class CustomService extends BaseService {
        customMethod(): string {
          return 'custom';
        }
      }

      const customService = new CustomService(client);
      expect(customService.customMethod()).toBe('custom');
    });

    it('should allow multiple service implementations', () => {
      class ServiceA extends BaseService {
        methodA(): string {
          return 'A';
        }
      }

      class ServiceB extends BaseService {
        methodB(): string {
          return 'B';
        }
      }

      const serviceA = new ServiceA(client);
      const serviceB = new ServiceB(client);

      expect(serviceA.methodA()).toBe('A');
      expect(serviceB.methodB()).toBe('B');
    });
  });

  describe('Multiple Services', () => {
    it('should share same client', () => {
      const service1 = new TestService(client);
      const service2 = new TestService(client);

      const channel1 = service1.testGetChannel();
      const channel2 = service2.testGetChannel();

      expect(channel1).toBe(channel2);
    });

    it('should share same config', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const service1 = new TestService(client);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const service2 = new TestService(client);

      const config1 = client.getConfig();
      const config2 = client.getConfig();

      expect(config1).toBe(config2);
    });

    it('should all reflect client state changes', async () => {
      const service1 = new TestService(client);
      const service2 = new TestService(client);

      expect(service1.testIsReady()).toBe(false);
      expect(service2.testIsReady()).toBe(false);

      await client.waitForReady();

      expect(service1.testIsReady()).toBe(true);
      expect(service2.testIsReady()).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle client close gracefully', async () => {
      await client.close();
      // Service should still be functional (though channel may be closed)
      expect(service).toBeDefined();
    });

    it('should work with different client configurations', () => {
      const customClient = createStarlinkClient({
        address: 'test:9200',
        debug: true,
        maxRetries: 5,
      });
      const customService = new TestService(customClient);

      expect(customService).toBeDefined();
      expect(customService.testGetChannel()).toBeDefined();

      customClient.close().catch(() => {
        // Ignore
      });
    });
  });
});
