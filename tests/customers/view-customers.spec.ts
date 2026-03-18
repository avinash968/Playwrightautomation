// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Customers Management', () => {
  test('View all customers', async ({ page }) => {
    // Log in with valid credentials
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Click on 'Customers' in the left navigation menu
    await page.getByRole('link', { name: ' Customers' }).click();
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify Customers page is displayed
    await expect(page).toHaveURL(/.*customers/);
    await expect(page.getByRole('heading', { name: 'Customers', level: 3 })).toBeVisible();

    // Verify a table showing all customers is visible
    const customersTable = page.getByRole('table').nth(0);
    await expect(customersTable).toBeVisible();

    // Verify customer table columns are present
    await expect(page.getByRole('columnheader', { name: /Customer #/ })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Email Address' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /Phone #/ })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Type' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Address' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Open Balance' })).toBeVisible();

    // Verify multiple customers are listed
    const customerRows = page.locator('tbody tr');
    const count = await customerRows.count();
    expect(count).toBeGreaterThan(0);
  });
});
