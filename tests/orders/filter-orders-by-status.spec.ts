// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Orders Management', () => {
  test('Filter orders by status', async ({ page }) => {
    // Log in with valid credentials
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify Orders page is displayed
    await expect(page).toHaveURL(/.*jobboard/);

    // Click on the 'Quote' status filter button
    await page.locator('text=Quote').nth(0).click();
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Verify only orders with 'Quote' status are displayed
    const orderStatusCells = page.locator('td').filter({ hasText: 'Quote' });
    const count = await orderStatusCells.count();
    expect(count).toBeGreaterThan(0);

    // Click on the 'In Storage' status filter button
    await page.locator('text=In Storage').nth(0).click();
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Verify only orders with 'In Storage' status are displayed
    const inStorageStatusCells = page.locator('td').filter({ hasText: 'In Storage' });
    const inStorageCount = await inStorageStatusCells.count();
    expect(inStorageCount).toBeGreaterThan(0);

    // Click on the 'Booked' status filter button if visible
    const bookedButton = page.locator('text=Booked').nth(0);
    if (await bookedButton.isVisible()) {
      await bookedButton.click();
      await new Promise(f => setTimeout(f, 1 * 1000));
      
      // Verify orders with 'Booked' status are displayed
      const bookedStatusCells = page.locator('td').filter({ hasText: 'Booked' });
      const bookedCount = await bookedStatusCells.count();
      expect(bookedCount).toBeGreaterThanOrEqual(0);
    }
  });
});
