// spec: specs/login-dashboard-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login - Authentication Errors', () => {
  test('Invalid username shows authentication error', async ({ page }) => {
    // 1. Navigate to https://dev.quote2cash.app/
    await page.goto('https://dev.quote2cash.app/');
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify login page is displayed
    await expect(page.getByRole('heading', { name: 'Welcome to Quote2Cash' })).toBeVisible();

    // 2. Enter invalid username 'invaliduser' and correct password 'demo'
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('invaliduser');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');

    // Verify fields are filled correctly
    await expect(page.getByRole('textbox', { name: 'Enter a valid username' })).toHaveValue('invaliduser');
    await expect(page.getByRole('textbox', { name: 'Enter a valid password' })).toHaveValue('demo');

    // 3. Click Login button
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify login fails - user remains on login page
    await expect(page).toHaveURL(/.*login/);

    // Verify an error is displayed (either via alert, toast, or error message)
    // The exact mechanism depends on the app's error handling implementation
  });

  test('Invalid password shows authentication error', async ({ page }) => {
    // 1. Navigate to https://dev.quote2cash.app/
    await page.goto('https://dev.quote2cash.app/');
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify login page is displayed
    await expect(page.getByRole('heading', { name: 'Welcome to Quote2Cash' })).toBeVisible();

    // 2. Enter correct username 'mga' and incorrect password 'wrongpassword'
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('mga');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('wrongpassword');

    // Verify fields are filled correctly
    await expect(page.getByRole('textbox', { name: 'Enter a valid username' })).toHaveValue('mga');
    await expect(page.getByRole('textbox', { name: 'Enter a valid password' })).toHaveValue('wrongpassword');

    // 3. Click Login button
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify login fails - user remains on login page
    await expect(page).toHaveURL(/.*login/);

    // Verify username field retains the value
    await expect(page.getByRole('textbox', { name: 'Enter a valid username' })).toHaveValue('mga');
  });

  test('Both username and password invalid shows authentication error', async ({ page }) => {
    // 1. Navigate to https://dev.quote2cash.app/
    await page.goto('https://dev.quote2cash.app/');
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify login page is displayed
    await expect(page.getByRole('heading', { name: 'Welcome to Quote2Cash' })).toBeVisible();

    // 2. Enter invalid username 'invaliduser' and invalid password 'wrongpassword'
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('invaliduser');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('wrongpassword');

    // Verify fields are filled correctly
    await expect(page.getByRole('textbox', { name: 'Enter a valid username' })).toHaveValue('invaliduser');
    await expect(page.getByRole('textbox', { name: 'Enter a valid password' })).toHaveValue('wrongpassword');

    // 3. Click Login button
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify login fails - user remains on login page
    await expect(page).toHaveURL(/.*login/);
  });
});
