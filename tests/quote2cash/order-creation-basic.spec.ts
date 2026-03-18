// spec: specs/quote2cash-order-management-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Order Creation and Basic Workflow', () => {
  test('Successfully Create New Order with Customer Information', async ({ page }) => {
    // Navigate to Quote2Cash application
    await page.goto('https://dev.quote2cash.app');

    // Enter username 'bvl'
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('bvl');

    // Enter password 'demo'
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');

    // Click Login button
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for login to complete and dashboard to load
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify dashboard loads with Orders list
    await expect(page).toHaveURL(/.*jobboard/);
    await expect(page).toHaveTitle(/Orders/);

    // Click Create button to open dropdown menu
    await page.getByText('Create', { exact: true }).click();

    // Click New Order to create new order
    await page.getByText('New Order').click();

    // Enter first name in the form
    await page.getByRole('textbox', { name: 'First Name' }).fill('Michael');

    // Enter last name
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Johnson');

    // Enter email address
    await page.getByRole('textbox', { name: 'Email' }).fill('michael.johnson@example.com');

    // Enter phone number
    await page.getByRole('textbox', { name: 'Phone' }).fill('(555) 234-5678');

    // Click Save button to create the order
    await page.getByRole('button', { name: 'Save' }).click();

    // Verify 'Order Created Successfully' message
    await expect(page.locator('text=Order Created Successfully')).toBeVisible();

    // Click OK button to go to order detail page
    await page.getByRole('button', { name: 'Ok' }).click();

    // Verify order detail page opens
    await expect(page).toHaveURL(/.*jobDetail/);

    // Verify customer name 'Michael Johnson' is displayed
    await expect(page.locator('heading:has-text("Michael Johnson")')).toBeVisible();

    // Verify Status shows 'Quote'
    await expect(page.locator('button:has-text("Status (Quote)")')).toBeVisible();

    // Verify Grand Total shows $0.00
    await expect(page.locator('text="Grand Total: $0.00"')).toBeVisible();

    // Verify all tabs visible
    await expect(page.locator('button:has-text("Status (Quote)")')).toBeVisible();
    await expect(page.locator('button:has-text("Dates")')).toBeVisible();
    await expect(page.locator('button:has-text("Customer Details")')).toBeVisible();
    await expect(page.locator('button:has-text("Inventory Details")')).toBeVisible();
    await expect(page.locator('button:has-text("Price Details")')).toBeVisible();
    await expect(page.locator('button:has-text("Notes")')).toBeVisible();
  });
});
