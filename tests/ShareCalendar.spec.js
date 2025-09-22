import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
test('Share Calendar', async ({ page, context }) => {
    await page.goto(process.env.API_URL);
    await page.locator('.offcanvas-backdrop').click();
    await page.getByRole('button', { name: 'Share' }).click();
    await page.getByLabel('Year - Monthly').check();
    await page.getByLabel('Agenda').check();
    await page.getByLabel('Month', { exact: true }).check();
    await page.getByLabel('Year - Horizontal').check();
    await page.getByLabel('Week').check();
    await page.getByLabel('Year - Vertical').check();
    await page.getByLabel('Day').check();
    // await page.getByRole('checkbox', { name: 'Year - Monthly' }).check();
    // await page.getByRole('checkbox', { name: 'Year - Monthly' }).check();
    // await page.getByRole('checkbox', { name: 'Agenda' }).check();
    // await page.getByRole('checkbox', { name: 'Month', exact: true }).check();
    // await page.getByRole('checkbox', { name: 'Year - Horizontal' }).check();
    // await page.getByRole('checkbox', { name: 'Week' }).check();
    // await page.getByRole('checkbox', { name: 'Year - Vertical' }).check();
    // await page.getByRole('checkbox', { name: 'Day' }).check();
    await page.locator('div').filter({ hasText: /^LinkCopy$/ }).getByRole('button').click();
    const ClipBoard = page.getByText('Copied to clipboard.')
    await expect(ClipBoard).toBeVisible()
    await ClipBoard.click()
    // Create a new page from the context
    const page1 = await context.newPage();
    await page1.goto(
        'https://staging-v2.yearglance.com/share-my-calendar/9f9af05d-c515-432a-b5bd-b3fa2337414f?code=eyJjYWxlbmRhcl9pZHMiOltdLCJjYXRlZ29yeV9pZHMiOltdLCJwZXJtaXNzaW9uIjpmYWxzZSwibW9udGhseSI6dHJ1ZSwiYWdlbmRhIjp0cnVlLCJtb250aCI6dHJ1ZSwiaG9yaXpvbnRhbCI6dHJ1ZSwid2VlayI6dHJ1ZSwidmVydGljYWwiOnRydWUsImRheSI6dHJ1ZX0%3D'
    );

    // validate something in the shared calendar page
    await expect(page1).toHaveURL(/share-my-calendar/);
});

