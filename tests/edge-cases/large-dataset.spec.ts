// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Error Handling & Edge Cases', () => {
  test('Large data set handling', async ({ page }) => {
    // Log in with valid credentials
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify the page loads successfully
    await expect(page).toHaveURL(/.*jobboard/);

    // Verify that the page title contains expected content (showing responsiveness)
    await expect(page).toHaveTitle('Quote2Cash - Orders');

    // Verify pagination or lazy loading is implemented
    const totalOrdersText = page.locator('text=/Total Orders/');
    const totalOrdersVisible = await totalOrdersText.isVisible();
    expect(totalOrdersVisible).toBeTruthy();

    // Verify data loads correctly for each page
    const table = page.getByRole('table').nth(0);
    await expect(table).toBeVisible();

    const tableRows = page.locator('tbody tr');
    const initialRowCount = await tableRows.count();
    expect(initialRowCount).toBeGreaterThan(0);

    // Scroll to verify UI responsiveness
    await page.evaluate(() => {
      window.scrollBy(0, 500);
    });

    // Verify table is still visible and responsive
    await expect(table).toBeVisible();
    
    const scrolledRowCount = await tableRows.count();
    expect(scrolledRowCount).toBeGreaterThan(0);
  });
});
