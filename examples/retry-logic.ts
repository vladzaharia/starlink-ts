import { createStarlinkClient, retryWithBackoff, withTimeout } from '../src';

/**
 * Example: Retry logic and timeout handling
 *
 * This example demonstrates how to use the built-in retry and timeout
 * utilities to make your code more resilient to transient failures.
 *
 * Note: This example assumes you have a Starlink dish accessible at 192.168.100.1:9200
 */
async function demonstrateRetryLogic() {
  const client = createStarlinkClient({
    debug: false,
  });

  try {
    await client.waitForReady();

    console.log('🔄 Demonstrating Retry Logic\n');

    // Example 1: Using retryWithBackoff
    console.log('Example 1: Retry with Exponential Backoff');
    console.log('Attempting to get device status with retries...\n');

    const status = await retryWithBackoff(
      () => client.device.getStatus({}),
      3, // max retries
      1000, // initial delay (1 second)
      5000 // max delay (5 seconds)
    );

    console.log('✓ Successfully retrieved device status after retries');
    console.log('  Response:', status);
    console.log();

    // Example 2: Using withTimeout
    console.log('Example 2: Request with Timeout');
    console.log('Attempting to get device info with 10 second timeout...\n');

    const info = await withTimeout(
      client.device.getInfo({}),
      10000, // 10 second timeout
      'Device info request timed out'
    );

    console.log('✓ Successfully retrieved device info within timeout');
    console.log('  Response:', info);
    console.log();

    // Example 3: Combining retry and timeout
    console.log('Example 3: Retry with Timeout');
    console.log('Attempting to get dish status with retries and timeout...\n');

    const dishStatus = await retryWithBackoff(
      () =>
        withTimeout(
          client.dish.getStatus({}),
          5000, // 5 second timeout per attempt
          'Dish status request timed out'
        ),
      3, // max retries
      500, // initial delay
      2000 // max delay
    );

    console.log('✓ Successfully retrieved dish status with retry and timeout');
    console.log('  Response:', dishStatus);
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  } finally {
    await client.close();
  }
}

// Run the example
demonstrateRetryLogic();

