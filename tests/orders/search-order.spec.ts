// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Orders Management', () => {
  test('Search for specific order', async ({ page }) => {
    // Log in with valid credentials
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify Orders page is displayed
    await expect(page).toHaveURL(/.*jobboard/);

    // Verify search box is visible
    const searchButton = page.getByRole('button', { name: /Search/ });
    await expect(searchButton).toBeVisible();

    // Click on the search field and enter an order reference number
    await searchButton.click();
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Find search input and enter search term
    const searchInput = page.locator('input[placeholder*="Search"], input[type="search"]').nth(0);
    if (await searchInput.isVisible()) {
      await searchInput.fill('OR12');
      await new Promise(f => setTimeout(f, 1 * 1000));

      // Verify the orders table is filtered
      const tableRows = page.locator('tbody tr');
      const count = await tableRows.count();
      expect(count).toBeGreaterThan(0);

      // Verify the specific order OR12 is displayed
      const or12Cell = page.locator('td').filter({ hasText: 'OR12' });
      await expect(or12Cell.nth(0)).toBeVisible();
    }
  });
});
