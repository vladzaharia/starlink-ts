import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createStarlinkClient, StarlinkClient } from '../../src/client';
import { WifiService } from '../../src/services/WifiService';

describe('WifiService', () => {
  let client: StarlinkClient;
  let service: WifiService;

  beforeEach(() => {
    client = createStarlinkClient({
      debug: false,
    });
    service = client.wifi;
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
      expect(client.wifi).toBeDefined();
      expect(client.wifi).toBeInstanceOf(WifiService);
    });

    it('should be the same instance on multiple accesses', () => {
      const service1 = client.wifi;
      const service2 = client.wifi;
      expect(service1).toBe(service2);
    });

    it('should extend BaseService', () => {
      expect(service).toBeDefined();
      expect(typeof service.getClients).toBe('function');
    });
  });

  describe('getClients', () => {
    it('should be callable', async () => {
      const result = await service.getClients({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.getClients({});
      expect(typeof result).toBe('object');
    });

    it('should call debug', async () => {
      const debugClient = createStarlinkClient({ debug: true });
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      await debugClient.wifi.getClients({});

      expect(debugSpy).toHaveBeenCalledWith(
        expect.stringContaining('Getting WiFi clients'),
        expect.any(Object)
      );

      debugSpy.mockRestore();
      debugClient.close().catch(() => {
        // Ignore
      });
    });
  });

  describe('getConfig', () => {
    it('should be callable', async () => {
      const result = await service.getConfig({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.getConfig({});
      expect(typeof result).toBe('object');
    });

    it('should call debug', async () => {
      const debugClient = createStarlinkClient({ debug: true });
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      await debugClient.wifi.getConfig({});

      expect(debugSpy).toHaveBeenCalledWith(
        expect.stringContaining('Getting WiFi config'),
        expect.any(Object)
      );

      debugSpy.mockRestore();
      debugClient.close().catch(() => {
        // Ignore
      });
    });
  });

  describe('setConfig', () => {
    it('should be callable', async () => {
      const result = await service.setConfig({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.setConfig({});
      expect(typeof result).toBe('object');
    });

    it('should call debug', async () => {
      const debugClient = createStarlinkClient({ debug: true });
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      await debugClient.wifi.setConfig({});

      expect(debugSpy).toHaveBeenCalledWith(
        expect.stringContaining('Setting WiFi config'),
        expect.any(Object)
      );

      debugSpy.mockRestore();
      debugClient.close().catch(() => {
        // Ignore
      });
    });
  });

  describe('setup', () => {
    it('should be callable', async () => {
      const result = await service.setup({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.setup({});
      expect(typeof result).toBe('object');
    });

    it('should call debug', async () => {
      const debugClient = createStarlinkClient({ debug: true });
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      await debugClient.wifi.setup({});

      expect(debugSpy).toHaveBeenCalledWith(
        expect.stringContaining('Setting up WiFi'),
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

      await debugClient.wifi.getStatus({});

      expect(debugSpy).toHaveBeenCalledWith(
        expect.stringContaining('Getting WiFi status'),
        expect.any(Object)
      );

      debugSpy.mockRestore();
      debugClient.close().catch(() => {
        // Ignore
      });
    });
  });

  describe('getPingMetrics', () => {
    it('should be callable', async () => {
      const result = await service.getPingMetrics({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.getPingMetrics({});
      expect(typeof result).toBe('object');
    });
  });

  describe('getClientHistory', () => {
    it('should be callable', async () => {
      const result = await service.getClientHistory({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.getClientHistory({});
      expect(typeof result).toBe('object');
    });
  });

  describe('setClientGivenName', () => {
    it('should be callable', async () => {
      const result = await service.setClientGivenName({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.setClientGivenName({});
      expect(typeof result).toBe('object');
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
  });

  describe('runSelfTest', () => {
    it('should be callable', async () => {
      const result = await service.runSelfTest({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.runSelfTest({});
      expect(typeof result).toBe('object');
    });
  });

  describe('getFirewall', () => {
    it('should be callable', async () => {
      const result = await service.getFirewall({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.getFirewall({});
      expect(typeof result).toBe('object');
    });
  });

  describe('getGuestInfo', () => {
    it('should be callable', async () => {
      const result = await service.getGuestInfo({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.getGuestInfo({});
      expect(typeof result).toBe('object');
    });
  });

  describe('All methods are async', () => {
    it('should return promises', async () => {
      expect(service.getClients({}) instanceof Promise).toBe(true);
      expect(service.getConfig({}) instanceof Promise).toBe(true);
      expect(service.setConfig({}) instanceof Promise).toBe(true);
      expect(service.setup({}) instanceof Promise).toBe(true);
      expect(service.getStatus({}) instanceof Promise).toBe(true);
      expect(service.getPingMetrics({}) instanceof Promise).toBe(true);
      expect(service.getClientHistory({}) instanceof Promise).toBe(true);
      expect(service.setClientGivenName({}) instanceof Promise).toBe(true);
      expect(service.getDiagnostics({}) instanceof Promise).toBe(true);
      expect(service.runSelfTest({}) instanceof Promise).toBe(true);
      expect(service.getFirewall({}) instanceof Promise).toBe(true);
      expect(service.getGuestInfo({}) instanceof Promise).toBe(true);
    });
  });
});
