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
// async function validateEvent(page, { eventName, description, numDay, newName, startDate }) {
//     // Wait until the event appears
//     await page.waitForTimeout(5000);
//     await page.locator('#E-20250904').click();
//     await page.getByRole('button', { name: `${eventName} Sep 4, All` }, { timeout: 30000 }).first().click();
//     await page.waitForTimeout(5000);
//     await page.locator('#view-event-modal').getByRole('button').filter({ hasText: 'Loading...' }).first().click();
//     await page.locator('.has-icon').first().click();
//     await page.getByRole('option', { name: `Choose ${startDate}` }).click();
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

// test("Add and validate event", async ({ page }) => {
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



import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

async function EditEvent(page, { eventName, description, newName, startDate, endDate, allDay }) {
    const calendarEvent = page.locator('#E-20250904');
    await expect(calendarEvent).toBeVisible({ timeout: 10000 });
    await calendarEvent.click();

    // Open event details
    await page.getByRole('button', { name: `${eventName} Sep 4, All` }, { timeout: 10000 }).first().click();
    await page.waitForTimeout(2000);
    await page.locator('#view-event-modal').getByRole('button').filter({ hasText: 'Loading...' }).first().click();
    await page.getByRole('textbox', { name: 'Name' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('');
    await page.getByRole('textbox', { name: 'Name' }).fill(newName);
    await page.locator('.has-icon').first().click();
    await page.getByRole('option', { name: `Choose ${startDate}` }).click();
    if (allDay) {
        await page.getByRole('checkbox', { name: 'All Day' }).check();
    }

    await page.getByRole('button', { name: 'Update Event' }).click();
    // Assert success message
    await expect(page.getByText('Event updated successfully')).toBeVisible();
}

async function validateEvent(page, { newName, description }) {
    // Wait until the event appears
    const calendarEvent = page.locator('#E-20250905');
    await expect(calendarEvent).toBeVisible({ timeout: 10000 });
    await calendarEvent.click();

    // Open event details
    await page.getByRole('button', { name: `${newName} Sep 5 - 6, All` }).first().click();

    // Validate details
    const modal = page.locator('#view-event-modal');
    await expect(modal).toContainText(newName);
    await expect(modal).toContainText(description);
    // await expect(modal).toContainText('Sep 4, All');
}


test("Edit event", async ({ page }) => {
    await page.goto(process.env.API_URL);

    // Enable Google Calendar, disable Microsoft Calendar
    await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
    await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
    await page.locator('.offcanvas-backdrop').click();
    await page.waitForTimeout(5000);

    const eventData = {
        eventName: "Testing Testings",
        newName: "samplep25553",
        description: "Automating testing",
        startDate: "Friday, September 5th,",
        numDay: "4",
        allDay: true,
    };

    await EditEvent(page, eventData);
});

test("Validate existing event", async ({ page }) => {
    await page.goto(process.env.API_URL);

    // Enable Google Calendar, disable Microsoft Calendar
    await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
    await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
    await page.locator('.offcanvas-backdrop').click();
    await page.waitForTimeout(10000);

    const eventData = {
        eventName: "Testing Testings",
        newName: "samplep25553",
        description: "Automating testing",
        startDate: "Friday, September 5th,",
        numDay: "4",
        allDay: true,
    };

    await validateEvent(page, eventData);
});
