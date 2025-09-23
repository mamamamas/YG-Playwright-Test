import { test, expect } from '@playwright/test';
// import dotenv from 'dotenv';
// dotenv.config();
test('Notification', async ({ page, context }) => {
    // Admin Login
    await page.goto("https://admin-staging-v2.yearglance.com/auth/login");
    await page.waitForTimeout(2000);
    await page.getByPlaceholder('Enter email').fill('hello@jlabs.team')
    // await page.getByRole('textbox', { name: 'Email' }).fill('hello@jlabs.team');
    await page.getByPlaceholder('Enter password').fill('123456')
    // await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Create Notification
    await page.waitForTimeout(5000);
    await page.getByRole('link', { name: 'Notifications' }).click();

    await expect(page.locator('#root')).toContainText('Here are your saved messages. Hit send to notify users in the Year Glance web app.');
    await expect(page.getByText('Saved Notifications')).toBeVisible();
    await page.getByRole('textbox', { name: 'Enter a message for Year' }).fill('Test 2');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('alert')).toContainText('Notification successfully saved');

    // Send Notification
    await page.getByRole('button', { name: 'Send' }).first().click();
    await expect(page.locator('h5')).toContainText('Notifications');

    // Open User Page
    const page1 = await context.newPage();
    await page1.goto("https://staging-v2.yearglance.com/");
    await page1.getByRole('dialog').click();
    await page1.locator('.offcanvas-backdrop').click();

    // Interact with Notification Bell
    const notificationButton = page1.locator('#notification-button:visible');
    await notificationButton.click();
    await page1.getByRole('button', { name: 'Unread' }).click();
    // await expect(notificationButton).toBeVisible();

    // Open notification details
    // await notificationButton.click();
    // await page.getByRole('button', { name: 'Test 2 See More' }).click();

    // Switch filters
    // await notificationButton.click();
    // await page.getByRole('button', { name: 'All 4' }).click();
});



