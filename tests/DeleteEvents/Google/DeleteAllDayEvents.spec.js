import { expect, test } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

test('Delete Events', async ({ page }) => {
    await page.goto(process.env.API_URL);
    await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
    await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
    await page.locator('.offcanvas-backdrop').click();
    await page.waitForTimeout(10000);
    const calendarEvent = page.locator('#E-20250904');
    await expect(calendarEvent).toBeVisible({ timeout: 10000 });
    await calendarEvent.click();
    await page.getByRole('button', { name: 'Nice Nice Sep 4, All' }, { timeout: 30000 }).first().click();
    await page.getByRole('button').filter({ hasText: /^Loading\.\.\.$/ }).nth(3).click();
    await page.getByRole('button', { name: 'Delete Event' }).click();
    // Assert success message
    await expect(page.getByText('Event deleted successfully')).toBeVisible({ timeout: 10000 });
});