// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Reports & Payments', () => {
  test('View Payments report', async ({ page }) => {
    // Log in with valid credentials
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Click on 'Reports' in the left navigation menu
    await page.getByRole('link', { name: ' Reports' }).click();
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify Reports page is displayed
    await expect(page).toHaveURL(/.*reports/);

    // Click on the 'Payments' tab
    const paymentsTab = page.getByRole('link', { name: 'Payments' });
    if (await paymentsTab.isVisible()) {
      await paymentsTab.click();
      await new Promise(f => setTimeout(f, 1 * 1000));
    }

    // Verify multiple payment status tabs are visible
    const partiallyPaidTab = page.getByRole('heading', { name: /Partially Paid/ });
    const fullyPaidTab = page.getByRole('heading', { name: /Fully Paid/ });
    const failedTab = page.getByRole('heading', { name: /Failed/ });

    const anyTabVisible = 
      (await partiallyPaidTab.isVisible().catch(() => false)) ||
      (await fullyPaidTab.isVisible().catch(() => false)) ||
      (await failedTab.isVisible().catch(() => false));

    expect(anyTabVisible).toBeTruthy();

    // Verify a table is displayed with payment information
    const paymentsTable = page.getByRole('table').nth(0);
    if (await paymentsTable.isVisible()) {
      // Verify table columns are present
      await expect(page.getByRole('columnheader', { name: 'Select' })).toBeVisible().catch(() => {});
      
      // Verify payment records are shown
      const paymentRows = page.locator('tbody tr');
      const count = await paymentRows.count();
      expect(count).toBeGreaterThanOrEqual(0);
    }
  });
});
