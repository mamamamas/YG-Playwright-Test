import { test, expect } from '@playwright/test';
// import dotenv from 'dotenv';
// dotenv.config();
test('Profile', async ({ page }) => {
    await page.goto("https://staging-v2.yearglance.com/");
    await page.locator('.offcanvas-backdrop').click();
    await page.getByRole('listitem').filter({ hasText: 'Loading...Account' }).getByRole('button').click();
    await page.getByRole('menuitem', { name: 'Account Settings' }).click();
    await page.getByRole('textbox', { name: '* First Name' }).click();
    await page.getByRole('textbox', { name: '* First Name' }).fill('Mark Christian');
    await page.getByRole('textbox', { name: '* Last Name' }).dblclick();
    await page.getByRole('textbox', { name: '* Last Name' }).fill('Durana');
    await page.getByLabel('* Industry').selectOption('Healthcare');
    await page.getByLabel('* Role').selectOption('Finance');
    await page.getByRole('textbox', { name: 'Organization' }).click();
    await page.getByRole('textbox', { name: 'Organization' }).fill('Texg');
    await page.getByRole('textbox', { name: 'Website' }).click();
    await page.getByRole('textbox', { name: 'Website' }).fill('wala');
    await page.getByLabel('* Country').selectOption('Philippines');
    await page.getByRole('textbox', { name: 'City' }).click();
    await page.getByRole('textbox', { name: 'City' }).fill('Cavite');
    await page.getByRole('button', { name: 'Save Changes' }).click();
    // await expect(text).toHaveText('Printing your calendar & saving as PDF');
    // await page.getByText('Your profile has been').click();
});



test('Change Password', async ({ page }) => {
    await page.goto('https://staging-v2.yearglance.com/auth/login');
    await page.locator('.offcanvas-backdrop').click();

    // Go to Change Password
    await page.getByRole('listitem').filter({ hasText: 'Loading...Account' }).getByRole('button').click();
    await page.getByRole('menuitem', { name: 'Account Settings' }).click();
    await page.getByRole('link', { name: 'Change Password' }).click();

    // Fill form with first attempt
    await page.getByRole('textbox', { name: '* Current Password' }).fill('M@ky12345');
    await page.getByRole('textbox', { name: '* New Password' }).fill('P@ssword1!');
    await page.getByRole('textbox', { name: '* Confirm Password' }).fill('P@ssword1!');
    await page.getByRole('button', { name: 'Change Password' }).click();

    const alert = page.locator('#custom-alert');

    // Wait for success or error alert
    const result = await Promise.race([
        alert.waitFor({ state: 'visible', timeout: 5000 }).then(async () => {
            const text = await alert.textContent();
            return text?.includes('successfully') ? 'success' : 'error';
        }).catch(() => null)
    ]);

    if (result === "error") {
        console.log("First attempt failed, retrying with backup...");

        // Clear fields
        await page.getByRole('textbox', { name: '* Current Password' }).fill('');
        await page.getByRole('textbox', { name: '* New Password' }).fill('');
        await page.getByRole('textbox', { name: '* Confirm Password' }).fill('');

        // Retry with swapped passwords
        await page.getByRole('textbox', { name: '* Current Password' }).fill('P@ssword1!');
        await page.getByRole('textbox', { name: '* New Password' }).fill('M@ky12345');
        await page.getByRole('textbox', { name: '* Confirm Password' }).fill('M@ky12345');
        await page.getByRole('button', { name: 'Change Password' }).click();

        await expect(alert).toContainText('Password successfully changed');
    } else {
        await expect(alert).toContainText('Password successfully changed');
    }
});

test('Plans', async ({ page, context }) => {
    await page.goto('https://staging-v2.yearglance.com/auth/login');
    await page.locator('.offcanvas-backdrop').click();
    await page.getByRole('listitem').filter({ hasText: 'Loading...Account' }).getByRole('button').click();
    await page.getByRole('menuitem', { name: 'Account Settings' }).click();
    await page.getByRole('link', { name: 'Plans' }).click();
    await page.locator('.btn-custom.btn-large.plans-subscribe-button.btn-shadow.btn.btn-secondary').first().click();

    const page1 = await page.waitForEvent('popup');
    await page.waitForTimeout(5000);
});

test('Bill', async ({ page, context }) => {
    await page.goto('https://staging-v2.yearglance.com/auth/login');
    await page.locator('.offcanvas-backdrop').click();
    await page.getByRole('listitem').filter({ hasText: 'Loading...Account' }).getByRole('button').click();
    await page.getByRole('menuitem', { name: 'Account Settings' }).click();
    await page.getByRole('link', { name: 'Billing' }).click();
    await page.getByRole('cell', { name: 'Succeeded' }).first().click();
    await page.getByRole('cell', { name: '$' }).first().click();
    await page.getByRole('textbox', { name: 'Search Billing' }).click();
    await page.getByRole('button', { name: '2025' }).click();
    await page.getByRole('menuitem', { name: '2025' }).click();
    await expect(page.locator('#body-container')).toContainText('Payment Method');
});





