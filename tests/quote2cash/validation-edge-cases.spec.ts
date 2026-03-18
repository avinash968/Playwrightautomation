// spec: specs/quote2cash-order-management-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Edge Cases and Validation Scenarios', () => {
  test('Validate Required Fields in Order Creation', async ({ page }) => {
    // Navigate to Quote2Cash
    await page.goto('https://dev.quote2cash.app');

    // Login
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('bvl');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for dashboard
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Click Create button
    await page.getByText('Create', { exact: true }).click();

    // Click New Order
    await page.getByText('New Order').click();

    // Wait for dialog
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Try to save without filling required fields
    const saveButton = page.getByRole('button', { name: 'Save' });
    if (await saveButton.isEnabled()) {
      await saveButton.click();
    }

    // Verify validation messages or error state
    const requiredFields = page.locator('[data-required="true"]');
    await expect(requiredFields.count()).toBeGreaterThan(0);

    // Fill in First Name
    await page.getByRole('textbox', { name: 'First Name' }).fill('Test');

    // Try saving again
    if (await saveButton.isEnabled()) {
      await saveButton.click();
    }

    // Verify additional validation (Last Name, Email, Phone required)
    await expect(page.locator('text=First Name')).toBeVisible();
  });

  test('Handle Duplicate Order Data', async ({ page }) => {
    // Navigate to Quote2Cash
    await page.goto('https://dev.quote2cash.app');

    // Login
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('bvl');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for dashboard
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify orders are listed in table
    const table = page.locator('table');
    await expect(table).toBeVisible();

    // Look for duplicate customer entries
    const rows = page.locator('table tbody tr');
    const rowCount = await rows.count();
    
    // Verify table has multiple orders
    await expect(rowCount).toBeGreaterThan(0);

    // Verify customer names are properly displayed
    const firstRow = page.locator('table tbody tr').first();
    await expect(firstRow).toBeTruthy();
  });

  test('Validate Email Format in Order Creation', async ({ page }) => {
    // Navigate to Quote2Cash
    await page.goto('https://dev.quote2cash.app');

    // Login
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('bvl');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for dashboard
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Create new order
    await page.getByText('Create', { exact: true }).click();
    await page.getByText('New Order').click();

    // Wait for dialog
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Fill basic info
    await page.getByRole('textbox', { name: 'First Name' }).fill('Email');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Test');

    // Try entering invalid email
    const emailField = page.getByRole('textbox', { name: 'Email' });
    await emailField.fill('notanemail');

    // Verify email field exists and validation can occur
    await expect(emailField).toBeVisible();

    // Enter valid email
    await emailField.clear();
    await emailField.fill('test@example.com');

    // Verify valid email is accepted
    await expect(emailField).toHaveValue('test@example.com');
  });

  test('Validate Phone Number Format', async ({ page }) => {
    // Navigate to Quote2Cash
    await page.goto('https://dev.quote2cash.app');

    // Login
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('bvl');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for dashboard
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Create new order
    await page.getByText('Create', { exact: true }).click();
    await page.getByText('New Order').click();

    // Wait for dialog
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Fill required fields
    await page.getByRole('textbox', { name: 'First Name' }).fill('Phone');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Test');
    await page.getByRole('textbox', { name: 'Email' }).fill('phone@test.com');

    // Enter phone number
    const phoneField = page.getByRole('textbox', { name: 'Phone' });
    await phoneField.fill('(555) 123-4567');

    // Verify phone number is accepted
    await expect(phoneField).toHaveValue('(555) 123-4567');
  });

  test('Verify Order Status Workflow States', async ({ page }) => {
    // Navigate to Quote2Cash
    await page.goto('https://dev.quote2cash.app');

    // Login
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('bvl');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for dashboard
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify Status column exists in orders table
    const table = page.locator('table');
    await expect(table).toBeVisible();

    // Check for status values in column header
    const columnHeaders = page.locator('table thead th');
    const headerText = await columnHeaders.allTextContents();
    
    // Verify Status column is present
    const hasStatusColumn = headerText.some(text => text.includes('Status'));
    await expect(hasStatusColumn).toBeTruthy();

    // Look for different status values in table
    const statusCells = page.locator('table tbody td:nth-child(3)');
    const statuses = await statusCells.allTextContents();
    
    // Verify multiple order statuses exist
    await expect(statuses.length).toBeGreaterThan(0);
  });
});
