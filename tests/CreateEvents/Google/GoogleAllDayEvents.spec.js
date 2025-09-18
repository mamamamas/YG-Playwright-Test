
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

    // Select Start Date
    await page.locator('.has-icon').first().click();
    await page.getByRole('option', { name: `Choose ${startDate}` }).click();

    // All Day
    if (allDay) {
        await page.getByRole('checkbox', { name: 'All Day' }).check();
    }

    // Organizer
    await page.getByRole('button', { name: /@gmail\.com$/ }).click();
    await page.getByRole('menuitem', { name: /markchristiandurana75@gmail/ }).click();

    // Category
    await page.locator('#dropdown-category').getByRole('button').click();
    const categoryOption = page.locator('.dropdown-menu.show > div > button:nth-child(6)');
    await expect(categoryOption).toBeVisible({ timeout: 5000 });
    await categoryOption.click();

    // Calendar
    await page.getByRole('button', { name: '2nd Test Calendar', exact: true }).click();
    await page.getByRole('menuitem', { name: '2nd Test Calendar' }).click();

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

    // Assert success message
    await expect(page.getByText('Event created successfully')).toBeVisible({ timeout: 10000 });
}

async function validateEvent(page, { eventName, description }) {
    // Wait until the event appears
    const calendarEvent = page.locator('#E-20250904');
    await expect(calendarEvent).toBeVisible({ timeout: 10000 });
    await calendarEvent.click();

    // Open event details
    await page.getByRole('button', { name: `${eventName} Sep 4, All` }, { timeout: 30000 }).first().click();

    // Validate details
    const modal = page.locator('#view-event-modal');
    await expect(modal).toContainText(eventName);
    await expect(modal).toContainText(description);
    await expect(modal).toContainText('Sep 4, All');
}

test("Add event", async ({ page }) => {
    await page.goto(process.env.API_URL);

    // Enable Google Calendar, disable Microsoft Calendar
    await page.locator('input[name="9bfbeee1-e10c-4ba5-a001-a5720875ef0d"]').check();
    await page.locator('input[name="21364cd0-7877-4edf-9728-b5ea23200212"]').uncheck();
    await page.locator('.offcanvas-backdrop').click();

    const eventData = {
        eventName: "Nice Nice",
        description: "Automating testing",
        startDate: "Thursday, September 4th,",
        allDay: true,
    };

    await addEvent(page, eventData);
});

test("Validate existing event", async ({ page }) => {
    await page.goto(process.env.API_URL);

    // Enable Google Calendar, disable Microsoft Calendar
    await page.locator('input[name="9bfbeee1-e10c-4ba5-a001-a5720875ef0d"]').check();
    await page.locator('input[name="21364cd0-7877-4edf-9728-b5ea23200212"]').uncheck();
    await page.locator('.offcanvas-backdrop').click();
    await page.waitForTimeout(10000);

    const eventData = {
        eventName: "Nice Nice",
        description: "Automating testing",
        allDay: true,
    };

    await validateEvent(page, eventData);
});
