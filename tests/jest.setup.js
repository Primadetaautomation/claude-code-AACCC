/**
 * Jest Setup File
 * Global test configuration and utilities
 */

// Increase timeout for async tests
jest.setTimeout(10000);

// Mock environment variables for tests
process.env.NODE_ENV = 'test';
process.env.ANTHROPIC_API_KEY = 'sk-ant-test-key-for-testing';

// Global test utilities
global.testUtils = {
  // Helper to create mock agent configurations
  createMockAgent: (overrides = {}) => ({
    name: 'Test Agent',
    emoji: '🧪',
    description: 'Test agent for unit testing',
    version: '1.0.0',
    capabilities: ['test-capability'],
    ...overrides
  }),

  // Helper to create mock API responses
  createMockResponse: (data, status = 200) => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
    text: async () => JSON.stringify(data)
  }),

  // Helper to suppress console output during tests
  suppressConsole: () => {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = jest.fn();
    console.error = jest.fn();
    console.warn = jest.fn();

    return () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    };
  }
};

// Global mocks
jest.mock('node-fetch', () => jest.fn());

// Cleanup after each test
afterEach(() => {
  jest.clearAllMocks();
});
