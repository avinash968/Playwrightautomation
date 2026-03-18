// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication & Login', () => {
  test('Login with invalid credentials', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    
    // Verify login form is displayed
    await expect(page.getByRole('heading', { name: 'Welcome to Quote2Cash', level: 3 })).toBeVisible();

    // Enter an incorrect username 'InvalidUser' in the Username field
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('InvalidUser');

    // Enter an incorrect password 'wrongpassword' in the Password field
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('wrongpassword');

    // Click the Login button
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for response
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify an error message is displayed or user remains on login page
    await expect(page).toHaveURL(/.*signin/);
    
    // Verify the login form is still visible (user not authenticated)
    await expect(page.getByRole('heading', { name: 'Welcome to Quote2Cash', level: 3 })).toBeVisible();
    
    // Verify the credentials are still in the form fields
    await expect(page.getByRole('textbox', { name: 'Enter a valid username' })).toHaveValue('InvalidUser');
  });
});
