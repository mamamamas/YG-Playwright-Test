import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
const {
    validateMultiDayEvent,
    addMultiDayEvent,
    validateAllDayEvent,
    addAllDayEvent,
    addReccurringEvent,
    validateEditedAllDayEvent,
    EditAllDayEvent,
    EditMultiEvent,
    validateMultiEvent,
    EditReccurringEvent
} = require('../Helpers.spec');
test.afterEach(async ({ page }) => {
    // This runs after every test
    await page.close();
    console.log('Test finished');
});
// --- Create Events ---

test.describe.serial("Create/Edit/Delete MultiDay Events", () => {
    test("Add MULTI DAY event", async ({ page }) => {
        await page.goto(process.env.API_URL, { waitUntil: 'domcontentloaded' });

        // Enable Google Calendar, disable Microsoft Calendar
        // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
        // // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
        // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
        await page.locator('.offcanvas-backdrop').click();

        const eventData = {
            eventName: "MultiDay Events",
            description: "Automating testing",
            startDate: "Thursday, September 4th,",
            endDate: "Wednesday, September 10th,",
            allDay: true,
        };

        await addMultiDayEvent(page, eventData);
    });

    test("Validate MultiDay event", async ({ page }) => {
        await page.goto(process.env.API_URL, { waitUntil: 'domcontentloaded' });

        await page.locator('.offcanvas-backdrop').click();
        await page.waitForTimeout(10000);

        const eventData = {
            eventName: "MultiDay Events",
            description: "Automating testing",
            allDay: true,
        };

        await validateMultiDayEvent(page, eventData);
    });

    test("Edit MultiDay event", async ({ page }) => {
        await page.goto(process.env.API_URL);

        // Enable Google Calendar, disable Microsoft Calendar
        // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
        // // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
        // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
        await page.locator('.offcanvas-backdrop').click();
        await page.waitForTimeout(5000);

        const eventData = {
            eventName: "MultiDay Events",
            newName: "Edited MultiDay Events",
            description: "Automating testing",
            startDate: "Saturday, September 6th,",
            endDate: "Thursday, September 11th,",
            numDay: "4",
            allDay: true,
        };

        await EditMultiEvent(page, eventData);
    });


    test("Validate MultiDays event", async ({ page }) => {
        await page.goto(process.env.API_URL);

        // Enable Google Calendar, disable Microsoft Calendar
        // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
        // // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
        // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
        await page.locator('.offcanvas-backdrop').click();
        await page.waitForTimeout(10000);

        const eventData = {
            newName: "Edited MultiDay Events",
            description: "Automating testing",
            startDate: "Friday, September 5th,",
            endDate: "Wednesday, September 10th,",
            numDay: "4",
            allDay: true,
        };

        await validateMultiEvent(page, eventData);
    });
    test('Delete MultiDay Events', async ({ page }) => {
        await page.goto(process.env.API_URL, { waitUntil: 'domcontentloaded' });
        // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
        // // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
        // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
        await page.locator('.offcanvas-backdrop').click();
        await page.waitForTimeout(5000);
        const calendarEvent = page.locator('#E-20250906');
        await expect(calendarEvent).toBeVisible({ timeout: 10000 });
        await calendarEvent.click();
        await expect(async () => {
            await page.getByRole('button', { name: /Edited MultiDay Events/ }).last().click();
            await page.getByRole('button').filter({ hasText: /^Loading\.\.\.$/ }).nth(3).click();
        }).toPass({ timeout: 20000 });

        await page.getByRole('button', { name: 'Delete Event' }).click();
        await page.waitForTimeout(800);
        // Assert success message
        await expect(page.getByRole('alert').last()).toHaveText(/Event deleted successfully/, { timeout: 10000 });
    });
});

test.describe.serial("Create/Edit/Delete AllDay Events", () => {
    test("Add ALL DAY event", async ({ page }) => {
        await page.goto(process.env.API_URL, { waitUntil: 'domcontentloaded' });
        await page.locator('.offcanvas-backdrop').click();

        const eventData = {
            eventName: "All Day Events",
            description: "Automating testing",
            startDate: "Thursday, September 4th,",
            allDay: true,
        };

        await addAllDayEvent(page, eventData);
    });
    test("Validate AllDay event", async ({ page }) => {
        await page.goto(process.env.API_URL, { waitUntil: 'domcontentloaded' });

        // Enable Google Calendar, disable Microsoft Calendar
        await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
        // await page.locator(`input[name="9bfbeee1-e10c-4ba5-a001-a5720875ef0d"]`).check();
        await page.locator(`input[name="0a2ced40-2a0e-4118-8e92-43f90e6f0f31"]`).uncheck();
        await page.locator('.offcanvas-backdrop').click();
        await page.waitForTimeout(10000);

        const eventData = {
            eventName: "All Day Events",
            description: "Automating testing",
            allDay: true,
        };

        await validateAllDayEvent(page, eventData);
    });


    test("Edit AllDay event", async ({ page }) => {
        await page.goto(process.env.API_URL, { waitUntil: 'domcontentloaded' });

        // Enable Google Calendar, disable Microsoft Calendar
        // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
        // // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
        // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
        await page.locator('.offcanvas-backdrop').click();
        await page.waitForTimeout(5000);

        const eventData = {
            eventName: "All Day Events",
            newName: "Edited All Day Events",
            description: "Automating testing",
            startDate: "Friday, September 5th,",
            numDay: "4",
            allDay: true,
        };

        await EditAllDayEvent(page, eventData);
    });

    test("Validate Edited AllDays event", async ({ page }) => {
        await page.goto(process.env.API_URL);

        // Enable Google Calendar, disable Microsoft Calendar
        // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
        // // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
        // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
        await page.locator('.offcanvas-backdrop').click();
        await page.waitForTimeout(10000);

        const eventData = {
            eventName: "All Day Events",
            newName: "Edited All Day Events",
            description: "Automating testing",
            startDate: "Friday, September 5th,",
            numDay: "4",
            allDay: true,
        };

        await validateEditedAllDayEvent(page, eventData);
    });

    test("Delete All Day Event", async ({ page }) => {
        await page.goto(process.env.API_URL);
        // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
        // // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
        // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
        await page.locator('.offcanvas-backdrop').click();
        await page.waitForTimeout(10000);
        const calendarEvent = page.locator('#E-20250906');
        await expect(calendarEvent).toBeVisible({ timeout: 10000 });
        await calendarEvent.click();
        await expect(async () => {
            await page.getByRole('button', { name: /Edited All Day Events/ }).last().click();
            await page.getByRole('button').filter({ hasText: /^Loading\.\.\.$/ }).nth(3).click();
        }).toPass({ timeout: 20000 });

        await page.getByRole('button', { name: 'Delete Event' }).click();
        await page.waitForTimeout(800);
        // Assert success message
        await expect(page.getByRole('alert').last()).toHaveText(/Event deleted successfully/, { timeout: 10000 });

    });

});




// test.describe.serial("Create MultiDay Events", () => {
//     test("Add MULTI DAY event", async ({ page }) => {
//         await page.goto(process.env.API_URL, { waitUntil: 'domcontentloaded' });

//         // Enable Google Calendar, disable Microsoft Calendar
//         // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
//         // // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
//         // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
//         await page.locator('.offcanvas-backdrop').click();

//         const eventData = {
//             eventName: "MultiDay Events",
//             description: "Automating testing",
//             startDate: "Thursday, September 4th,",
//             endDate: "Wednesday, September 10th,",
//             allDay: true,
//         };

//         await addMultiDayEvent(page, eventData);
//     });

//     test("Validate MultiDay event", async ({ page }) => {
//         await page.goto(process.env.API_URL, { waitUntil: 'domcontentloaded' });

//         await page.locator('.offcanvas-backdrop').click();
//         await page.waitForTimeout(10000);

//         const eventData = {
//             eventName: "MultiDay Events",
//             description: "Automating testing",
//             allDay: true,
//         };

//         await validateMultiDayEvent(page, eventData);
//     });
// });

// test.describe.serial("Create AllDay Events", () => {
//     test("Add ALL DAY event", async ({ page }) => {
//         await page.goto(process.env.API_URL);
//         await page.locator('.offcanvas-backdrop').click();

//         const eventData = {
//             eventName: "All Day Events",
//             description: "Automating testing",
//             startDate: "Thursday, September 4th,",
//             allDay: true,
//         };

//         await addAllDayEvent(page, eventData);
//         await validateAllDayEvent(page, eventData);
//     });


// });

test.describe.serial("Create Recurring Events", () => {
    const repeats = ["Daily", "Weekly", "Monthly", "Annually"];

    for (const repeat of repeats) {
        test(`Add ${repeat} Event and validate event`, async ({ page }) => {
            await page.goto(process.env.API_URL, { waitUntil: 'domcontentloaded' });
            await page.locator('.offcanvas-backdrop').click();
            const eventData = {
                eventName: `${repeat} Repeat`,
                description: "Automating testing",
                startDate: "Thursday, September 4th,",
                endDate: "Friday, September 5th,",
                allDay: true,
                repeat,
            };

            await addReccurringEvent(page, eventData);
        });
    }

    for (const repeat of repeats) {
        test(`Edit ${repeat} Event and validate event`, async ({ page }) => {
            await page.goto(process.env.API_URL, { waitUntil: 'domcontentloaded' });
            await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
            // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
            await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
            await page.locator('.offcanvas-backdrop').click();
            await page.waitForTimeout(4000);
            const eventData = {
                eventName: `${repeat} Repeat`,   // Event name before edit
                newName: `Edited ${repeat} Event`, // Event name after edit
                description: "Updated description",
                startDate: "Friday, September 5th,",
                endDate: "Wednesday, September 10th,",
                allDay: true,
                repeat,
            };

            await EditReccurringEvent(page, eventData);
        });
    }

    test('Delete Daily', async ({ page }) => {
        await page.goto(process.env.API_URL, { waitUntil: 'domcontentloaded' });
        // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
        // // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
        // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
        await page.locator('.offcanvas-backdrop').click();
        await page.waitForTimeout(5000);
        const calendarEvent = page.locator('#E-20250905');
        await expect(calendarEvent).toBeVisible({ timeout: 10000 });
        await calendarEvent.click();
        await expect(async () => {
            await page.getByRole('button', { name: /Edited Daily Event/ }).last().click();
            await page.getByRole('button').filter({ hasText: /^Loading\.\.\.$/ }).nth(3).click();
        }).toPass({ timeout: 20000 });
        await page.getByRole('button', { name: 'Delete Event' }).click();
        await expect(page.getByRole('alert').first()).toHaveText(/Event deleted successfully/, { timeout: 10000 });
    });
    test('Delete Weekly', async ({ page }) => {
        await page.goto(process.env.API_URL, { waitUntil: 'domcontentloaded' });
        // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
        await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
        await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
        await page.locator('.offcanvas-backdrop').click();
        await page.waitForTimeout(5000);
        const calendarEvent = page.locator('#E-20250905');
        await expect(calendarEvent).toBeVisible({ timeout: 10000 });
        await calendarEvent.click();
        await expect(async () => {
            await page.getByRole('button', { name: /Edited Weekly Event/ }).last().click();
            await page.getByRole('button').filter({ hasText: /^Loading\.\.\.$/ }).nth(3).click();
        }).toPass({ timeout: 20000 });
        await page.getByRole('button', { name: 'Delete Event' }).click();
        await expect(page.getByRole('alert').first()).toHaveText(/Event deleted successfully/, { timeout: 10000 });
    });
    test('Delete Monthly', async ({ page }) => {
        await page.goto(process.env.API_URL, { waitUntil: 'domcontentloaded' });
        // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
        await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
        await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
        await page.locator('.offcanvas-backdrop').click();
        await page.waitForTimeout(5000);
        const calendarEvent = page.locator('#E-20250905');
        await expect(calendarEvent).toBeVisible({ timeout: 10000 });
        await calendarEvent.click();
        await expect(async () => {
            await page.getByRole('button', { name: /Edited Monthly Event/ }).last().click();
            await page.getByRole('button').filter({ hasText: /^Loading\.\.\.$/ }).nth(3).click();
        }).toPass({ timeout: 20000 });
        await page.getByRole('button', { name: 'Delete Event' }).click();
        await expect(page.getByRole('alert').first()).toHaveText(/Event deleted successfully/, { timeout: 10000 });
    });
    test('Delete Annually', async ({ page }) => {
        await page.goto(process.env.API_URL, { waitUntil: 'domcontentloaded' });
        // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check()
        await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
        await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
        await page.locator('.offcanvas-backdrop').click();
        await page.waitForTimeout(5000);
        const calendarEvent = page.locator('#E-20250905');
        await expect(calendarEvent).toBeVisible({ timeout: 10000 });
        await calendarEvent.click();
        await expect(async () => {
            await page.getByRole('button', { name: /Edited Annually Event/ }).last().click();
            await page.getByRole('button').filter({ hasText: /^Loading\.\.\.$/ }).nth(3).click();
        }).toPass({ timeout: 20000 });
        await page.getByRole('button', { name: 'Delete Event' }).click();
        await page.waitForTimeout(800);
        await expect(page.getByRole('alert').last()).toHaveText(/Event deleted successfully/, { timeout: 10000 });
    });
});

// --- Edit Events-- -
// test.describe.serial("Edit AllDays Events", () => {
//     test("Edit AllDay event", async ({ page }) => {
//         await page.goto(process.env.API_URL);

//         // Enable Google Calendar, disable Microsoft Calendar
//         // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
//         // // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
//         // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
//         await page.locator('.offcanvas-backdrop').click();
//         await page.waitForTimeout(5000);

//         const eventData = {
//             eventName: "All Day Events",
//             newName: "Edited All Day Events",
//             description: "Automating testing",
//             startDate: "Friday, September 5th,",
//             numDay: "4",
//             allDay: true,
//         };

//         await EditAllDayEvent(page, eventData);
//     });

//     test("Validate Edited AllDays event", async ({ page }) => {
//         await page.goto(process.env.API_URL);

//         // Enable Google Calendar, disable Microsoft Calendar
//         // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
//         // // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
//         // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
//         await page.locator('.offcanvas-backdrop').click();
//         await page.waitForTimeout(10000);

//         const eventData = {
//             eventName: "All Day Events",
//             newName: "Edited All Day Events",
//             description: "Automating testing",
//             startDate: "Friday, September 5th,",
//             numDay: "4",
//             allDay: true,
//         };

//         await validateEditedAllDayEvent(page, eventData);
//     });

// })

// test.describe.serial("Edit MultiDays Events", () => {
//     test("Edit MultiDay event", async ({ page }) => {
//         await page.goto(process.env.API_URL);

//         // Enable Google Calendar, disable Microsoft Calendar
//         // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
//         // // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
//         // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
//         await page.locator('.offcanvas-backdrop').click();
//         await page.waitForTimeout(5000);

//         const eventData = {
//             eventName: "MultiDay Events",
//             newName: "Edited MultiDay Events",
//             description: "Automating testing",
//             startDate: "Saturday, September 6th,",
//             endDate: "Thursday, September 11th,",
//             numDay: "4",
//             allDay: true,
//         };

//         await EditMultiEvent(page, eventData);
//     });


//     test("Validate MultiDays event", async ({ page }) => {
//         await page.goto(process.env.API_URL);

//         // Enable Google Calendar, disable Microsoft Calendar
//         // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
//         // // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
//         // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
//         await page.locator('.offcanvas-backdrop').click();
//         await page.waitForTimeout(10000);

//         const eventData = {
//             newName: "Edited MultiDay Events",
//             description: "Automating testing",
//             startDate: "Friday, September 5th,",
//             endDate: "Wednesday, September 10th,",
//             numDay: "4",
//             allDay: true,
//         };

//         await validateMultiEvent(page, eventData);
//     });
// },
//     test.describe.serial("Edit Recurring Events", () => {
//         // Parameterized tests
//         const repeats = ["Daily", "Weekly", "Monthly", "Annually"];

//         for (const repeat of repeats) {
//             test(`Edit ${repeat} Event and validate event`, async ({ page }) => {
//                 await page.goto(process.env.API_URL);
//                 await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
//                 // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
//                 await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
//                 await page.locator('.offcanvas-backdrop').click();
//                 await page.waitForTimeout(4000);
//                 const eventData = {
//                     eventName: `${repeat} Repeat`,   // Event name before edit
//                     newName: `Edited ${repeat} Event`, // Event name after edit
//                     description: "Updated description",
//                     startDate: "Friday, September 5th,",
//                     endDate: "Wednesday, September 10th,",
//                     allDay: true,
//                     repeat,
//                 };

//                 await EditReccurringEvent(page, eventData);
//             });
//         }

//     }),


// --- Delete Events ---
// test.describe.serial("Delete Events", () => {
// test("Delete All Day Event", async ({ page }) => {
//     await page.goto(process.env.API_URL);
//     // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
//     // // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
//     // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
//     await page.locator('.offcanvas-backdrop').click();
//     await page.waitForTimeout(10000);
//     const calendarEvent = page.locator('#E-20250905');
//     await expect(calendarEvent).toBeVisible({ timeout: 10000 });
//     await calendarEvent.click();
//     await expect(async () => {
//         await page.getByRole('button', { name: /Edited All Day Events/ }).last().click();
//         await page.getByRole('button').filter({ hasText: /^Loading\.\.\.$/ }).nth(3).click();
//     }).toPass({ timeout: 20000 });

//     await page.getByRole('button', { name: 'Delete Event' }).click();
//     await page.waitForTimeout(800);
//     // Assert success message
//     await expect(page.getByRole('alert').last()).toHaveText(/Event deleted successfully/, { timeout: 10000 });

// });

//     test('Delete MultiDay Events', async ({ page }) => {
//         await page.goto(process.env.API_URL, { waitUntil: 'domcontentloaded' });
//         // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
//         // // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
//         // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
//         await page.locator('.offcanvas-backdrop').click();
//         await page.waitForTimeout(5000);
//         const calendarEvent = page.locator('#E-20250906');
//         await expect(calendarEvent).toBeVisible({ timeout: 10000 });
//         await calendarEvent.click();
//         await expect(async () => {
//             await page.getByRole('button', { name: /Edited MultiDay Events/ }).last().click();
//             await page.getByRole('button').filter({ hasText: /^Loading\.\.\.$/ }).nth(3).click();
//         }).toPass({ timeout: 20000 });

//         await page.getByRole('button', { name: 'Delete Event' }).click();
//         await page.waitForTimeout(800);
//         // Assert success message
//         await expect(page.getByRole('alert').last()).toHaveText(/Event deleted successfully/, { timeout: 10000 });
//     });

//     test('Delete Daily', async ({ page }) => {
//         await page.goto(process.env.API_URL);
//         // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
//         // // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
//         // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
//         await page.locator('.offcanvas-backdrop').click();
//         await page.waitForTimeout(5000);
//         const calendarEvent = page.locator('#E-20250905');
//         await expect(calendarEvent).toBeVisible({ timeout: 10000 });
//         await calendarEvent.click();
//         await expect(async () => {
//             await page.getByRole('button', { name: /Edited Daily Event/ }).last().click();
//             await page.getByRole('button').filter({ hasText: /^Loading\.\.\.$/ }).nth(3).click();
//         }).toPass({ timeout: 20000 });
//         await page.getByRole('button', { name: 'Delete Event' }).click();
//         await expect(page.getByRole('alert').first()).toHaveText(/Event deleted successfully/, { timeout: 10000 });
//     });
//     test('Delete Weekly', async ({ page }) => {
//         await page.goto(process.env.API_URL);
//         // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
//         await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
//         await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
//         await page.locator('.offcanvas-backdrop').click();
//         await page.waitForTimeout(5000);
//         const calendarEvent = page.locator('#E-20250905');
//         await expect(calendarEvent).toBeVisible({ timeout: 10000 });
//         await calendarEvent.click();
//         await expect(async () => {
//             await page.getByRole('button', { name: /Edited Weekly Event/ }).last().click();
//             await page.getByRole('button').filter({ hasText: /^Loading\.\.\.$/ }).nth(3).click();
//         }).toPass({ timeout: 20000 });
//         await page.getByRole('button', { name: 'Delete Event' }).click();
//         await expect(page.getByRole('alert').first()).toHaveText(/Event deleted successfully/, { timeout: 10000 });
//     });
//     test('Delete Monthly', async ({ page }) => {
//         await page.goto(process.env.API_URL);
//         // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
//         await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
//         await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
//         await page.locator('.offcanvas-backdrop').click();
//         await page.waitForTimeout(5000);
//         const calendarEvent = page.locator('#E-20250905');
//         await expect(calendarEvent).toBeVisible({ timeout: 10000 });
//         await calendarEvent.click();
//         await expect(async () => {
//             await page.getByRole('button', { name: /Edited Monthly Event/ }).last().click();
//             await page.getByRole('button').filter({ hasText: /^Loading\.\.\.$/ }).nth(3).click();
//         }).toPass({ timeout: 20000 });
//         await page.getByRole('button', { name: 'Delete Event' }).click();
//         await expect(page.getByRole('alert').first()).toHaveText(/Event deleted successfully/, { timeout: 10000 });
//     });
//     test('Delete Annually', async ({ page }) => {
//         await page.goto(process.env.API_URL);
//         // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check()
//         await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
//         await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
//         await page.locator('.offcanvas-backdrop').click();
//         await page.waitForTimeout(5000);
//         const calendarEvent = page.locator('#E-20250905');
//         await expect(calendarEvent).toBeVisible({ timeout: 10000 });
//         await calendarEvent.click();
//         await expect(async () => {
//             await page.getByRole('button', { name: /Edited Annually Event/ }).last().click();
//             await page.getByRole('button').filter({ hasText: /^Loading\.\.\.$/ }).nth(3).click();
//         }).toPass({ timeout: 20000 });
//         await page.getByRole('button', { name: 'Delete Event' }).click();
//         await page.waitForTimeout(800);
//         await expect(page.getByRole('alert').last()).toHaveText(/Event deleted successfully/, { timeout: 10000 });
//     });
// }))