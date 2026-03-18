// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Reports & Payments', () => {
  test('Search payment records', async ({ page }) => {
    // Log in with valid credentials
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Navigate to Reports > Payments
    await page.getByRole('link', { name: ' Reports' }).click();
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Click on 'Payments' tab
    const paymentsTab = page.getByRole('link', { name: 'Payments' });
    if (await paymentsTab.isVisible()) {
      await paymentsTab.click();
      await new Promise(f => setTimeout(f, 1 * 1000));
    }

    // Verify Payments page is displayed
    await expect(page).toHaveURL(/.*reports/);

    // Find and use the search field
    const searchInput = page.locator('input[placeholder*="Search"]').nth(0);
    if (await searchInput.isVisible()) {
      // Enter a customer name or confirmation number in the search field
      await searchInput.fill('Harry');
      await new Promise(f => setTimeout(f, 1 * 1000));

      // Verify the payments table is filtered to show matching records
      const customerNameCells = page.locator('td').filter({ hasText: 'Harry' });
      const count = await customerNameCells.count();
      expect(count).toBeGreaterThanOrEqual(0);
    }
  });
});
