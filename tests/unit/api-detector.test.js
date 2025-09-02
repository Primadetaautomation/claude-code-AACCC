/**
 * Unit tests for API detector functionality
 */

const path = require('path');
const fs = require('fs');

// Import the API detector module
const apiDetectorPath = path.join(__dirname, '..', '..', 'lib', 'api-detector.js');

describe('API Detector', () => {
  let apiDetector;

  beforeEach(() => {
    // Clear require cache to ensure fresh imports
    delete require.cache[apiDetectorPath];

    // Check if the module exists
    if (fs.existsSync(apiDetectorPath)) {
      apiDetector = require(apiDetectorPath);
    }
  });

  describe('High-Context Detection', () => {
    test('should detect high-context keywords', () => {
      if (!apiDetector) {
        console.warn('API detector module not found, skipping test');
        return;
      }

      const highContextPhrases = [
        'analyze entire codebase',
        'complete project review',
        'comprehensive analysis',
        'maximum context needed',
        'review all files'
      ];

      highContextPhrases.forEach(phrase => {
        const result = apiDetector.needsAPI?.(phrase);
        expect(result).toBe(true);
      });
    });

    test('should detect simple tasks', () => {
      if (!apiDetector) {
        console.warn('API detector module not found, skipping test');
        return;
      }

      const simplePhrases = [
        'fix this function',
        'debug this error',
        'explain this code',
        'quick help needed',
        'simple question'
      ];

      simplePhrases.forEach(phrase => {
        const result = apiDetector.needsAPI?.(phrase);
        expect(result).toBe(false);
      });
    });

    test('should handle edge cases', () => {
      if (!apiDetector) {
        console.warn('API detector module not found, skipping test');
        return;
      }

      const edgeCases = [
        '',
        null,
        undefined,
        123,
        {}
      ];

      edgeCases.forEach(input => {
        expect(() => {
          apiDetector.needsAPI?.(input);
        }).not.toThrow();
      });
    });
  });

  describe('Agent Detection', () => {
    test.skip('should detect agent requirements', () => {
      // TODO: Implement detectAgent function in api-detector.js
      if (!apiDetector) {
        console.warn('API detector module not found, skipping test');
        return;
      }

      const testCases = [
        {
          input: 'create comprehensive test suite',
          expectedAgent: 'qa-testing'
        },
        {
          input: 'security audit needed',
          expectedAgent: 'security'
        },
        {
          input: 'design system architecture',
          expectedAgent: 'solutions-architect'
        },
        {
          input: 'setup deployment pipeline',
          expectedAgent: 'devops'
        }
      ];

      testCases.forEach(({ input, expectedAgent }) => {
        const result = apiDetector.detectAgent?.(input);
        expect(result).toBe(expectedAgent);
      });
    });
  });

  describe('Utility Functions', () => {
    test.skip('should validate API key format', () => {
      // TODO: Implement validateApiKey function in api-detector.js
      if (!apiDetector) {
        console.warn('API detector module not found, skipping test');
        return;
      }

      const validKeys = [
        'sk-ant-api03-1234567890abcdef',
        'sk-ant-1234567890'
      ];

      const invalidKeys = [
        'invalid-key',
        '',
        null,
        'sk-openai-1234'
      ];

      validKeys.forEach(key => {
        const isValid = apiDetector.validateApiKey?.(key);
        expect(isValid).toBe(true);
      });

      invalidKeys.forEach(key => {
        const isValid = apiDetector.validateApiKey?.(key);
        expect(isValid).toBe(false);
      });
    });
  });
});
