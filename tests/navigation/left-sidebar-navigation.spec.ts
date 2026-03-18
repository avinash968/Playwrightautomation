// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Navigation & UI', () => {
  test('Left sidebar navigation', async ({ page }) => {
    // Log in with valid credentials
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify the user is logged in and the dashboard is displayed
    await expect(page).toHaveURL(/.*jobboard/);

    // Verify the left sidebar displays all main sections
    await expect(page.getByRole('link', { name: ' Orders' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' Customers' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' Rates' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' My Schedule' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' All Documents' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' Reports' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' Settings' })).toBeVisible();

    // Click on each menu item to verify navigation
    await page.getByRole('link', { name: ' Customers' }).click();
    await new Promise(f => setTimeout(f, 1 * 1000));
    await expect(page).toHaveURL(/.*customers/);

    await page.getByRole('link', { name: ' Rates' }).click();
    await new Promise(f => setTimeout(f, 1 * 1000));
    await expect(page).toHaveURL(/.*tariff/);

    await page.getByRole('link', { name: ' Orders' }).click();
    await new Promise(f => setTimeout(f, 1 * 1000));
    await expect(page).toHaveURL(/.*jobboard/);
  });
});
