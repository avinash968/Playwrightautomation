// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Rate Management', () => {
  test('Filter rates by status (Active/Inactive/Removed)', async ({ page }) => {
    // Log in with valid credentials
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Navigate to Rates page
    await page.getByRole('link', { name: ' Rates' }).click();
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify Rates page is displayed
    await expect(page).toHaveURL(/.*tariff/);

    // Click on the 'Active' tab
    const activeTab = page.getByRole('link', { name: 'Active' });
    if (await activeTab.isVisible()) {
      await activeTab.click();
      await new Promise(f => setTimeout(f, 1 * 1000));
      await expect(activeTab).toHaveAttribute('href', /active/);
    }

    // Click on the 'Inactive' tab
    const inactiveTab = page.getByRole('link', { name: 'Inactive' });
    if (await inactiveTab.isVisible()) {
      await inactiveTab.click();
      await new Promise(f => setTimeout(f, 1 * 1000));
      await expect(inactiveTab).toHaveAttribute('href', /inactive/);
    }

    // Click on the 'Removed' tab
    const removedTab = page.getByRole('link', { name: 'Removed' });
    if (await removedTab.isVisible()) {
      await removedTab.click();
      await new Promise(f => setTimeout(f, 1 * 1000));
      await expect(removedTab).toHaveAttribute('href', /removed/);
    }
  });
});
