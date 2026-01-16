import { test, expect } from '@playwright/test';
import { selectors } from './lib/selectors';
import { faker } from '@faker-js/faker';

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
    await page.locator(selectors.phoneField).fill(faker.string.numeric(10));
    const loginButtonEl = page.locator(selectors.login);
    expect(loginButtonEl).toBeEnabled();
    await loginButtonEl.click();
    //Type opt
    const otpFields = page.locator(selectors.opt);
    await expect(otpFields.first()).toBeVisible();
    
    const otpDigits = ['1', '2', '3', '4'];
    for (let i = 0; i < 4; i++) {
      await otpFields.nth(i).fill(otpDigits[i]);
    }
    const verifyButton = page.locator('.text-center.rs-modal-body button');
    expect(verifyButton).toBeEnabled();
    await verifyButton.click();
    await page.waitForTimeout(2000);

    //Update profile
    //Select DOB
    const dobField = page.locator('div:nth-child(3) > span');
    expect(dobField).toBeVisible();
    await dobField.click();
    const calender = page.locator('.w-100 .editField')
    await calender.click();
    // const confirm = page.locator('div.text-center.confirm > button');
    // await confirm.click();
    // await page.waitForTimeout(1000);
    // Select from dropdown option
    // const dropdownButton = page.locator('.editField');
    // await dropdownButton.last().click()
    // const dropdown = page.locator('.custom-select-dropdown');
    // await expect(dropdown).toBeVisible();
    // await dropdown.click();
    // const dropdownOption = page.locator('.custom-select-dropdown li');
    // await dropdownOption.first().click();
    
  });
});
