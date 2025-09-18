import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

async function addEvent(page, { eventName, description, startDate, endDate, allDay, repeat }) {
    // Open "Add Event"
    const addEventBtn = page.locator('button.btn-add-event');
    await addEventBtn.waitFor({ state: 'visible' });
    await addEventBtn.click();

    // Fill Event Name
    await page.getByRole('textbox', { name: 'Name' }).fill(eventName);

    // All Day
    if (allDay) {
        await page.getByRole('checkbox', { name: 'All Day' }).check();
    }

    // Select Start Date
    await page.locator('.has-icon').first().click();
    await page.getByRole('option', { name: `Choose ${startDate}` }).click();

    // Select End Date
    await page.locator('div:nth-child(3) > .react-datepicker-wrapper > .react-datepicker__input-container > .has-icon').click();
    await page.getByRole('option', { name: `Choose ${endDate}` }).click();

    // Repeat
    await page.getByRole('button', { name: 'Does not Repeat' }).click();
    await page.getByRole('menuitem', { name: repeat }).click();

    // Organizer
    await page.click("#input-calendar > button");
    await page.getByRole('menuitem', { name: 'makychristian@outlook.com' }).click();

    // Category
    // await page.locator('#dropdown-category').getByRole('button').click();
    // const categoryOption = page.getByRole('menuitem', { name: 'Purple category' });
    // await expect(categoryOption).toBeVisible();
    // await categoryOption.click();

    // Calendar
    await page.getByRole('button', { name: '2nd Calendar', exact: true }).click();
    await page.getByRole('menuitem', { name: '2nd Calendar' }).click();

    // Guests
    await page.getByText('Add guestsGuests').click();
    await page.getByRole('textbox', { name: 'Add guests' }).fill('jennydurana@gmail.com');

    // Location
    await page.getByRole('textbox', { name: 'Add location' }).fill('Cav');
    await page.getByRole('menuitem', { name: 'Cavallino-Treporti,' }).click();

    // Description
    await page.getByRole('textbox', { name: 'Description' }).fill(description);

    // Submit
    await page.getByRole('button', { name: 'Create Event' }).click();

    // Assert success message
    await expect(page.getByText('Event created successfully')).toBeVisible();
}


// Reusable test setup
test.beforeEach(async ({ page }) => {
    await page.goto(process.env.API_URL);
    // Google Calendar
    await page.locator('input[name="jennydurana@gmail.com"]').uncheck();
    await page.locator('input[name="markchristiandurana75@gmail.com"]').uncheck();

    // Microsoft Calendar
    await page.locator('input[name="21364cd0-7877-4edf-9728-b5ea23200212"]').check();
    await page.locator('.offcanvas-backdrop').click();
});

// Parameterized tests
const repeats = ["Daily", "Weekly", "Monthly", "Annually"];

for (const repeat of repeats) {
    test(`Add ${repeat} Event and validate event`, async ({ page }) => {
        const eventData = {
            eventName: `${repeat} Repeat`,
            description: "Automating testing",
            startDate: "Thursday, September 4th,",
            endDate: "Friday, September 5th,",
            allDay: true,
            repeat,
        };

        await addEvent(page, eventData);
    });
}


// test('test', async ({ page }) => {
//     await page.goto('https://staging-v2.yearglance.com/auth/login');
//     await page.getByRole('textbox', { name: 'Email' }).click();
//     await page.getByRole('textbox', { name: 'Email' }).fill('mcdurana+4@jlabs.team');
//     await page.getByRole('textbox', { name: 'Email' }).press('Tab');
//     await page.getByRole('textbox', { name: 'Password' }).press('CapsLock');
//     await page.getByRole('textbox', { name: 'Password' }).fill('M');
//     await page.getByRole('textbox', { name: 'Password' }).press('CapsLock');
//     await page.getByRole('textbox', { name: 'Password' }).fill('M@ky12345');
//     await page.getByRole('button', { name: 'Login' }).click();
//     await page.goto('https://staging-v2.yearglance.com/');
//     await page.getByText('Events for this duration is not yet available. Sync data to view.Loading...Sync').first().click();
//     await page.getByText('JunSunMonTueWedThuFriSat12345678910111213141516171819202122232425262728293012345').click();
//     await page.getByRole('button', { name: 'Add Event', exact: true }).click();
//     await page.getByRole('button', { name: 'Does not Repeat' }).click();
//     await page.getByRole('menuitem', { name: 'Daily' }).click();
//     await page.getByRole('button', { name: 'Daily' }).click();
//     await page.getByRole('menuitem', { name: 'Weekly on Tuesday' }).click();
//     await page.getByRole('button', { name: 'Weekly on Tuesday' }).click();
//     await page.getByRole('menuitem', { name: 'Monthly on the 3 Tuesday' }).click();
//     await page.getByRole('button', { name: 'Monthly on the 3 Tuesday' }).click();
//     await page.getByRole('menuitem', { name: 'Annually on September' }).click();
//     await page.getByRole('button', { name: 'Annually on September' }).click();
//     await page.getByRole('menuitem', { name: 'Every Weekday' }).click();
// });