/**
 * Mock factories for creating test data and mocked objects
 */

import { vi } from 'vitest';
import { StarlinkClient, createStarlinkClient } from '../../src/client';
import { StarlinkClientConfig } from '../../src/types/ClientConfig';
import { ChannelCredentials } from '@grpc/grpc-js';

/**
 * Create a mock Starlink client for testing
 */
export function createMockClient(config: Partial<StarlinkClientConfig> = {}): StarlinkClient {
  return createStarlinkClient({
    address: '127.0.0.1:9200',
    credentials: ChannelCredentials.createInsecure(),
    debug: false,
    ...config,
  });
}

/**
 * Create a mock gRPC response
 */
export function createMockResponse<T>(data: T): T {
  return data;
}

/**
 * Create a mock gRPC error
 */
export function createMockGrpcError(
  message: string,
  code: string = 'UNKNOWN'
): Error {
  const error = new Error(message);
  error.name = code;
  return error;
}

/**
 * Create a mock connection error
 */
export function createMockConnectionError(message: string = 'Connection failed'): Error {
  return createMockGrpcError(message, 'UNAVAILABLE');
}

/**
 * Create a mock timeout error
 */
export function createMockTimeoutError(message: string = 'Request timed out'): Error {
  return createMockGrpcError(message, 'DEADLINE_EXCEEDED');
}

/**
 * Create a mock authentication error
 */
export function createMockAuthError(message: string = 'Authentication failed'): Error {
  return createMockGrpcError(message, 'UNAUTHENTICATED');
}

/**
 * Create a mock validation error
 */
export function createMockValidationError(message: string = 'Invalid argument'): Error {
  return createMockGrpcError(message, 'INVALID_ARGUMENT');
}

/**
 * Spy on a method and return a mock implementation
 */
export function spyOnMethod<T extends object, K extends keyof T>(
  obj: T,
  method: K,
  implementation?: (...args: unknown[]) => unknown
) {
  return vi.spyOn(obj, method as string & keyof T).mockImplementation(
    implementation as any
  );
}

/**
 * Create a mock async function that resolves with data
 */
export function createMockAsyncFn<T>(data: T) {
  return vi.fn().mockResolvedValue(data);
}

/**
 * Create a mock async function that rejects with an error
 */
export function createMockAsyncErrorFn(error: Error) {
  return vi.fn().mockRejectedValue(error);
}

