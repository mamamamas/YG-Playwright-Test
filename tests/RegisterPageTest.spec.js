// import { MailSlurp } from 'mailslurp-client';
// import { test, expect } from '@playwright/test';
// import dotenv from 'dotenv';
// dotenv.config();
// // Initialize MailSlurp
// const mailslurp = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY });

// test.only('Register Page with MailSlurp verification code', async ({ page }) => {
//     // 1. Create inbox
//     const inbox = await mailslurp.createInbox();
//     console.log(`Created inbox with email: ${inbox.emailAddress}`);

//     // 2. Fill registration form
//     await page.goto(process.env.REGISTER_URL);
//     await page.fill('#input-first-name', "Mark Christian");
//     await page.fill('#input-last-name', "Durana");
//     await page.fill('#input-email', inbox.emailAddress);
//     await page.fill('#input-password', "P@ssword1");
//     await page.fill('#input-confirm-password', "P@ssword1");
//     await page.locator('#checkbox-required-agreement').check();
//     await page.locator('#checkbox-marketing-agreement').check();
//     await page.click("#btn-register");

//     // 3. Wait for verification email
//     const email = await mailslurp.waitForLatestEmail(inbox.id, {
//         timeout: 30000,
//         unreadOnly: true,
//     });

//     // 4. Extract 6-digit code (regex)
//     const match = email.body.match(/\b\d{6}\b/);
//     if (!match) throw new Error("No verification code found in email");
//     const verificationCode = match[0];
//     console.log(`Verification code: ${verificationCode}`);
//     await expect(page.locator("h3")).toHaveText("Verify Your Account");
//     // 5. Fill verification code on site
//     for (let i = 0; i < verificationCode.length; i++) {
//         await page.fill(`#otp-input-${i}`, verificationCode[i]);
//     }
//     await page.click('#btn-verify'); // <-- adjust selector if needed

//     // 6. Expect onboarding page
//     await expect(page).toHaveURL(/onboarding/);
//     await expect(page.locator('#input-country')).toBeVisible();
//     await page.selectOption('#input-country', 'Afghanistan');
//     await page.fill('#input-city', 'Cavite')
//     await page.selectOption('#input-industry', 'Computer');
//     await page.selectOption('#input-role', 'Developer');
//     await page.fill('#input-organization-name', 'Labs')
//     await page.fill('#input-organization-link', 'JLabs')
//     await page.click('#btn-next');
//     // await expect(page.locator("h2")).toHaveText("Welcome to Year Glance!");

// });