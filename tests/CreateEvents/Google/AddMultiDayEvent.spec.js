import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

async function addEvent(page, { eventName, description, startDate, endDate, allDay }) {
    // Open "Add Event"
    const addEventBtn = page.locator('button.btn-add-event');
    await addEventBtn.waitFor({ state: 'visible', timeout: 10000 });
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
    await page.locator('div:nth-child(3) .react-datepicker__input-container .has-icon').click();
    await page.getByRole('option', { name: `Choose ${endDate}` }).click();

    // Organizer
    await page.getByRole('button', { name: /@gmail\.com$/ }).click();
    await page.getByRole('menuitem', { name: /jennydurana@gmail.com/ }).click();
    // await page.click("#input-calendar > button");
    // await page.getByRole('menuitem', { name: /markchristiandurana75@gmail/ }).click();

    // Category
    await page.locator('#dropdown-category').getByRole('button').click();
    const categoryOption = page.locator('.dropdown-menu.show > div > button:nth-child(6)');
    await expect(categoryOption).toBeVisible({ timeout: 5000 });
    await categoryOption.click();

    // Calendar
    await page.click("#input-sub-calendar > button")
    await page.getByRole('menuitem', { name: 'Main Test Calendat' }).click();
    // await page.getByRole('button', { name: '2nd Test Calendar', exact: true }).click();
    // await page.getByRole('menuitem', { name: '2nd Test Calendar' }).click();

    // Guests
    await page.getByText('Add guestsGuests').click();
    await page.getByRole('textbox', { name: 'Add guests' }).fill('jennydurana@gmail.com');

    // Location
    await page.getByRole('textbox', { name: 'Add location' }).fill('Cav');
    await page.getByRole('menuitem', { name: /^Cavallino/ }).click();

    // Description
    await page.getByRole('textbox', { name: 'Description' }).fill(description);

    // Submit
    await page.getByRole('button', { name: 'Create Event' }).click();
    await page.waitForTimeout(800);
    // Assert success message
    await expect(page.getByRole('alert').last()).toHaveText(/Event created successfully/, { timeout: 10000 });


}

async function validateEvent(page, { eventName, description }) {
    // Wait until the event appears
    const calendarEvent = page.locator('#E-20250904');
    await expect(calendarEvent).toBeVisible({ timeout: 10000 });
    await calendarEvent.click();

    // Open event details
    await expect(async () => {
        await page.getByRole('button', { name: new RegExp(eventName) }).last().click();
    }).toPass({ timeout: 20000 });

    // Validate details
    const modal = page.locator('#view-event-modal');
    await expect(modal).toContainText(eventName);
    await expect(modal).toContainText(description);
    await expect(modal).toContainText('Sep 4 - 10, All');
}

test("Add MULTI DAY event", async ({ page }) => {
    await page.goto(process.env.API_URL, { waitUntil: 'domcontentloaded' });

    // Enable Google Calendar, disable Microsoft Calendar
    await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
    // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
    await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
    await page.locator('.offcanvas-backdrop').click();

    const eventData = {
        eventName: "MultiDay Events",
        description: "Automating testing",
        startDate: "Thursday, September 4th,",
        endDate: "Wednesday, September 10th,",
        allDay: true,
    };

    await addEvent(page, eventData);
});

test("Validate MultiDay event", async ({ page }) => {
    await page.goto(process.env.API_URL, { waitUntil: 'domcontentloaded' });

    await page.locator('.offcanvas-backdrop').click();
    await page.waitForTimeout(10000);

    const eventData = {
        eventName: "MultiDay Events",
        description: "Automating testing",
        allDay: true,
    };

    await validateEvent(page, eventData);
});
