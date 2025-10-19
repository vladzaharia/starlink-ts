import { vi } from 'vitest';
import { create } from '@bufbuild/protobuf';
import { ResponseSchema } from '../../lib/ts/device/device_pb';
import type { StarlinkClient } from '../../src/client';

/**
 * Mock the gRPC client's handle method to return a successful response
 * with the specified response case and value
 */
export function mockGrpcHandle(
  client: StarlinkClient,
  responseCase: string,
  responseValue: any = {}
) {
  const grpcClient = client.getGrpcClient();
  
  vi.spyOn(grpcClient, 'handle').mockResolvedValue(
    create(ResponseSchema, {
      id: 0n,
      response: {
        case: responseCase as any,
        value: responseValue,
      },
    })
  );
}

/**
 * Mock the gRPC client's handle method to throw an error
 */
export function mockGrpcError(client: StarlinkClient, error: Error) {
  const grpcClient = client.getGrpcClient();
  vi.spyOn(grpcClient, 'handle').mockRejectedValue(error);
}

/**
 * Restore all mocks on the gRPC client
 */
export function restoreGrpcMocks(client: StarlinkClient) {
  const grpcClient = client.getGrpcClient();
  vi.restoreAllMocks();
}

