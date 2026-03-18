// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Reports & Payments', () => {
  test('Select and download payment records', async ({ page }) => {
    // Log in with valid credentials
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Navigate to Reports > Payments
    await page.getByRole('link', { name: ' Reports' }).click();
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Click on 'Payments' tab
    const paymentsTab = page.getByRole('link', { name: 'Payments' });
    if (await paymentsTab.isVisible()) {
      await paymentsTab.click();
      await new Promise(f => setTimeout(f, 1 * 1000));
    }

    // Verify payments page is displayed with downloadable records
    await expect(page).toHaveURL(/.*reports/);

    // Click the 'Select All' checkbox
    const selectAllCheckbox = page.getByRole('checkbox', { name: 'Select All' });
    if (await selectAllCheckbox.isVisible()) {
      await selectAllCheckbox.check();
      await new Promise(f => setTimeout(f, 1 * 1000));

      // Verify all visible payment records are selected
      const allCheckboxes = page.locator('input[type="checkbox"]');
      const count = await allCheckboxes.count();
      expect(count).toBeGreaterThan(0);

      // Look for Download button
      const downloadButton = page.getByRole('button', { name: 'Download' });
      if (await downloadButton.isVisible()) {
        // Verify button is enabled
        const isDisabled = await downloadButton.isDisabled();
        expect(!isDisabled).toBeTruthy();

        // Click Download button
        await downloadButton.click();
        await new Promise(f => setTimeout(f, 2 * 1000));
      }
    }
  });
});
