// spec: specs/login-dashboard-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login - Happy Path', () => {
  test('Login with valid credentials successfully', async ({ page }) => {
    // 1. Navigate to https://dev.quote2cash.app/
    await page.goto('https://dev.quote2cash.app/');
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify login page elements
    await expect(page.getByRole('heading', { name: 'Welcome to Quote2Cash' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Enter a valid username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Enter a valid password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    // 2. Enter 'mga' in the Username field
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('mga');
    
    // Verify username field
    await expect(page.getByRole('textbox', { name: 'Enter a valid username' })).toHaveValue('mga');

    // 3. Enter 'demo' in the Password field
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    
    // Verify password field is filled
    await expect(page.getByRole('textbox', { name: 'Enter a valid password' })).toHaveValue('demo');

    // 4. Click the 'Login' button
    await page.getByRole('button', { name: 'Login' }).click();

    // 5. Verify dashboard is fully loaded
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify URL is correct
    await expect(page).toHaveURL(/.*salesLeads/);

    // Verify dashboard title
    await expect(page.getByRole('heading', { name: 'Sales Leads', level: 4 })).toBeVisible();

    // Verify left sidebar navigation is visible
    await expect(page.getByRole('link', { name: ' Sales Leads' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' Orders' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' Customers' })).toBeVisible();

    // Verify header logo is visible
    await expect(page.getByRole('link', { name: 'Quote2Cash' })).toBeVisible();

    // Verify user profile menu showing 'Michael'
    await expect(page.getByText('Michael')).toBeVisible();
  });

  test('Dashboard displays all navigation menu items', async ({ page }) => {
    // Login with valid credentials
    await page.goto('https://dev.quote2cash.app/');
    await new Promise(f => setTimeout(f, 2 * 1000));
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('mga');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify all navigation menu items are visible
    await expect(page.getByRole('link', { name: ' Sales Leads' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' Orders' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' Customers' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' Rates' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' Company Calendar' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' My Schedule' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' My Emails' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' All Documents' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' Reports' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' Settings' })).toBeVisible();
  });

  test('Dashboard header displays all elements', async ({ page }) => {
    // Login with valid credentials
    await page.goto('https://dev.quote2cash.app/');
    await new Promise(f => setTimeout(f, 2 * 1000));
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('mga');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify header elements
    await expect(page.getByRole('link', { name: 'Quote2Cash' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Q2C' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Create' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Alerts' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Chat' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Task' })).toBeVisible();
    await expect(page.getByText('Michael')).toBeVisible();
  });

  test('Dashboard content displays sales leads metrics', async ({ page }) => {
    // Login with valid credentials
    await page.goto('https://dev.quote2cash.app/');
    await new Promise(f => setTimeout(f, 2 * 1000));
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('mga');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify dashboard title
    await expect(page.getByRole('heading', { name: 'Sales Leads', level: 4 })).toBeVisible();

    // Verify sales metrics
    await expect(page.getByText('$0.00/ qrt')).toBeVisible();
    await expect(page.getByText('47 days left')).toBeVisible();
    await expect(page.getByText('# of Opp.')).toBeVisible();
    await expect(page.getByText('Won Count')).toBeVisible();
    await expect(page.getByText('Loss Count')).toBeVisible();
    await expect(page.getByText('Won Value')).toBeVisible();
    await expect(page.getByText('Loss Value')).toBeVisible();
    await expect(page.getByText('Forecast Opp.')).toBeVisible();
  });

  test('Dashboard action buttons are available', async ({ page }) => {
    // Login with valid credentials
    await page.goto('https://dev.quote2cash.app/');
    await new Promise(f => setTimeout(f, 2 * 1000));
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('mga');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify action buttons are visible and enabled
    await expect(page.getByRole('button', { name: 'Create Lead' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create Lead' })).toBeEnabled();
    
    await expect(page.getByRole('button', { name: 'Edit Quota' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Edit Quota' })).toBeEnabled();
    
    await expect(page.getByRole('button', { name: 'Import Leads' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Import Leads' })).toBeEnabled();
  });
});
