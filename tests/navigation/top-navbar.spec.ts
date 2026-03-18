// spec: specs/quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Navigation & UI', () => {
  test('Top navigation bar elements', async ({ page }) => {
    // Log in with valid credentials
    await page.goto('https://dev.quote2cash.app/#/login/signin');
    await page.getByRole('textbox', { name: 'Enter a valid username' }).fill('BVL');
    await page.getByRole('textbox', { name: 'Enter a valid password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verify the top navigation bar is displayed
    await expect(page).toHaveURL(/.*jobboard/);

    // Verify Logo is visible and clickable
    const logo = page.getByRole('link', { name: /Quote2Cash/ }).nth(0);
    await expect(logo).toBeVisible();

    // Verify Create button is present
    const createButton = page.getByRole('link', { name: 'Create' });
    const createVisible = await createButton.isVisible().catch(() => false);
    expect(createVisible).toBeTruthy();

    // Verify Alerts section is visible
    const alertsLink = page.getByRole('link', { name: 'Alerts' });
    const alertsVisible = await alertsLink.isVisible().catch(() => false);
    expect(alertsVisible).toBeTruthy();

    // Verify Task link is available
    const taskLink = page.getByRole('link', { name: 'Task' });
    await expect(taskLink).toBeVisible();

    // Verify User profile dropdown is present showing 'Bvl'
    const userProfile = page.locator('text=Bvl');
    const profileVisible = await userProfile.isVisible();
    expect(profileVisible).toBeTruthy();

    // Verify navigation returns to the home/orders page
    await logo.click();
    await new Promise(f => setTimeout(f, 1 * 1000));
    await expect(page).toHaveURL(/.*jobboard/);
  });
});
