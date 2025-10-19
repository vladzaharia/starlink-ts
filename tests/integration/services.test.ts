/**
 * Integration tests for service interactions
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { StarlinkClient, createStarlinkClient } from '../../src/client';
import { DeviceService } from '../../src/services/DeviceService';
import { DishService } from '../../src/services/DishService';
import { WifiService } from '../../src/services/WifiService';
import { TransceiverService } from '../../src/services/TransceiverService';
import { mockDeviceInfo, mockDishContext, mockWifiClients, mockTransceiverStatus } from '../fixtures/responses';

describe('Service Integration', () => {
  let client: StarlinkClient;

  beforeEach(() => {
    client = createStarlinkClient({ debug: false });
  });

  afterEach(async () => {
    await client.close().catch(() => {});
  });

  describe('all services available', () => {
    it('should have device service', () => {
      expect(client.device).toBeInstanceOf(DeviceService);
    });

    it('should have dish service', () => {
      expect(client.dish).toBeInstanceOf(DishService);
    });

    it('should have wifi service', () => {
      expect(client.wifi).toBeInstanceOf(WifiService);
    });

    it('should have transceiver service', () => {
      expect(client.transceiver).toBeInstanceOf(TransceiverService);
    });
  });

  describe('services share grpc client', () => {
    it('should share same grpc client', () => {
      const deviceGrpc = (client.device as any).grpcClient;
      const dishGrpc = (client.dish as any).grpcClient;
      const wifiGrpc = (client.wifi as any).grpcClient;
      const transceiverGrpc = (client.transceiver as any).grpcClient;

      expect(deviceGrpc).toBe(dishGrpc);
      expect(dishGrpc).toBe(wifiGrpc);
      expect(wifiGrpc).toBe(transceiverGrpc);
    });

    it('should share same config', () => {
      const deviceConfig = (client.device as any).config;
      const dishConfig = (client.dish as any).config;
      const wifiConfig = (client.wifi as any).config;
      const transceiverConfig = (client.transceiver as any).config;

      expect(deviceConfig).toBe(dishConfig);
      expect(dishConfig).toBe(wifiConfig);
      expect(wifiConfig).toBe(transceiverConfig);
    });

    it('should share same client reference', () => {
      const deviceClient = (client.device as any).client;
      const dishClient = (client.dish as any).client;
      const wifiClient = (client.wifi as any).client;
      const transceiverClient = (client.transceiver as any).client;

      expect(deviceClient).toBe(dishClient);
      expect(dishClient).toBe(wifiClient);
      expect(wifiClient).toBe(transceiverClient);
      expect(deviceClient).toBe(client);
    });
  });

  describe('sequential service calls', () => {
    it('should allow sequential calls to different services', async () => {
      const deviceSpy = vi.spyOn(client.device as any, 'call').mockResolvedValue(mockDeviceInfo);
      const dishSpy = vi.spyOn(client.dish as any, 'call').mockResolvedValue(mockDishContext);
      const wifiSpy = vi.spyOn(client.wifi as any, 'call').mockResolvedValue(mockWifiClients);

      await client.device.getInfo({});
      await client.dish.getContext({});
      await client.wifi.getClients({});

      expect(deviceSpy).toHaveBeenCalled();
      expect(dishSpy).toHaveBeenCalled();
      expect(wifiSpy).toHaveBeenCalled();

      deviceSpy.mockRestore();
      dishSpy.mockRestore();
      wifiSpy.mockRestore();
    });

    it('should allow multiple calls to same service', async () => {
      const spy = vi.spyOn(client.device as any, 'call').mockResolvedValue(mockDeviceInfo);

      await client.device.getInfo({});
      await client.device.getInfo({});
      await client.device.getInfo({});

      expect(spy).toHaveBeenCalledTimes(3);
      spy.mockRestore();
    });
  });

  describe('concurrent service calls', () => {
    it('should handle concurrent calls to different services', async () => {
      const deviceSpy = vi.spyOn(client.device as any, 'call').mockResolvedValue(mockDeviceInfo);
      const dishSpy = vi.spyOn(client.dish as any, 'call').mockResolvedValue(mockDishContext);
      const wifiSpy = vi.spyOn(client.wifi as any, 'call').mockResolvedValue(mockWifiClients);
      const transceiverSpy = vi
        .spyOn(client.transceiver as any, 'call')
        .mockResolvedValue(mockTransceiverStatus);

      await Promise.all([
        client.device.getInfo({}),
        client.dish.getContext({}),
        client.wifi.getClients({}),
        client.transceiver.getStatus({}),
      ]);

      expect(deviceSpy).toHaveBeenCalled();
      expect(dishSpy).toHaveBeenCalled();
      expect(wifiSpy).toHaveBeenCalled();
      expect(transceiverSpy).toHaveBeenCalled();

      deviceSpy.mockRestore();
      dishSpy.mockRestore();
      wifiSpy.mockRestore();
      transceiverSpy.mockRestore();
    });

    it('should handle concurrent calls to same service', async () => {
      const spy = vi.spyOn(client.device as any, 'call').mockResolvedValue(mockDeviceInfo);

      await Promise.all([
        client.device.getInfo({}),
        client.device.getInfo({}),
        client.device.getInfo({}),
      ]);

      expect(spy).toHaveBeenCalledTimes(3);
      spy.mockRestore();
    });
  });

  describe('service state management', () => {
    it('should reflect connection state across services', async () => {
      expect(client.isReady()).toBe(false);
      expect((client.device as any).isReady()).toBe(false);
      expect((client.dish as any).isReady()).toBe(false);
      expect((client.wifi as any).isReady()).toBe(false);
      expect((client.transceiver as any).isReady()).toBe(false);

      await client.waitForReady();

      expect(client.isReady()).toBe(true);
      expect((client.device as any).isReady()).toBe(true);
      expect((client.dish as any).isReady()).toBe(true);
      expect((client.wifi as any).isReady()).toBe(true);
      expect((client.transceiver as any).isReady()).toBe(true);
    });

    it('should reflect config across services', () => {
      const config = client.getConfig();
      const deviceConfig = (client.device as any).config;
      const dishConfig = (client.dish as any).config;

      expect(config).toBe(deviceConfig);
      expect(deviceConfig).toBe(dishConfig);
      expect(config.address).toBe('192.168.100.1:9200');
    });
  });

  describe('configuration propagation', () => {
    it('should apply custom config to all services', () => {
      const customClient = createStarlinkClient({
        address: '10.0.0.1:9200',
        requestTimeout: 60000,
        debug: true,
      });

      const config = customClient.getConfig();
      expect(config.address).toBe('10.0.0.1:9200');
      expect(config.requestTimeout).toBe(60000);
      expect(config.debug).toBe(true);

      const deviceConfig = (customClient.device as any).config;
      expect(deviceConfig.address).toBe('10.0.0.1:9200');
      expect(deviceConfig.requestTimeout).toBe(60000);

      customClient.close().catch(() => {});
    });
  });

  describe('service method availability', () => {
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

  describe('client lifecycle with services', () => {
    it('should initialize services on client creation', () => {
      expect(client.device).toBeDefined();
      expect(client.dish).toBeDefined();
      expect(client.wifi).toBeDefined();
      expect(client.transceiver).toBeDefined();
    });

    it('should maintain service references after close', async () => {
      const device = client.device;
      const dish = client.dish;
      await client.close();
      expect(client.device).toBe(device);
      expect(client.dish).toBe(dish);
    });
  });
});

