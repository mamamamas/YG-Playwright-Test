const { test } = require('@playwright/test');
require('dotenv').config();
const { switchView } = require('../Helpers.spec');

test('Switch between Horizontal and Vertical views', async ({ page }) => {
    // Step 1: Go to the app
    await page.goto(process.env.API_URL);

    // Step 2: Close backdrop if visible
    const backdrop = page.locator('.offcanvas-backdrop');
    await backdrop.click();


    // Step 3: Use helper to switch views
    await switchView(page, 'Monthly', 'Horizontal');
    await switchView(page, 'Horizontal', 'Vertical');
});
