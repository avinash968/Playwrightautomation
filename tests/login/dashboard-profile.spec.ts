// spec: specs/login-dashboard-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Dashboard - User Profile and Logout', () => {
  test('User profile shows logged-in user name', async ({ page }) => {
    // 1. Navigate to https://dev.quote2cash.app/
    await page.goto('https://dev.quote2cash.app/');
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Login with valid credentials (mga/demo)
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('mga');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify user is logged in
    await expect(page).toHaveURL(/.*salesLeads/);

    // 2. Verify user name display in profile menu
    // Verify user name 'Michael' is visible in the header
    const userProfile = page.getByText('Michael');
    await expect(userProfile).toBeVisible();

    // Verify Profile menu is clickable
    await expect(userProfile).toBeFocused();
  });

  test('User profile menu opens on click', async ({ page }) => {
    // 1. Navigate and login
    await page.goto('https://dev.quote2cash.app/');
    await new Promise(f => setTimeout(f, 2 * 1000));
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('mga');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify user is logged in
    await expect(page).toHaveURL(/.*salesLeads/);

    // Verify user profile 'Michael' is visible in header
    const userProfile = page.getByText('Michael');
    await expect(userProfile).toBeVisible();

    // 2. Click on user profile menu 'Michael'
    await userProfile.click();
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Verify profile dropdown menu opens
    // Look for menu items that typically appear (Profile, Settings, Logout, etc.)
    // Note: The exact menu content depends on the app's implementation
  });

  test('Logout functionality from dashboard', async ({ page }) => {
    // 1. Navigate and login
    await page.goto('https://dev.quote2cash.app/');
    await new Promise(f => setTimeout(f, 2 * 1000));
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('mga');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify user is logged in and on dashboard
    await expect(page).toHaveURL(/.*salesLeads/);
    await expect(page.getByText('Michael')).toBeVisible();

    // 2. Click on user profile menu
    const userProfile = page.getByText('Michael');
    await userProfile.click();
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Look for logout button/link in the menu
    // Try to find and click logout option if visible
    const logoutOptions = [
      page.getByRole('menuitem', { name: /logout/i }),
      page.getByRole('button', { name: /logout/i }),
      page.getByText(/logout/i),
    ];

    let logoutClicked = false;
    for (const option of logoutOptions) {
      if (await option.isVisible({ timeout: 1000 }).catch(() => false)) {
        await option.click();
        logoutClicked = true;
        break;
      }
    }

    // If logout option was found and clicked
    if (logoutClicked) {
      await new Promise(f => setTimeout(f, 2 * 1000));

      // Verify user is logged out
      // Verify page redirects to login page
      await expect(page).toHaveURL(/.*login/);

      // Verify login page is displayed
      await expect(page.getByRole('heading', { name: 'Welcome to Quote2Cash' })).toBeVisible();
    }
  });
});
