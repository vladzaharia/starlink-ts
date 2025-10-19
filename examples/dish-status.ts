import { createStarlinkClient } from '../src';

/**
 * Example: Monitor dish status
 *
 * This example demonstrates how to retrieve dish-specific information
 * including satellite tracking and dish orientation.
 *
 * Note: This example assumes you have a Starlink dish accessible at 192.168.100.1:9200
 */
async function monitorDishStatus() {
  const client = createStarlinkClient({
    debug: false,
  });

  try {
    await client.waitForReady();

    console.log('🛰️  Monitoring Dish Status...\n');

    // Get dish status
    console.log('Getting dish status...');
    const status = await client.dish.getStatus({});
    console.log('Dish Status:', status);
    console.log();

    // Get dish context (satellite information)
    console.log('Getting dish context...');
    const context = await client.dish.getContext({});
    console.log('Dish Context:', context);
    console.log();

    // Get dish config
    console.log('Getting dish configuration...');
    const config = await client.dish.getConfig({});
    console.log('Dish Configuration:', config);
  } catch (error) {
    console.error('Error monitoring dish status:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

// Run the example
monitorDishStatus();

