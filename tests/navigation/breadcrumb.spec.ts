// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Navigation & UI', () => {
  test('Breadcrumb navigation', async ({ page }) => {
    // Log in with valid credentials
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify breadcrumb navigation is displayed
    await expect(page).toHaveURL(/.*jobboard/);
    
    const homeLink = page.getByRole('link', { name: ' Home' });
    await expect(homeLink).toBeVisible();

    // Navigate to Customers page
    await page.getByRole('link', { name: ' Customers' }).click();
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Verify breadcrumb shows: Home / Customers
    await expect(homeLink).toBeVisible();
    const breadcrumbText = page.locator('text=/Home.*Customers/');
    const breadcrumbVisible = await breadcrumbText.isVisible().catch(() => false);
    expect(breadcrumbVisible).toBeTruthy();

    // Click on 'Home' in the breadcrumb
    await homeLink.click();
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Verify navigation returns to the home/orders page
    await expect(page).toHaveURL(/.*jobboard/);
  });
});
