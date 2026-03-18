// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Permanent Storage Billing - Complete End-to-End Workflow', () => {
  test('Create Order with Permanent Storage and Validate Active Pricing', async ({ page }) => {
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

    // Click Create button to create new order
    await page.getByText('Create', { exact: true }).click();

    // Click on New Order option
    await page.getByText('New Order').click();

    // Enter customer details: First Name, Last Name, Email, Phone
    await page.getByRole('textbox', { name: 'First Name' }).fill('Robert');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Johnson');
    await page.getByRole('textbox', { name: 'Email' }).fill('robert.johnson@example.com');
    await page.getByRole('textbox', { name: 'Phone' }).fill('(555) 123-4567');

    // Click Save button to create the order
    await page.getByRole('button', { name: 'Save' }).click();

    // Wait for order details page to load
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Press Escape to close any modal
    await page.keyboard.press('Escape');

    // Click on Robert Johnson Quote order row to open details
    await page.getByRole('row', { name: 'None Robert Johnson Quote' }).click();

    // Wait for order details page to load
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Click Add Rate button
    await page.getByRole('button', { name: '+ Add Rate', exact: true }).click();

    // Wait for rate selection dialog to appear
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Click on Recurring Storage Billing option
    await page.getByText('Recurring Storage Billing').click();

    // Click Select button to proceed
    await page.getByRole('button', { name: 'Select' }).click();

    // Click Billing Type dropdown
    await page.getByRole('button', { name: 'Select an option' }).first().click();

    // Click Perm Storage option
    await page.locator('a').filter({ hasText: 'Perm Storage' }).click();

    // Enter Billing Start Date as 02-27-2026
    await page.locator('#startDate_date').fill('02-27-2026');

    // Click Location dropdown
    await page.getByRole('button', { name: 'Select an option' }).first().click();

    // Select CASC location
    await page.locator('a').filter({ hasText: 'CASC -' }).click();

    // Enter Weight as 1500 lbs
    await page.locator('#originlbsweight').fill('1500');

    // Enter Daily Rate as 5.00
    await page.getByRole('textbox', { name: '0.00' }).fill('5.00');

    // Click on Bill To dropdown
    await page.getByRole('button', { name: 'Select an option' }).click();

    // Select Account from Bill To dropdown
    await page.locator('a').filter({ hasText: /^Account$/ }).click();

    // Click Account Name dropdown to select account
    await page.getByRole('button', { name: 'Select an option' }).first().click();

    // Select the Aaversal Global Relocation - Bureau of Census - Domestic account
    await page.locator('a').filter({ hasText: 'Aaversal Global Relocation - Bureau of Census - Domestic' }).click();

    // Click Yes to confirm account assignment warning
    await page.getByRole('button', { name: 'Yes' }).click();

    // Fill Auth Days with 30
    await page.locator('#originlbsauthDays').fill('30');

    // Enable Bill to Shipper after Auth Days checkbox
    const checkbox = await page.locator('#billToShipperAfterAuthDays');
    const isChecked = await checkbox.isChecked();
    if (!isChecked) {
      await checkbox.click();
    }

    // Click Add More button to add additional charges
    const addMoreBtn = await page.getByText('Add More').first();
    await addMoreBtn.click();

    // Enter Delivery Fee in Line Item Name field
    await page.locator('#lineItemName_0').fill('Delivery Fee');

    // Open Frequency dropdown to select Recurring
    await page.getByRole('button', { name: 'Select Type' }).first().click();

    // Select Recurring from Frequency dropdown
    await page.getByRole('menu').locator('a').filter({ hasText: 'Recurring' }).click();

    // Open Type of Charge dropdown to select Add to Total
    await page.getByRole('button', { name: 'Select Type' }).click();

    // Select Add to Total from Type of Charge dropdown
    await page.getByRole('menu').locator('a').filter({ hasText: 'Add to Total' }).click();

    // Enter 50.00 as the delivery fee charge amount
    await page.getByRole('cell', { name: '$' }).getByPlaceholder('0.00').fill('50');

    // Click Calculate button to compute storage billing total
    const calculateBtn = await page.locator('button:has-text("Calculate")');
    await calculateBtn.click();

    // Click Apply button to apply storage billing configuration
    await page.getByRole('button', { name: 'Apply' }).click();

    // Click Yes to update order status to In Storage
    await page.getByRole('button', { name: 'Yes' }).click();

    // Verify Storage Billing tab shows Active status and correct pricing
    const storageBillingTab = page.getByRole('tab', { name: /Storage Billing.*Ongoing.*Active/ });
    await expect(storageBillingTab).toBeVisible();

    // Verify pricing calculation: 28 days × $5.00 + $50.00 delivery = $2,150.00
    const billAmount = page.getByText('Bill: #1 (02/27/2026 - 03/26/2026) Current Bill $2,150.00');
    await expect(billAmount).toBeVisible();

    // Verify Perm Storage Charges line item
    const permStorageCharges = page.getByText('Perm Storage Charges');
    await expect(permStorageCharges).toBeVisible();

    // Verify Delivery Fee line item
    const deliveryFee = page.getByText('Delivery Fee');
    await expect(deliveryFee).toBeVisible();

    // Verify total monthly charges
    const totalCharges = page.getByText('Total Monthly Charges $2,150.00');
    await expect(totalCharges).toBeVisible();

    // Verify Order Status has been updated to In Storage
    const statusTab = page.getByRole('tab', { name: /Status \(In Storage\)/ });
    await expect(statusTab).toBeVisible();
  });
});
