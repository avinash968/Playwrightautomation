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
    await page.waitForURL(/.*jobboard/);

    // Search for a term that produces no results
    const searchButton = page.getByRole('button', { name: /Search/ });
    await expect(searchButton).toBeVisible();
    await searchButton.click();

    const searchInput = page.locator('input[placeholder*="Search"]').nth(0);
    await expect(searchInput).toBeVisible();

    // Enter a search term that produces no results
    await searchInput.fill('XXXNONEXISTENTORDERXXXXX');
    await page.waitForTimeout(1000);

    // Verify table is visible
    const table = page.getByRole('table').nth(0);
    await expect(table).toBeVisible();

    // Check if 'No Records Found' message is displayed or table is empty
    const noRecordsMessage = page.locator('text=/No Records Found/');
    const tableRows = page.locator('tbody tr');
    
    const noRecordsVisible = await noRecordsMessage.isVisible({ timeout: 1000 }).catch(() => false);
    const rowCount = await tableRows.count();

    // Either no records message is shown or table is empty
    expect(noRecordsVisible || rowCount === 0).toBeTruthy();
  });
});
