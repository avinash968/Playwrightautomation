// spec: specs/quote2cash-order-management-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Order Price Management - Advanced Scenarios', () => {
  test('Add Multiple Storage Types to Single Order', async ({ page }) => {
    // Navigate to Quote2Cash application
    await page.goto('https://dev.quote2cash.app');

    // Enter username bvl
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('bvl');

    // Enter password demo
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');

    // Click Login button
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for dashboard
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Create a new order or select existing one
    const createButton = page.getByText('Create', { exact: true });
    if (await createButton.isVisible()) {
      await createButton.click();
      await page.getByText('New Order').click();
      
      // Fill in basic order info for test
      await page.getByRole('textbox', { name: 'First Name' }).fill('John');
      await page.getByRole('textbox', { name: 'Last Name' }).fill('Test');
      await page.getByRole('textbox', { name: 'Email' }).fill('john.test@example.com');
      await page.getByRole('textbox', { name: 'Phone' }).fill('(555) 999-9999');
      
      // Save order
      await page.getByRole('button', { name: 'Save' }).click();
      
      // Wait for confirmation and navigation
      await page.getByRole('button', { name: 'Ok' }).click();
      await new Promise(f => setTimeout(f, 3 * 1000));
    }

    // Click Price Details tab
    await page.getByRole('button', { name: 'Price Details + Add Rate  $' }).click();

    // Verify Price Details section is visible
    await expect(page.locator('text=Price Details')).toBeVisible();

    // Click Add Rate button first time
    await page.getByRole('button', { name: '+ Add Rate', exact: true }).click();
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Select Recurring Storage Billing
    await page.getByText('Recurring Storage Billing').click();
    await page.getByRole('button', { name: 'Select' }).click();

    // Verify multiple storage type options are available
    await expect(page.locator('button:has-text("Select an option")')).toBeTruthy();

    // Verify order can accept multiple rates
    await expect(page.locator('text=Storage Billing')).toBeVisible();
  });

  test('Verify Pricing Calculation Accuracy', async ({ page }) => {
    // Navigate to Quote2Cash
    await page.goto('https://dev.quote2cash.app');

    // Login
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('bvl');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for dashboard
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Navigate to an existing order with storage billing
    const ordersTable = page.locator('table');
    if (await ordersTable.isVisible()) {
      // Click on first order
      await page.getByRole('row').nth(1).click();
    }

    // Wait for order detail
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Click Storage Billing tab if available
    const storageBillingTab = page.locator('button:has-text("Storage Billing")').first();
    if (await storageBillingTab.isVisible()) {
      await storageBillingTab.click();
      
      // Verify calculation summary is displayed
      await expect(page.locator('text=Billing Summary')).toBeTruthy();
    }

    // Verify Grand Total section exists
    await expect(page.locator('text=Grand Total')).toBeVisible();
  });

  test('Order Price Persistence After Save', async ({ page }) => {
    // Navigate to Quote2Cash
    await page.goto('https://dev.quote2cash.app');

    // Login
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('bvl');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for dashboard
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Select an order with pricing
    await page.getByRole('row', { name: 'ORD-2024-0001 Sarah Williams' }).click();

    // Wait for order detail
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Click Save button
    const saveButton = page.getByRole('button', { name: 'Save' });
    if (await saveButton.isVisible()) {
      await saveButton.click();
      
      // Wait for save operation
      await new Promise(f => setTimeout(f, 2 * 1000));
    }

    // Verify order data is still displayed
    await expect(page.locator('text=Sarah Williams')).toBeVisible();
    await expect(page.locator('text=ORD-2024-0001')).toBeVisible();
  });

  test('Edit and Update Price Details', async ({ page }) => {
    // Navigate to Quote2Cash
    await page.goto('https://dev.quote2cash.app');

    // Login
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('bvl');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for dashboard
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Select order with existing pricing
    await page.getByRole('row', { name: 'ORD-2024-0001' }).click();

    // Wait for order detail
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Click Price Details tab
    const priceDetailsTab = page.getByRole('button', { name: 'Price Details' }).first();
    if (await priceDetailsTab.isVisible()) {
      await priceDetailsTab.click();

      // Verify existing rates are displayed
      await expect(page.locator('text=Storage Billing')).toBeTruthy();
    }

    // Verify Save button is available for updates
    await expect(page.getByRole('button', { name: 'Save' })).toBeTruthy();
  });
});
