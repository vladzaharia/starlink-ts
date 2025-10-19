import { createStarlinkClient } from '../src';

/**
 * Example: Monitor WiFi clients and network
 *
 * This example demonstrates how to retrieve WiFi network information
 * including connected clients and network configuration.
 *
 * Note: This example assumes you have a Starlink dish accessible at 192.168.100.1:9200
 */
async function monitorWifiClients() {
  const client = createStarlinkClient({
    debug: false,
  });

  try {
    await client.waitForReady();

    console.log('📶 WiFi Network Monitor\n');

    // Get WiFi status
    console.log('Getting WiFi status...');
    const wifiStatus = await client.wifi.getStatus({});
    console.log('WiFi Status:', wifiStatus);
    console.log();

    // Get connected clients
    console.log('Getting connected clients...');
    const clients = await client.wifi.getClients({});
    console.log('Connected Clients:', clients);
    console.log();

    // Get WiFi configuration
    console.log('Getting WiFi configuration...');
    const config = await client.wifi.getConfig({});
    console.log('WiFi Configuration:', config);
    console.log();

    // Get WiFi diagnostics
    console.log('Getting WiFi diagnostics...');
    const diagnostics = await client.wifi.getDiagnostics({});
    console.log('WiFi Diagnostics:', diagnostics);
  } catch (error) {
    console.error('Error monitoring WiFi clients:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

// Run the example
monitorWifiClients();
