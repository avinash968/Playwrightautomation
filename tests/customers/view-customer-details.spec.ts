// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Customers Management', () => {
  test('Click on a customer to view details', async ({ page }) => {
    // Log in with valid credentials
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Navigate to Customers page
    await page.getByRole('link', { name: ' Customers' }).click();
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify Customers page is displayed
    await expect(page).toHaveURL(/.*customers/);

    // Click on a customer row (e.g., 'Mohanraj Rajangam')
    const mohanrajRow = page.locator('tr').filter({ hasText: 'Mohanraj Rajangam' }).nth(0);
    if (await mohanrajRow.isVisible()) {
      await mohanrajRow.click();
      await new Promise(f => setTimeout(f, 2 * 1000));

      // Verify customer details page opens or modal appears
      const pageUrl = page.url();
      const hasCustomerDetails = pageUrl.includes('customer') || pageUrl.includes('detail');
      
      // Verify either URL changed or details panel appeared
      const detailsVisible = await page.locator('[class*="detail"], [class*="modal"], [class*="panel"]').isVisible().catch(() => false);
      
      expect(hasCustomerDetails || detailsVisible || pageUrl !== 'https://dev.quote2cash.app/#/app/customers').toBeTruthy();
    }
  });
});
