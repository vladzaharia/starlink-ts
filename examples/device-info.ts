import { createStarlinkClient } from '../src';

/**
 * Example: Get device information
 *
 * This example demonstrates how to retrieve device information
 * from a Starlink dish.
 *
 * Note: This example assumes you have a Starlink dish accessible at 192.168.100.1:9200
 */
async function getDeviceInfo() {
  const client = createStarlinkClient({
    // address defaults to '192.168.100.1:9200' if not specified
    debug: false, // Set to true to see debug logs
  });

  try {
    await client.waitForReady();

    console.log('📡 Fetching device information...\n');

    // Get device info
    console.log('Getting device information...');
    const info = await client.device.getInfo({});
    console.log('Device Information:', info);
    console.log();

    // Get device status
    console.log('Getting device status...');
    const status = await client.device.getStatus({});
    console.log('Device Status:', status);
    console.log();

    // Get device location
    console.log('Getting device location...');
    const location = await client.device.getLocation({});
    console.log('Device Location:', location);
  } catch (error) {
    console.error('Error fetching device information:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

// Run the example
getDeviceInfo();

