// spec: specs/quote2cash-order-management-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Order Creation and Basic Workflow', () => {
  test('Add Order with Order Ref # Field', async ({ page }) => {
    // Navigate to Quote2Cash application
    await page.goto('https://dev.quote2cash.app');

    // Enter username bvl
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('bvl');

    // Enter password demo
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');

    // Click Login button
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for dashboard to load
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Click Create button
    await page.getByText('Create', { exact: true }).click();

    // Click New Order
    await page.getByText('New Order').click();

    // Enter first name Sarah
    await page.getByRole('textbox', { name: 'First Name' }).fill('Sarah');

    // Enter last name Williams
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Williams');

    // Enter email address
    await page.getByRole('textbox', { name: 'Email' }).fill('sarah.williams@example.com');

    // Enter phone number
    await page.getByRole('textbox', { name: 'Phone' }).fill('(555) 456-7890');

    // Enter Order Ref #
    await page.getByRole('textbox', { name: 'Order Ref #' }).fill('ORD-2024-0001');

    // Click Save button
    await page.getByRole('button', { name: 'Save' }).click();

    // Verify order creation success message
    await expect(page.locator('text=Order Created Successfully')).toBeVisible();

    // Click OK to visit the order detail page
    await page.getByRole('button', { name: 'Ok' }).click();

    // Wait for order detail page to fully load
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify customer name Sarah Williams is displayed on detail page
    await expect(page.locator('heading:has-text("Sarah Williams")')).toBeVisible();

    // Click Customer Details tab to view and verify customer information
    await page.getByRole('button', { name: 'Customer Details ' }).click();

    // Verify Order Ref # is saved correctly
    await expect(page.getByRole('textbox', { name: 'Order Ref #' })).toHaveValue('ORD-2024-0001');

    // Verify first name is saved correctly
    await expect(page.getByRole('textbox', { name: 'First Name' })).toHaveValue('Sarah');

    // Verify last name is saved correctly
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toHaveValue('Williams');

    // Verify email is saved correctly
    await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue('sarah.williams@example.com');

    // Verify phone is saved correctly
    await expect(page.getByRole('textbox', { name: 'Phone' })).toHaveValue('(555) 456-7890');

    // Verify order status is Quote
    await expect(page.locator('text=Status (Quote)')).toBeVisible();

    // Verify Grand Total displays $0.00
    await expect(page.locator('heading:has-text("Grand Total: $0.00")')).toBeVisible();
  });
});
