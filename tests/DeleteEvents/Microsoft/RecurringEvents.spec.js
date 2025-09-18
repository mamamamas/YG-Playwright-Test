import { expect, test } from '@playwright/test';
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


// getByRole('button', { name: 'Delete Event' })
test.only('Delete One occurrence', async ({ page }) => {
    await page.goto('https://staging-v2.yearglance.com/');
    await page.locator('.offcanvas-backdrop').click();
    // await page.getByLabel('E-20250110').getByRole('button', { name: 'Dailt' }).click({
    //     button: 'right'
    // });
    await page.getByLabel('E-20250109').getByRole('button', { name: 'Dailt' }).click();
    await page.getByRole('button', { name: 'Dailt Jan 10, All Day' }).click();
    await page.getByRole('button').filter({ hasText: /^Loading\.\.\.$/ }).nth(3).click();
    // await page.getByLabel('E-20250110').getByRole('button', { name: 'Dailt' }).click();
    // await page.getByRole('button', { name: 'Dailt Jan 10, All Day' }).click();
    // await page.getByRole('button').filter({ hasText: /^Loading\.\.\.$/ }).nth(3).click();
    // await page.getByLabel('E-20250110').getByRole('button', { name: 'Dailt' }).click();
    // await page.getByRole('tooltip', { name: 'January 10 Dailt Jan 10, All' }).getByRole('button').nth(3).click();
});