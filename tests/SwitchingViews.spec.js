const { test, expect } = require('@playwright/test');
// import dotenv from 'dotenv';
// dotenv.config();
test("Switch views", async ({ page }) => {
    await page.goto("https://staging-v2.yearglance.com/");
    await page.waitForLoadState('networkidle');

    await page.locator('.offcanvas-backdrop').click();

    // Switch between views
    await page.getByRole('button', { name: 'Year' }).click();
    await page.getByRole('menuitem', { name: 'Month' }).click();
    await page.getByRole('button', { name: 'Month', exact: true }).click();
    await page.getByRole('menuitem', { name: 'Week' }).click();
    await page.getByRole('button', { name: 'Week' }).first().click();
    await page.getByRole('menuitem', { name: 'Agenda' }).click();
})