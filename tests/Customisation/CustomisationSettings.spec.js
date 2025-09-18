
const { test, expect } = require('@playwright/test');
import dotenv from 'dotenv';
dotenv.config();
test.beforeEach(async ({ page }) => {
    await page.goto(process.env.API_URL)
    // await page.locator('input[name="b8397a97-e4e6-4b7d-8c90-87498c714e80"]').check();
    await page.locator('.offcanvas-backdrop').click();
})

test("Customisation Current Month", async ({ page }) => {
    await page.getByRole('button', { name: 'Customise' }).click();
    await page.getByRole('checkbox').check();
    // await expect(
    //     page.locator(
    //         '#printable-view-container > div.year-view-container.comfortable.monthly-view-container > div > div > div:nth-child(1) > div'
    //     )
    // ).toBeVisible();

    await page.getByRole('button', { name: 'Apply & Close' }).click();
    await expect(page.getByText('Calendar settings applied and saved.')).toBeVisible();
    await page.waitForTimeout(5000);
})

test("Customisation Start Month", async ({ page }) => {
    await page.getByRole('button', { name: 'Customise' }).click();
    await page.getByRole('button', { name: 'September' }).click();
    await page.getByRole('menuitem', { name: 'September' }).click();
    await page.getByRole('button', { name: 'Apply & Close' }).click();
    await expect(page.getByText('Calendar settings applied and saved.')).toBeVisible();
    await page.waitForTimeout(5000);
})

test("Customisation Starting Day", async ({ page }) => {
    await page.getByRole('button', { name: 'Customise' }).click();
    await page.locator('#settings-form > div:nth-child(2) > div').click();
    await page.getByRole('menuitem', { name: 'Monday' }).click();
    await page.getByRole('button', { name: 'Apply & Close' }).click();
    await expect(page.getByText('Calendar settings applied and saved.')).toBeVisible();
    await page.waitForTimeout(5000);
})

test("Customisation No. of Month", async ({ page }) => {
    await page.getByRole('button', { name: 'Customise' }).click();
    await page.getByRole('button', { name: 'Months' }).click();
    await page.getByRole('menuitem', { name: '5' }).click();
    await page.getByRole('button', { name: 'Apply & Close' }).click();
    await expect(page.getByText('Calendar settings applied and saved.')).toBeVisible();
    await page.waitForTimeout(5000);
})



test("Customisation No. of Events Shown", async ({ page }) => {
    await page.getByRole('button', { name: 'Customise' }).click();
    await page.getByRole('button', { name: 'Events' }).click();
    await page.getByRole('menuitem', { name: '10' }).click();
    await page.getByRole('button', { name: 'Apply & Close' }).click();
    await expect(page.getByText('Calendar settings applied and saved.')).toBeVisible();
    await page.waitForTimeout(5000);
})

test("Customisation Out of office Days ", async ({ page }) => {
    await page.getByRole('button', { name: 'Customise' }).click();
    await page.getByRole('button', { name: 'Tue' }).click();
    await page.getByRole('button', { name: 'Apply & Close' }).click();
    await expect(page.getByText('Calendar settings applied and saved.')).toBeVisible();
    await page.waitForTimeout(5000);
})




