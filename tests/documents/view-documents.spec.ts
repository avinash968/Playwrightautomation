// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Documents Management', () => {
  test('View all documents', async ({ page }) => {
    // Log in with valid credentials
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Click on 'All Documents' in the left navigation menu
    await page.getByRole('link', { name: ' All Documents' }).click();
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify All Documents page is displayed
    await expect(page).toHaveURL(/.*documents/);
    await expect(page.getByRole('heading', { name: 'All Documents', level: 3 })).toBeVisible();

    // Verify a table is displayed with document information
    const documentsTable = page.getByRole('table').nth(0);
    await expect(documentsTable).toBeVisible();

    // Verify table columns are present
    await expect(page.getByRole('columnheader', { name: 'Select' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Signed' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Doc Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Doc Type' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /Order Ref #/ })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /Doc #/ })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Create Date' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Created By' })).toBeVisible();

    // Verify documents are listed
    const documentRows = page.locator('tbody tr');
    const count = await documentRows.count();
    expect(count).toBeGreaterThan(0);
  });
});
