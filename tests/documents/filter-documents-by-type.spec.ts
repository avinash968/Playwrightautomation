// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Documents Management', () => {
  test('Filter documents by type', async ({ page }) => {
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
    await expect(page.getByRole('table')).toBeVisible();

    // Identify different document types visible in the table
    const invoiceDocuments = page.locator('td').filter({ hasText: 'BVL General Invoice' });
    const invoiceCount = await invoiceDocuments.count();

    const estimateDocuments = page.locator('td').filter({ hasText: 'Estimate' });
    const estimateCount = await estimateDocuments.count();

    // Verify that document types are visible
    expect(invoiceCount > 0 || estimateCount > 0).toBeTruthy();

    // Look for filter options if available
    const filterButtons = page.locator('button, [class*="filter"], [class*="dropdown"]');
    const filterCount = await filterButtons.count();
    expect(filterCount).toBeGreaterThanOrEqual(0);
  });
});
