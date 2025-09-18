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
    await page.getByRole('menuitem', { name: /markchristiandurana75@gmail/ }).click();

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
    await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
    await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
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
