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
async function addMultiDayEvent(page, { eventName, description, startDate, endDate, allDay }) {
    // Open "Add Event"
    const addEventBtn = page.locator('button.btn-add-event');
    await addEventBtn.waitFor({ state: 'visible', timeout: 10000 });
    await addEventBtn.click();

    // Fill Event Name
    await page.getByRole('textbox', { name: 'Name' }).fill(eventName);

    // All Day
    if (allDay) {
        await page.getByLabel("All Day").click()
    }

    // Select Start Date
    await page.locator('.has-icon').first().click();
    await page.getByRole('option', { name: `Choose ${startDate}` }).click();

    // Select End Date
    await page.locator('div:nth-child(3) .react-datepicker__input-container .has-icon').click();
    await page.getByRole('option', { name: `Choose ${endDate}` }).click();

    // Organizer
    await page.click("#input-calendar > button");
    await page.getByRole('menuitem', { name: /jennydurana@gmail.com/ }).click();
    // await page.click("#input-calendar > button");
    // await page.getByRole('menuitem', { name: /markchristiandurana75@gmail/ }).click();

    // Category
    await page.locator('#dropdown-category').getByRole('button').click();
    const categoryOption = page.locator('.dropdown-menu.show > div > button:nth-child(6)');
    await expect(categoryOption).toBeVisible({ timeout: 5000 });
    await categoryOption.click();

    // Calendar
    await page.click("#input-sub-calendar > button")
    await page.getByRole('menuitem', { name: 'Main Test Calendat' }).click();
    // await page.getByRole('button', { name: '2nd Test Calendar', exact: true }).click();
    // await page.getByRole('menuitem', { name: '2nd Test Calendar' }).click();

    // Guests
    await page.getByText('Add guestsGuests').click();
    await page.getByRole('textbox', { name: 'Add guests' }).fill('jennydurana@gmail.com');

    // Location
    await page.getByRole('textbox', { name: 'Add location' }).fill('Cav');
    await page.getByRole('menuitem', { name: /^Cavallino/ }).click();

    // Description
    await page.getByRole('textbox', { name: 'Description' }).fill(description);

    // Submit
    await page.getByRole('button', { name: 'Create Event' }).click();
    await page.waitForTimeout(800);
    // Assert success message
    await expect(page.getByRole('alert').last()).toHaveText(/Event created successfully/, { timeout: 10000 });


}

async function validateMultiDayEvent(page, { eventName, description }) {
    // Wait until the event appears
    const calendarEvent = page.locator('#E-20250904');
    await expect(calendarEvent).toBeVisible({ timeout: 10000 });
    await calendarEvent.click();

    // Open event details
    await expect(async () => {
        await page.getByRole('button', { name: new RegExp(eventName) }).last().click();
    }).toPass({ timeout: 20000 });

    // Validate details
    const modal = page.locator('#view-event-modal');
    await expect(modal).toContainText(eventName);
    await expect(modal).toContainText(description);
    await expect(modal).toContainText('Sep 4 - 10, All');
}

async function addAllDayEvent(page, { eventName, description, startDate, endDate, allDay }) {
    // Open "Add Event"
    const addEventBtn = page.locator('button.btn-add-event');
    await addEventBtn.waitFor({ state: 'visible', timeout: 10000 });
    await addEventBtn.click();

    // Fill Event Name
    await page.getByRole('textbox', { name: 'Name' }).fill(eventName);

    // Select Start Date
    await page.locator('.has-icon').first().click();
    await page.getByRole('option', { name: `Choose ${startDate}` }).click();

    // All Day
    if (allDay) {
        await page.getByLabel("All Day").click()
        // await page.getByRole('checkbox', { name: 'All Day' }).check();
    }

    // Organizer
    await page.click("#input-calendar > button");
    await page.getByRole('menuitem', { name: /jennydurana@gmail.com/ }).click();

    // Category
    await page.locator('#dropdown-category').getByRole('button').click();
    const categoryOption = page.locator('.dropdown-menu.show > div > button:nth-child(6)');
    await expect(categoryOption).toBeVisible({ timeout: 5000 });
    await categoryOption.click();

    // Calendar
    await page.click("#input-sub-calendar > button")
    await page.getByRole('menuitem', { name: 'Main Test Calendat' }).click();
    // await page.getByRole('button', { name: '2nd Test Calendar', exact: true }).click();
    // await page.getByRole('menuitem', { name: '2nd Test Calendar' }).click();

    // // Guests
    // await page.getByText('Add guestsGuests').click();
    // await page.getByRole('textbox', { name: 'Add guests' }).fill('jennydurana@gmail.com');

    // Location
    await page.getByRole('textbox', { name: 'Add location' }).fill('Cav');
    await page.getByRole('menuitem', { name: /^Cavallino/ }).click();

    // Description
    await page.getByRole('textbox', { name: 'Description' }).fill(description);

    // Submit
    await page.getByRole('button', { name: 'Create Event' }).click();
    await page.waitForTimeout(800);
    // Assert success message
    await expect(page.getByRole('alert').last()).toHaveText(/Event created successfully/, { timeout: 10000 });


}

async function validateAllDayEvent(page, { eventName, description }) {
    // Wait until the event appears
    const calendarEvent = page.locator('#E-20250904');
    await expect(calendarEvent).toBeVisible({ timeout: 10000 });
    await calendarEvent.click();

    // Open event details
    await expect(async () => {
        await page.getByRole('button', { name: new RegExp(eventName) }).last().click();
    }).toPass({ timeout: 20000 });
    // await page.getByRole('button', { name: `${eventName} Sep 4, All` }, { timeout: 30000 }).first().click();

    // Validate details
    const modal = page.locator('#view-event-modal');
    await expect(modal).toContainText(eventName, { timeout: 10000 });
    await expect(modal).toContainText(description);
    await expect(modal).toContainText('Sep 4, All');
}


async function addReccurringEvent(page, { eventName, description, startDate, endDate, allDay, repeat }) {
    // Open "Add Event"
    const addEventBtn = page.locator('button.btn-add-event');
    await addEventBtn.waitFor({ state: 'visible' });
    await addEventBtn.click();

    // Fill Event Name
    await page.getByRole('textbox', { name: 'Name' }).fill(eventName);

    // All Day
    if (allDay) {
        await page.getByLabel("All Day").click()
    }

    // Select Start Date
    await page.locator('.has-icon').first().click();
    await page.getByRole('option', { name: `Choose ${startDate}` }).click();

    // Select End Date
    await page.locator('div:nth-child(3) > .react-datepicker-wrapper > .react-datepicker__input-container > .has-icon').click();
    await page.getByRole('option', { name: `Choose ${endDate}` }).click();

    // Repeat
    await page.getByRole('button', { name: 'Does not Repeat' }).click();
    await page.getByRole('menuitem', { name: repeat }).click();

    // Organizer
    await page.click("#input-calendar > button");
    await page.getByRole('menuitem', { name: /jennydurana@gmail.com/ }).click();
    // await page.click("#input-calendar > button");
    // await page.getByRole('menuitem', { name: /markchristiandurana75@gmail/ }).click();

    // Category
    // await page.locator('#dropdown-category').getByRole('button').click();
    // const categoryOption = page.getByRole('menuitem', { name: 'Purple category' });
    // await expect(categoryOption).toBeVisible();
    // await categoryOption.click();

    // Calendar
    await page.click("#input-sub-calendar > button")
    await page.getByRole('menuitem', { name: 'Main Test Calendat' }).click();
    // await page.getByRole('button', { name: '2nd Test Calendar', exact: true }).click();
    // await page.getByRole('menuitem', { name: '2nd Test Calendar' }).click();

    // Guests
    await page.getByText('Add guestsGuests').click();
    await page.getByRole('textbox', { name: 'Add guests' }).fill('jennydurana@gmail.com');

    // Location
    await page.getByRole('textbox', { name: 'Add location' }).fill('Cav');
    await page.getByRole('menuitem', { name: 'Cavallino-Treporti,' }).click();

    // Description
    await page.getByRole('textbox', { name: 'Description' }).fill(description);

    // Submit
    await page.getByRole('button', { name: 'Create Event' }).click();
    await page.waitForTimeout(800);
    // Assert success message
    await expect(page.getByRole('alert').last()).toHaveText(/Event created successfully/, { timeout: 10000 });


}

async function EditAllDayEvent(page, { eventName, description, newName, startDate, endDate, allDay }) {
    const calendarEvent = page.locator('#E-20250904');
    await expect(calendarEvent).toBeVisible({ timeout: 10000 });
    await calendarEvent.click();

    // Open event details
    await page.getByRole('button', { name: new RegExp(eventName) }).last().click();
    await page.waitForTimeout(2000);
    await page.locator('#view-event-modal').getByRole('button').filter({ hasText: 'Loading...' }).first().click();
    await page.getByRole('textbox', { name: 'Name' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('');
    await page.getByRole('textbox', { name: 'Name' }).fill(newName);
    await page.locator('.has-icon').first().click();
    await page.getByRole('option', { name: `Choose ${startDate}` }).click();
    if (allDay) {
        await page.getByLabel("All Day").click()
    }

    await page.getByRole('button', { name: 'Update Event' }).click();
    // Assert success message
    await expect(page.getByText('Event updated successfully')).toBeVisible();
}

async function validateEditedAllDayEvent(page, { newName, description }) {
    // Wait until the event appears
    const calendarEvent = page.locator('#E-20250906');
    await expect(calendarEvent).toBeVisible({ timeout: 10000 });
    await calendarEvent.click();

    // Open event details
    await page.getByRole('button', { name: new RegExp(newName) }).last().click();
    // await page.getByRole('button', { name: `${newName} Sep 5 - 6, All` }).first().click();

    // Validate details
    const modal = page.locator('#view-event-modal');
    await expect(modal).toContainText(newName);
    await expect(modal).toContainText(description);
    // await expect(modal).toContainText('Sep 4, All');
}

async function EditMultiEvent(page, { eventName, description, newName, startDate, endDate, allDay }) {
    const calendarEvent = page.locator('#E-20250904');
    await expect(calendarEvent).toBeVisible({ timeout: 10000 });
    await calendarEvent.click();

    // Open event details
    await page.getByRole('button', { name: new RegExp(eventName) }).last().click();;
    await page.waitForTimeout(1000);
    await page.locator('#view-event-modal').getByRole('button').filter({ hasText: 'Loading...' }).first().click();
    await page.getByRole('textbox', { name: 'Name' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('');
    await page.getByRole('textbox', { name: 'Name' }).fill(newName);
    // All Day
    if (allDay) {
        await page.getByLabel("All Day").click()
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

async function validateMultiEvent(page, { newName, description }) {
    // Wait until the event appears
    const calendarEvent = page.locator('#E-20250906');
    await expect(calendarEvent).toBeVisible({ timeout: 10000 });
    await calendarEvent.click();

    // Open event details
    await page.getByRole('button', { name: new RegExp(newName) }).last().click();

    // Validate details
    const modal = page.locator('#view-event-modal');
    await expect(modal).toContainText(newName);
    await expect(modal).toContainText(description);
    // await expect(modal).toContainText('Sep 4, All');
}
async function EditReccurringEvent(page, { eventName, description, newName, startDate, endDate, allDay, repeat }) {
    const calendarEvent = page.locator('#E-20250904'); // <-- adjust locator if eventId changes
    await expect(calendarEvent).toBeVisible({ timeout: 10000 });
    await calendarEvent.click();
    await page.waitForTimeout(10000);
    // Open event details
    await page.getByRole('button', { name: `${eventName} Sep 4 - 5, All` }, { timeout: 10000 }).first().click();
    await page.waitForTimeout(1000);

    // Edit event name
    await page.locator('#view-event-modal').getByRole('button').filter({ hasText: 'Loading...' }).first().click();
    await page.getByRole('textbox', { name: 'Name' }).fill('');
    await page.getByRole('textbox', { name: 'Name' }).fill(newName);

    // All Day
    if (allDay) {
        await page.getByLabel("All Day").click()
    }

    // Start Date
    await page.locator('.has-icon').first().click();
    await page.getByRole('option', { name: `Choose ${startDate}` }).click();

    // End Date
    await page.locator('div:nth-child(3) > .react-datepicker-wrapper > .react-datepicker__input-container > .has-icon').click();
    await page.getByRole('option', { name: `Choose ${endDate}` }).click();

    // Description
    await page.getByRole('textbox', { name: 'Description' }).fill(description);

    // Update Event
    await page.getByRole('button', { name: 'Update Event' }).click();

    // Assert success
    await expect(page.getByText('Event updated successfully')).toBeVisible();
}



module.exports = {
    switchView,
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

};
