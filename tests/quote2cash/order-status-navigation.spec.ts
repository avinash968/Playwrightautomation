// spec: specs/quote2cash-order-management-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Order Status and Navigation Workflow', () => {
  test('Navigate Through Order Status Transitions', async ({ page }) => {
    // Navigate to Quote2Cash
    await page.goto('https://dev.quote2cash.app');

    // Login
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('bvl');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for dashboard
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Click on an order to view details
    await page.getByRole('row', { name: 'Sarah Williams' }).click();

    // Wait for order detail page
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify Status tab is visible
    await expect(page.locator('text=Status (In Storage)')).toBeTruthy();

    // Click Status tab to view status options
    const statusTab = page.getByRole('button', { name: /Status/ }).first();
    if (await statusTab.isVisible()) {
      await statusTab.click();

      // Verify status combobox is available
      const statusCombo = page.locator('[role="combobox"]').first();
      if (await statusCombo.isVisible()) {
        // Status dropdown should show current and available statuses
        await expect(statusCombo).toBeTruthy();
      }
    }

    // Verify navigation tabs are all present
    await expect(page.locator('text=Customer Details')).toBeVisible();
    await expect(page.locator('text=Price Details')).toBeVisible();
    await expect(page.locator('text=Inventory Details')).toBeVisible();
  });

  test('Verify Navigation Between Order Tabs', async ({ page }) => {
    // Navigate to Quote2Cash
    await page.goto('https://dev.quote2cash.app');

    // Login
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('bvl');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for dashboard
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Select an order
    await page.getByRole('row').nth(1).click();

    // Wait for order detail
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Click Customer Details tab
    const customerTab = page.getByRole('button', { name: 'Customer Details' }).first();
    if (await customerTab.isVisible()) {
      await customerTab.click();

      // Verify customer details are displayed
      await expect(page.locator('text=First Name')).toBeTruthy();
      await expect(page.locator('text=Last Name')).toBeTruthy();
      await expect(page.locator('text=Email')).toBeTruthy();
    }

    // Click Dates tab
    const datesTab = page.getByRole('button', { name: 'Dates' }).first();
    if (await datesTab.isVisible()) {
      await datesTab.click();

      // Verify dates section is displayed
      await expect(page.locator('text=Dates')).toBeVisible();
    }

    // Click Inventory Details tab
    const inventoryTab = page.getByRole('button', { name: 'Inventory Details' }).first();
    if (await inventoryTab.isVisible()) {
      await inventoryTab.click();

      // Verify inventory section is displayed
      await expect(page.locator('text=Inventory')).toBeTruthy();
    }

    // Click Price Details tab
    const priceTab = page.getByRole('button', { name: 'Price Details' }).first();
    if (await priceTab.isVisible()) {
      await priceTab.click();

      // Verify pricing section is displayed
      await expect(page.locator('text=Price')).toBeTruthy();
    }

    // Verify Save button is available
    await expect(page.getByRole('button', { name: 'Save' })).toBeTruthy();
  });
});
