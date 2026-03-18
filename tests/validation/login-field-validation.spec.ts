// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Data Validation & Input', () => {
  test('Login field validation', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://dev.quote2cash.app/#/login/signin');

    // Verify username field has correct placeholder text
    const usernameInput = page.getByRole('textbox', { name: 'Enter a valid username' });
    await expect(usernameInput).toBeVisible();
    const usernameAttribute = await usernameInput.getAttribute('placeholder');
    expect(usernameAttribute).toContain('Enter a valid username');

    // Verify password field has correct placeholder text
    const passwordInput = page.getByRole('textbox', { name: 'Enter a valid password' });
    await expect(passwordInput).toBeVisible();
    const passwordAttribute = await passwordInput.getAttribute('placeholder');
    expect(passwordAttribute).toContain('Enter a valid password');

    // Verify login button is present and visible
    const loginButton = page.getByRole('button', { name: 'Login' });
    await expect(loginButton).toBeVisible();

    // Verify forgot password link is visible
    const forgotPasswordLink = page.locator('text=/Forgot Password/i');
    await expect(forgotPasswordLink).toBeVisible();

    // Test validation: attempt login with only username filled
    await usernameInput.fill('BVL');
    await loginButton.click();
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Verify user is still on login page (validation failed)
    await expect(page).toHaveURL(/.*signin/);

    // Clear username
    await usernameInput.clear();
    await new Promise(f => setTimeout(f, 500));

    // Test validation: attempt login with only password filled
    await passwordInput.fill('demo');
    await loginButton.click();
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Verify user is still on login page
    await expect(page).toHaveURL(/.*signin/);

    // Verify form can still be submitted with valid credentials
    await usernameInput.fill('BVL');
    await new Promise(f => setTimeout(f, 500));
    await loginButton.click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify successful login navigation
    await expect(page).toHaveURL(/.*jobboard/);
  });
});
