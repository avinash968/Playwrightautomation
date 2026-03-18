// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication & Login', () => {
  test('Successful login with valid credentials', async ({ page }) => {
    // Navigate to the login page at https://dev.quote2cash.app/#/login/signin
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    
    // Verify login form is displayed
    await expect(page.getByRole('heading', { name: 'Welcome to Quote2Cash', level: 3 })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    // Enter username 'BVL' in the Username field
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');

    // Enter password 'demo' in the Password field
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');

    // Click the Login button
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for authentication and redirect
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify the user is redirected to the Orders/Jobboard page
    await expect(page).toHaveURL(/.*jobboard/);
    
    // Verify page title changes to 'Quote2Cash - Orders'
    await expect(page).toHaveTitle('Quote2Cash - Orders');

    // Verify the main dashboard displays with navigation menu on the left
    await expect(page.getByRole('link', { name: ' Orders' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' Customers' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' Rates' })).toBeVisible();
    
    // Verify orders table is displayed
    await expect(page.getByRole('table')).toBeVisible();
  });
});
