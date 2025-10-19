/**
 * Test setup and configuration
 */

import { beforeEach, afterEach, vi } from 'vitest';

// Global test setup
beforeEach(() => {
  // Clear all mocks before each test
  vi.clearAllMocks();
});

afterEach(() => {
  // Clean up after each test
  vi.clearAllMocks();
});

// Suppress console output in tests unless explicitly needed
const originalConsoleDebug = console.debug;
const originalConsoleLog = console.log;

beforeEach(() => {
  console.debug = vi.fn();
  console.log = vi.fn();
});

afterEach(() => {
  console.debug = originalConsoleDebug;
  console.log = originalConsoleLog;
});

