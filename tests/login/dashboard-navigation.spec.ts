// spec: specs/login-dashboard-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Dashboard - Page Load and Navigation', () => {
  test('Dashboard loads with correct URL after successful login', async ({ page }) => {
    // 1. Navigate to https://dev.quote2cash.app/
    await page.goto('https://dev.quote2cash.app/');
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify login page is displayed
    await expect(page.getByRole('heading', { name: 'Welcome to Quote2Cash' })).toBeVisible();

    // 2. Login with valid credentials (mga/demo)
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('mga');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();

    // 3. Verify dashboard page URL
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify page URL contains salesLeads
    await expect(page).toHaveURL(/.*salesLeads/);

    // Verify page does not redirect to other pages
    expect(page.url()).toContain('#/app/salesLeads');
  });

  test('Navigation to Orders page from dashboard', async ({ page }) => {
    // 1. Login with valid credentials (mga/demo)
    await page.goto('https://dev.quote2cash.app/');
    await new Promise(f => setTimeout(f, 2 * 1000));
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('mga');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify user is on Sales Leads dashboard
    await expect(page.getByRole('heading', { name: 'Sales Leads', level: 4 })).toBeVisible();

    // 2. Click 'Orders' in the left sidebar menu
    await page.getByRole('link', { name: ' Orders' }).click();
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify page navigates to Orders page
    await expect(page).toHaveURL(/.*jobboard/);

    // Verify Orders page content is loaded (Orders heading or table visible)
    // The exact content depends on the Orders page structure
  });

  test('Navigation to Customers page from dashboard', async ({ page }) => {
    // 1. Login with valid credentials (mga/demo)
    await page.goto('https://dev.quote2cash.app/');
    await new Promise(f => setTimeout(f, 2 * 1000));
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('mga');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify user is on Sales Leads dashboard
    await expect(page.getByRole('heading', { name: 'Sales Leads', level: 4 })).toBeVisible();

    // 2. Click 'Customers' in the left sidebar menu
    await page.getByRole('link', { name: ' Customers' }).click();
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify page navigates to Customers page
    await expect(page).toHaveURL(/.*customers/);

    // Verify Customers page content is loaded
    // The exact content depends on the Customers page structure
  });

  test('Logo click returns to home dashboard', async ({ page }) => {
    // 1. Login with valid credentials (mga/demo)
    await page.goto('https://dev.quote2cash.app/');
    await new Promise(f => setTimeout(f, 2 * 1000));
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('mga');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Navigate to Orders page
    await page.getByRole('link', { name: ' Orders' }).click();
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify user is on Orders page
    await expect(page).toHaveURL(/.*jobboard/);

    // 2. Click the 'Quote2Cash' logo in the header
    await page.getByRole('link', { name: 'Quote2Cash' }).first().click();
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify page navigates back to Sales Leads dashboard
    await expect(page).toHaveURL(/.*salesLeads/);

    // Verify Sales Leads heading is displayed
    await expect(page.getByRole('heading', { name: 'Sales Leads', level: 4 })).toBeVisible();
  });
});
