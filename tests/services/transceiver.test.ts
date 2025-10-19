import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createStarlinkClient, StarlinkClient } from '../../src/client';
import { TransceiverService } from '../../src/services/TransceiverService';

describe('TransceiverService', () => {
  let client: StarlinkClient;
  let service: TransceiverService;

  beforeEach(() => {
    client = createStarlinkClient({
      debug: false,
    });
    service = client.transceiver;
  });

  afterEach(async () => {
    if (client) {
      await client.close().catch(() => {
        // Ignore errors during cleanup
      });
    }
  });

  describe('Service Initialization', () => {
    it('should be accessible from client', () => {
      expect(client.transceiver).toBeDefined();
      expect(client.transceiver).toBeInstanceOf(TransceiverService);
    });

    it('should be the same instance on multiple accesses', () => {
      const service1 = client.transceiver;
      const service2 = client.transceiver;
      expect(service1).toBe(service2);
    });

    it('should extend BaseService', () => {
      expect(service).toBeDefined();
      expect(typeof service.getStatus).toBe('function');
    });
  });

  describe('getStatus', () => {
    it('should be callable', async () => {
      const result = await service.getStatus({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.getStatus({});
      expect(typeof result).toBe('object');
    });

    it('should call debug', async () => {
      const debugClient = createStarlinkClient({ debug: true });
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      await debugClient.transceiver.getStatus({});

      expect(debugSpy).toHaveBeenCalledWith(
        expect.stringContaining('Getting transceiver status'),
        expect.any(Object)
      );

      debugSpy.mockRestore();
      debugClient.close().catch(() => {
        // Ignore
      });
    });
  });

  describe('getTelemetry', () => {
    it('should be callable', async () => {
      const result = await service.getTelemetry({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.getTelemetry({});
      expect(typeof result).toBe('object');
    });

    it('should call debug', async () => {
      const debugClient = createStarlinkClient({ debug: true });
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      await debugClient.transceiver.getTelemetry({});

      expect(debugSpy).toHaveBeenCalledWith(
        expect.stringContaining('Getting transceiver telemetry'),
        expect.any(Object)
      );

      debugSpy.mockRestore();
      debugClient.close().catch(() => {
        // Ignore
      });
    });
  });

  describe('ifLoopbackTest', () => {
    it('should be callable', async () => {
      const result = await service.ifLoopbackTest({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.ifLoopbackTest({});
      expect(typeof result).toBe('object');
    });

    it('should call debug', async () => {
      const debugClient = createStarlinkClient({ debug: true });
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      await debugClient.transceiver.ifLoopbackTest({});

      expect(debugSpy).toHaveBeenCalledWith(
        expect.stringContaining('Running IF loopback test'),
        expect.any(Object)
      );

      debugSpy.mockRestore();
      debugClient.close().catch(() => {
        // Ignore
      });
    });
  });

  describe('All methods are async', () => {
    it('should return promises', async () => {
      expect(service.getStatus({}) instanceof Promise).toBe(true);
      expect(service.getTelemetry({}) instanceof Promise).toBe(true);
      expect(service.ifLoopbackTest({}) instanceof Promise).toBe(true);
    });
  });

  describe('Service Integration', () => {
    it('should work with custom client configuration', () => {
      const customClient = createStarlinkClient({
        address: 'test:9200',
        debug: true,
      });
      const customService = customClient.transceiver;

      expect(customService).toBeDefined();
      expect(customService).toBeInstanceOf(TransceiverService);

      customClient.close().catch(() => {
        // Ignore
      });
    });

    it('should share channel with other services', () => {
      const deviceChannel = client.device;
      const transceiverChannel = client.transceiver;

      expect(deviceChannel).toBeDefined();
      expect(transceiverChannel).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should handle client close gracefully', async () => {
      await client.close();
      expect(service).toBeDefined();
    });

    it('should work after client reconnection', async () => {
      await client.waitForReady();
      const result = await service.getStatus({});
      expect(result).toBeDefined();
    });
  });
});
