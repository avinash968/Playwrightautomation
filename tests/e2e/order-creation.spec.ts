// spec: specs/e2e-complete-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Order Creation", () => {
  test.fixme("Create New Order with Mandatory Fields", async ({ page }) => {
    // 1. Login and access dashboard
    await page.goto("https://dev.quote2cash.app");
    await page
      .getByRole("textbox", { name: "Enter a valid username" })
      .fill("bvl");
    await page
      .getByRole("textbox", { name: "Enter a valid password" })
      .fill("demo");
    await page.getByRole("button", { name: "Login" }).click();

    await new Promise((f) => setTimeout(f, 3 * 1000));

    // 2. Click Create button and select New Order
    await page.getByText("Create", { exact: true }).click();
    await page.getByText("New Order").click();

    // Wait for dialog
    await new Promise((f) => setTimeout(f, 2 * 1000));

    // 3. Create Inquiry dialog opens - verify Customer Info tab
    const dialog = page.locator('[role="dialog"]').first();
    await expect(dialog).toBeVisible();

    const dialogTitle = page
      .locator("heading")
      .filter({ hasText: /Create Inquiry/ });
    await expect(dialogTitle).toBeVisible();

    // 4. Fill: First Name: John, Last Name: Smith
    const firstNameInput = page.getByRole("textbox", { name: "First Name" });
    await firstNameInput.fill("John");

    const lastNameInput = page.getByRole("textbox", { name: "Last Name" });
    await lastNameInput.fill("Smith");

    // 5. Fill: Email: test@example.com, Phone: 9876543210
    const emailInput = page.getByRole("textbox", { name: "Email" });
    await emailInput.fill("test@example.com");

    const phoneInput = page.getByRole("textbox", { name: "Phone" });
    await phoneInput.fill("9876543210");

    // 6. Leave Order Ref # empty (optional)

    // 7. Click Save button
    const saveButton = page
      .locator('[role="dialog"] button')
      .filter({ hasText: /Save/ });
    await saveButton.click();

    // Wait for confirmation
    await new Promise((f) => setTimeout(f, 3 * 1000));

    // 8. Click OK on confirmation - verify order created successfully
    const confirmationDialog = page
      .locator("heading")
      .filter({ hasText: /Confirmation/ });
    await expect(confirmationDialog).toBeVisible();

    const okButton = page.getByRole("button", { name: "Ok" });
    await okButton.click();

    // Wait for order detail page
    await new Promise((f) => setTimeout(f, 3 * 1000));

    // Verify order detail page loads
    await expect(page).toHaveURL(/jobDetail/);

    // Verify customer name displays
    const customerNameHeading = page
      .locator("heading")
      .filter({ hasText: /John Smith/ });
    await expect(customerNameHeading).toBeVisible();

    // Verify Grand Total shows
    const grandTotal = page
      .locator("heading")
      .filter({ hasText: /Grand Total/ });
    await expect(grandTotal).toBeVisible();
  });

  test.fixme("Create Order with Order Ref # Field", async ({ page }) => {
    // 1. Open Create New Order dialog
    await page.goto("https://dev.quote2cash.app");
    await page
      .getByRole("textbox", { name: "Enter a valid username" })
      .fill("bvl");
    await page
      .getByRole("textbox", { name: "Enter a valid password" })
      .fill("demo");
    await page.getByRole("button", { name: "Login" }).click();

    await new Promise((f) => setTimeout(f, 3 * 1000));

    await page.getByText("Create", { exact: true }).click();
    await page.getByText("New Order").click();

    await new Promise((f) => setTimeout(f, 2 * 1000));

    // 2. Fill: First Name: Jennifer, Last Name: Davis
    await page.getByRole("textbox", { name: "First Name" }).fill("Jennifer");
    await page.getByRole("textbox", { name: "Last Name" }).fill("Davis");

    // 3. Fill: Email: test2@example.com, Phone: 5554321098
    await page
      .getByRole("textbox", { name: "Email" })
      .fill("test2@example.com");
    await page.getByRole("textbox", { name: "Phone" }).fill("5554321098");

    // 4. Fill: Order Ref #: ORD-TEST-2024
    const orderRefInput = page.getByRole("textbox", { name: /Order Ref/ });
    await orderRefInput.fill("ORD-TEST-2024");

    // 5. Click Save and confirm order creation
    const saveButton = page
      .locator('[role="dialog"] button')
      .filter({ hasText: /Save/ });
    await saveButton.click();

    await new Promise((f) => setTimeout(f, 3 * 1000));

    const okButton = page.getByRole("button", { name: "Ok" });
    await expect(okButton).toBeVisible();
    await okButton.click();

    await new Promise((f) => setTimeout(f, 3 * 1000));

    // Verify order created
    await expect(page).toHaveURL(/jobDetail/);
    const customerName = page
      .locator("heading")
      .filter({ hasText: /Jennifer Davis/ });
    await expect(customerName).toBeVisible();
  });

  test.fixme("Validate Mandatory Field Requirements", async ({ page }) => {
    // 1. Open Create New Order dialog
    await page.goto("https://dev.quote2cash.app");
    await page
      .getByRole("textbox", { name: "Enter a valid username" })
      .fill("bvl");
    await page
      .getByRole("textbox", { name: "Enter a valid password" })
      .fill("demo");
    await page.getByRole("button", { name: "Login" }).click();

    await new Promise((f) => setTimeout(f, 3 * 1000));

    await page.getByText("Create", { exact: true }).click();
    await page.getByText("New Order").click();

    await new Promise((f) => setTimeout(f, 2 * 1000));

    // 2. Try to save without filling any fields
    let saveButton = page
      .locator('[role="dialog"] button')
      .filter({ hasText: /Save/ });
    const saveEnabled = await saveButton.isEnabled();

    if (saveEnabled) {
      // If Save is enabled, click it and check for validation
      await saveButton.click();
      await new Promise((f) => setTimeout(f, 1 * 1000));

      // Dialog should still be visible with error
      const dialog = page.locator('[role="dialog"]').first();
      await expect(dialog).toBeVisible();
    }

    // 3. Enter only First Name and try to save
    const firstNameInput = page.getByRole("textbox", { name: "First Name" });
    await firstNameInput.fill("TestFirst");

    saveButton = page
      .locator('[role="dialog"] button')
      .filter({ hasText: /Save/ });
    const canSave = await saveButton.isEnabled();

    if (canSave) {
      await saveButton.click();
      await new Promise((f) => setTimeout(f, 1 * 1000));

      // Dialog should still be visible - form incomplete
      const dialog = page.locator('[role="dialog"]').first();
      await expect(dialog).toBeVisible();
    }

    // 4. Enter all mandatory fields - verify save succeeds
    await page.getByRole("textbox", { name: "Last Name" }).fill("TestLast");
    await page
      .getByRole("textbox", { name: "Email" })
      .fill("test@validation.com");
    await page.getByRole("textbox", { name: "Phone" }).fill("1234567890");

    saveButton = page
      .locator('[role="dialog"] button')
      .filter({ hasText: /Save/ });
    await expect(saveButton).toBeEnabled();

    await saveButton.click();

    await new Promise((f) => setTimeout(f, 3 * 1000));

    // Verify confirmation dialog and success
    const confirmationDialog = page
      .locator("heading")
      .filter({ hasText: /Confirmation/ });
    await expect(confirmationDialog).toBeVisible();
  });
});
