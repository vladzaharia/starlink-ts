import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createStarlinkClient, StarlinkClient } from '../../src/client';
import { DishService } from '../../src/services/DishService';
import { mockGrpcHandle } from '../helpers/mockGrpcClient';

describe('DishService', () => {
  let client: StarlinkClient;
  let service: DishService;

  beforeEach(() => {
    client = createStarlinkClient({
      debug: false,
    });
    service = client.dish;
  });

  afterEach(async () => {
    vi.restoreAllMocks();
    if (client) {
      await client.close().catch(() => {
        // Ignore errors during cleanup
      });
    }
  });

  describe('Service Initialization', () => {
    it('should be accessible from client', () => {
      expect(client.dish).toBeDefined();
      expect(client.dish).toBeInstanceOf(DishService);
    });

    it('should be the same instance on multiple accesses', () => {
      const service1 = client.dish;
      const service2 = client.dish;
      expect(service1).toBe(service2);
    });

    it('should extend BaseService', () => {
      expect(service).toBeDefined();
      expect(typeof service.getContext).toBe('function');
    });
  });

  describe('getContext', () => {
    it('should be callable', async () => {
      mockGrpcHandle(client, 'dishGetContext', {});
      const result = await service.getContext({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      mockGrpcHandle(client, 'dishGetContext', {});
      const result = await service.getContext({});
      expect(typeof result).toBe('object');
    });

    it('should call debug', async () => {
      const debugClient = createStarlinkClient({ debug: true });
      mockGrpcHandle(debugClient, 'dishGetContext', {});
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      await debugClient.dish.getContext({});

      expect(debugSpy).toHaveBeenCalledWith(
        expect.stringContaining('Getting dish context'),
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
      mockGrpcHandle(client, 'dishGetStatus', {});
      const result = await service.getStatus({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      mockGrpcHandle(client, 'dishGetStatus', {});
      const result = await service.getStatus({});
      expect(typeof result).toBe('object');
    });

    it('should call debug', async () => {
      const debugClient = createStarlinkClient({ debug: true });
      mockGrpcHandle(debugClient, 'dishGetStatus', {});
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      await debugClient.dish.getStatus({});

      expect(debugSpy).toHaveBeenCalledWith(
        expect.stringContaining('Getting dish status'),
        undefined
      );

      debugSpy.mockRestore();
      debugClient.close().catch(() => {
        // Ignore
      });
    });
  });

  describe('stow', () => {
    it('should be callable', async () => {
      const result = await service.stow({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.stow({});
      expect(typeof result).toBe('object');
    });

    it('should call debug', async () => {
      const debugClient = createStarlinkClient({ debug: true });
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      await debugClient.dish.stow({});

      expect(debugSpy).toHaveBeenCalledWith(
        expect.stringContaining('Stowing dish'),
        expect.any(Object)
      );

      debugSpy.mockRestore();
      debugClient.close().catch(() => {
        // Ignore
      });
    });
  });

  describe('getObstructionMap', () => {
    it('should be callable', async () => {
      const result = await service.getObstructionMap({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.getObstructionMap({});
      expect(typeof result).toBe('object');
    });

    it('should call debug', async () => {
      const debugClient = createStarlinkClient({ debug: true });
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      await debugClient.dish.getObstructionMap({});

      expect(debugSpy).toHaveBeenCalledWith(
        expect.stringContaining('Getting obstruction map'),
        expect.any(Object)
      );

      debugSpy.mockRestore();
      debugClient.close().catch(() => {
        // Ignore
      });
    });
  });

  describe('clearObstructionMap', () => {
    it('should be callable', async () => {
      const result = await service.clearObstructionMap({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.clearObstructionMap({});
      expect(typeof result).toBe('object');
    });

    it('should call debug', async () => {
      const debugClient = createStarlinkClient({ debug: true });
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      await debugClient.dish.clearObstructionMap({});

      expect(debugSpy).toHaveBeenCalledWith(
        expect.stringContaining('Clearing obstruction map'),
        expect.any(Object)
      );

      debugSpy.mockRestore();
      debugClient.close().catch(() => {
        // Ignore
      });
    });
  });

  describe('getEmc', () => {
    it('should be callable', async () => {
      const result = await service.getEmc({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.getEmc({});
      expect(typeof result).toBe('object');
    });
  });

  describe('setEmc', () => {
    it('should be callable', async () => {
      const result = await service.setEmc({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.setEmc({});
      expect(typeof result).toBe('object');
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
  });

  describe('setPowerSave', () => {
    it('should be callable', async () => {
      const result = await service.setPowerSave({});
      expect(result).toBeUndefined();
    });
  });

  describe('activateRssiScan', () => {
    it('should be callable', async () => {
      const result = await service.activateRssiScan({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.activateRssiScan({});
      expect(typeof result).toBe('object');
    });
  });

  describe('getRssiScanResult', () => {
    it('should be callable', async () => {
      const result = await service.getRssiScanResult({});
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.getRssiScanResult({});
      expect(typeof result).toBe('object');
    });
  });

  describe('getDiagnostics', () => {
    it('should be callable', async () => {
      const result = await service.getDiagnostics();
      expect(result).toBeDefined();
    });

    it('should return object', async () => {
      const result = await service.getDiagnostics();
      expect(typeof result).toBe('object');
    });

    it('should call debug', async () => {
      const debugClient = createStarlinkClient({ debug: true });
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      await debugClient.dish.getDiagnostics();

      expect(debugSpy).toHaveBeenCalledWith(
        expect.stringContaining('Getting dish diagnostics'),
        undefined
      );

      debugSpy.mockRestore();
      debugClient.close().catch(() => {
        // Ignore
      });
    });
  });

  describe('All methods are async', () => {
    it('should return promises', async () => {
      expect(service.getContext({}) instanceof Promise).toBe(true);
      expect(service.getStatus({}) instanceof Promise).toBe(true);
      expect(service.stow({}) instanceof Promise).toBe(true);
      expect(service.getObstructionMap({}) instanceof Promise).toBe(true);
      expect(service.clearObstructionMap({}) instanceof Promise).toBe(true);
      expect(service.getEmc({}) instanceof Promise).toBe(true);
      expect(service.setEmc({}) instanceof Promise).toBe(true);
      expect(service.getConfig({}) instanceof Promise).toBe(true);
      expect(service.setConfig({}) instanceof Promise).toBe(true);
      expect(service.setPowerSave({}) instanceof Promise).toBe(true);
      expect(service.activateRssiScan({}) instanceof Promise).toBe(true);
      expect(service.getRssiScanResult({}) instanceof Promise).toBe(true);
      expect(service.getDiagnostics() instanceof Promise).toBe(true);
    });
  });
});
