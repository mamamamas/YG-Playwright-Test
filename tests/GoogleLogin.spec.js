import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

test.afterEach(async ({ page }) => {
  // This runs after every test
  await page.close();  // cleanup example
  console.log('Test finished');
});
test('Login with Google', async ({ page, context }) => {
  await page.goto(process.env.API_URL);

  // Wait for popup
  const popupPromise = context.waitForEvent('page');
  await page.getByRole('button', { name: 'Continue with Google' }).click();
  const popup = await popupPromise;

  // Login on Google popup
  await popup.getByRole('textbox', { name: 'Email or phone' }).fill(process.env.GOOGLE_EMAIL);
  await popup.getByRole('button', { name: 'Next' }).click();
  await popup.getByRole('textbox', { name: 'Enter your password' }).fill(process.env.GOOGLE_PASSWORD);
  await popup.getByRole('button', { name: 'Next' }).click();
  await popup.getByRole('button', { name: 'Continue' }).click();
  await popup.getByRole('button', { name: 'Continue' }).click();


  // Verify you’re logged in
  await expect(page.getByAltText('Year Glance logo')).toBeVisible({ timeout: 10000 });

  // Dismiss overlay if present
  const backdrop = page.locator('.offcanvas-backdrop');
  if (await backdrop.isVisible()) {
    await backdrop.click();
  }
});
