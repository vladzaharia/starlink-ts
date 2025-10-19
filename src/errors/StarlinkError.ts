/**
 * Base error class for all Starlink SDK errors
 */
export class StarlinkError extends Error {
  public readonly code: string;
  public readonly details?: Record<string, unknown>;

  constructor(message: string, code: string = 'UNKNOWN_ERROR', details?: Record<string, unknown>) {
    super(message);
    this.name = 'StarlinkError';
    this.code = code;
    this.details = details;

    // Maintain proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, StarlinkError.prototype);
  }
}

/**
 * Error thrown when connection to the Starlink device fails
 */
export class ConnectionError extends StarlinkError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 'CONNECTION_ERROR', details);
    this.name = 'ConnectionError';
    Object.setPrototypeOf(this, ConnectionError.prototype);
  }
}

/**
 * Error thrown when a gRPC call times out
 */
export class TimeoutError extends StarlinkError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 'TIMEOUT_ERROR', details);
    this.name = 'TimeoutError';
    Object.setPrototypeOf(this, TimeoutError.prototype);
  }
}

/**
 * Error thrown when authentication fails
 */
export class AuthenticationError extends StarlinkError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 'AUTHENTICATION_ERROR', details);
    this.name = 'AuthenticationError';
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

/**
 * Error thrown when the device returns an error status
 */
export class DeviceError extends StarlinkError {
  public readonly statusCode?: number;

  constructor(message: string, statusCode?: number, details?: Record<string, unknown>) {
    super(message, 'DEVICE_ERROR', details);
    this.name = 'DeviceError';
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, DeviceError.prototype);
  }
}

/**
 * Error thrown when a request is invalid
 */
export class ValidationError extends StarlinkError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Error thrown when the operation is not supported
 */
export class NotSupportedError extends StarlinkError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 'NOT_SUPPORTED_ERROR', details);
    this.name = 'NotSupportedError';
    Object.setPrototypeOf(this, NotSupportedError.prototype);
  }
}

/**
 * Map gRPC status codes to Starlink errors
 */
export function mapGrpcError(error: unknown): StarlinkError {
  if (error instanceof StarlinkError) {
    return error;
  }

  if (error instanceof Error) {
    const message = error.message || 'Unknown error';

    // Check for common gRPC error patterns
    if (message.includes('UNAVAILABLE') || message.includes('unavailable')) {
      return new ConnectionError(`Failed to connect to Starlink device: ${message}`);
    }

    if (message.includes('DEADLINE_EXCEEDED') || message.includes('deadline')) {
      return new TimeoutError(`Request timed out: ${message}`);
    }

    if (message.includes('UNAUTHENTICATED') || message.includes('unauthenticated')) {
      return new AuthenticationError(`Authentication failed: ${message}`);
    }

    if (message.includes('INVALID_ARGUMENT') || message.includes('invalid')) {
      return new ValidationError(`Invalid request: ${message}`);
    }

    return new StarlinkError(message, 'GRPC_ERROR');
  }

  return new StarlinkError('An unknown error occurred', 'UNKNOWN_ERROR');
}
