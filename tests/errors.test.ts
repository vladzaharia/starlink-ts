/**
 * Tests for error handling and error mapping
 */

import { describe, it, expect } from 'vitest';
import {
  StarlinkError,
  ConnectionError,
  TimeoutError,
  AuthenticationError,
  DeviceError,
  ValidationError,
  NotSupportedError,
  mapGrpcError,
} from '../src/errors/StarlinkError';

describe('Error Classes', () => {
  describe('StarlinkError', () => {
    it('should create error with message and code', () => {
      const error = new StarlinkError('Test error', 'TEST_CODE');
      expect(error.message).toBe('Test error');
      expect(error.code).toBe('TEST_CODE');
      expect(error.name).toBe('StarlinkError');
    });

    it('should create error with details', () => {
      const details = { key: 'value' };
      const error = new StarlinkError('Test error', 'TEST_CODE', details);
      expect(error.details).toEqual(details);
    });

    it('should be instanceof Error', () => {
      const error = new StarlinkError('Test error');
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(StarlinkError);
    });

    it('should have default code', () => {
      const error = new StarlinkError('Test error');
      expect(error.code).toBe('UNKNOWN_ERROR');
    });
  });

  describe('ConnectionError', () => {
    it('should create connection error', () => {
      const error = new ConnectionError('Connection failed');
      expect(error.message).toBe('Connection failed');
      expect(error.code).toBe('CONNECTION_ERROR');
      expect(error.name).toBe('ConnectionError');
    });

    it('should be instanceof StarlinkError', () => {
      const error = new ConnectionError('Connection failed');
      expect(error).toBeInstanceOf(StarlinkError);
      expect(error).toBeInstanceOf(ConnectionError);
    });

    it('should support details', () => {
      const details = { address: '192.168.100.1' };
      const error = new ConnectionError('Connection failed', details);
      expect(error.details).toEqual(details);
    });
  });

  describe('TimeoutError', () => {
    it('should create timeout error', () => {
      const error = new TimeoutError('Request timed out');
      expect(error.message).toBe('Request timed out');
      expect(error.code).toBe('TIMEOUT_ERROR');
      expect(error.name).toBe('TimeoutError');
    });

    it('should be instanceof StarlinkError', () => {
      const error = new TimeoutError('Request timed out');
      expect(error).toBeInstanceOf(StarlinkError);
      expect(error).toBeInstanceOf(TimeoutError);
    });
  });

  describe('AuthenticationError', () => {
    it('should create authentication error', () => {
      const error = new AuthenticationError('Auth failed');
      expect(error.message).toBe('Auth failed');
      expect(error.code).toBe('AUTHENTICATION_ERROR');
      expect(error.name).toBe('AuthenticationError');
    });

    it('should be instanceof StarlinkError', () => {
      const error = new AuthenticationError('Auth failed');
      expect(error).toBeInstanceOf(StarlinkError);
      expect(error).toBeInstanceOf(AuthenticationError);
    });
  });

  describe('DeviceError', () => {
    it('should create device error with status code', () => {
      const error = new DeviceError('Device error', 500);
      expect(error.message).toBe('Device error');
      expect(error.code).toBe('DEVICE_ERROR');
      expect(error.statusCode).toBe(500);
      expect(error.name).toBe('DeviceError');
    });

    it('should be instanceof StarlinkError', () => {
      const error = new DeviceError('Device error');
      expect(error).toBeInstanceOf(StarlinkError);
      expect(error).toBeInstanceOf(DeviceError);
    });

    it('should support details', () => {
      const details = { statusCode: 500 };
      const error = new DeviceError('Device error', 500, details);
      expect(error.details).toEqual(details);
    });
  });

  describe('ValidationError', () => {
    it('should create validation error', () => {
      const error = new ValidationError('Invalid input');
      expect(error.message).toBe('Invalid input');
      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.name).toBe('ValidationError');
    });

    it('should be instanceof StarlinkError', () => {
      const error = new ValidationError('Invalid input');
      expect(error).toBeInstanceOf(StarlinkError);
      expect(error).toBeInstanceOf(ValidationError);
    });
  });

  describe('NotSupportedError', () => {
    it('should create not supported error', () => {
      const error = new NotSupportedError('Operation not supported');
      expect(error.message).toBe('Operation not supported');
      expect(error.code).toBe('NOT_SUPPORTED_ERROR');
      expect(error.name).toBe('NotSupportedError');
    });

    it('should be instanceof StarlinkError', () => {
      const error = new NotSupportedError('Operation not supported');
      expect(error).toBeInstanceOf(StarlinkError);
      expect(error).toBeInstanceOf(NotSupportedError);
    });
  });
});

describe('mapGrpcError', () => {
  it('should return StarlinkError as-is', () => {
    const error = new StarlinkError('Test error');
    const mapped = mapGrpcError(error);
    expect(mapped).toBe(error);
  });

  it('should map UNAVAILABLE to ConnectionError', () => {
    const error = new Error('UNAVAILABLE: Connection refused');
    const mapped = mapGrpcError(error);
    expect(mapped).toBeInstanceOf(ConnectionError);
    expect(mapped.message).toContain('Failed to connect');
  });

  it('should map unavailable (lowercase) to ConnectionError', () => {
    const error = new Error('unavailable: Connection refused');
    const mapped = mapGrpcError(error);
    expect(mapped).toBeInstanceOf(ConnectionError);
  });

  it('should map DEADLINE_EXCEEDED to TimeoutError', () => {
    const error = new Error('DEADLINE_EXCEEDED: Request timeout');
    const mapped = mapGrpcError(error);
    expect(mapped).toBeInstanceOf(TimeoutError);
    expect(mapped.message).toContain('timed out');
  });

  it('should map deadline (lowercase) to TimeoutError', () => {
    const error = new Error('deadline exceeded');
    const mapped = mapGrpcError(error);
    expect(mapped).toBeInstanceOf(TimeoutError);
  });

  it('should map UNAUTHENTICATED to AuthenticationError', () => {
    const error = new Error('UNAUTHENTICATED: Invalid credentials');
    const mapped = mapGrpcError(error);
    expect(mapped).toBeInstanceOf(AuthenticationError);
    expect(mapped.message).toContain('Authentication failed');
  });

  it('should map unauthenticated (lowercase) to AuthenticationError', () => {
    const error = new Error('unauthenticated: Invalid credentials');
    const mapped = mapGrpcError(error);
    expect(mapped).toBeInstanceOf(AuthenticationError);
  });

  it('should map INVALID_ARGUMENT to ValidationError', () => {
    const error = new Error('INVALID_ARGUMENT: Bad request');
    const mapped = mapGrpcError(error);
    expect(mapped).toBeInstanceOf(ValidationError);
    expect(mapped.message).toContain('Invalid request');
  });

  it('should map invalid (lowercase) to ValidationError', () => {
    const error = new Error('invalid argument');
    const mapped = mapGrpcError(error);
    expect(mapped).toBeInstanceOf(ValidationError);
  });

  it('should map unknown error to StarlinkError', () => {
    const error = new Error('Unknown error');
    const mapped = mapGrpcError(error);
    expect(mapped).toBeInstanceOf(StarlinkError);
    expect(mapped.code).toBe('GRPC_ERROR');
  });

  it('should handle non-Error objects', () => {
    const mapped = mapGrpcError('string error');
    expect(mapped).toBeInstanceOf(StarlinkError);
    expect(mapped.code).toBe('UNKNOWN_ERROR');
  });

  it('should handle null/undefined', () => {
    const mapped = mapGrpcError(null);
    expect(mapped).toBeInstanceOf(StarlinkError);
    expect(mapped.code).toBe('UNKNOWN_ERROR');
  });

  it('should handle Error with empty message', () => {
    const error = new Error('');
    const mapped = mapGrpcError(error);
    expect(mapped).toBeInstanceOf(StarlinkError);
  });
});

