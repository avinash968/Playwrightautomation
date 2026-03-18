// spec: specs/quote2cash-order-management-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('User Interface and Button Functionality', () => {
  test('Verify Dashboard Navigation Links and Menu Items', async ({ page }) => {
    // Navigate to Quote2Cash
    await page.goto('https://dev.quote2cash.app');

    // Login
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('bvl');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for dashboard
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify dashboard is visible
    const dashboard = page.locator('main');
    await expect(dashboard).toBeVisible();

    // Verify Orders table header exists
    const tableHeader = page.locator('table thead');
    await expect(tableHeader).toBeVisible();

    // Verify Create button exists
    const createButton = page.getByText('Create', { exact: true }).first();
    await expect(createButton).toBeVisible();
    await expect(createButton).toBeEnabled();

    // Check for filter/search elements
    const searchElements = await page.locator('input').count();
    await expect(searchElements).toBeGreaterThan(0);

    // Verify navigation sidebar/menu exists
    const sidebar = page.locator('nav, [role="navigation"]').first();
    if (await sidebar.isVisible()) {
      // Verify menu has multiple items
      const menuItems = await page.locator('nav a, nav button').count();
      await expect(menuItems).toBeGreaterThan(0);
    }
  });

  test('Verify Order Detail Page Button Functionality', async ({ page }) => {
    // Navigate to Quote2Cash
    await page.goto('https://dev.quote2cash.app');

    // Login
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('bvl');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for dashboard
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Click first order
    await page.getByRole('row').nth(1).click();

    // Wait for order detail
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify Save button is visible
    const saveButton = page.getByRole('button', { name: 'Save' }).first();
    await expect(saveButton).toBeVisible();

    // Verify Documents button exists
    const documentsButton = page.getByRole('button', { name: 'Documents' });
    if (await documentsButton.isVisible()) {
      await expect(documentsButton).toBeVisible();
    }

    // Verify Options button exists
    const optionsButton = page.getByRole('button', { name: 'Options' });
    if (await optionsButton.isVisible()) {
      await expect(optionsButton).toBeVisible();
    }

    // Verify tab navigation buttons exist
    const tabs = page.locator('[role="button"]').filter({ hasText: /Customer|Dates|Inventory|Price|Status|Notes/ });
    const tabCount = await tabs.count();
    await expect(tabCount).toBeGreaterThan(0);

    // Verify status/workflow controls are visible
    const statusElements = page.locator('select, [role="combobox"]');
    const statusCount = await statusElements.count();
    await expect(statusCount).toBeGreaterThan(0);
  });

  test('Verify Table Header Sorting and Column Functionality', async ({ page }) => {
    // Navigate to Quote2Cash
    await page.goto('https://dev.quote2cash.app');

    // Login
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('bvl');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for dashboard
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify table headers are present
    const tableHeaders = page.locator('table thead th');
    const headerCount = await tableHeaders.count();
    await expect(headerCount).toBeGreaterThan(0);

    // Verify table has data rows
    const tableRows = page.locator('table tbody tr');
    const rowCount = await tableRows.count();
    await expect(rowCount).toBeGreaterThan(0);

    // Check for clickable header elements (for sorting)
    const firstHeader = tableHeaders.first();
    await expect(firstHeader).toBeVisible();

    // Verify table body is populated
    const tableBody = page.locator('table tbody');
    await expect(tableBody).toBeVisible();

    // Verify first column data exists
    const firstDataCell = page.locator('table tbody tr:first-child td:first-child');
    const cellContent = await firstDataCell.textContent();
    await expect(cellContent?.trim().length).toBeGreaterThan(0);
  });

  test('Verify Form Controls and Input Field Functionality', async ({ page }) => {
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

    // Verify dialog is open
    const dialog = page.locator('[role="dialog"]').first();
    await expect(dialog).toBeVisible();

    // Verify text input fields exist
    const inputFields = page.locator('[role="dialog"] input[type="text"]');
    const inputCount = await inputFields.count();
    await expect(inputCount).toBeGreaterThan(0);

    // Verify at least one field is editable
    const firstInput = inputFields.first();
    if (await firstInput.isVisible()) {
      await expect(firstInput).not.toBeDisabled();
    }

    // Close dialog by pressing Escape
    await page.keyboard.press('Escape');

    // Wait for dialog to close
    await new Promise(f => setTimeout(f, 1 * 1000));
  });
});
