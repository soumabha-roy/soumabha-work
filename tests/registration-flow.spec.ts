import { test, expect } from '@playwright/test';
import { selectors } from './lib/selectors';

test.describe('Registration flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });
  });

  test('Go to the playzhub page', async ({ page }) => {
    // Expect logo to be visible
    await expect(page.locator(selectors.logo)).toBeVisible();
  });

  test('Click on the Login button', async ({ page }) => {
    const loginButton = page.locator(selectors.loginButton);
    await expect(loginButton).toBeVisible();
    await page.waitForTimeout(2000);
    await loginButton.click();
    await page.waitForTimeout(2000);
  });
});
