// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Rate Management', () => {
  test('View rate statistics', async ({ page }) => {
    // Log in with valid credentials
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Navigate to Rates page
    await page.getByRole('link', { name: ' Rates' }).click();
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify Rates page is displayed
    await expect(page).toHaveURL(/.*tariff/);

    // Look for statistics at the top of the page
    const inUseStats = page.locator('text=/In Use/').nth(0);
    const notInUseStats = page.locator('text=/Not In Use/').nth(0);
    const totalRevenueStats = page.locator('text=/Total Revenue/').nth(0);

    // Verify statistics are displayed
    const inUseVisible = await inUseStats.isVisible().catch(() => false);
    const notInUseVisible = await notInUseStats.isVisible().catch(() => false);
    const totalRevenueVisible = await totalRevenueStats.isVisible().catch(() => false);

    // At least some statistics should be visible
    expect(inUseVisible || notInUseVisible || totalRevenueVisible).toBeTruthy();
  });
});
