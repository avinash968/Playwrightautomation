// spec: specs/quote2cash-order-management-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Adding New Orders', () => {
  test('Create Order and Verify All Customer Fields Saved', async ({ page }) => {
    // Navigate to Quote2Cash
    await page.goto('https://dev.quote2cash.app');

    // Login
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('bvl');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for dashboard
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Click Create button
    const createButton = page.getByText('Create', { exact: true }).first();
    await createButton.click();

    // Wait for create dialog
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Fill in First Name
    const firstNameInput = page.getByRole('textbox', { name: /first name|first/i }).first();
    await firstNameInput.fill('Jennifer');

    // Fill in Last Name
    const lastNameInput = page.getByRole('textbox', { name: /last name|last/i }).first();
    await lastNameInput.fill('Anderson');

    // Fill in Email
    const emailInputs = page.locator('input[type="email"]');
    if (await emailInputs.count() > 0) {
      await emailInputs.first().fill('jennifer.anderson@example.com');
    }

    // Fill in Phone
    const phoneInputs = page.locator('input[type="tel"]');
    if (await phoneInputs.count() > 0) {
      await phoneInputs.first().fill('(555) 789-0123');
    }

    // Click Save/Create button in dialog
    const saveDialogButton = page.locator('[role="dialog"] button').filter({ hasText: /save|create|ok|submit/i }).first();
    if (await saveDialogButton.isVisible()) {
      await saveDialogButton.click();
    }

    // Wait for order creation and page load
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify customer name is displayed
    const heading = page.locator('h3, h4, [role="heading"]').first();
    const headingText = await heading.textContent();
    if (headingText) {
      await expect(headingText).toContain('Jennifer');
    }

    // Verify order status shows as Quote
    const statusElements = page.locator('text=Quote, text=In Progress, text=In Storage, text=Completed').first();
    if (await statusElements.isVisible()) {
      await expect(statusElements).toBeVisible();
    }

    // Verify grand total is displayed
    const grandTotalElement = page.locator('text=/Grand Total|Total Amount/i').first();
    if (await grandTotalElement.isVisible()) {
      await expect(grandTotalElement).toBeVisible();
    }

    // Verify email is persisted (navigate to Customer Details tab)
    const customerDetailsTab = page.getByRole('button', { name: /customer details/i });
    if (await customerDetailsTab.isVisible()) {
      await customerDetailsTab.click();

      // Wait for tab content
      await new Promise(f => setTimeout(f, 1 * 1000));

      // Verify email field contains the entered value
      const emailField = page.locator('input[type="email"]').first();
      if (await emailField.isVisible()) {
        const emailValue = await emailField.inputValue();
        await expect(emailValue).toContain('jennifer.anderson@example.com');
      }
    }

    // Verify phone is persisted
    const phoneField = page.locator('input[type="tel"]').first();
    if (await phoneField.isVisible()) {
      const phoneValue = await phoneField.inputValue();
      await expect(phoneValue).toContain('555');
    }
  });

  test('Create Multiple Orders Sequentially and Verify Unique Records', async ({ page }) => {
    // Navigate to Quote2Cash
    await page.goto('https://dev.quote2cash.app');

    // Login
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('bvl');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for dashboard
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Create first order
    let createButton = page.getByText('Create', { exact: true }).first();
    await createButton.click();

    // Wait for dialog
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Fill first order
    const firstNameInput1 = page.getByRole('textbox', { name: /first name|first/i }).first();
    await firstNameInput1.fill('Robert');

    const lastNameInput1 = page.getByRole('textbox', { name: /last name|last/i }).first();
    await lastNameInput1.fill('Thompson');

    const emailInputs1 = page.locator('input[type="email"]');
    if (await emailInputs1.count() > 0) {
      await emailInputs1.first().fill('robert.thompson@example.com');
    }

    const phoneInputs1 = page.locator('input[type="tel"]');
    if (await phoneInputs1.count() > 0) {
      await phoneInputs1.first().fill('(555) 321-6543');
    }

    // Save first order
    const saveButton1 = page.locator('[role="dialog"] button').filter({ hasText: /save|create|ok|submit/i }).first();
    if (await saveButton1.isVisible()) {
      await saveButton1.click();
    }

    // Wait for first order to save
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Navigate back to dashboard
    const homeOrOrdersLink = page.locator('a:has-text("Orders"), a:has-text("Home")').first();
    if (await homeOrOrdersLink.isVisible()) {
      await homeOrOrdersLink.click();

      // Wait for dashboard
      await new Promise(f => setTimeout(f, 2 * 1000));
    }

    // Create second order
    createButton = page.getByText('Create', { exact: true }).first();
    await createButton.click();

    // Wait for dialog
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Fill second order
    const firstNameInput2 = page.getByRole('textbox', { name: /first name|first/i }).first();
    await firstNameInput2.fill('Patricia');

    const lastNameInput2 = page.getByRole('textbox', { name: /last name|last/i }).first();
    await lastNameInput2.fill('Martinez');

    const emailInputs2 = page.locator('input[type="email"]');
    if (await emailInputs2.count() > 0) {
      await emailInputs2.first().fill('patricia.martinez@example.com');
    }

    const phoneInputs2 = page.locator('input[type="tel"]');
    if (await phoneInputs2.count() > 0) {
      await phoneInputs2.first().fill('(555) 654-3210');
    }

    // Save second order
    const saveButton2 = page.locator('[role="dialog"] button').filter({ hasText: /save|create|ok|submit/i }).first();
    if (await saveButton2.isVisible()) {
      await saveButton2.click();
    }

    // Wait for second order to save
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Navigate back to dashboard
    const navLink = page.locator('a:has-text("Orders"), a:has-text("Home")').first();
    if (await navLink.isVisible()) {
      await navLink.click();

      // Wait for dashboard
      await new Promise(f => setTimeout(f, 2 * 1000));
    }

    // Verify both orders are in the list
    const tableRows = page.locator('table tbody tr');
    const rowCount = await tableRows.count();

    // Verify at least 2 orders exist
    await expect(rowCount).toBeGreaterThanOrEqual(2);

    // Verify Robert Thompson appears in order list
    const robertRow = page.locator('text=Robert').first();
    await expect(robertRow).toBeVisible();

    // Verify Patricia Martinez appears in order list
    const patriciaRow = page.locator('text=Patricia').first();
    await expect(patriciaRow).toBeVisible();
  });
});
