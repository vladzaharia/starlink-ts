import { StarlinkClient } from '../client';
import { NormalizedClientConfig } from '../types/ClientConfig';
import { Device, Request, Response, RequestSchema } from '../../lib/ts/device/device_pb';
import { createClient } from '@connectrpc/connect';
import { create } from '@bufbuild/protobuf';
import type { DescMessage, MessageInitShape, MessageShape } from '@bufbuild/protobuf';

/**
 * Base class for all service implementations
 *
 * Provides common functionality for interacting with the Starlink device
 */
export abstract class BaseService {
  protected client: StarlinkClient;
  protected config: NormalizedClientConfig;
  protected grpcClient: ReturnType<typeof createClient<typeof Device>>;

  constructor(client: StarlinkClient) {
    this.client = client;
    this.config = client.getConfig();
    this.grpcClient = client.getGrpcClient();
  }

  /**
   * Log debug message
   */
  protected debug(message: string, data?: unknown): void {
    this.client.debug(message, data);
  }

  /**
   * Check if client is ready
   */
  protected isReady(): boolean {
    return this.client.isReady();
  }

  /**
   * Generic helper for making GRPC calls
   *
   * This encapsulates the common pattern of:
   * 1. Creating a Request with the appropriate case and value
   * 2. Calling grpcClient.handle()
   * 3. Checking the response case
   * 4. Returning the response value or throwing an error
   *
   * @param requestCase - The case name for the request (e.g., 'getDeviceInfo')
   * @param requestSchema - The schema (descriptor) for creating the request value
   * @param requestData - The data to populate the request (optional)
   * @param responseSchema - The schema (descriptor) for the expected response type
   * @param responseCase - The expected case name for the response (e.g., 'getDeviceInfo')
   * @param debugMessage - Debug message to log
   * @returns The response value
   * @throws Error if the response case doesn't match the expected case
   */
  protected async call<TRequestDesc extends DescMessage, TResponseDesc extends DescMessage>(
    requestCase: Request['request']['case'],
    requestSchema: TRequestDesc,
    requestData: MessageInitShape<TRequestDesc> | undefined,
    _responseSchema: TResponseDesc,
    responseCase: Response['response']['case'],
    debugMessage: string
  ): Promise<MessageShape<TResponseDesc>> {
    this.debug(debugMessage, requestData);

    const requestValue = create(requestSchema, requestData);

    const req = create(RequestSchema, {
      id: 0n,
      epochId: 0n,
      targetId: '',
      request: {
        case: requestCase,
        value: requestValue,
      } as Request['request'],
    });

    const response = await this.grpcClient.handle(req);

    if (response.response.case === responseCase) {
      return response.response.value as MessageShape<TResponseDesc>;
    }

    throw new Error(`Unexpected response type: ${response.response.case}`);
  }
}
