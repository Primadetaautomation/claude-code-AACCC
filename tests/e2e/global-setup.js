/**
 * Playwright Global Setup
 * Runs once before all tests
 */

const { chromium } = require('@playwright/test');

async function globalSetup(config) {
  console.log('🎭 Setting up Playwright global environment...');
  
  // You can perform global setup here, such as:
  // - Starting test servers
  // - Setting up test data
  // - Authenticating users
  
  // Example: Create authenticated state
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Perform authentication if needed
  // await page.goto('/login');
  // await page.fill('[name="username"]', process.env.TEST_USERNAME);
  // await page.fill('[name="password"]', process.env.TEST_PASSWORD);
  // await page.click('[type="submit"]');
  
  // Save authentication state
  // await context.storageState({ path: './tests/e2e/auth.json' });
  
  await browser.close();
  
  console.log('✅ Global setup completed');
}

module.exports = globalSetup;