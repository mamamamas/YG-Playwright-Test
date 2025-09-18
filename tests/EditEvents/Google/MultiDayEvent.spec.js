

import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

async function EditEvent(page, { eventName, description, newName, startDate, endDate, allDay }) {
    const calendarEvent = page.locator('#E-20250904');
    await expect(calendarEvent).toBeVisible({ timeout: 10000 });
    await calendarEvent.click();

    // Open event details
    await page.getByRole('button', { name: `${eventName} Sep 4 - 10, All` }, { timeout: 10000 }).first().click();
    await page.waitForTimeout(1000);
    await page.locator('#view-event-modal').getByRole('button').filter({ hasText: 'Loading...' }).first().click();
    await page.getByRole('textbox', { name: 'Name' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('');
    await page.getByRole('textbox', { name: 'Name' }).fill(newName);
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

    await page.getByRole('button', { name: 'Update Event' }).click();
    // Assert success message
    await expect(page.getByText('Event updated successfully')).toBeVisible();
}

async function validateEvent(page, { newName, description }) {
    // Wait until the event appears
    const calendarEvent = page.locator('#E-20250906');
    await expect(calendarEvent).toBeVisible({ timeout: 10000 });
    await calendarEvent.click();

    // Open event details
    await page.getByRole('button', { name: `${newName} Sep 6 - 11, All` }).first().click();

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
        eventName: "Nice Nice",
        newName: "Recurring",
        description: "Automating testing",
        startDate: "Saturday, September 6th,",
        endDate: "Thursday, September 11th,",
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
        newName: "Recurring",
        description: "Automating testing",
        startDate: "Friday, September 5th,",
        endDate: "Wednesday, September 10th,",
        numDay: "4",
        allDay: true,
    };

    await validateEvent(page, eventData);
});
