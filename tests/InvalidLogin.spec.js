import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
test.afterEach(async ({ page }) => {
    // This runs after every test
    await page.close();  // cleanup example
    console.log('Test finished');
});
test('Incorrect Email or Password', async ({ page }) => {
    await page.goto(process.env.API_URL);
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('mcdurana@jlabs.team');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('asfafdfd');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('#custom-alert')).toContainText('Incorrect Password or Email', { timeout: 5000 });
});


test('Empty Text Field', async ({ page }) => {
    await page.goto(process.env.API_URL);
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('mcdurana@jlabs.team');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('');
    await expect(page.locator('#btn-login')).toHaveAttribute('disabled', '', { timeout: 5000 });
});