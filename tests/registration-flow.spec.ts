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

  test('Registration process', async ({ page }) => {
    const loginButton = page.locator(selectors.loginButton);
    await loginButton.click();
    const phoneNumberField = await page.locator(selectors.phoneField);
    await expect(phoneNumberField).toBeVisible();
    await page.locator(selectors.phoneField).fill('1234567890');
    const loginButtonEl = page.locator('.rs-modal-body > button.my-4.rs-btn.rs-btn-primary.rs-btn-block');
    expect(loginButtonEl).toBeEnabled();
    await loginButtonEl.click();
    await page.locator('[autocomplete="one-time-code"]').isVisible();
  });
});
