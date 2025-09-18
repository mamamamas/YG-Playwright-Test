const { test, expect } = require('@playwright/test');
import dotenv from 'dotenv';
dotenv.config();
test.beforeEach(async ({ page }) => {
    await page.goto(process.env.API_URL)
    // await page.locator('input[name="b8397a97-e4e6-4b7d-8c90-87498c714e80"]').check();
    await page.locator('.offcanvas-backdrop').click();
})

test("Customisation Light Theme", async ({ page }) => {
    await page.getByRole('button', { name: 'Customise' }).click();
    await page.getByRole('button', { name: 'Themes' }).click();
    await page.getByRole('button', { name: 'Light' }).click();
    await page.getByRole('button', { name: 'Apply & Close' }).click();
    await expect(page.getByText('Calendar settings applied and saved.')).toBeVisible();
    await page.waitForTimeout(5000);
})

test("Customisation Dark Theme", async ({ page }) => {
    await page.getByRole('button', { name: 'Customise' }).click();
    await page.getByRole('button', { name: 'Themes' }).click();
    await page.getByRole('button', { name: 'Dark' }).click();
    await page.getByRole('button', { name: 'Apply & Close' }).click();
    await expect(page.getByText('Calendar settings applied and saved.')).toBeVisible();
    await page.waitForTimeout(5000);
})

test("Customisation Bright Theme", async ({ page }) => {
    await page.getByRole('button', { name: 'Customise' }).click();
    await page.getByRole('button', { name: 'Themes' }).click();
    await page.getByRole('button', { name: 'Bright' }).click();
    await page.getByRole('button', { name: 'Apply & Close' }).click();
    await expect(page.getByText('Calendar settings applied and saved.')).toBeVisible();
    await page.waitForTimeout(5000);
})

test("Customisation Earth Theme", async ({ page }) => {
    await page.getByRole('button', { name: 'Customise' }).click();
    await page.getByRole('button', { name: 'Themes' }).click();
    await page.getByRole('button', { name: 'Earth' }).click();
    await page.getByRole('button', { name: 'Apply & Close' }).click();
    await expect(page.getByText('Calendar settings applied and saved.')).toBeVisible();
    await page.waitForTimeout(5000);
})

test("Customisation Ocean Theme", async ({ page }) => {
    await page.getByRole('button', { name: 'Customise' }).click();
    await page.getByRole('button', { name: 'Themes' }).click();
    await page.getByRole('button', { name: 'Ocean' }).click();
    await page.getByRole('button', { name: 'Apply & Close' }).click();
    await expect(page.getByText('Calendar settings applied and saved.')).toBeVisible();
    await page.waitForTimeout(5000);
})

test("Customisation Nature Theme", async ({ page }) => {
    await page.getByRole('button', { name: 'Customise' }).click();
    await page.getByRole('button', { name: 'Themes' }).click();
    await page.getByRole('button', { name: 'Nature' }).click();
    await page.getByRole('button', { name: 'Apply & Close' }).click();
    await expect(page.getByText('Calendar settings applied and saved.')).toBeVisible();
    await page.waitForTimeout(5000);
})


