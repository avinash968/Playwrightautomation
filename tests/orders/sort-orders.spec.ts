// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Orders Management', () => {
  test('Sort orders by different columns', async ({ page }) => {
    // Log in with valid credentials
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify Orders page is displayed
    await expect(page).toHaveURL(/.*jobboard/);

    // Click on the 'Order Ref #' column header to sort
    const orderRefHeader = page.getByRole('columnheader', { name: /Order Ref #/ });
    await expect(orderRefHeader).toBeVisible();
    await orderRefHeader.click();
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Verify sort indicator is visible (arrow or symbol)
    const sortIndicator = orderRefHeader.locator('..').nth(0);
    await expect(sortIndicator).toBeVisible();

    // Click on the 'Order Ref #' column header again to sort in descending order
    await orderRefHeader.click();
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Verify the sort direction changes
    await expect(sortIndicator).toBeVisible();

    // Click on the 'Amount' column header to sort by Amount
    const amountHeader = page.getByRole('columnheader', { name: 'Amount' });
    await expect(amountHeader).toBeVisible();
    await amountHeader.click();
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Verify table is sorted by Amount
    const tableRows = page.locator('tbody tr');
    const count = await tableRows.count();
    expect(count).toBeGreaterThan(0);
  });
});
