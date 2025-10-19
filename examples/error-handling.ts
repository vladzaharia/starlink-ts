import {
  createStarlinkClient,
  ConnectionError,
  TimeoutError,
  AuthenticationError,
  StarlinkError,
} from '../src';

/**
 * Example: Comprehensive error handling
 *
 * This example demonstrates how to handle various error types
 * that can occur when communicating with the Starlink device.
 *
 * Note: This example assumes you have a Starlink dish accessible at 192.168.100.1:9200
 */
async function demonstrateErrorHandling() {
  // Example 1: Connection error handling
  console.log('Example 1: Connection Error Handling\n');
  const badClient = createStarlinkClient({
    address: '192.168.1.1:9200', // Wrong address
    connectionTimeout: 2000,
  });

  try {
    await badClient.waitForReady();
    const info = await badClient.device.getInfo({});
    console.log('Device info:', info);
  } catch (error) {
    if (error instanceof ConnectionError) {
      console.log('✓ Caught ConnectionError:', error.message);
    } else if (error instanceof Error) {
      console.log('✓ Caught Error:', error.message);
    }
  } finally {
    await badClient.close();
  }

  console.log();

  // Example 2: Timeout error handling
  console.log('Example 2: Timeout Error Handling\n');
  const timeoutClient = createStarlinkClient({
    requestTimeout: 100, // Very short timeout
  });

  try {
    await timeoutClient.waitForReady();
    const status = await timeoutClient.device.getStatus({});
    console.log('Device status:', status);
  } catch (error) {
    if (error instanceof TimeoutError) {
      console.log('✓ Caught TimeoutError:', error.message);
    } else if (error instanceof Error) {
      console.log('✓ Caught Error:', error.message);
    }
  } finally {
    await timeoutClient.close();
  }

  console.log();

  // Example 3: Generic error handling with proper client
  console.log('Example 3: Generic Error Handling\n');
  const client = createStarlinkClient({
    debug: false,
  });

  try {
    await client.waitForReady();
    const info = await client.device.getInfo({});
    console.log('✓ Successfully retrieved device info');
    console.log('  Response:', info);
  } catch (error) {
    if (error instanceof ConnectionError) {
      console.error('Connection failed:', error.message);
    } else if (error instanceof TimeoutError) {
      console.error('Request timed out:', error.message);
    } else if (error instanceof AuthenticationError) {
      console.error('Authentication failed:', error.message);
    } else if (error instanceof StarlinkError) {
      console.error('Starlink error (code: %s):', error.code, error.message);
    } else if (error instanceof Error) {
      console.error('Unexpected error:', error.message);
    }
  } finally {
    await client.close();
  }
}

// Run the example
demonstrateErrorHandling();
