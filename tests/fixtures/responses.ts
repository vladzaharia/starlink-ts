/**
 * Test fixtures for common gRPC responses
 */

/**
 * Mock device info response
 */
export const mockDeviceInfo = {
  id: 'test-device-id',
  hardwareVersion: 'rev2_proto_v2',
  softwareVersion: '2024.01.01.0',
  countryCode: 'US',
  utcOffsetS: -18000,
  isProd: true,
  bootCount: 42,
  antiRollbackVersion: 1,
  isWifiOnly: false,
  hasNcm: true,
};

/**
 * Mock device status response
 */
export const mockDeviceStatus = {
  uptimeS: 86400,
  secondsToFirstNonemptySlot: 0,
  popPingDropRate: 0.01,
  popPingLatencyMs: 45.5,
  downlinkThroughputBps: 100000000,
  uplinkThroughputBps: 20000000,
  popPingDropRateV6: 0.02,
  popPingLatencyMsV6: 46.5,
  downlinkThroughputBpsV6: 95000000,
  uplinkThroughputBpsV6: 19000000,
  isSnrAboveNominal: true,
  isObstructed: false,
  isUnderradiated: false,
  isOverradiated: false,
  isBootComplete: true,
  isOperational: true,
  isHeatingUp: false,
  isMoving: false,
  isBusy: false,
  isCharging: false,
  isDischarging: false,
  batteryPercent: 100,
  secondsSinceLastBoot: 86400,
  secondsSinceLastCharge: 172800,
  isRxBandwidthLimited: false,
  isTxBandwidthLimited: false,
  isUnknownPci: false,
  isUnknownInterference: false,
  isTemperatureThrottled: false,
  isVcmOverPower: false,
  isPhyModeId: false,
  isProactivelyThrottled: false,
  isUnderradiated2: false,
  isOverradiated2: false,
  isUnknownNoiseFloor: false,
  isUnknownNoiseFloor2: false,
};

/**
 * Mock dish context response
 */
export const mockDishContext = {
  boresightAzimuthDeg: 180.5,
  boresightElevationDeg: 45.2,
  orientationAzimuthDeg: 180.5,
  orientationElevationDeg: 45.2,
  orientationRollDeg: 0.0,
  dishEulerRateAzimuthDegS: 0.0,
  dishEulerRateElevationDegS: 0.0,
  dishEulerRateRollDegS: 0.0,
};

/**
 * Mock WiFi client response
 */
export const mockWifiClient = {
  mac: '00:11:22:33:44:55',
  name: 'Test Device',
  signalStrength: -50,
  frequency: 5000,
  bandwidth: 80,
  isAuthenticated: true,
  lastSeen: 1234567890,
};

/**
 * Mock WiFi clients response
 */
export const mockWifiClients = {
  clients: [mockWifiClient],
};

/**
 * Mock WiFi status response
 */
export const mockWifiStatus = {
  wifiSsid: 'Starlink',
  wifiSsidV6: 'Starlink-v6',
  wifiHide: false,
  wifiHideV6: false,
  wifiSecurityType: 'WPA2',
  wifiSecurityTypeV6: 'WPA2',
  wifiPower: 100,
  wifiPowerV6: 100,
  wifiChannel: 149,
  wifiChannelV6: 149,
  wifiMode: 'ac',
  wifiModeV6: 'ax',
  wifiFreq: 5000,
  wifiFreqV6: 5000,
  wifiCountryCode: 'US',
  wifiCountryCodeV6: 'US',
};

/**
 * Mock transceiver status response
 */
export const mockTransceiverStatus = {
  gpsSignal: 'GOOD',
  gpsNoSats: 12,
  gpsWeek: 2200,
  gpsTow: 123456,
  gpsValid: true,
  imuLinAccX: 0.0,
  imuLinAccY: 0.0,
  imuLinAccZ: 9.81,
  imuAngVelX: 0.0,
  imuAngVelY: 0.0,
  imuAngVelZ: 0.0,
  imuTemp: 25.5,
};

/**
 * Mock location response
 */
export const mockLocation = {
  latitude: 37.7749,
  longitude: -122.4194,
  altitude: 100,
  accuracy: 5,
};

/**
 * Mock speed test response
 */
export const mockSpeedTest = {
  uploadMbps: 20.5,
  downloadMbps: 100.5,
  latencyMs: 45.5,
  packetLoss: 0.01,
};

/**
 * Mock ping response
 */
export const mockPing = {
  latencyMs: 45.5,
  packetLoss: 0.01,
  minLatencyMs: 40.0,
  maxLatencyMs: 50.0,
  avgLatencyMs: 45.5,
};

/**
 * Mock reboot response
 */
export const mockRebootResponse = {
  success: true,
};

/**
 * Mock empty response
 */
export const mockEmptyResponse = {};

