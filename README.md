# starlink-ts

TypeScript SDK for communicating with Starlink satellite dish via gRPC

## Features

- 🚀 Modern TypeScript with full type safety
- 📡 gRPC-based communication with Starlink devices
- 🔧 Auto-generated TypeScript types from proto files
- 📦 Built with latest TypeScript 5.9.3
- ✨ ESLint and Prettier for code quality
- 🎯 Zero-configuration client creation

## Installation

```bash
npm install starlink-ts
# or
yarn add starlink-ts
```

## Quick Start

```typescript
import { createStarlinkClient } from 'starlink-ts';

// Create a client
const client = createStarlinkClient({
  address: '192.168.100.1:9200',
});

// Get device information
client.getDeviceInfo({}, (err, response) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Device ID:', response.id);
  console.log('Hardware Version:', response.hardwareVersion);
  console.log('Software Version:', response.softwareVersion);
});

// Get device status
client.getStatus({}, (err, response) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Uptime:', response.uptimeS, 'seconds');
  console.log('Connected:', response.connected);
  console.log('SNR:', response.snr);
  console.log('Download Speed:', response.downlinkThroughputBps, 'bps');
  console.log('Upload Speed:', response.uplinkThroughputBps, 'bps');
  console.log('Latency:', response.popPingLatencyMs, 'ms');
});
```

## API Reference

### `createStarlinkClient(config)`

Creates a new Starlink Device client.

**Parameters:**

- `config.address` (string): The address of the Starlink dish (e.g., '192.168.100.1:9200')
- `config.credentials` (ChannelCredentials, optional): gRPC channel credentials. Defaults to insecure.

**Returns:** `DeviceClient`

### DeviceClient Methods

#### `getDeviceInfo(request, callback)`

Get device information including hardware version, software version, and country code.

#### `getStatus(request, callback)`

Get current device status including uptime, connection status, throughput, and latency.

## Development

### Prerequisites

- Node.js >= 18.0.0
- Yarn

### Setup

```bash
# Install dependencies
yarn install

# Generate TypeScript from proto files
yarn generate

# Build the project
yarn build

# Run linter
yarn lint

# Format code
yarn format
```

### Project Structure

```
starlink-ts/
├── proto/          # Protocol buffer definitions
├── src/            # TypeScript source files
├── generated/      # Auto-generated TypeScript from proto files
├── dist/           # Compiled JavaScript output
└── package.json
```

### Scripts

- `yarn build` - Generate proto code and compile TypeScript
- `yarn generate` - Generate TypeScript from proto files
- `yarn clean` - Remove generated and dist directories
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Run ESLint with auto-fix
- `yarn format` - Format code with Prettier
- `yarn format:check` - Check code formatting

## Protocol Buffers

This library uses Protocol Buffers (proto3) for defining the gRPC service interface. The proto files are located in the `proto/` directory.

To add new services or modify existing ones:

1. Edit the `.proto` files in the `proto/` directory
2. Run `yarn generate` to regenerate TypeScript code
3. Rebuild the project with `yarn build`

## Technology Stack

- **TypeScript 5.9.3** - Latest TypeScript with modern features
- **@grpc/grpc-js** - Pure JavaScript gRPC client
- **ts-proto** - Protocol buffer compiler for TypeScript
- **ESLint 9** - Latest ESLint with flat config
- **Prettier 3** - Code formatter

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
