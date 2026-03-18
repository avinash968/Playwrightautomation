// spec: specs/mga-quote2cash-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("AC1: Authentication & Dashboard Access", () => {
  test("AC1.1 - Successful Login with Valid Credentials", async ({ page }) => {
    // 1. Navigate to https://dev.quote2cash.app
    await page.goto("https://dev.quote2cash.app");

    // expect: Login page is displayed with username and password fields
    await expect(
      page.getByRole("textbox", { name: "Enter a valid username" }),
    ).toBeVisible();
    await expect(
      page.getByRole("textbox", { name: "Enter a valid password" }),
    ).toBeVisible();

    // expect: Page title shows 'Quote2Cash - Quote Automation, Invoice/ Estimate Creation, Payments'
    await expect(page).toHaveTitle(/Quote2Cash/);

    // 2. Enter username 'mga' in the username field
    await page
      .getByRole("textbox", { name: "Enter a valid username" })
      .fill("mga");

    // expect: Username field contains 'mga'
    await expect(
      page.getByRole("textbox", { name: "Enter a valid username" }),
    ).toHaveValue("mga");

    // 3. Enter password 'demo' in the password field
    await page
      .getByRole("textbox", { name: "Enter a valid password" })
      .fill("demo");

    // expect: Password field is filled (contents masked)
    await expect(
      page.getByRole("textbox", { name: "Enter a valid password" }),
    ).toHaveValue("demo");

    // 4. Click the 'Login' button
    await page.getByRole("button", { name: "Login" }).click();

    // Wait for dashboard to load
    await page.waitForURL("**/*jobboard**", { timeout: 10000 });

    // expect: Login is processed and page navigates to dashboard
    // expect: URL changes to #/app/jobboard
    expect(page.url()).toContain("#/app/jobboard");

    // expect: Page title shows 'Quote2Cash - Estimates'
    await expect(page).toHaveTitle(/Quote2Cash/);

    // 5. Verify dashboard is displayed
    // expect: Dashboard contains job list with estimates
    // expect: Left sidebar navigation is visible
    await expect(page.locator('a[href="#/app/jobboard"]').first()).toBeVisible({
      timeout: 10000,
    });
    await expect(page.locator('a[href="#/app/customers"]').first()).toBeVisible(
      { timeout: 10000 },
    );

    // expect: Top navbar shows user information and company name
    await expect(page.getByRole("link", { name: /Quote2Cash/ })).toBeVisible();
    await expect(page.locator("#dropdownMenu2")).toBeVisible();
  });
});
