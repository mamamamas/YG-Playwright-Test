import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
test.beforeEach(async ({ page }) => {
    await page.goto(process.env.API_URL)
    // await page.locator('input[name="b8397a97-e4e6-4b7d-8c90-87498c714e80"]').check();
    await page.locator('.offcanvas-backdrop').click();
})
test('Print', async ({ page }) => {
    await page.getByRole('button', { name: 'Print' }).click();
    await page.getByRole('spinbutton', { name: 'Headers' }).fill('19');
    await page.getByRole('spinbutton', { name: 'Labels' }).click();
    await page.getByRole('spinbutton', { name: 'Labels' }).fill('25');
    await page.getByRole('spinbutton', { name: 'Body' }).click();
    await page.getByRole('spinbutton', { name: 'Body' }).fill('18');
    await page.getByRole('spinbutton', { name: 'Border Weight' }).click();
    await page.getByRole('spinbutton', { name: 'Border Weight' }).fill('3');
    await page.getByRole('checkbox', { name: 'Print Borders' }).uncheck();
    await expect(page.getByRole('checkbox', { name: 'Print Borders' })).not.toBeChecked();
    await page.getByRole('checkbox', { name: 'Print Borders' }).check();
    await expect(page.getByRole('checkbox', { name: 'Print Borders' })).toBeChecked();
    await page.getByRole('button', { name: 'Apply & Print' }).click();
});

test.only('Print about', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.getByRole('button', { name: 'Print' }).click();
    const Link = page.locator("[href*='printing-saving-as-pdf']")

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        Link.click()
    ])

    const text = newPage.locator(`//*[@id="article-wrapper"]/h1`);
    await expect(text).toHaveText('Printing your calendar & saving as PDF');
});