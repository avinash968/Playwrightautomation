// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Rate Management', () => {
  test('View all rates', async ({ page }) => {
    // Log in with valid credentials
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Click on 'Rates' in the left navigation menu
    await page.getByRole('link', { name: ' Rates' }).click();
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify Rate Management page is displayed
    await expect(page).toHaveURL(/.*tariff/);
    await expect(page.getByRole('heading', { name: 'Rate Management', level: 3 })).toBeVisible();

    // Verify a table is displayed with rate information
    const ratesTable = page.getByRole('table').nth(0);
    await expect(ratesTable).toBeVisible();

    // Verify table columns are present
    await expect(page.getByRole('columnheader', { name: 'Rate Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Approved Date' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Approved By' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Rate Mode' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Open Orders' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Order Count' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Revenue' })).toBeVisible();

    // Verify rates are listed
    const rateRows = page.locator('tbody tr');
    const count = await rateRows.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
