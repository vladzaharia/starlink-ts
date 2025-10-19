// Export main client
export { StarlinkClient, createStarlinkClient } from './client';
export type { StarlinkClientConfig } from './types/ClientConfig';

// Export error classes
export {
  StarlinkError,
  ConnectionError,
  TimeoutError,
  AuthenticationError,
  DeviceError,
  ValidationError,
  NotSupportedError,
  mapGrpcError,
} from './errors/StarlinkError';

// Export utility functions
export {
  sleep,
  calculateBackoff,
  retryWithBackoff,
  createTimeout,
  withTimeout,
  createRequestId,
} from './utils';

// Re-export commonly used grpc types
export { ChannelCredentials, Metadata } from '@grpc/grpc-js';
