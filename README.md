# starlink-ts

A comprehensive, modern TypeScript SDK for communicating with Starlink satellite dishes via gRPC.

## Features

- 🚀 **Modern TypeScript** - Full type safety with TypeScript 5.9.3 in strict mode
- 📡 **gRPC-based** - Efficient binary protocol for device communication
- 🔧 **Auto-generated Types** - Types generated from proto files using buf.build
- 📦 **Organized Services** - Logical service modules (Device, Dish, WiFi, Transceiver)
- ✨ **Promise-based API** - Modern async/await instead of callbacks
- 🎯 **Clean Type Names** - Normalized type names without redundant prefixes
- 🛡️ **Error Handling** - Comprehensive error types and mapping
- 🔌 **Connection Management** - Automatic connection pooling and lifecycle management
- 📊 **Comprehensive API** - 60+ operations covering all device functionality

## Installation

```bash
npm install starlink-ts
# or
yarn add starlink-ts
```

## Quick Start

```typescript
import { createStarlinkClient } from 'starlink-ts';

// Create a client (address defaults to 192.168.100.1:9200)
const client = createStarlinkClient({});

try {
  // Get device information
  const info = await client.device.getInfo({});
  console.log('Device ID:', info.id);
  console.log('Hardware Version:', info.hardwareVersion);
  console.log('Software Version:', info.softwareVersion);

  // Get device status
  const status = await client.device.getStatus({});
  console.log('Uptime:', status.uptimeS, 'seconds');
  console.log('Download Speed:', status.downlinkThroughputBps, 'bps');
  console.log('Upload Speed:', status.uplinkThroughputBps, 'bps');
  console.log('Latency:', status.popPingLatencyMs, 'ms');

  // Get dish status
  const dishStatus = await client.dish.getStatus({});
  console.log('Boresight Azimuth:', dishStatus.boresightAzimuthDeg);
  console.log('Boresight Elevation:', dishStatus.boresightElevationDeg);

  // Get WiFi clients
  const clients = await client.wifi.getClients({});
  console.log('Connected clients:', clients);
} catch (error) {
  console.error('Error:', error);
} finally {
  await client.close();
}
```

## API Reference

### Client Configuration

```typescript
interface StarlinkClientConfig {
  // Optional: Address of the Starlink dish (default: '192.168.100.1:9200')
  address?: string;

  // Optional: gRPC channel credentials (defaults to insecure)
  credentials?: ChannelCredentials;

  // Optional: Request timeout in milliseconds (default: 30000)
  requestTimeout?: number;

  // Optional: Connection timeout in milliseconds (default: 10000)
  connectionTimeout?: number;

  // Optional: Maximum number of retries (default: 3)
  maxRetries?: number;

  // Optional: Enable automatic reconnection (default: true)
  autoReconnect?: boolean;

  // Optional: Enable debug logging (default: false)
  debug?: boolean;
}
```

### Service Modules

The client provides access to four main service modules:

#### Device Service (`client.device`)

General device operations:

- `getInfo()` - Get device information
- `getStatus()` - Get device status
- `reboot()` - Reboot the device
- `getLogs()` - Get device logs
- `getLocation()` - Get device location
- `speedTest()` - Run a speed test
- `getPing()` - Get ping statistics
- `pingHost()` - Ping a specific host
- `getNetworkInterfaces()` - Get network interfaces
- `getDiagnostics()` - Get diagnostics

#### Dish Service (`client.dish`)

Satellite dish operations:

- `getContext()` - Get dish context
- `getStatus()` - Get dish status
- `stow()` - Stow/unstow the dish
- `getObstructionMap()` - Get obstruction map
- `clearObstructionMap()` - Clear obstruction map
- `getEmc()` - Get EMC settings
- `setEmc()` - Set EMC settings
- `getConfig()` - Get dish configuration
- `setConfig()` - Set dish configuration
- `setPowerSave()` - Enable/disable power save
- `activateRssiScan()` - Activate RSSI scan
- `getRssiScanResult()` - Get RSSI scan results
- `getDiagnostics()` - Get diagnostics

#### WiFi Service (`client.wifi`)

Router operations:

- `getClients()` - Get connected clients
- `getConfig()` - Get WiFi configuration
- `setConfig()` - Set WiFi configuration
- `setup()` - Setup WiFi
- `getStatus()` - Get WiFi status
- `getPingMetrics()` - Get ping metrics
- `getClientHistory()` - Get client history
- `setClientGivenName()` - Set client name
- `getDiagnostics()` - Get diagnostics
- `runSelfTest()` - Run self test
- `getFirewall()` - Get firewall settings
- `getGuestInfo()` - Get guest info

#### Transceiver Service (`client.transceiver`)

RF transceiver operations:

- `getStatus()` - Get transceiver status
- `getTelemetry()` - Get transceiver telemetry
- `ifLoopbackTest()` - Run IF loopback test

## Error Handling

The SDK provides comprehensive error handling with typed error classes:

```typescript
import {
  StarlinkError,
  ConnectionError,
  TimeoutError,
  AuthenticationError,
  DeviceError,
  ValidationError,
} from 'starlink-ts';

try {
  const status = await client.device.getStatus({});
} catch (error) {
  if (error instanceof ConnectionError) {
    console.error('Failed to connect to device:', error.message);
  } else if (error instanceof TimeoutError) {
    console.error('Request timed out:', error.message);
  } else if (error instanceof AuthenticationError) {
    console.error('Authentication failed:', error.message);
  } else if (error instanceof StarlinkError) {
    console.error('Starlink error:', error.code, error.message);
  }
}
```

## Type Naming Convention

To provide a clean, intuitive API, type names are normalized by removing redundant service prefixes:

- `DishGetContextResponse` → `GetContextResponse` (in dish service)
- `WifiGetClientsResponse` → `GetClientsResponse` (in wifi service)
- `TransceiverGetStatusResponse` → `GetStatusResponse` (in transceiver service)

This makes the API more readable and reduces cognitive load.

## Development

### Prerequisites

- Node.js >= 18.0.0
- Yarn or npm

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

# Run tests
yarn test
```

### Project Structure

```
starlink-ts/
├── proto/              # Protocol buffer definitions
├── src/
│   ├── client.ts       # Main client class
│   ├── index.ts        # Public API exports
│   ├── errors/         # Error classes
│   ├── services/       # Service implementations
│   ├── types/          # Type definitions
│   └── utils/          # Utility functions
├── generated/          # Auto-generated from proto files (not committed)
├── tests/              # Test files
├── dist/               # Compiled JavaScript output
├── buf.yaml            # Buf configuration
└── package.json
```

### Scripts

- `yarn build` - Generate proto code and compile TypeScript
- `yarn generate` - Generate TypeScript from proto files using buf
- `yarn clean` - Remove generated and dist directories
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Run ESLint with auto-fix
- `yarn format` - Format code with Prettier
- `yarn format:check` - Check code formatting
- `yarn test` - Run tests with Vitest
- `yarn test:ui` - Run tests with UI
- `yarn test:coverage` - Generate coverage report

## Protocol Buffers

This library uses Protocol Buffers (proto3) for defining the gRPC service interface. The proto files are located in the `proto/` directory.

To add new services or modify existing ones:

1. Edit the `.proto` files in the `proto/` directory
2. Run `yarn generate` to regenerate TypeScript code using buf
3. Update service implementations in `src/services/`
4. Rebuild the project with `yarn build`

## Technology Stack

- **TypeScript 5.9.3** - Latest TypeScript with strict mode
- **@grpc/grpc-js** - Pure JavaScript gRPC implementation
- **@bufbuild/protobuf** - Modern protobuf runtime
- **buf.build** - Modern protobuf management and code generation
- **Vitest** - Modern unit testing framework
- **ESLint 9** - Latest ESLint with flat config
- **Prettier 3** - Code formatter

## Architecture

For detailed architecture information, see [ARCHITECTURE.md](./ARCHITECTURE.md).

For proto file analysis, see [PROTO_ANALYSIS.md](./PROTO_ANALYSIS.md).

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
