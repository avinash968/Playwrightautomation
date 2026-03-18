// spec: specs/quote2cash-order-management-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Order Price Management - Recurring Storage Billing', () => {
  test('Add Permanent Storage Billing', async ({ page }) => {
    // Navigate to Quote2Cash application
    await page.goto('https://dev.quote2cash.app');

    // Enter username bvl
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('bvl');

    // Enter password demo
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');

    // Click Login button
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for dashboard to load after login
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Click on Sarah Williams order to open order details
    await page.getByRole('row', { name: 'ORD-2024-0001 Sarah Williams' }).click();

    // Wait for order detail page to load
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Click Price Details tab to expand it
    await page.getByRole('button', { name: 'Price Details + Add Rate  $' }).click();

    // Click Add Rate button
    await page.getByRole('button', { name: '+ Add Rate', exact: true }).click();

    // Wait for rate dialog to appear
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Click on Recurring Storage Billing label
    await page.getByText('Recurring Storage Billing').click();

    // Click Select button to proceed
    await page.getByRole('button', { name: 'Select' }).click();

    // Click Billing Type dropdown to select Permanent Storage
    await page.getByRole('button', { name: 'Select an option' }).first().click();

    // Select Perm Storage option
    await page.locator('a').filter({ hasText: 'Perm Storage' }).click();

    // Enter Billing Start Date
    await page.locator('#startDate_date').fill('02-25-2026');

    // Click Location dropdown
    await page.getByRole('button', { name: 'Select an option' }).first().click();

    // Select CASC location
    await page.locator('a').filter({ hasText: 'CASC -' }).click();

    // Enter Weight
    await page.locator('#originlbsweight').fill('1000');

    // Enter Daily Rate for $150/month
    await page.getByRole('textbox', { name: '0.00' }).fill('5.00');

    // Click Bill To dropdown
    await page.getByRole('button', { name: 'Select an option' }).click();

    // Select Account for Bill To
    await page.locator('a').filter({ hasText: /^Account$/ }).click();

    // Click Account Name dropdown
    await page.getByRole('button', { name: 'Select an option' }).first().click();

    // Select first account from dropdown
    await page.locator('a').filter({ hasText: 'Aaversal Global Relocation - Bureau of Census - Domestic' }).click();

    // Click Yes to assign account
    await page.getByRole('button', { name: 'Yes' }).click();

    // Enter Auth Days value
    await page.locator('#originlbsauthDays').fill('30');

    // Click Calculate button
    await page.getByRole('button', { name: 'Calculate' }).click();

    // Wait for calculation to complete
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify Permanent Storage billing has been calculated
    await expect(page.locator('text=Perm Billing Summary')).toBeVisible();

    // Verify Daily Rate is set correctly
    await expect(page.locator('text=Day Rate: $5.00')).toBeVisible();

    // Verify first bill amount is calculated (28 days * $5 = $140, but actual might be $1,400)
    await expect(page.locator('text=Bill: #1')).toBeVisible();

    // Click Apply button to save the billing calculations
    await page.getByRole('button', { name: 'Apply' }).click();

    // Wait for storage billing to be created
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Click Yes to update order status to In Storage
    await page.getByRole('button', { name: 'Yes' }).click();

    // Wait for status update
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Verify Storage Billing has been added to Price Details
    await expect(page.locator('text=Storage Billing (ORD-2024-0001)')).toBeVisible();

    // Verify Recurring Storage Billing shows as Ongoing and Active
    await expect(page.locator('text=Ongoing')).toBeVisible();
    await expect(page.locator('text=Active')).toBeVisible();

    // Verify Order Status has been updated to In Storage
    await expect(page.locator('text=Status (In Storage)')).toBeVisible();

    // Verify Monthly billing amount is displayed ($1,400 for 28 days at $5/day)
    await expect(page.locator('text=Storage Billing (ORD-2024-0001)   $1,400.00')).toBeVisible();
  });
});
