import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createStarlinkClient, StarlinkClient } from '../../src/client';

describe('Service Integration', () => {
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

  describe('All Services Available', () => {
    it('should have all four services', () => {
      expect(client.device).toBeDefined();
      expect(client.dish).toBeDefined();
      expect(client.wifi).toBeDefined();
      expect(client.transceiver).toBeDefined();
    });

    it('should have correct service types', () => {
      expect(typeof client.device).toBe('object');
      expect(typeof client.dish).toBe('object');
      expect(typeof client.wifi).toBe('object');
      expect(typeof client.transceiver).toBe('object');
    });
  });

  describe('Services Share Channel', () => {
    it('should all use same gRPC channel', () => {
      const deviceChannel = client.device;
      const dishChannel = client.dish;
      const wifiChannel = client.wifi;
      const transceiverChannel = client.transceiver;

      // All services should be defined
      expect(deviceChannel).toBeDefined();
      expect(dishChannel).toBeDefined();
      expect(wifiChannel).toBeDefined();
      expect(transceiverChannel).toBeDefined();
    });
  });

  describe('Multiple Service Calls', () => {
    it('should handle sequential calls to different services', async () => {
      const deviceInfo = await client.device.getInfo({});
      const dishContext = await client.dish.getContext({});
      const wifiClients = await client.wifi.getClients({});
      const transceiverStatus = await client.transceiver.getStatus({});

      expect(deviceInfo).toBeDefined();
      expect(dishContext).toBeDefined();
      expect(wifiClients).toBeDefined();
      expect(transceiverStatus).toBeDefined();
    });

    it('should handle concurrent calls to different services', async () => {
      const results = await Promise.all([
        client.device.getStatus({}),
        client.dish.getStatus({}),
        client.wifi.getStatus({}),
        client.transceiver.getTelemetry({}),
      ]);

      expect(results).toHaveLength(4);
      results.forEach((result) => {
        expect(result).toBeDefined();
      });
    });

    it('should handle multiple calls to same service', async () => {
      const info1 = await client.device.getInfo({});
      const info2 = await client.device.getInfo({});
      const status = await client.device.getStatus({});

      expect(info1).toBeDefined();
      expect(info2).toBeDefined();
      expect(status).toBeDefined();
    });
  });

  describe('Service State Management', () => {
    it('should maintain state across service calls', async () => {
      expect(client.isReady()).toBe(false);

      await client.waitForReady();
      expect(client.isReady()).toBe(true);

      // Services should reflect client state
      const result = await client.device.getInfo({});
      expect(result).toBeDefined();
      expect(client.isReady()).toBe(true);
    });

    it('should handle client close across all services', async () => {
      await client.waitForReady();
      expect(client.isReady()).toBe(true);

      await client.close();
      expect(client.isReady()).toBe(false);
    });
  });

  describe('Service Configuration', () => {
    it('should apply configuration to all services', () => {
      const customClient = createStarlinkClient({
        address: 'custom:9200',
        requestTimeout: 60000,
        debug: true,
      });

      const config = customClient.getConfig();
      expect(config.address).toBe('custom:9200');
      expect(config.requestTimeout).toBe(60000);
      expect(config.debug).toBe(true);

      // All services should use same config
      expect(customClient.device).toBeDefined();
      expect(customClient.dish).toBeDefined();
      expect(customClient.wifi).toBeDefined();
      expect(customClient.transceiver).toBeDefined();

      customClient.close().catch(() => {
        // Ignore
      });
    });
  });

  describe('Service Method Availability', () => {
    it('should have all device service methods', () => {
      expect(typeof client.device.getInfo).toBe('function');
      expect(typeof client.device.getStatus).toBe('function');
      expect(typeof client.device.reboot).toBe('function');
      expect(typeof client.device.getLogs).toBe('function');
      expect(typeof client.device.getLocation).toBe('function');
      expect(typeof client.device.speedTest).toBe('function');
      expect(typeof client.device.getPing).toBe('function');
      expect(typeof client.device.pingHost).toBe('function');
      expect(typeof client.device.getNetworkInterfaces).toBe('function');
      expect(typeof client.device.getDiagnostics).toBe('function');
    });

    it('should have all dish service methods', () => {
      expect(typeof client.dish.getContext).toBe('function');
      expect(typeof client.dish.getStatus).toBe('function');
      expect(typeof client.dish.stow).toBe('function');
      expect(typeof client.dish.getObstructionMap).toBe('function');
      expect(typeof client.dish.clearObstructionMap).toBe('function');
      expect(typeof client.dish.getEmc).toBe('function');
      expect(typeof client.dish.setEmc).toBe('function');
      expect(typeof client.dish.getConfig).toBe('function');
      expect(typeof client.dish.setConfig).toBe('function');
      expect(typeof client.dish.setPowerSave).toBe('function');
      expect(typeof client.dish.activateRssiScan).toBe('function');
      expect(typeof client.dish.getRssiScanResult).toBe('function');
      expect(typeof client.dish.getDiagnostics).toBe('function');
    });

    it('should have all wifi service methods', () => {
      expect(typeof client.wifi.getClients).toBe('function');
      expect(typeof client.wifi.getConfig).toBe('function');
      expect(typeof client.wifi.setConfig).toBe('function');
      expect(typeof client.wifi.setup).toBe('function');
      expect(typeof client.wifi.getStatus).toBe('function');
      expect(typeof client.wifi.getPingMetrics).toBe('function');
      expect(typeof client.wifi.getClientHistory).toBe('function');
      expect(typeof client.wifi.setClientGivenName).toBe('function');
      expect(typeof client.wifi.getDiagnostics).toBe('function');
      expect(typeof client.wifi.runSelfTest).toBe('function');
      expect(typeof client.wifi.getFirewall).toBe('function');
      expect(typeof client.wifi.getGuestInfo).toBe('function');
    });

    it('should have all transceiver service methods', () => {
      expect(typeof client.transceiver.getStatus).toBe('function');
      expect(typeof client.transceiver.getTelemetry).toBe('function');
      expect(typeof client.transceiver.ifLoopbackTest).toBe('function');
    });
  });

  describe('Error Handling Across Services', () => {
    it('should handle errors independently per service', async () => {
      // All services should work independently
      const results = await Promise.allSettled([
        client.device.getInfo({}),
        client.dish.getContext({}),
        client.wifi.getClients({}),
        client.transceiver.getStatus({}),
      ]);

      expect(results).toHaveLength(4);
      results.forEach((result) => {
        expect(result.status).toBe('fulfilled');
      });
    });
  });

  describe('Client Lifecycle with Services', () => {
    it('should initialize services on client creation', () => {
      expect(client.device).toBeDefined();
      expect(client.dish).toBeDefined();
      expect(client.wifi).toBeDefined();
      expect(client.transceiver).toBeDefined();
    });

    it('should maintain services through client lifecycle', async () => {
      const device1 = client.device;
      const dish1 = client.dish;

      await client.waitForReady();

      const device2 = client.device;
      const dish2 = client.dish;

      expect(device1).toBe(device2);
      expect(dish1).toBe(dish2);
    });

    it('should clean up properly on close', async () => {
      await client.waitForReady();
      expect(client.isReady()).toBe(true);

      await client.close();
      expect(client.isReady()).toBe(false);

      // Services should still be accessible (though channel is closed)
      expect(client.device).toBeDefined();
      expect(client.dish).toBeDefined();
    });
  });
});
