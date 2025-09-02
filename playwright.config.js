/**
 * Playwright Configuration for Claude Auto Global
 *
 * This configuration provides comprehensive browser testing setup
 * for end-to-end testing across multiple browsers and devices.
 */

const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  // Test directory
  testDir: './tests/e2e',

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['list']
  ],

  // Global test timeout
  timeout: 30000,

  // Expect timeout for assertions
  expect: {
    timeout: 5000
  },

  // Shared settings for all projects
  use: {
    // Base URL for tests
    baseURL: process.env.BASE_URL || 'http://localhost:3000',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Record video on failures
    video: 'retain-on-failure',

    // Take screenshot on failure
    screenshot: 'only-on-failure',

    // Browser context options
    contextOptions: {
      // Ignore HTTPS errors
      ignoreHTTPSErrors: true,

      // Set viewport
      viewport: { width: 1280, height: 720 },

      // Set user agent
      userAgent: 'Claude-Auto-Global-E2E-Tests'
    },

    // Action timeout
    actionTimeout: 10000,

    // Navigation timeout
    navigationTimeout: 10000
  },

  // Configure projects for major browsers
  projects: [
    // Desktop Browsers
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Chrome-specific settings
        launchOptions: {
          args: ['--disable-web-security', '--allow-running-insecure-content']
        }
      }
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        // Firefox-specific settings
        launchOptions: {
          firefoxUserPrefs: {
            'security.tls.insecure_fallback_hosts': 'localhost'
          }
        }
      }
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari']
        // Safari-specific settings
      }
    },

    // Mobile Browsers
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 5']
      }
    },

    {
      name: 'mobile-safari',
      use: {
        ...devices['iPhone 12']
      }
    },

    // Tablet
    {
      name: 'tablet',
      use: {
        ...devices['iPad Pro']
      }
    },

    // High DPI
    {
      name: 'high-dpi',
      use: {
        ...devices['Desktop Chrome HiDPI']
      }
    }
  ],

  // Output directory for test artifacts
  outputDir: 'test-results/',

  // Global setup and teardown
  globalSetup: './tests/e2e/global-setup.js',
  globalTeardown: './tests/e2e/global-teardown.js',

  // Test match patterns
  testMatch: [
    '**/*.spec.js',
    '**/*.test.js',
    '**/*.e2e.js'
  ],

  // Ignore patterns
  testIgnore: [
    '**/node_modules/**',
    '**/build/**',
    '**/dist/**'
  ],

  // Web Server (for local development)
  webServer: process.env.CI ? undefined : {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120000
  },

  // Metadata
  metadata: {
    'test-suite': 'Claude Auto Global E2E Tests',
    'environment': process.env.NODE_ENV || 'test',
    'version': process.env.npm_package_version || '1.0.0'
  }
});

// Environment-specific overrides
if (process.env.NODE_ENV === 'production') {
  module.exports.use.baseURL = process.env.PRODUCTION_URL || 'https://your-production-domain.com';
  module.exports.retries = 3;
  module.exports.workers = 2;
}

if (process.env.NODE_ENV === 'staging') {
  module.exports.use.baseURL = process.env.STAGING_URL || 'https://staging.your-domain.com';
  module.exports.retries = 2;
}

// CI-specific configuration
if (process.env.GITHUB_ACTIONS) {
  module.exports.reporter.push(['github']);
}

if (process.env.GITLAB_CI) {
  module.exports.reporter.push(['json', { outputFile: 'playwright-report.json' }]);
}
