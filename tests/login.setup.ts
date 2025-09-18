import { expect, test as setup } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
setup('Write login session data', async ({ page }) => {
    await page.goto(process.env.LOGIN_URL!);
    await page.waitForSelector('#input-email');
    const email = page.locator('#input-email');
    const password = page.locator('#input-password');
    const loginBtn = page.locator("#btn-login");
    const errorAlert = page.locator('#custom-alert.alert-error');

    await email.fill(process.env.EMAIL_LOGIN!);

    // 🔹 First attempt
    await password.fill(process.env.PASSWORD!);
    await loginBtn.click();

    // 🔹 Wait for either success (URL) OR failure (alert)
    const result = await Promise.race([
        page.waitForURL(process.env.API_URL!, { timeout: 5000 }).then(() => "success").catch(() => null),
        errorAlert.waitFor({ state: 'visible', timeout: 5000 }).then(() => "error").catch(() => null)
    ]);

    if (result === "error") {
        console.log("First password failed, retrying with backup...");

        // Clear and retry
        await password.fill("");
        await password.fill("P@ssword1!");
        await loginBtn.click();

        // Wait again for success
        await page.waitForURL(process.env.API_URL!, { timeout: 10000 });
    }

    // 🔹 Save session only if login is successful
    await page.context().storageState({ path: ".auth/login.json" });
});
