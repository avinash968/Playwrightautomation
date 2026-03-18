// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Customers Management', () => {
  test('Search for a specific customer', async ({ page }) => {
    // Log in with valid credentials
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Navigate to Customers page
    await page.getByRole('link', { name: ' Customers' }).click();
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify Customers page is displayed
    await expect(page).toHaveURL(/.*customers/);

    // Find and use the search field
    const searchInput = page.locator('input[placeholder*="Search"]').nth(0);
    if (await searchInput.isVisible()) {
      // Click on the search field and enter a customer name
      await searchInput.fill('Mohanraj');
      await new Promise(f => setTimeout(f, 1 * 1000));

      // Verify the customers table is filtered to show matching customers
      const customerNameCells = page.locator('td').filter({ hasText: 'Mohanraj' });
      const count = await customerNameCells.count();
      expect(count).toBeGreaterThan(0);

      // Verify customers with 'Mohanraj' in their name are displayed
      await expect(customerNameCells.nth(0)).toBeVisible();
    }
  });
});
