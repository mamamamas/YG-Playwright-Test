// import { test, expect } from '@playwright/test';
// import dotenv from 'dotenv';
// dotenv.config();
// // test.beforeEach(async ({ page }) => {
// //     await page.goto("https://app.yearglance.com/")
// //     await page.locator('input[name="b8397a97-e4e6-4b7d-8c90-87498c714e80"]').check();
// //     await page.locator('.offcanvas-backdrop').click();
// // })
// test('Edit', async ({ page }) => {
//     await page.locator('#E-20250223').click();
//     await page.getByRole('button', { name: 'New Name Feb 18 - 25, All Day' }).click();
//     await page.getByRole('button').filter({ hasText: /^Loading\.\.\.$/ }).nth(2).click();
//     await page.getByRole('textbox', { name: 'Name' }).click();
//     await page.getByRole('textbox', { name: 'Name' }).fill('');
//     await page.getByRole('textbox', { name: 'Name' }).fill('New 2Name');
//     await page.locator('.has-icon').first().click();
//     await page.getByRole('option', { name: 'Choose Tuesday, February 18th,' }).click();
//     await page.locator('div:nth-child(3) > .react-datepicker-wrapper > .react-datepicker__input-container > .has-icon').click();
//     await page.getByRole('option', { name: 'Choose Tuesday, February 25th,' }).click();
//     await page.getByRole('button', { name: 'Update Event' }).click();
// });
// // await expect(page.locator('#body-container')).toContainText('Connect and sync calendar to view events.');
// async function validateEvent(page, { eventName, description, numDay, newName }) {
//     // Wait until the event appears
//     // await page.getByRole('button', { name: `${numDay} ${eventName}` }).first().click();
//     await page.waitForTimeout(5000);
//     await page.locator('#E-20250112').click();
//     await page.getByRole('button', { name: `${eventName} Jan 13 - 25, All Day` }).click();
//     await page.waitForTimeout(5000);
//     await page.locator('#view-event-modal').getByRole('button').filter({ hasText: 'Loading...' }).first().click();
//     await page.locator('.has-icon').first().click();
//     await page.getByRole('option', { name: 'Choose Monday, January 13th,' }).click();
//     await page.locator('div:nth-child(3) > .react-datepicker-wrapper > .react-datepicker__input-container > .has-icon').click();
//     await page.getByRole('option', { name: 'Choose Saturday, January 25th,' }).click();
//     await page.getByRole('textbox', { name: 'Name' }).click();
//     await page.getByRole('textbox', { name: 'Name' }).fill('');
//     await page.getByRole('textbox', { name: 'Name' }).fill(newName);
//     await page.getByRole('button', { name: 'Update Event' }).click();
//     // Validate data inside the event details
//     await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue(newName);
//     // await expect(page.getByRole('textbox', { name: 'Description' })).toHaveValue(description);
// }

// test.only("Add and validate event", async ({ page }) => {
//     await page.goto(process.env.API_URL);
//     await page.locator('.offcanvas-backdrop').click();

//     const eventData = {
//         eventName: "sass",
//         newName: "samplep23 - 45",
//         description: "Automating testing",
//         startDate: "Thursday, September 4th,",
//         endDate: "Friday, September 5th,",
//         numDay: "4",
//         allDay: true,
//     };
//     await validateEvent(page, eventData);
// });
