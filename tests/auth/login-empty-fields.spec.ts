// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication & Login', () => {
  test('Login with empty fields', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    
    // Verify login form is displayed
    await expect(page.getByRole('heading', { name: 'Welcome to Quote2Cash', level: 3 })).toBeVisible();

    // Leave the Username field empty
    const usernameField = page.getByRole('textbox', { name: 'Enter a valid username' });
    await expect(usernameField).toHaveValue('');

    // Leave the Password field empty
    const passwordField = page.getByRole('textbox', { name: 'Enter a valid password' });
    await expect(passwordField).toHaveValue('');

    // Click the Login button
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for validation
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Verify a validation error message is displayed or user remains on login page
    await expect(page).toHaveURL(/.*signin/);
    
    // Verify the login form is still displayed (user not authenticated)
    await expect(page.getByRole('heading', { name: 'Welcome to Quote2Cash', level: 3 })).toBeVisible();
  });
});
