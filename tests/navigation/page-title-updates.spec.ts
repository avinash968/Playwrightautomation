// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Navigation & UI', () => {
  test('Page title updates', async ({ page }) => {
    // Log in with valid credentials
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify page title in browser tab shows 'Quote2Cash - Orders'
    await expect(page).toHaveTitle('Quote2Cash - Orders');

    // Click on Customers menu
    await page.getByRole('link', { name: ' Customers' }).click();
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Verify page title changes to 'Quote2Cash - Customers'
    await expect(page).toHaveTitle('Quote2Cash - Customers');

    // Click on Reports menu
    await page.getByRole('link', { name: ' Reports' }).click();
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Verify page title changes to 'Quote2Cash - Reports'
    await expect(page).toHaveTitle('Quote2Cash - Reports');

    // Click on Rates menu
    await page.getByRole('link', { name: ' Rates' }).click();
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Verify page title changes appropriately
    const pageTitle = await page.title();
    expect(pageTitle).toContain('Quote2Cash');
  });
});
