// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Data Validation & Input', () => {
  test('Currency formatting', async ({ page }) => {
    // Log in with valid credentials
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify page loaded
    await expect(page).toHaveURL(/.*jobboard/);

    // Verify Orders page displays currency formatted amounts
    const table = page.getByRole('table').nth(0);
    await expect(table).toBeVisible();

    // Get table cells that contain amounts (Amount column)
    const tableRows = page.locator('tbody tr');
    const rowCount = await tableRows.count();
    expect(rowCount).toBeGreaterThan(0);

    // Check multiple rows for currency formatting
    let currencyFormatFound = false;
    for (let i = 0; i < Math.min(10, rowCount); i++) {
      const cells = tableRows.nth(i).locator('td');
      const cellTexts: string[] = [];
      
      for (let j = 0; j < await cells.count(); j++) {
        const text = await cells.nth(j).textContent();
        cellTexts.push(text || '');
      }

      // Check if any cell contains currency format ($X,XXX.XX or $X.XX)
      for (const text of cellTexts) {
        const trimmed = text?.trim() || '';
        // Match $ followed by digits, optional commas, and 2 decimal places
        if (/^\$[\d,]+\.\d{2}$/.test(trimmed)) {
          currencyFormatFound = true;
          // Verify format has proper thousand separators if applicable
          if (trimmed.includes(',')) {
            const parts = trimmed.replace('$', '').split(',');
            expect(parts[0].length).toBeLessThanOrEqual(3); // First part before comma
            for (let k = 1; k < parts.length - 1; k++) {
              expect(parts[k].length).toBe(3); // Middle parts must be 3 digits
            }
          }
        }
      }
    }

    // Verify that at least one currency formatted value was found
    expect(currencyFormatFound).toBeTruthy();

    // Navigate to Customers page to verify currency formatting there
    await page.click('a[href="#/app/customers"]');
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify Customers page displays currency formatted amounts
    const customersTable = page.getByRole('table').nth(0);
    await expect(customersTable).toBeVisible();

    // Check customer balance formatting
    const customerRows = page.locator('tbody tr');
    const customerRowCount = await customerRows.count();
    
    let customerCurrencyFormatFound = false;
    for (let i = 0; i < Math.min(10, customerRowCount); i++) {
      const cells = customerRows.nth(i).locator('td');
      
      for (let j = 0; j < await cells.count(); j++) {
        const text = await cells.nth(j).textContent();
        const trimmed = text?.trim() || '';
        
        if (/^\$[\d,]+\.\d{2}$/.test(trimmed)) {
          customerCurrencyFormatFound = true;
          expect(trimmed).toMatch(/^\$/); // Verify starts with $
        }
      }
    }

    // Verify currency formatting found on customers page
    expect(customerCurrencyFormatFound).toBeTruthy();
  });
});
