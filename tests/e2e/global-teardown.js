/**
 * Playwright Global Teardown
 * Runs once after all tests
 */

async function globalTeardown(config) {
  console.log('🎭 Tearing down Playwright global environment...');
  
  // You can perform global cleanup here, such as:
  // - Stopping test servers
  // - Cleaning up test data
  // - Removing temporary files
  
  console.log('✅ Global teardown completed');
}

module.exports = globalTeardown;