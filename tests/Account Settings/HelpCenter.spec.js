import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config(); s
test('test', async ({ page }) => {
    await page.goto(process.env.API_URL);
    await page.locator('.offcanvas-backdrop').click();
    await page.getByRole('listitem').filter({ hasText: 'Loading...Account' }).getByRole('button').click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Help Center' }).click();
    const page1 = await page1Promise;
    await expect(page1.locator('#banner-subtitle')).toContainText('Year Glance gives you the big picture of your year with handy Google and Microsoft calendars integrations.');
});