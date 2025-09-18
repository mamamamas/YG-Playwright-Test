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

    // Organizer
    await page.getByRole('button', { name: 'jennydurana@gmail.com' }).click();
    await page.getByRole('menuitem', { name: 'markchristiandurana75@gmail.' }).click();

    // Category
    await page.locator('#dropdown-category').getByRole('button').click();
    await page.locator('button:nth-child(9)').click();

    // Calendar
    await page.getByRole('button', { name: '2nd Test Calendar', exact: true }).click();
    await page.getByRole('menuitem', { name: '2nd Test Calendar' }).click();

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

async function validateEvent(page, { eventName, description, numDay }) {
    // Wait until the event appears
    // await page.getByRole('button', { name: `${numDay} ${eventName}` }).first().click();
    await page.locator('#E-20250904').click();
    await page.getByRole('button', { name: `${eventName} Sep 4 - 5, All` }).click();
    await page.waitForTimeout(5000);
    await page.locator('#view-event-modal').getByRole('button').filter({ hasText: 'Loading...' }).first().click();
    await page.waitForTimeout(2000);

    // Validate data inside the event details
    await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue(eventName);
    await expect(page.getByRole('textbox', { name: 'Description' })).toHaveValue(description);
}

test("Add and validate event", async ({ page }) => {
    await page.goto(process.env.API_URL);
    await page.locator('.offcanvas-backdrop').click();

    const eventData = {
        eventName: "Testing Testings",
        description: "Automating testing",
        startDate: "Thursday, September 4th,",
        endDate: "Friday, September 5th,",
        numDay: "4",
        allDay: true,
    };

    await addEvent(page, eventData);
    await validateEvent(page, eventData);
});


test('Delete Events', async ({ page }) => {
    await page.goto('https://staging-v2.yearglance.com/');
    await page.locator('.offcanvas-backdrop').click();
    await page.waitForTimeout(5000);
    await page.getByLabel('E-20250107', { exact: true }).click();
    await page.getByRole('button', { name: 'January 7 to 9 Jan 7 - 9, All Day' }).click();
    await page.getByRole('button').filter({ hasText: /^Loading\.\.\.$/ }).nth(3).click();
    await page.getByRole('button', { name: 'Delete Event' }).click();
});