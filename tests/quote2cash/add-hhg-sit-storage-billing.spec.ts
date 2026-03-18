// spec: specs/quote2cash-order-management-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Order Price Management - Recurring Storage Billing', () => {
  test('Add HHG Storage Billing', async ({ page }) => {
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

    // Click on Michael Johnson order to use for HHG pricing test
    await page.getByRole('row', { name: 'Michael Johnson' }).first().click();

    // Wait for order detail page to load
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Click Price Details tab to expand it
    await page.getByRole('button', { name: 'Price Details + Add Rate  $' }).click();

    // Click Add Rate button
    await page.getByRole('button', { name: '+ Add Rate', exact: true }).click();

    // Wait for rate dialog to appear
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Select HHG option from pricing selection
    await page.getByRole('radio', { name: 'HHG' }).check();

    // Click Select button to proceed
    await page.getByRole('button', { name: 'Select' }).click();

    // Wait for HHG rate selection dialog
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Select a rate from HHG rate list (first available rate)
    const rateButtons = page.locator('button:has-text("Select")').first();
    if (await rateButtons.isVisible()) {
      await rateButtons.click();
    }

    // Wait for rate details form
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Verify HHG pricing form is displayed
    await expect(page.locator('text=HHG')).toBeVisible();

    // Verify Quote status is shown
    await expect(page.locator('text=Status (Quote)')).toBeVisible();

    // Verify Grand Total section is present
    await expect(page.locator('text=Grand Total')).toBeVisible();
  });

  test('Add SIT Storage Billing', async ({ page }) => {
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

    // Click on John Doe order to use for SIT pricing test
    await page.getByRole('row', { name: 'John Doe' }).first().click();

    // Wait for order detail page to load
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Click Price Details tab to expand it
    await page.getByRole('button', { name: 'Price Details + Add Rate  $' }).click();

    // Click Add Rate button
    await page.getByRole('button', { name: '+ Add Rate', exact: true }).click();

    // Wait for rate dialog to appear
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Select Recurring Storage Billing option
    await page.getByText('Recurring Storage Billing').click();

    // Click Select button to proceed
    await page.getByRole('button', { name: 'Select' }).click();

    // Wait for storage form to load
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Click Billing Type dropdown to select SIT
    await page.getByRole('button', { name: 'Select an option' }).first().click();

    // Wait for dropdown options
    await new Promise(f => setTimeout(f, 0.5 * 1000));

    // Select SIT option
    const sitOption = page.locator('a:has-text("SIT")').first();
    if (await sitOption.isVisible()) {
      await sitOption.click();
    }

    // Verify SIT Storage has been selected
    await expect(page.locator('text=SIT')).toBeVisible();

    // Verify Billing Cycle is set to Month
    await expect(page.locator('text=Month')).toBeVisible();

    // Verify Quote status remains unchanged
    await expect(page.locator('text=Status (Quote)')).toBeVisible();
  });
});
