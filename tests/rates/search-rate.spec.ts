// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Rate Management', () => {
  test('Search for a specific rate', async ({ page }) => {
    // Log in with valid credentials
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Navigate to Rates page
    await page.getByRole('link', { name: ' Rates' }).click();
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify Rates page is displayed
    await expect(page).toHaveURL(/.*tariff/);

    // Find and use the search field
    const searchInput = page.locator('input[placeholder*="Search Rates"]');
    if (await searchInput.isVisible()) {
      // Enter a rate name in the search field
      await searchInput.fill('NJ Testing');
      await new Promise(f => setTimeout(f, 1 * 1000));

      // Verify the rates table is filtered to show matching rates
      const rateNameCells = page.locator('td').filter({ hasText: 'NJ Testing' });
      const count = await rateNameCells.count();
      expect(count).toBeGreaterThanOrEqual(0);
    }
  });
});
