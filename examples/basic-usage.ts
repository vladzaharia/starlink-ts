import { createStarlinkClient } from '../src';

/**
 * Example: Get dish context information
 *
 * Note: This example assumes you have a Starlink dish accessible at 192.168.100.1:9200
 * Adjust the address according to your setup.
 */
async function getDishContext() {
  const client = createStarlinkClient({
    // address defaults to '192.168.100.1:9200' if not specified
  });

  try {
    await client.waitForReady();
    const context = await client.dish.getContext({});
    console.log('Dish Context:', context);
    return context;
  } finally {
    await client.close();
  }
}

/**
 * Example: Get dish status
 */
async function getDishStatus() {
  const client = createStarlinkClient();

  try {
    await client.waitForReady();
    const status = await client.dish.getStatus({});
    console.log('Dish Status:', status);
    return status;
  } finally {
    await client.close();
  }
}

/**
 * Example: Stow the dish
 */
async function stowDish() {
  const client = createStarlinkClient();

  try {
    await client.waitForReady();
    const response = await client.dish.stow({ unstow: false });
    console.log('Stow Response:', response);
    return response;
  } finally {
    await client.close();
  }
}

/**
 * Example: Get obstruction map
 */
async function getObstructionMap() {
  const client = createStarlinkClient();

  try {
    await client.waitForReady();
    const map = await client.dish.getObstructionMap({});
    console.log('Obstruction Map:', map);
    return map;
  } finally {
    await client.close();
  }
}

/**
 * Example: Get dish diagnostics
 */
async function getDishDiagnostics() {
  const client = createStarlinkClient();

  try {
    await client.waitForReady();
    const diagnostics = await client.dish.getDiagnostics();
    console.log('Dish Diagnostics:', diagnostics);
    return diagnostics;
  } finally {
    await client.close();
  }
}

// Main execution
async function main() {
  try {
    console.log('=== Starlink SDK Examples ===\n');

    console.log('1. Getting dish context...');
    await getDishContext();

    console.log('\n2. Getting dish status...');
    await getDishStatus();

    console.log('\n3. Getting obstruction map...');
    await getObstructionMap();

    console.log('\n4. Getting dish diagnostics...');
    await getDishDiagnostics();

    console.log('\n✅ All examples completed successfully!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Run if this is the main module
if (require.main === module) {
  main();
}
