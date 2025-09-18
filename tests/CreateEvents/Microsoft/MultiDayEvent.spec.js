const { test, expect } = require('@playwright/test');
import dotenv from 'dotenv';
dotenv.config();
async function addEvent(page, { eventName, description, startDate, endDate, allDay }) {
    // Open "Add Event"
    const addEventBtn = page.locator('button.btn-add-event');
    await addEventBtn.waitFor({ state: 'visible' });
    await addEventBtn.click();

    // Fill Event Name
    await page.getByRole('textbox', { name: 'Name' }).fill(eventName);

    // Select Start Date
    await page.locator('.has-icon').first().click();
    await page.getByRole('option', { name: `Choose ${startDate}` }).click();

    // All Day
    if (allDay) {
        await page.getByRole('checkbox', { name: 'All Day' }).check();
    }

    // Select End Date
    await page.locator('div:nth-child(3) > .react-datepicker-wrapper > .react-datepicker__input-container > .has-icon').click();
    await page.getByRole('option', { name: `Choose ${endDate}` }).click();

    // Organizer
    await page.click("#input-calendar > button");
    await page.getByRole('menuitem', { name: 'makychristian@outlook.com' }).click();

    // Category
    // await page.locator('#dropdown-category').getByRole('button').click();
    // await page.locator('button:nth-child(9)').click();

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

test("Add All Day Events and validate event", async ({ page }) => {
    await page.goto(process.env.API_URL);
    // Google Calendar
    await page.locator('input[name="jennydurana@gmail.com"]').uncheck();
    await page.locator('input[name="markchristiandurana75@gmail.com"]').uncheck();

    // Microsoft Calendar
    await page.locator('input[name="21364cd0-7877-4edf-9728-b5ea23200212"]').check();
    await page.locator('.offcanvas-backdrop').click();

    const eventData = {
        eventName: "Testing Testings",
        description: "Automating testing",
        startDate: "Thursday, September 4th,",
        endDate: "Wednesday, September 10th,",
        numDay: "4",
        allDay: true,
    };

    await addEvent(page, eventData);
});
