import { expect, test as setup } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

test('Delete Events', async ({ page }) => {
    await page.goto(process.env.API_URL);
    await page.locator('.offcanvas-backdrop').click();
    await page.waitForTimeout(5000);
    await page.getByLabel('E-20250107', { exact: true }).click();
    await page.getByRole('button', { name: 'January 7 to 9 Jan 7 - 9, All Day' }).click();
    await page.getByRole('button').filter({ hasText: /^Loading\.\.\.$/ }).nth(3).click();
    await page.getByRole('button', { name: 'Delete Event' }).click();
});