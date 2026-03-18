// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Error Handling & Edge Cases', () => {
  test('Search with special characters', async ({ page }) => {
    // Log in with valid credentials
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify page loaded
    await expect(page).toHaveURL(/.*jobboard/);

    // Test search field with special character: @
    const searchInput = page.locator('input[type="text"]').first();
    await searchInput.fill('test@');
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Verify no errors or crashes occur
    const errorMessage = page.locator('text=/error/i');
    await expect(errorMessage).not.toBeVisible();

    // Clear search
    await searchInput.clear();
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Test search field with special character: #
    await searchInput.fill('test#');
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Verify no errors occur
    await expect(errorMessage).not.toBeVisible();

    // Clear search
    await searchInput.clear();
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Test search field with special character: $
    await searchInput.fill('test$');
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Verify no errors occur and table still renders
    const table = page.getByRole('table').nth(0);
    await expect(table).toBeVisible();
    await expect(errorMessage).not.toBeVisible();

    // Clear search
    await searchInput.clear();
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Test search field with percent
    await searchInput.fill('test%');
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Verify no errors and clean state
    await expect(errorMessage).not.toBeVisible();
    await expect(table).toBeVisible();
  });
});
