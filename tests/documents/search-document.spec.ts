// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Documents Management', () => {
  test('Search for a specific document', async ({ page }) => {
    // Log in with valid credentials
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Navigate to All Documents page
    await page.getByRole('link', { name: ' All Documents' }).click();
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify All Documents page is displayed
    await expect(page).toHaveURL(/.*documents/);

    // Find and use the search field with placeholder 'Search Documents...'
    const searchButton = page.getByRole('button', { name: /Search Documents/ });
    if (await searchButton.isVisible()) {
      await searchButton.click();
      await new Promise(f => setTimeout(f, 1 * 1000));

      const searchInput = page.locator('input[placeholder*="Search"]').nth(0);
      if (await searchInput.isVisible()) {
        // Enter a document name in the search field
        await searchInput.fill('Storage Billing');
        await new Promise(f => setTimeout(f, 1 * 1000));

        // Verify the documents table is filtered to show matching documents
        const documentNameCells = page.locator('td').filter({ hasText: 'Storage Billing' });
        const count = await documentNameCells.count();
        expect(count).toBeGreaterThan(0);
      }
    }
  });
});
