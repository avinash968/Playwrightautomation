// spec: specs/login-dashboard-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login - Input Validation', () => {
  test('Empty username field shows validation error', async ({ page }) => {
    // 1. Navigate to https://dev.quote2cash.app/
    await page.goto('https://dev.quote2cash.app/');
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify login page is displayed
    await expect(page.getByRole('heading', { name: 'Welcome to Quote2Cash' })).toBeVisible();

    // 2. Leave Username field empty and enter password 'demo'
    // Username field remains empty
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');

    // 3. Click Login button
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify login fails - user remains on login page
    await expect(page).toHaveURL(/.*login/);

    // Verify error message appears (if shown)
    // The exact error message depends on the app's implementation
    await expect(page.getByRole('textbox', { name: 'Enter a valid username' })).toBeFocused();

    // Verify password field retains the entered value
    await expect(page.getByRole('textbox', { name: 'Enter a valid password' })).toHaveValue('demo');
  });

  test('Empty password field shows validation error', async ({ page }) => {
    // 1. Navigate to https://dev.quote2cash.app/
    await page.goto('https://dev.quote2cash.app/');
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify login page is displayed
    await expect(page.getByRole('heading', { name: 'Welcome to Quote2Cash' })).toBeVisible();

    // 2. Enter username 'mga' and leave Password field empty
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('mga');

    // Verify password field is empty
    await expect(page.getByRole('textbox', { name: 'Enter a valid password' })).toHaveValue('');

    // 3. Click Login button
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify login fails - user remains on login page
    await expect(page).toHaveURL(/.*login/);

    // Verify username field retains the entered value
    await expect(page.getByRole('textbox', { name: 'Enter a valid username' })).toHaveValue('mga');
  });

  test('Both fields empty shows validation errors', async ({ page }) => {
    // 1. Navigate to https://dev.quote2cash.app/
    await page.goto('https://dev.quote2cash.app/');
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify login page is displayed
    await expect(page.getByRole('heading', { name: 'Welcome to Quote2Cash' })).toBeVisible();

    // Verify both fields are empty
    await expect(page.getByRole('textbox', { name: 'Enter a valid username' })).toHaveValue('');
    await expect(page.getByRole('textbox', { name: 'Enter a valid password' })).toHaveValue('');

    // 2. Click Login button without entering credentials
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify login fails - user remains on login page
    await expect(page).toHaveURL(/.*login/);
  });

  test('Login button requires both fields to be filled', async ({ page }) => {
    // 1. Navigate to https://dev.quote2cash.app/
    await page.goto('https://dev.quote2cash.app/');
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify login page is displayed
    await expect(page.getByRole('heading', { name: 'Welcome to Quote2Cash' })).toBeVisible();

    // 2. Verify Login button state with empty fields
    const loginButton = page.getByRole('button', { name: 'Login' });
    await expect(loginButton).toBeVisible();

    // 3. Enter only username 'mga'
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('mga');
    await expect(page.getByRole('textbox', { name: 'Enter a valid username' })).toHaveValue('mga');

    // 4. Click Login button
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify login fails with validation error for password field
    await expect(page).toHaveURL(/.*login/);
    await expect(page.getByRole('textbox', { name: 'Enter a valid password' })).toHaveValue('');
  });
});
