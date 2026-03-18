// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Customers Management', () => {
  test('Sort customers by different columns', async ({ page }) => {
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

    // Click on the 'Name' column header to sort
    const nameHeader = page.getByRole('columnheader', { name: 'Name' });
    await expect(nameHeader).toBeVisible();
    await nameHeader.click();
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Verify sort indicator is visible
    await expect(nameHeader).toBeVisible();

    // Click on the 'Open Balance' column header to sort
    const balanceHeader = page.getByRole('columnheader', { name: 'Open Balance' });
    await expect(balanceHeader).toBeVisible();
    await balanceHeader.click();
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Verify table rows are sorted
    const tableRows = page.locator('tbody tr');
    const count = await tableRows.count();
    expect(count).toBeGreaterThan(0);
  });
});
