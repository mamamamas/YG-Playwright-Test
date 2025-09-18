import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

async function EditEvent(page, { eventName, description, newName, startDate, endDate, allDay, repeat }) {
    const calendarEvent = page.locator('#E-20250904'); // <-- adjust locator if eventId changes
    await expect(calendarEvent).toBeVisible({ timeout: 10000 });
    await calendarEvent.click();
    await page.waitForTimeout(10000);
    // Open event details
    await page.getByRole('button', { name: `${eventName} Sep 4 - 5, All` }, { timeout: 10000 }).first().click();
    await page.waitForTimeout(1000);

    // Edit event name
    await page.locator('#view-event-modal').getByRole('button').filter({ hasText: 'Loading...' }).first().click();
    await page.getByRole('textbox', { name: 'Name' }).fill('');
    await page.getByRole('textbox', { name: 'Name' }).fill(newName);

    // All Day
    if (allDay) {
        await page.getByRole('checkbox', { name: 'All Day' }).check();
    }

    // Start Date
    await page.locator('.has-icon').first().click();
    await page.getByRole('option', { name: `Choose ${startDate}` }).click();

    // End Date
    await page.locator('div:nth-child(3) > .react-datepicker-wrapper > .react-datepicker__input-container > .has-icon').click();
    await page.getByRole('option', { name: `Choose ${endDate}` }).click();

    // Description
    await page.getByRole('textbox', { name: 'Description' }).fill(description);

    // Update Event
    await page.getByRole('button', { name: 'Update Event' }).click();

    // Assert success
    await expect(page.getByText('Event updated successfully')).toBeVisible();
}

// Reusable setup
test.beforeEach(async ({ page }) => {
    await page.goto(process.env.API_URL);
    await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
    await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
    await page.locator('.offcanvas-backdrop').click();
    await page.waitForTimeout(4000);
});

// Parameterized tests
const repeats = ["Daily", "Weekly", "Monthly", "Annually"];

for (const repeat of repeats) {
    test(`Edit ${repeat} Event and validate event`, async ({ page }) => {
        const eventData = {
            eventName: `${repeat} Repeat`,   // Event name before edit
            newName: `Edited ${repeat} Event`, // Event name after edit
            description: "Updated description",
            startDate: "Thursday, September 4th,",
            endDate: "Friday, September 5th,",
            allDay: true,
            repeat,
        };

        await EditEvent(page, eventData);
    });
}
