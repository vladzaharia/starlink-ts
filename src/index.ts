// Export generated types and client
export * from '../generated/proto/device';

// Export client helper
export { createStarlinkClient, type StarlinkClientConfig } from './client';

// Re-export commonly used grpc types
export { ChannelCredentials, Metadata } from '@grpc/grpc-js';
