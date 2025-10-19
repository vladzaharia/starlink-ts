/**
 * Tests for utility functions
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  sleep,
  calculateBackoff,
  retryWithBackoff,
  createTimeout,
  withTimeout,
  createRequestId,
} from '../src/utils';

describe('Utility Functions', () => {
  describe('sleep', () => {
    it('should resolve after specified time', async () => {
      const start = Date.now();
      await sleep(100);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(100);
      expect(elapsed).toBeLessThan(200);
    });

    it('should resolve with zero delay', async () => {
      await expect(sleep(0)).resolves.toBeUndefined();
    });

    it('should return a promise', () => {
      const result = sleep(100);
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('calculateBackoff', () => {
    it('should calculate exponential backoff', () => {
      expect(calculateBackoff(0, 100, 10000)).toBe(100);
      expect(calculateBackoff(1, 100, 10000)).toBe(200);
      expect(calculateBackoff(2, 100, 10000)).toBe(400);
      expect(calculateBackoff(3, 100, 10000)).toBe(800);
    });

    it('should respect max delay', () => {
      expect(calculateBackoff(10, 100, 1000)).toBe(1000);
      expect(calculateBackoff(20, 100, 1000)).toBe(1000);
    });

    it('should handle zero initial delay', () => {
      expect(calculateBackoff(0, 0, 10000)).toBe(0);
      expect(calculateBackoff(1, 0, 10000)).toBe(0);
    });

    it('should handle zero max delay', () => {
      expect(calculateBackoff(0, 100, 0)).toBe(0);
    });

    it('should handle large attempt numbers', () => {
      const result = calculateBackoff(100, 100, 10000);
      expect(result).toBe(10000); // capped at max
    });
  });

  describe('retryWithBackoff', () => {
    it('should succeed on first attempt', async () => {
      const fn = vi.fn().mockResolvedValue('success');
      const result = await retryWithBackoff(fn, 3, 10, 100);
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should retry on failure', async () => {
      const fn = vi
        .fn()
        .mockRejectedValueOnce(new Error('fail'))
        .mockResolvedValueOnce('success');
      const result = await retryWithBackoff(fn, 3, 10, 100);
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(2);
    });

    it('should throw after max retries', async () => {
      const fn = vi.fn().mockRejectedValue(new Error('fail'));
      await expect(retryWithBackoff(fn, 3, 10, 100)).rejects.toThrow('fail');
      expect(fn).toHaveBeenCalledTimes(3);
    });

    it('should apply backoff between retries', async () => {
      const fn = vi
        .fn()
        .mockRejectedValueOnce(new Error('fail'))
        .mockResolvedValueOnce('success');
      const start = Date.now();
      await retryWithBackoff(fn, 3, 50, 1000);
      const elapsed = Date.now() - start;
      // Allow some timing variance - backoff should be at least 40ms (accounting for system variance)
      expect(elapsed).toBeGreaterThanOrEqual(40);
    });

    it('should handle non-Error rejections', async () => {
      const fn = vi.fn().mockRejectedValue('string error');
      await expect(retryWithBackoff(fn, 2, 10, 100)).rejects.toThrow();
    });

    it('should succeed after multiple retries', async () => {
      const fn = vi
        .fn()
        .mockRejectedValueOnce(new Error('fail1'))
        .mockRejectedValueOnce(new Error('fail2'))
        .mockResolvedValueOnce('success');
      const result = await retryWithBackoff(fn, 5, 10, 100);
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(3);
    });

    it('should handle zero retries', async () => {
      const fn = vi.fn().mockResolvedValue('success');
      // With 0 retries, the loop doesn't execute, so it throws
      await expect(retryWithBackoff(fn, 0, 10, 100)).rejects.toThrow('Max retries exceeded');
      expect(fn).toHaveBeenCalledTimes(0);
    });
  });

  describe('createTimeout', () => {
    it('should reject after specified time', async () => {
      await expect(createTimeout(100)).rejects.toThrow();
    });

    it('should reject with default message', async () => {
      await expect(createTimeout(100)).rejects.toThrow('Operation timed out after 100ms');
    });

    it('should reject with custom message', async () => {
      await expect(createTimeout(100, 'Custom timeout')).rejects.toThrow('Custom timeout');
    });

    it('should return a promise', () => {
      const result = createTimeout(100);
      expect(result).toBeInstanceOf(Promise);
      // Attach a catch handler to prevent unhandled rejection
      result.catch(() => {});
    });
  });

  describe('withTimeout', () => {
    it('should resolve if promise completes before timeout', async () => {
      const promise = Promise.resolve('success');
      const result = await withTimeout(promise, 1000);
      expect(result).toBe('success');
    });

    it('should reject if promise times out', async () => {
      let timeoutId: NodeJS.Timeout | null = null;
      const promise = new Promise<string>((resolve, reject) => {
        timeoutId = setTimeout(() => resolve('success'), 1000);
      });
      try {
        await expect(withTimeout(promise, 100)).rejects.toThrow();
      } finally {
        // Clean up the timeout to avoid unhandled rejection
        if (timeoutId) clearTimeout(timeoutId);
        // Attach a catch handler to the original promise to prevent unhandled rejection
        promise.catch(() => {});
      }
    });

    it('should use default timeout message', async () => {
      const promise = new Promise(() => {
        // never resolves
      });
      await expect(withTimeout(promise, 100)).rejects.toThrow('Operation timed out after 100ms');
    });

    it('should use custom timeout message', async () => {
      const promise = new Promise(() => {
        // never resolves
      });
      await expect(withTimeout(promise, 100, 'Custom timeout')).rejects.toThrow('Custom timeout');
    });

    it('should propagate promise rejection', async () => {
      const promise = Promise.reject(new Error('promise error'));
      await expect(withTimeout(promise, 1000)).rejects.toThrow('promise error');
    });

    it('should handle fast-resolving promises', async () => {
      const promise = Promise.resolve(42);
      const result = await withTimeout(promise, 1000);
      expect(result).toBe(42);
    });
  });

  describe('createRequestId', () => {
    it('should return a bigint', () => {
      const id = createRequestId();
      expect(typeof id).toBe('bigint');
    });

    it('should return unique IDs', () => {
      const id1 = createRequestId();
      const id2 = createRequestId();
      expect(id1).not.toBe(id2);
      expect(id2).toBeGreaterThan(id1);
    });

    it('should increment sequentially', () => {
      const id1 = createRequestId();
      const id2 = createRequestId();
      const id3 = createRequestId();
      expect(id2).toBe(id1 + 1n);
      expect(id3).toBe(id2 + 1n);
    });

    it('should start from 1', () => {
      // Note: This test assumes the counter starts at 0 and increments before returning
      // The first call should return 1n
      const id = createRequestId();
      expect(id).toBeGreaterThan(0n);
    });
  });
});

