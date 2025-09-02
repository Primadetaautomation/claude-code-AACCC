/**
 * Example Playwright E2E Test
 * This is a sample test to demonstrate Playwright usage
 */

const { test, expect } = require('@playwright/test');

test.describe('Claude Auto Global E2E Tests', () => {
  test('example test - basic navigation', async ({ page }) => {
    // This is a placeholder test - replace with actual application tests
    await page.goto('https://playwright.dev');
    
    // Check page title
    await expect(page).toHaveTitle(/Playwright/);
    
    // Check for expected content
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });
  
  test('example test - interactive elements', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Test navigation
    const docsLink = page.locator('nav a', { hasText: 'Docs' });
    if (await docsLink.isVisible()) {
      await docsLink.click();
      await expect(page).toHaveURL(/.*docs.*/);
    }
  });
  
  test('example test - form interaction', async ({ page }) => {
    // This is a placeholder - replace with your application's forms
    await page.goto('https://playwright.dev');
    
    // Example of testing search functionality
    const searchButton = page.locator('[aria-label*="Search"]').first();
    if (await searchButton.isVisible()) {
      await searchButton.click();
      
      // Type in search
      const searchInput = page.locator('input[type="search"]');
      if (await searchInput.isVisible()) {
        await searchInput.fill('getting started');
        await expect(searchInput).toHaveValue('getting started');
      }
    }
  });
  
  test('example test - mobile responsive', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('https://playwright.dev');
    
    // Check mobile-specific elements
    await expect(page).toHaveTitle(/Playwright/);
    
    // Test mobile menu if it exists
    const mobileMenu = page.locator('[data-mobile-menu]');
    if (await mobileMenu.isVisible()) {
      await mobileMenu.click();
    }
  });
});

test.describe('Claude Auto Global API Tests', () => {
  test('example API test', async ({ request }) => {
    // Example API test - replace with your actual API endpoints
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('id', 1);
    expect(data).toHaveProperty('title');
  });
  
  test('example API error handling', async ({ request }) => {
    // Test error handling
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/999999');
    expect(response.status()).toBe(404);
  });
});