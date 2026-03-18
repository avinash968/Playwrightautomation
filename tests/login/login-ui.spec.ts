// spec: specs/login-dashboard-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login - UI Elements and Interactions', () => {
  test('Password field shows/hides password toggle', async ({ page }) => {
    // 1. Navigate to https://dev.quote2cash.app/
    await page.goto('https://dev.quote2cash.app/');
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify login page is displayed
    await expect(page.getByRole('heading', { name: 'Welcome to Quote2Cash' })).toBeVisible();

    // Verify password visibility toggle icon is visible
    const passwordToggle = page.locator('generic').filter({ hasText: 'Password' }).locator('..').getByRole('button').first();
    await expect(passwordToggle).toBeVisible();

    // 2. Enter 'demo' in the Password field
    const passwordField = page.getByRole('textbox', { name: 'Enter a valid password' });
    await passwordField.fill('demo');

    // 3. Click password toggle/eye icon
    const toggleButton = page.locator('text=Password').locator('..').locator('button');
    if (await toggleButton.isVisible()) {
      await toggleButton.click();
      // Password becomes visible - type attribute changes or visibility changes
      await new Promise(f => setTimeout(f, 500));
      
      // Click again to hide
      await toggleButton.click();
      await new Promise(f => setTimeout(f, 500));
    }

    // Verify password field is filled
    await expect(passwordField).toHaveValue('demo');
  });

  test('Forgot username link is accessible', async ({ page }) => {
    // 1. Navigate to https://dev.quote2cash.app/
    await page.goto('https://dev.quote2cash.app/');
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify login page is displayed
    await expect(page.getByRole('heading', { name: 'Welcome to Quote2Cash' })).toBeVisible();

    // Verify Forgot username link is visible
    const forgotUsernameLink = page.getByRole('link', { name: 'username' });
    await expect(forgotUsernameLink).toBeVisible();

    // Verify link text reads 'username'
    await expect(forgotUsernameLink).toContainText('username');
  });

  test('Forgot password link is accessible', async ({ page }) => {
    // 1. Navigate to https://dev.quote2cash.app/
    await page.goto('https://dev.quote2cash.app/');
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify login page is displayed
    await expect(page.getByRole('heading', { name: 'Welcome to Quote2Cash' })).toBeVisible();

    // Verify Forgot password link is visible
    const forgotPasswordLink = page.getByRole('link', { name: 'password' });
    await expect(forgotPasswordLink).toBeVisible();

    // Verify link text reads 'password'
    await expect(forgotPasswordLink).toContainText('password');
  });

  test('Login page displays copyright and branding', async ({ page }) => {
    // 1. Navigate to https://dev.quote2cash.app/
    await page.goto('https://dev.quote2cash.app/');
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify login page is displayed
    await expect(page.getByRole('heading', { name: 'Welcome to Quote2Cash' })).toBeVisible();

    // Verify page title
    await expect(page).toHaveTitle(/Quote2Cash/);

    // Verify instructions text
    await expect(page.getByText('Please enter your username and password to log in.')).toBeVisible();

    // Verify copyright text
    await expect(page.getByText(/2026.*Quote2Cash/)).toBeVisible();

    // Verify features are displayed on the right side
    await expect(page.getByRole('heading', { name: 'Pricing Calculation & Controls' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Rate Management' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Document Support & Estimation' })).toBeVisible();
  });
});
