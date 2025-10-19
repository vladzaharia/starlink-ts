# Starlink TypeScript SDK - Examples

This directory contains comprehensive examples demonstrating how to use the Starlink TypeScript SDK.

## Prerequisites

- Node.js 18+ installed
- A Starlink dish accessible at `192.168.100.1:9200` (or specify a custom address)
- Dependencies installed: `yarn install`

## Running Examples

### Basic Usage

The simplest example to get started:

```bash
yarn example:basic
```

This example shows:

- Creating a client
- Getting device information
- Getting device status
- Getting dish status
- Getting WiFi clients

### Device Information

Get device information from your Starlink dish:

```bash
yarn example:device-info
```

This example demonstrates:

- Getting device information
- Getting device status
- Getting device location

### Dish Status

Monitor satellite dish information:

```bash
yarn example:dish-status
```

This example shows:

- Getting dish status
- Getting dish context (satellite information)
- Getting dish configuration

### WiFi Clients

Monitor connected WiFi clients:

```bash
yarn example:wifi-clients
```

This example demonstrates:

- Getting WiFi status
- Getting connected clients
- Getting WiFi configuration
- Getting WiFi diagnostics

### Error Handling

Learn how to handle various error types:

```bash
yarn example:error-handling
```

This example shows:

- Connection error handling
- Timeout error handling
- Generic error handling with proper error type checking
- Using typed error classes for better error management

### Retry Logic

Implement resilient code with retry and timeout utilities:

```bash
yarn example:retry-logic
```

This example demonstrates:

- Using `retryWithBackoff()` for automatic retries with exponential backoff
- Using `withTimeout()` to add timeouts to requests
- Combining retry and timeout for robust error handling

### Command-Line Interface (CLI)

Interactive CLI tool to query device information:

```bash
yarn example:cli help
```

#### CLI Commands

Get device information:

```bash
yarn example:cli device-info
```

Get device status:

```bash
yarn example:cli device-status
```

Get dish status:

```bash
yarn example:cli dish-status
```

Get WiFi status:

```bash
yarn example:cli wifi-status
```

List connected WiFi clients:

```bash
yarn example:cli wifi-clients
```

Get device location:

```bash
yarn example:cli location
```

#### CLI Options

All CLI commands support these options:

- `--address <addr>` - Specify custom Starlink device address (default: `192.168.100.1:9200`)
- `--debug` - Enable debug logging

#### CLI Examples

```bash
# Get device info with debug logging
yarn example:cli device-info --debug

# Get WiFi clients from a custom address
yarn example:cli wifi-clients --address 192.168.1.100:9200

# Get device status with debug logging
yarn example:cli device-status --debug --address 192.168.1.100:9200
```

## Example Structure

Each example file demonstrates:

1. **Imports** - What to import from the SDK
2. **Client Creation** - How to create and configure a client
3. **API Usage** - How to call specific service methods
4. **Error Handling** - How to handle errors gracefully
5. **Resource Cleanup** - How to properly close the client

## Common Patterns

### Creating a Client

```typescript
import { createStarlinkClient } from '../src';

const client = createStarlinkClient({
  address: '192.168.100.1:9200', // optional, this is the default
  debug: false, // optional, set to true for debug logs
});
```

### Making Requests

```typescript
try {
  await client.waitForReady();
  const status = await client.device.getStatus({});
  console.log('Status:', status);
} finally {
  await client.close();
}
```

### Error Handling

```typescript
import { ConnectionError, TimeoutError, StarlinkError } from '../src';

try {
  const info = await client.device.getInfo({});
} catch (error) {
  if (error instanceof ConnectionError) {
    console.error('Connection failed:', error.message);
  } else if (error instanceof TimeoutError) {
    console.error('Request timed out:', error.message);
  } else if (error instanceof StarlinkError) {
    console.error('Starlink error:', error.code, error.message);
  }
}
```

### Retry with Backoff

```typescript
import { retryWithBackoff } from '../src';

const result = await retryWithBackoff(
  () => client.device.getStatus({}),
  3, // max retries
  1000, // initial delay (ms)
  5000 // max delay (ms)
);
```

### Timeout Handling

```typescript
import { withTimeout } from '../src';

const result = await withTimeout(
  client.device.getInfo({}),
  10000, // 10 second timeout
  'Request timed out'
);
```

## Service Modules

The client provides access to four main service modules:

### Device Service (`client.device`)

General device operations:

- `getInfo()` - Device information
- `getStatus()` - Device status
- `getLocation()` - Device location
- `getNetworkInterfaces()` - Network interfaces
- `reboot()` - Reboot device
- `getLogs()` - Get device logs
- `speedTest()` - Run speed test
- `pingHost()` - Ping a host

### Dish Service (`client.dish`)

Satellite dish operations:

- `getStatus()` - Dish status
- `getContext()` - Satellite information
- `getConfig()` - Dish configuration
- `getEmc()` - EMC information
- `stow()` - Stow the dish

### WiFi Service (`client.wifi`)

Router operations:

- `getStatus()` - WiFi status
- `getClients()` - Connected clients
- `getConfig()` - WiFi configuration
- `setConfig()` - Set WiFi configuration
- `getDiagnostics()` - WiFi diagnostics

### Transceiver Service (`client.transceiver`)

RF transceiver operations:

- `getStatus()` - Transceiver status
- `getTelemetry()` - Transceiver telemetry

## Tips and Best Practices

1. **Always close the client** - Use try/finally to ensure `client.close()` is called
2. **Use retry logic** - Network requests can be transient, use `retryWithBackoff()`
3. **Set appropriate timeouts** - Use `withTimeout()` for long-running operations
4. **Enable debug logging** - Set `debug: true` in config to see detailed logs
5. **Handle errors properly** - Use typed error classes for better error handling
6. **Check client readiness** - Call `await client.waitForReady()` before making requests

## Troubleshooting

### Connection Refused

If you get a connection error, verify:

- The Starlink dish is powered on and accessible
- The address is correct (default: `192.168.100.1:9200`)
- Your device is connected to the Starlink network
- The firewall allows connections to port 9200

### Timeout Errors

If requests are timing out:

- Increase the `requestTimeout` in client config
- Check network connectivity
- Try with `--debug` flag to see what's happening

### Module Not Found

If you get module errors:

- Run `yarn install` to install dependencies
- Run `yarn build` to compile TypeScript
- Ensure you're running examples with `ts-node` or after building

## Contributing

To add new examples:

1. Create a new `.ts` file in the `examples/` directory
2. Add a corresponding npm script in `package.json`
3. Update this README with documentation
4. Test the example works correctly

## License

MIT
