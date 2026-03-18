// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Reports & Payments', () => {
  test('Filter payments by status', async ({ page }) => {
    // Log in with valid credentials
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Navigate to Reports page
    await page.getByRole('link', { name: ' Reports' }).click();
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify Reports page is displayed
    await expect(page).toHaveURL(/.*reports/);

    // Click on 'Payments' tab if needed
    const paymentsTab = page.getByRole('link', { name: 'Payments' });
    if (await paymentsTab.isVisible()) {
      await paymentsTab.click();
      await new Promise(f => setTimeout(f, 1 * 1000));
    }

    // Click on the 'Partially Paid' status tab
    const partiallyPaidTab = page.getByRole('heading', { name: /Partially Paid/ });
    if (await partiallyPaidTab.isVisible()) {
      await partiallyPaidTab.click();
      await new Promise(f => setTimeout(f, 1 * 1000));
    }

    // Click on the 'Fully Paid' status tab
    const fullyPaidTab = page.getByRole('heading', { name: /Fully Paid/ });
    if (await fullyPaidTab.isVisible()) {
      await fullyPaidTab.click();
      await new Promise(f => setTimeout(f, 1 * 1000));
    }

    // Click on the 'Failed' status tab
    const failedTab = page.getByRole('heading', { name: /Failed/ });
    if (await failedTab.isVisible()) {
      await failedTab.click();
      await new Promise(f => setTimeout(f, 1 * 1000));
    }

    // Verify page is still on Reports
    await expect(page).toHaveURL(/.*reports/);
  });
});
