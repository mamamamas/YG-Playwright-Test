import { test, expect } from '@playwright/test';
// import dotenv from 'dotenv';
// dotenv.config();
test('Feature Request', async ({ page }) => {
    await page.goto("https://staging-v2.yearglance.com/");
    await page.locator('.offcanvas-backdrop').click();
    await page.getByRole('listitem').filter({ hasText: 'Loading...Account' }).getByRole('button').click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Feature Request' }).click();
    const page1 = await page1Promise;
    await expect(page1.locator('h1')).toContainText('Feature requests');
});


