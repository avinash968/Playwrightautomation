// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Data Validation & Input', () => {
  test('Table sorting integrity', async ({ page }) => {
    // Log in with valid credentials
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify page loaded
    await expect(page).toHaveURL(/.*jobboard/);

    // Get initial table rows
    const table = page.getByRole('table').nth(0);
    await expect(table).toBeVisible();

    let tableRows = page.locator('tbody tr');
    const initialRowCount = await tableRows.count();
    expect(initialRowCount).toBeGreaterThan(0);

    // Collect first column values (Order Ref) before sorting
    const initialFirstCellTexts: string[] = [];
    for (let i = 0; i < Math.min(5, initialRowCount); i++) {
      const cellText = await tableRows.nth(i).locator('td').first().textContent();
      initialFirstCellTexts.push(cellText || '');
    }

    // Click first column header to sort
    const columnHeader = page.locator('th').first();
    await columnHeader.click();
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Verify table is still visible after sort
    await expect(table).toBeVisible();

    // Verify row count hasn't changed
    tableRows = page.locator('tbody tr');
    const sortedRowCount = await tableRows.count();
    expect(sortedRowCount).toBe(initialRowCount);

    // Verify all cells are still properly aligned and contain data
    for (let i = 0; i < Math.min(5, sortedRowCount); i++) {
      const cells = tableRows.nth(i).locator('td');
      const cellCount = await cells.count();
      expect(cellCount).toBeGreaterThan(0);

      // Verify cell content is not empty
      const firstCellText = await cells.first().textContent();
      expect(firstCellText).toBeTruthy();
    }

    // Click to reverse sort
    await columnHeader.click();
    await new Promise(f => setTimeout(f, 1 * 1000));

    // Verify table is still visible
    await expect(table).toBeVisible();

    // Verify row count is still correct
    tableRows = page.locator('tbody tr');
    const reversedRowCount = await tableRows.count();
    expect(reversedRowCount).toBe(initialRowCount);

    // Verify data integrity: first cell should be different after reverse sort
    const reversedFirstCellTexts: string[] = [];
    for (let i = 0; i < Math.min(5, reversedRowCount); i++) {
      const cellText = await tableRows.nth(i).locator('td').first().textContent();
      reversedFirstCellTexts.push(cellText || '');
    }

    // At least some values should have changed position
    const hasChanged = reversedFirstCellTexts.some((val, idx) => val !== initialFirstCellTexts[idx]);
    expect(hasChanged).toBeTruthy();
  });
});
