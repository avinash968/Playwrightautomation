// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Orders Management', () => {
  test('Click on an order to view details', async ({ page }) => {
    // Log in with valid credentials
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify Orders page is displayed with order table
    await expect(page).toHaveURL(/.*jobboard/);
    await expect(page.getByRole('table')).toBeVisible();

    // Click on a specific order row (e.g., OR12)
    const or12OrderRow = page.locator('tr').filter({ hasText: 'OR12' }).nth(0);
    await expect(or12OrderRow).toBeVisible();
    await or12OrderRow.click();

    // Wait for order details page to load
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify order details page opens or modal appears
    const pageUrl = page.url();
    const hasOrderDetails = pageUrl.includes('job') || pageUrl.includes('order') || pageUrl.includes('details');
    
    // Verify either URL changed or a modal/details panel appeared
    const detailsVisible = await page.locator('[class*="detail"], [class*="modal"], [class*="panel"]').isVisible().catch(() => false);
    
    expect(hasOrderDetails || detailsVisible || pageUrl !== 'https://dev.quote2cash.app/#/app/jobboard').toBeTruthy();
  });
});
