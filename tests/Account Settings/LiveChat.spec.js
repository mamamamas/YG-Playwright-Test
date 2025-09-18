import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
test('Live Chat', async ({ page }) => {
    await page.goto(process.env.API_URL);
    await page.locator('.offcanvas-backdrop').click();
    await page.getByRole('listitem').filter({ hasText: 'Loading...Account' }).getByRole('button').click();
    await page.getByRole('menuitem', { name: 'Live Chat' }).click();
    await page.locator('#y3mipgom3jp1757306230973').contentFrame().getByRole('textbox', { name: 'Search for answers' }).fill('Hide Header');
    await page.locator('#y3mipgom3jp1757306230973').contentFrame().getByText('Hide').first().click();
});