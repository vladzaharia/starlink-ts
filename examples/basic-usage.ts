import { createStarlinkClient } from '../src';

/**
 * Example: Get device information from Starlink dish
 *
 * Note: This example assumes you have a Starlink dish accessible at 192.168.100.1:9200
 * Adjust the address according to your setup.
 */
async function getDeviceInfo() {
  const client = createStarlinkClient({
    address: '192.168.100.1:9200',
  });

  return new Promise((resolve, reject) => {
    client.getDeviceInfo({}, (err, response) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(response);
    });
  });
}

/**
 * Example: Get device status from Starlink dish
 */
async function getDeviceStatus() {
  const client = createStarlinkClient({
    address: '192.168.100.1:9200',
  });

  return new Promise((resolve, reject) => {
    client.getStatus({}, (err, response) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(response);
    });
  });
}

// Main execution
async function main() {
  try {
    console.log('Fetching device information...');
    const deviceInfo = await getDeviceInfo();
    console.log('Device Info:', deviceInfo);

    console.log('\nFetching device status...');
    const deviceStatus = await getDeviceStatus();
    console.log('Device Status:', deviceStatus);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Run if this is the main module
if (require.main === module) {
  main();
}
