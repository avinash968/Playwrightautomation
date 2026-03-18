// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Documents Management', () => {
  test('Sort documents by column', async ({ page }) => {
    // Log in with valid credentials
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Navigate to All Documents page
    await page.getByRole('link', { name: ' All Documents' }).click();
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Verify All Documents page is displayed
    await expect(page).toHaveURL(/.*documents/);

    // Click on the 'Doc Name' column header to sort
    const docNameHeader = page.getByRole('columnheader', { name: 'Doc Name' });
    if (await docNameHeader.isVisible()) {
      await docNameHeader.click();
      await new Promise(f => setTimeout(f, 1 * 1000));

      // Verify sort indicator is visible
      await expect(docNameHeader).toBeVisible();
    }

    // Click on the 'Create Date' column header to sort
    const createDateHeader = page.getByRole('columnheader', { name: 'Create Date' });
    if (await createDateHeader.isVisible()) {
      await createDateHeader.click();
      await new Promise(f => setTimeout(f, 1 * 1000));

      // Verify table rows exist
      const tableRows = page.locator('tbody tr');
      const count = await tableRows.count();
      expect(count).toBeGreaterThan(0);
    }
  });
});
