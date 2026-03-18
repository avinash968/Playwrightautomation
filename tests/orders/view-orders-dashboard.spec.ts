// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Orders Management', () => {
  test('View all orders on dashboard', async ({ page }) => {
    // Log in with valid credentials (BVL/demo)
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify the Orders/Jobboard page is displayed
    await expect(page).toHaveURL(/.*jobboard/);
    await expect(page).toHaveTitle('Quote2Cash - Orders');

    // Verify a table is displayed with multiple orders
    const ordersTable = page.getByRole('table').first();
    await expect(ordersTable).toBeVisible();

    // Verify Order columns are present
    await expect(page.getByRole('columnheader', { name: /Order Ref #/ })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Customer Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Status' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Account Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /Phone #/ })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Created Date' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Amount' })).toBeVisible();

    // Verify total order count is displayed
    const totalOrdersText = page.locator('text=/Total Orders/');
    await expect(totalOrdersText).toBeVisible();

    // Verify multiple orders with various statuses are visible
    const quoteOrders = page.locator('text=Quote').nth(0);
    await expect(quoteOrders).toBeVisible();
    
    const inStorageOrders = page.locator('text=In Storage').nth(0);
    await expect(inStorageOrders).toBeVisible();
  });
});
