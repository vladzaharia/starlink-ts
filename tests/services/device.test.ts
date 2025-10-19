import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createStarlinkClient, StarlinkClient } from '../../src/client';
import { DeviceService } from '../../src/services/DeviceService';

describe('DeviceService', () => {
  let client: StarlinkClient;
  let service: DeviceService;

  beforeEach(() => {
    client = createStarlinkClient({
      debug: false,
    });
    service = client.device;
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
      expect(client.device).toBeDefined();
      expect(client.device).toBeInstanceOf(DeviceService);
    });

    it('should be the same instance on multiple accesses', () => {
      const service1 = client.device;
      const service2 = client.device;
      expect(service1).toBe(service2);
    });

    it('should extend BaseService', () => {
      expect(service).toBeDefined();
      // Verify it has BaseService methods
      expect(typeof service.getInfo).toBe('function');
    });
  });

  describe('getInfo', () => {
    it('should be callable', async () => {
      const result = await service.getInfo({});
      expect(result).toBeDefined();
    });

    it('should accept empty request', async () => {
      const result = await service.getInfo({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.getInfo({});
      expect(typeof result).toBe('object');
    });

    it('should call debug when debug enabled', async () => {
      const debugClient = createStarlinkClient({ debug: true });
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      await debugClient.device.getInfo({});

      expect(debugSpy).toHaveBeenCalledWith(
        expect.stringContaining('Getting device info'),
        expect.any(Object)
      );

      debugSpy.mockRestore();
      debugClient.close().catch(() => {
        // Ignore
      });
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

      await debugClient.device.getStatus({});

      expect(debugSpy).toHaveBeenCalledWith(
        expect.stringContaining('Getting device status'),
        expect.any(Object)
      );

      debugSpy.mockRestore();
      debugClient.close().catch(() => {
        // Ignore
      });
    });
  });

  describe('reboot', () => {
    it('should be callable', async () => {
      const result = await service.reboot({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.reboot({});
      expect(typeof result).toBe('object');
    });

    it('should call debug', async () => {
      const debugClient = createStarlinkClient({ debug: true });
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      await debugClient.device.reboot({});

      expect(debugSpy).toHaveBeenCalledWith(
        expect.stringContaining('Rebooting device'),
        expect.any(Object)
      );

      debugSpy.mockRestore();
      debugClient.close().catch(() => {
        // Ignore
      });
    });
  });

  describe('getLogs', () => {
    it('should be callable', async () => {
      const result = await service.getLogs({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.getLogs({});
      expect(typeof result).toBe('object');
    });

    it('should call debug', async () => {
      const debugClient = createStarlinkClient({ debug: true });
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      await debugClient.device.getLogs({});

      expect(debugSpy).toHaveBeenCalledWith(
        expect.stringContaining('Getting device logs'),
        expect.any(Object)
      );

      debugSpy.mockRestore();
      debugClient.close().catch(() => {
        // Ignore
      });
    });
  });

  describe('getLocation', () => {
    it('should be callable', async () => {
      const result = await service.getLocation({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.getLocation({});
      expect(typeof result).toBe('object');
    });

    it('should call debug', async () => {
      const debugClient = createStarlinkClient({ debug: true });
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      await debugClient.device.getLocation({});

      expect(debugSpy).toHaveBeenCalledWith(
        expect.stringContaining('Getting device location'),
        expect.any(Object)
      );

      debugSpy.mockRestore();
      debugClient.close().catch(() => {
        // Ignore
      });
    });
  });

  describe('speedTest', () => {
    it('should be callable', async () => {
      const result = await service.speedTest({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.speedTest({});
      expect(typeof result).toBe('object');
    });

    it('should call debug', async () => {
      const debugClient = createStarlinkClient({ debug: true });
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      await debugClient.device.speedTest({});

      expect(debugSpy).toHaveBeenCalledWith(
        expect.stringContaining('Running speed test'),
        expect.any(Object)
      );

      debugSpy.mockRestore();
      debugClient.close().catch(() => {
        // Ignore
      });
    });
  });

  describe('getPing', () => {
    it('should be callable', async () => {
      const result = await service.getPing({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.getPing({});
      expect(typeof result).toBe('object');
    });

    it('should call debug', async () => {
      const debugClient = createStarlinkClient({ debug: true });
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      await debugClient.device.getPing({});

      expect(debugSpy).toHaveBeenCalledWith(
        expect.stringContaining('Getting ping statistics'),
        expect.any(Object)
      );

      debugSpy.mockRestore();
      debugClient.close().catch(() => {
        // Ignore
      });
    });
  });

  describe('pingHost', () => {
    it('should be callable', async () => {
      const result = await service.pingHost({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.pingHost({});
      expect(typeof result).toBe('object');
    });

    it('should call debug', async () => {
      const debugClient = createStarlinkClient({ debug: true });
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      await debugClient.device.pingHost({});

      expect(debugSpy).toHaveBeenCalledWith(
        expect.stringContaining('Pinging host'),
        expect.any(Object)
      );

      debugSpy.mockRestore();
      debugClient.close().catch(() => {
        // Ignore
      });
    });
  });

  describe('getNetworkInterfaces', () => {
    it('should be callable', async () => {
      const result = await service.getNetworkInterfaces({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.getNetworkInterfaces({});
      expect(typeof result).toBe('object');
    });

    it('should call debug', async () => {
      const debugClient = createStarlinkClient({ debug: true });
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      await debugClient.device.getNetworkInterfaces({});

      expect(debugSpy).toHaveBeenCalledWith(
        expect.stringContaining('Getting network interfaces'),
        expect.any(Object)
      );

      debugSpy.mockRestore();
      debugClient.close().catch(() => {
        // Ignore
      });
    });
  });

  describe('getDiagnostics', () => {
    it('should be callable', async () => {
      const result = await service.getDiagnostics({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.getDiagnostics({});
      expect(typeof result).toBe('object');
    });

    it('should call debug', async () => {
      const debugClient = createStarlinkClient({ debug: true });
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      await debugClient.device.getDiagnostics({});

      expect(debugSpy).toHaveBeenCalledWith(
        expect.stringContaining('Getting diagnostics'),
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
      expect(service.getInfo({}) instanceof Promise).toBe(true);
      expect(service.getStatus({}) instanceof Promise).toBe(true);
      expect(service.reboot({}) instanceof Promise).toBe(true);
      expect(service.getLogs({}) instanceof Promise).toBe(true);
      expect(service.getLocation({}) instanceof Promise).toBe(true);
      expect(service.speedTest({}) instanceof Promise).toBe(true);
      expect(service.getPing({}) instanceof Promise).toBe(true);
      expect(service.pingHost({}) instanceof Promise).toBe(true);
      expect(service.getNetworkInterfaces({}) instanceof Promise).toBe(true);
      expect(service.getDiagnostics({}) instanceof Promise).toBe(true);
    });
  });
});
