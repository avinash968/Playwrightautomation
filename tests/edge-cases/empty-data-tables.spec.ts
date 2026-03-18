// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Error Handling & Edge Cases', () => {
  test('Handle empty data tables gracefully', async ({ page }) => {
    // Log in with valid credentials
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Navigate to Orders page
    await expect(page).toHaveURL(/.*jobboard/);

    // Search for a term that produces no results
    const searchButton = page.getByRole('button', { name: /Search/ });
    if (await searchButton.isVisible()) {
      await searchButton.click();
      await new Promise(f => setTimeout(f, 1 * 1000));

      const searchInput = page.locator('input[placeholder*="Search"]').nth(0);
      if (await searchInput.isVisible()) {
        // Enter a search term that produces no results
        await searchInput.fill('XXXNONEXISTENTORDERXXXXX');
        await new Promise(f => setTimeout(f, 1 * 1000));

        // Check if 'No Records Found' message is displayed or table is empty
        const noRecordsMessage = page.locator('text=/No Records Found/');
        const noRecordsVisible = await noRecordsMessage.isVisible().catch(() => false);

        const tableRows = page.locator('tbody tr');
        const rowCount = await tableRows.count();

        // Either no records message is shown or table is empty
        expect(noRecordsVisible || rowCount === 0).toBeTruthy();

        // Verify table structure is maintained
        const table = page.getByRole('table').nth(0);
        const tableExists = await table.isVisible().catch(() => false);
        expect(tableExists).toBeTruthy();
      }
    }
  });
});
