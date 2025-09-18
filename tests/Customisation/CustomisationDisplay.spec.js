const { test, expect } = require('@playwright/test');
import dotenv from 'dotenv';
dotenv.config();
test.beforeEach(async ({ page }) => {
    await page.goto(process.env.API_URL)
    // await page.locator('input[name="b8397a97-e4e6-4b7d-8c90-87498c714e80"]').check();
    await page.locator('.offcanvas-backdrop').click();
})
test("Customisation Large Character ", async ({ page }) => {
    await page.getByRole('button', { name: 'Customise' }).click();
    await page.getByRole('button', { name: 'Display' }).click();
    await page.locator('span[title="Large"]').click();
    await page.getByRole('button', { name: 'Apply & Close' }).click();
    await expect(page.getByText('Calendar settings applied and saved.')).toBeVisible();
    await page.waitForTimeout(5000);
})

test("Customisation Medium Character ", async ({ page }) => {
    await page.getByRole('button', { name: 'Customise' }).click();
    await page.getByRole('button', { name: 'Display' }).click();
    await page.locator('span[title="Medium"]').click();
    await page.getByRole('button', { name: 'Apply & Close' }).click();
    await expect(page.getByText('Calendar settings applied and saved.')).toBeVisible();
    await page.waitForTimeout(5000);
})

test("Customisation Small Character ", async ({ page }) => {
    await page.getByRole('button', { name: 'Customise' }).click();
    await page.getByRole('button', { name: 'Display' }).click();
    await page.locator('span[title="Small"]').click();
    await page.getByRole('button', { name: 'Apply & Close' }).click();
    await expect(page.getByText('Calendar settings applied and saved.')).toBeVisible();
    await page.waitForTimeout(5000);
})

test("Customisation Comfortable Density ", async ({ page }) => {
    await page.getByRole('button', { name: 'Customise' }).click();
    await page.getByRole('button', { name: 'Display' }).click();
    await page.getByRole('button', { name: 'Comfortable' }).click();
    await page.getByRole('button', { name: 'Apply & Close' }).click();
    await expect(page.getByText('Calendar settings applied and saved.')).toBeVisible();
    await page.waitForTimeout(5000);
})

test("Customisation Compact Density ", async ({ page }) => {
    await page.getByRole('button', { name: 'Customise' }).click();
    await page.getByRole('button', { name: 'Display' }).click();
    await page.getByRole('button', { name: 'Compact' }).click();
    await page.getByRole('button', { name: 'Apply & Close' }).click();
    await expect(page.getByText('Calendar settings applied and saved.')).toBeVisible();
    await page.waitForTimeout(5000);
})

test("Customisation Single Line Events", async ({ page }) => {
    await page.getByRole('button', { name: 'Customise' }).click();
    await page.getByRole('button', { name: 'Display' }).click();
    await page.getByRole('checkbox', { name: 'Single Line Events' }).check();
    await page.getByRole('button', { name: 'Apply & Close' }).click();
    await expect(page.getByText('Calendar settings applied and saved.')).toBeVisible();
    await page.waitForTimeout(5000);
})

test("Customisation All Day Events Only", async ({ page }) => {
    await page.getByRole('button', { name: 'Customise' }).click();
    await page.getByRole('button', { name: 'Display' }).click();
    await page.getByRole('checkbox', { name: 'All Day Events Only' }).check();
    await page.getByRole('checkbox', { name: 'Single Line Events' }).uncheck();
    await page.getByRole('button', { name: 'Apply & Close' }).click();
    await expect(page.getByText('Calendar settings applied and saved.')).toBeVisible();
    await page.waitForTimeout(5000);
})

test("Customisation Hide Out Of Office Events", async ({ page }) => {
    await page.getByRole('button', { name: 'Customise' }).click();
    await page.getByRole('button', { name: 'Display' }).click();
    await page.getByRole('checkbox', { name: 'All Day Events Only' }).uncheck();
    await page.getByRole('checkbox', { name: 'Hide Out Of Office Events' }).check();
    await page.getByRole('button', { name: 'Apply & Close' }).click();
    await expect(page.getByText('Calendar settings applied and saved.')).toBeVisible();
    await page.waitForTimeout(5000);
})

test("Customisation Align by Date", async ({ page }) => {
    await page.getByRole('button', { name: 'Customise' }).click();
    await page.getByRole('button', { name: 'Display' }).click();
    await page.getByRole('checkbox', { name: 'Align by Date' }).check();
    await expect(page.getByRole('checkbox', { name: 'Align by Date' })).toBeChecked();
    await page.getByRole('checkbox', { name: 'Day Names' }).uncheck();
    await expect(page.getByRole('checkbox', { name: 'Day Names' })).not.toBeChecked();
    await page.getByRole('checkbox', { name: 'Lead Days' }).uncheck();
    await expect(page.getByRole('checkbox', { name: 'Lead Days' })).not.toBeChecked();
    await page.getByRole('button', { name: 'Apply & Close' }).click();
    await expect(page.getByText('Calendar settings applied and saved.')).toBeVisible();
})

test("Customisation Day Names", async ({ page }) => {
    await page.getByRole('button', { name: 'Customise' }).click();
    await page.getByRole('button', { name: 'Display' }).click();
    await page.getByRole('checkbox', { name: 'Align by Date' }).uncheck();
    await expect(page.getByRole('checkbox', { name: 'Align by Date' })).not.toBeChecked();
    await page.getByRole('checkbox', { name: 'Day Names' }).check();
    await expect(page.getByRole('checkbox', { name: 'Day Names' })).toBeChecked();
    await page.getByRole('checkbox', { name: 'Lead Days' }).uncheck();
    await expect(page.getByRole('checkbox', { name: 'Lead Days' })).not.toBeChecked();
    await page.getByRole('button', { name: 'Apply & Close' }).click();
    await expect(page.getByText('Calendar settings applied and saved.')).toBeVisible();
})

test("Customisation Lead Days", async ({ page }) => {
    await page.getByRole('button', { name: 'Customise' }).click();
    await page.getByRole('button', { name: 'Display' }).click();
    await page.getByRole('checkbox', { name: 'Align by Date' }).uncheck();
    await expect(page.getByRole('checkbox', { name: 'Align by Date' })).not.toBeChecked();
    await page.getByRole('checkbox', { name: 'Day Names' }).uncheck();
    await expect(page.getByRole('checkbox', { name: 'Day Names' })).not.toBeChecked();
    await page.getByRole('checkbox', { name: 'Lead Days' }).check();
    await expect(page.getByRole('checkbox', { name: 'Lead Days' })).toBeChecked();
    await page.getByRole('button', { name: 'Apply & Close' }).click();
    await expect(page.getByText('Calendar settings applied and saved.')).toBeVisible();
})

test("Customisation Week Number", async ({ page }) => {
    await page.getByRole('button', { name: 'Customise' }).click();
    await page.getByRole('button', { name: 'Display' }).click();
    await page.getByRole('checkbox', { name: 'Week Number' }).check();
    await expect(page.getByRole('checkbox', { name: 'Week Number' })).toBeChecked();
    await page.getByRole('button', { name: 'Apply & Close' }).click();
    await expect(page.getByText('Calendar settings applied and saved.')).toBeVisible();
    await page.waitForTimeout(5000);
})
