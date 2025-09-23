const { test, expect } = require('@playwright/test');
// require('dotenv').config();

test('Switching Calendar', async ({ page }) => {
    // Step 1: Go to the app
    await page.goto("https://staging-v2.yearglance.com/", { waitUntil: 'domcontentloaded' });

    // Step 2: Close backdrop if visible
    const backdrop = page.locator('.offcanvas-backdrop');
    if (await backdrop.isVisible()) {
        await backdrop.click();
    }

    // Step 3: Open account/calendar settings
    // await page.getByRole('button', { name: 'markchristiandurana75' }).click();

    // Define the calendar IDs
    // const calendars = {
    //     personal: '9bfbeee1-e10c-4ba5-a001-a5720875ef0d',
    //     work: '4d8369f9-cfb9-405a-bf63-40bcdc8cb7f0',
    //     school: '5ea83d3d-35d5-43c0-8c50-465484765583',
    //     events: '7df74137-bfbd-4c1d-8853-f00afbdec920',
    //     holidays: '5a471dcf-3917-427b-9514-275418bf81df',
    // };
    const calendars = {
        personal: '0f60b054-10d0-4693-afaf-b32a34860a8d',
        work: '28d9c2fb-9794-4fe7-a179-ae9de37a39f4',
        school: '0f60b054-10d0-4693-afaf-b32a34860a8d',
        events: 'f99bca10-0f3b-4b17-a438-2a8d41126a9b',
        holidays: 'fbf40d91-2db7-41e2-9ac1-5f1921ffd3d1',
    };


    // Helper function to toggle calendar
    const toggleCalendar = async (id, action) => {
        const input = page.locator(`input[name="${id}"]`);
        if (action === 'check') {
            await input.check();
            await expect(input).toBeChecked();
        } else {
            await input.uncheck();
            await expect(input).not.toBeChecked();
        }
    };

    // Step 4: Perform calendar switching
    await toggleCalendar(calendars.personal, 'uncheck');
    await toggleCalendar(calendars.work, 'check');
    await toggleCalendar(calendars.school, 'check');
    await toggleCalendar(calendars.work, 'uncheck');
    await toggleCalendar(calendars.school, 'uncheck');
    await toggleCalendar(calendars.events, 'check');
    await toggleCalendar(calendars.holidays, 'check');
    await toggleCalendar(calendars.events, 'uncheck');
    await toggleCalendar(calendars.holidays, 'uncheck');
    await toggleCalendar(calendars.personal, 'check');
});
