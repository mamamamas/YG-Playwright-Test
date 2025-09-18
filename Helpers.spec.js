const { expect } = require('@playwright/test');

/**
 * Switch between views in the dropdown
 * @param {object} page - Playwright page object
 * @param {string} current - The current view shown on the button
 * @param {string} next - The view you want to switch to
 */

async function switchView(page, current, next) {
    // Open dropdown from the current view
    await page.getByRole('button', { name: current }).click();

    // Ensure the next option is visible, then select it
    const option = page.getByRole('menuitem', { name: next });
    await expect(option).toBeVisible();
    await option.click();


}

module.exports = { switchView };
