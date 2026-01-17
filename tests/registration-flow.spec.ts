import { test, expect, Page, Browser, BrowserContext } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Registration flow', () => {
  let browser: Browser;
  let context: BrowserContext;
  let pageSession: Page;

  test.beforeAll(async ({ browserName }) => {
    const { chromium, firefox, webkit } = require('@playwright/test');
    browser = await (browserName === 'chromium' ? chromium : browserName === 'firefox' ? firefox : webkit).launch();
    context = await browser.newContext();
    pageSession = await context.newPage();
  });

  test.afterAll(async () => {
    await context.close();
    await browser.close();
  });

  test('Registration process', async () => {
    await pageSession.goto('/', { waitUntil: 'load' });
    // Expect logo to be visible
    await expect(pageSession.locator('[class="logo"]')).toBeVisible();

    // Fill the phone number in the login modal 
    const loginButton = pageSession.locator('.login_sec');
    await loginButton.click();
    const phoneNumberField = await pageSession.locator('.phone input');
    await expect(phoneNumberField).toBeVisible();
    await pageSession.locator('.phone input').fill(faker.string.numeric(10));

    // Once Phone number valid Login button will be enabled and can continue 
    const loginButtonEl = pageSession.locator('.rs-modal-body > button.my-4.rs-btn.rs-btn-primary.rs-btn-block');
    expect(loginButtonEl).toBeEnabled();
    await loginButtonEl.click();
    
    //Type opt
    const otpFields = pageSession.locator('[autocomplete="one-time-code"]');
    await expect(otpFields.first()).toBeVisible();
    
    const otpDigits = ['1', '2', '3', '4'];
    for (let i = 0; i < 4; i++) {
      await otpFields.nth(i).fill(otpDigits[i]);
    }

    const verifyButton = pageSession.locator('button.rs-btn-primary', { hasText: 'Verify' });
    expect(verifyButton).toBeEnabled();
    await verifyButton.click();
    await pageSession.waitForTimeout(2000);

    await pageSession.locator('[placeholder="Not Specified"] + span').click();
    const datePickerModal = pageSession.locator('[role="dialog"]:has-text("Update Birthday")');
    await expect(datePickerModal).toBeVisible();
    
    const dateInput = pageSession.locator('.rs-picker input.rs-input');
    await expect(dateInput).toBeVisible();
    await dateInput.click();
    
    const calendarPopup = pageSession.locator('[data-testid="picker-popup"]');
    await expect(calendarPopup).toBeVisible();
    
    const dateCell = pageSession.locator('[role="gridcell"][aria-label*="15 Jan 2013"]:not([aria-disabled="true"])');
    await expect(dateCell).toBeVisible();
    await dateCell.click();
    
    const confirmButton = pageSession.locator('.confirm button:has-text("Confirm")');
    await expect(confirmButton).toBeVisible();
    await confirmButton.click();
    await expect(datePickerModal).not.toBeVisible();
    
    const agreeCheckbox = pageSession.locator('input#\\31 \\33 \\+'); 
    await expect(agreeCheckbox).toBeVisible();
    await agreeCheckbox.check();
    
    const saveButton = pageSession.getByRole('button', { name: 'Save & Continue' });
    await expect(saveButton).toBeEnabled();
    await saveButton.click();
    await pageSession.waitForTimeout(2000);
    const skipRefferal = pageSession.locator('button.guest-btn.rs-btn.rs-btn-default.rs-btn-block');
    await skipRefferal.click();
    await pageSession.waitForTimeout(2000);
  });

});