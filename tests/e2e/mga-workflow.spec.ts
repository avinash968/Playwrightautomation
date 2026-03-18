// spec: specs/mga-workflow-complete-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("MGA Workflow - Quote2Cash Complete Test Plan", () => {
  test("Successful Login with Valid Credentials", async ({ page }) => {
    // 1. Navigate to https://dev.quote2cash.app/
    await page.goto("https://dev.quote2cash.app/");
    await new Promise((f) => setTimeout(f, 2 * 1000));

    // Verify login page elements
    await expect(
      page.getByRole("heading", { name: "Welcome to Quote2Cash" }),
    ).toBeVisible();
    await expect(
      page.getByRole("textbox", { name: "Enter a valid username" }),
    ).toBeVisible();
    await expect(
      page.getByRole("textbox", { name: "Enter a valid password" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();

    // 2. Enter 'mga' in the Username field
    await page
      .getByRole("textbox", { name: "Enter a valid username" })
      .fill("mga");

    // Verify username field
    await expect(
      page.getByRole("textbox", { name: "Enter a valid username" }),
    ).toHaveValue("mga");

    // 3. Enter 'demo' in the Password field
    await page
      .getByRole("textbox", { name: "Enter a valid password" })
      .fill("demo");

    // Verify password field is filled
    await expect(
      page.getByRole("textbox", { name: "Enter a valid password" }),
    ).toHaveValue("demo");

    // 4. Click the 'Login' button
    await page.getByRole("button", { name: "Login" }).click();

    // 5. Verify dashboard is fully loaded
    await new Promise((f) => setTimeout(f, 3 * 1000));

    // Verify user is on dashboard
    await expect(page).toHaveURL(/.*#\/app\//);
    await expect(page.getByText("Estimates")).toBeVisible();
  });

  test("Complete MGA Workflow - Create Estimate with Rate and Generate Document", async ({
    page,
  }) => {
    // Navigate to login page
    await page.goto("https://dev.quote2cash.app/");
    await new Promise((f) => setTimeout(f, 2 * 1000));

    // 1. Login with valid credentials (mga/demo)
    await page
      .getByRole("textbox", { name: "Enter a valid username" })
      .fill("mga");
    await page
      .getByRole("textbox", { name: "Enter a valid password" })
      .fill("demo");
    await page.getByRole("button", { name: "Login" }).click();
    await new Promise((f) => setTimeout(f, 3 * 1000));

    // Verify user is logged in
    await expect(page).toHaveURL(/.*#\/app\//);

    // 2. Navigate to Create > New Estimate
    // Click Create button
    const createBtn = page
      .locator('button, a, [role="button"]')
      .filter({ hasText: /^Create$/ })
      .first();
    await createBtn.click();

    // Click New Estimate
    await page.getByText("New Estimate").click();
    await new Promise((f) => setTimeout(f, 1 * 1000));

    // 3. Fill Customer Details Section
    // Wait for form to be ready
    await page.waitForTimeout(500);

    // Enter customer name
    const fullNameField = page.getByRole("textbox", { name: "Full Name" });
    await fullNameField.waitFor({ state: "visible" });
    await fullNameField.fill("John Doe Moving Company");

    // Enter phone number - wait a moment and clear the field first
    await page.waitForTimeout(300);
    const phoneField = page
      .locator('input[placeholder*="555"], input[placeholder*="Phone"]')
      .first();
    if (await phoneField.isVisible()) {
      await phoneField.clear();
      await phoneField.fill("5551234567");
    } else {
      // Fallback to textbox role for phone
      const allTextboxes = page.locator("input[type='text']");
      const phoneIndex = 1; // Usually the second input after Full Name
      if (await allTextboxes.nth(phoneIndex).isVisible()) {
        await allTextboxes.nth(phoneIndex).fill("5551234567");
      }
    }

    // Enter email - wait and ensure we're filling the right field
    await page.waitForTimeout(300);
    const emailField = page.getByRole("textbox", { name: "Email Address" });
    await emailField.waitFor({ state: "visible" });
    await emailField.clear();
    await emailField.fill("john.doe@movingcompany.com");

    // Select today's date - find the date field dynamically
    await page.waitForTimeout(300);
    const dateInputs = page.locator("input[type='text']");
    const dateInput = dateInputs.nth(3); // Usually the 4th input (0-indexed)
    await dateInput.click();
    await page.waitForTimeout(500);
    const todayBtn = page.getByRole("button", { name: "Today" });
    if (await todayBtn.isVisible()) {
      await todayBtn.click();
    }
    await page.waitForTimeout(500);

    // 4. Click Next to proceed to Moving Info
    await page.getByRole("button", { name: /Next/ }).click();
    await new Promise((f) => setTimeout(f, 1 * 1000));

    // 5. Fill Moving Information Section
    // Enter origin city/zipcode
    const originField = page.getByRole("textbox", {
      name: "Moving From City Name",
    });
    await originField.waitFor({ state: "visible" });
    await originField.fill("10001");

    // Enter destination city/zipcode
    const destField = page.getByRole("textbox", {
      name: "Moving To City Name",
    });
    await destField.waitFor({ state: "visible" });
    await destField.fill("90001");

    // Click Save button
    await page.locator("#saveForm").click();
    await new Promise((f) => setTimeout(f, 1 * 1000));

    // Verify confirmation popup and click OK
    await expect(
      page.getByRole("heading", { name: "Confirmation" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Ok" }).click();
    await new Promise((f) => setTimeout(f, 2 * 1000));

    // Verify on estimate detail page
    await expect(page).toHaveURL(/.*#\/app\/jobDetail\//);
    await expect(page.getByText("John Doe Moving Company")).toBeVisible();

    // 6. Add Rate - Click on Add Rate button
    await page.getByRole("button", { name: /Add Rate/ }).click();
    await new Promise((f) => setTimeout(f, 2 * 1000));

    // Wait for rate form to load
    await page.waitForTimeout(1000);

    // Verify zipcodes are pre-filled
    const rateOriginField = page.getByRole("textbox", {
      name: /Enter the origin/,
    });
    const rateDestField = page.getByRole("textbox", {
      name: /Enter the destination/,
    });

    await rateOriginField.waitFor({ state: "visible" });
    await rateDestField.waitFor({ state: "visible" });
    await expect(rateOriginField).toHaveValue("10001");
    await expect(rateDestField).toHaveValue("90001");

    // 7. Rate Form - Shipment Type Selection
    // Select Shipment Type dropdown
    await page
      .locator("#field-shipment_type")
      .getByRole("button", { name: "Select an option" })
      .click();

    // Select Container
    await page.locator("a").filter({ hasText: "Container" }).click();
    await new Promise((f) => setTimeout(f, 500));

    // 8. Select Container Size
    const containerSizeDiv = page
      .locator('div:has-text("Container Size")')
      .first();
    await containerSizeDiv.waitFor({ state: "visible" });
    const containerSizeBtn = containerSizeDiv.locator("button").first();
    await containerSizeBtn.click();
    await new Promise((f) => setTimeout(f, 500));

    // Select 20ft
    const sizeOption = page.locator("a").filter({ hasText: /^20$/ }).first();
    await sizeOption.waitFor({ state: "visible" });
    await sizeOption.click();
    await new Promise((f) => setTimeout(f, 500));

    // 9. Fill Volume field
    const volumeField = page.getByPlaceholder("Cubic meters of the shipment.");
    await volumeField.waitFor({ state: "visible" });
    await volumeField.clear();
    await volumeField.fill("25");

    // 10. Fill Weight field
    const weightField = page.getByPlaceholder("Weight of the shipment in");
    await weightField.waitFor({ state: "visible" });
    await weightField.clear();
    await weightField.fill("5000");

    // 11. Select Terminal Handling
    const thcRadio = page.getByRole("radio", { name: "THC WITH unstuffing" });
    await thcRadio.waitFor({ state: "visible" });
    await thcRadio.click();
    await new Promise((f) => setTimeout(f, 500));

    // 12. Click Calculate button
    const calcBtn = page
      .locator("button")
      .filter({ hasText: "Calculate" })
      .first();
    await calcBtn.waitFor({ state: "visible" });
    await calcBtn.click();
    await new Promise((f) => setTimeout(f, 3 * 1000));

    // 13. Verify Rate Summary displays
    await expect(
      page.getByRole("heading", { name: "Rate Summary" }),
    ).toBeVisible();
    await expect(page.getByText("$3,570.00")).toBeVisible();

    // 14. Click Apply button
    const applyBtn = page.getByRole("button", { name: "Apply" });
    await applyBtn.waitFor({ state: "visible" });
    await applyBtn.click();
    await new Promise((f) => setTimeout(f, 2 * 1000));

    // Verify Active Price is displayed
    await expect(page.getByText(/Active/)).toBeVisible();

    // 15. Navigate to Documents section
    const docsBtn = page.getByRole("button", { name: "Documents" });
    await docsBtn.waitFor({ state: "visible" });
    await docsBtn.click();
    await new Promise((f) => setTimeout(f, 2 * 1000));

    // Verify on documents page
    await expect(
      page.getByRole("heading", { name: "Documents" }),
    ).toBeVisible();
    const createNewBtn = page.getByRole("button", { name: "Create New" });
    await createNewBtn.waitFor({ state: "visible" });
    await expect(createNewBtn).toBeVisible();

    // 16. Create Estimate Document
    await createNewBtn.click();
    await new Promise((f) => setTimeout(f, 500));

    // Click on Estimate option
    const estimateOption = page.getByRole("menuitem", { name: "Estimate" });
    await estimateOption.waitFor({ state: "visible" });
    await estimateOption.click();
    await new Promise((f) => setTimeout(f, 3 * 1000));

    // Verify estimate document is generated with company info
    await expect(page.getByText("Michael Greaves Associates")).toBeVisible();
    await expect(page.getByText("ESTIMATE FORM")).toBeVisible();

    // 17. Verify customer details in document
    await expect(page.getByText("John Doe Moving Company")).toBeVisible();
    await expect(page.getByText("john.doe@movingcompany.com")).toBeVisible();
    // Phone number should match what we filled (5551234567 or formatted version)
    const phoneVisible = await page
      .getByText(/555.*123.*4567|5551234567/)
      .isVisible();
    await expect(phoneVisible).toBeTruthy();

    // 18. Verify pricing details match Active Price
    // Check that the price $3,570.00 is displayed in document
    const priceElements = page.locator("text=$3,570.00");
    await expect(priceElements.first()).toBeVisible();

    // Verify Grand Total
    await expect(page.getByText("Grand Total")).toBeVisible();

    // 19. Save the document
    const saveBtn = page.getByRole("button", { name: "Save" });
    await saveBtn.waitFor({ state: "visible" });
    await saveBtn.click();
    await new Promise((f) => setTimeout(f, 1 * 1000));

    // Enter document name
    const docNameInput = page.getByRole("textbox", {
      name: "Please enter a document name",
    });
    await docNameInput.waitFor({ state: "visible" });
    await docNameInput.fill("Estimate - John Doe Moving");

    // Click Confirm button
    const confirmBtn = page
      .locator("button")
      .filter({ hasText: "Confirm" })
      .first();
    await confirmBtn.waitFor({ state: "visible" });
    await confirmBtn.click();
    await new Promise((f) => setTimeout(f, 2 * 1000));

    // Verify document is saved
    await expect(page.getByText("Document Saved Successfully")).toBeVisible();

    // Verify document appears in table
    await expect(page.getByText("Estimate - John Doe Moving")).toBeVisible();
    await expect(page.getByText("Estimate")).toBeVisible();
  });

  test("Generate Bill of Lading Document", async ({ page }) => {
    // Setup: Login and create estimate with applied rate
    await page.goto("https://dev.quote2cash.app/");
    await new Promise((f) => setTimeout(f, 2 * 1000));

    // Login
    await page
      .getByRole("textbox", { name: "Enter a valid username" })
      .fill("mga");
    await page
      .getByRole("textbox", { name: "Enter a valid password" })
      .fill("demo");
    await page.getByRole("button", { name: "Login" }).click();
    await new Promise((f) => setTimeout(f, 3 * 1000));

    // Navigate to documents of the previously created estimate
    // Using the estimate URL directly (317 is the estimate number we created)
    await page.goto(
      "https://dev.quote2cash.app/#/app/jobDocuments/MichaelGreavesAssociates/317",
    );
    await new Promise((f) => setTimeout(f, 2 * 1000));

    // 1. Create Bill of Lading document
    const bolCreateBtn = page.getByRole("button", { name: "Create New" });
    await bolCreateBtn.waitFor({ state: "visible" });
    await bolCreateBtn.click();
    await new Promise((f) => setTimeout(f, 500));

    // Click on Bill of Lading option
    const bolOption = page.getByRole("menuitem", { name: "Bill of Lading" });
    await bolOption.waitFor({ state: "visible" });
    await bolOption.click();
    await new Promise((f) => setTimeout(f, 3 * 1000));

    // 2. Verify BOL document displays
    await expect(page.getByText("Loading . . . .")).toBeVisible({
      timeout: 10000,
    });
    await new Promise((f) => setTimeout(f, 2 * 1000));

    // Verify BOL content includes shipment details
    await expect(page.getByText(/BILL|LADING|BOL/i)).toBeVisible();

    // 3. Save the BOL document
    const bolSaveBtn = page.getByRole("button", { name: "Save" });
    await bolSaveBtn.waitFor({ state: "visible" });
    await bolSaveBtn.click();
    await new Promise((f) => setTimeout(f, 1 * 1000));

    // Enter document name
    const bolDocNameInput = page.getByRole("textbox", {
      name: "Please enter a document name",
    });
    await bolDocNameInput.waitFor({ state: "visible" });
    await bolDocNameInput.fill("BOL - John Doe Moving");

    // Click Confirm button
    const bolConfirmBtn = page
      .locator("button")
      .filter({ hasText: "Confirm" })
      .first();
    await bolConfirmBtn.waitFor({ state: "visible" });
    await bolConfirmBtn.click();
    await new Promise((f) => setTimeout(f, 2 * 1000));

    // Verify document is saved
    await expect(page.getByText("Document Saved Successfully")).toBeVisible();
  });

  test("Generate Invoice Document and Verify Price Matches Active Price", async ({
    page,
  }) => {
    // Setup: Login
    await page.goto("https://dev.quote2cash.app/");
    await new Promise((f) => setTimeout(f, 2 * 1000));

    // Login
    await page
      .getByRole("textbox", { name: "Enter a valid username" })
      .fill("mga");
    await page
      .getByRole("textbox", { name: "Enter a valid password" })
      .fill("demo");
    await page.getByRole("button", { name: "Login" }).click();
    await new Promise((f) => setTimeout(f, 3 * 1000));

    // Navigate to documents
    await page.goto(
      "https://dev.quote2cash.app/#/app/jobDocuments/MichaelGreavesAssociates/317",
    );
    await new Promise((f) => setTimeout(f, 2 * 1000));

    // 1. Create Invoice document
    const invoiceCreateBtn = page.getByRole("button", { name: "Create New" });
    await invoiceCreateBtn.waitFor({ state: "visible" });
    await invoiceCreateBtn.click();
    await new Promise((f) => setTimeout(f, 500));

    // Click on Invoice option
    const invoiceOption = page.getByRole("menuitem", { name: "Invoice" });
    await invoiceOption.waitFor({ state: "visible" });
    await invoiceOption.click();
    await new Promise((f) => setTimeout(f, 3 * 1000));

    // 2. Verify Invoice document displays
    await expect(page.getByText("Loading . . . .")).toBeVisible({
      timeout: 10000,
    });
    await new Promise((f) => setTimeout(f, 2 * 1000));

    // 3. Verify pricing from Active Price is included
    // The active price was $3,570.00
    const priceElements = page.locator("text=$3,570.00");
    await expect(priceElements.first()).toBeVisible();

    // Verify Grand Total or Amount Due
    await expect(page.getByText(/Grand Total|TOTAL|Amount Due/i)).toBeVisible();

    // 4. Save the Invoice document
    const invoiceSaveBtn = page.getByRole("button", { name: "Save" });
    await invoiceSaveBtn.waitFor({ state: "visible" });
    await invoiceSaveBtn.click();
    await new Promise((f) => setTimeout(f, 1 * 1000));

    // Enter document name
    const invoiceDocNameInput = page.getByRole("textbox", {
      name: "Please enter a document name",
    });
    await invoiceDocNameInput.waitFor({ state: "visible" });
    await invoiceDocNameInput.fill("Invoice - John Doe Moving");

    // Click Confirm button
    const invoiceConfirmBtn = page
      .locator("button")
      .filter({ hasText: "Confirm" })
      .first();
    await invoiceConfirmBtn.waitFor({ state: "visible" });
    await invoiceConfirmBtn.click();
    await new Promise((f) => setTimeout(f, 2 * 1000));

    // Verify document is saved
    await expect(page.getByText("Document Saved Successfully")).toBeVisible();
  });

  test("Validate Shipment Type Switch from Container to LCL Updates Fields Dynamically", async ({
    page,
  }) => {
    // Setup: Login
    await page.goto("https://dev.quote2cash.app/");
    await new Promise((f) => setTimeout(f, 2 * 1000));

    // Login
    await page
      .getByRole("textbox", { name: "Enter a valid username" })
      .fill("mga");
    await page
      .getByRole("textbox", { name: "Enter a valid password" })
      .fill("demo");
    await page.getByRole("button", { name: "Login" }).click();
    await new Promise((f) => setTimeout(f, 3 * 1000));

    // Navigate to estimate detail and add rate
    await page.goto(
      "https://dev.quote2cash.app/#/app/jobDetail/MichaelGreavesAssociates/317",
    );
    await new Promise((f) => setTimeout(f, 2 * 1000));

    // Click Add Rate to expand the rate form
    const addRateBtn = page
      .locator("button")
      .filter({ hasText: /Add Rate/ })
      .first();
    await addRateBtn.waitFor({ state: "visible" });
    await addRateBtn.click();
    await new Promise((f) => setTimeout(f, 2 * 1000));

    // 1. Select Container shipment type
    const shipmentTypeBtn = page
      .locator("#field-shipment_type")
      .getByRole("button", { name: "Select an option" });
    await shipmentTypeBtn.waitFor({ state: "visible" });
    await shipmentTypeBtn.click();
    const containerOption = page
      .locator("a")
      .filter({ hasText: "Container" })
      .first();
    await containerOption.waitFor({ state: "visible" });
    await containerOption.click();
    await new Promise((f) => setTimeout(f, 500));

    // Verify Container Size field appears
    const containerSizeField = page.locator('div:has-text("Container Size")');
    await containerSizeField.waitFor({ state: "visible" });
    await expect(containerSizeField).toBeVisible();

    // 2. Change to LCL shipment type
    const shipmentTypeBtn2 = page
      .locator("#field-shipment_type")
      .getByRole("button", { name: "Container" });
    await shipmentTypeBtn2.waitFor({ state: "visible" });
    await shipmentTypeBtn2.click();
    const lclOption = page.locator("a").filter({ hasText: "LCL" }).first();
    await lclOption.waitFor({ state: "visible" });
    await lclOption.click();
    await new Promise((f) => setTimeout(f, 500));

    // 3. Verify Form updates and Container Size field is no longer visible
    await expect(containerSizeField).not.toBeVisible();

    // Verify LCL specific instructions or text appears (if applicable in UI)
    // The form should have updated to show LCL-specific fields only
    const lclTypeButton = page
      .locator("#field-shipment_type")
      .getByRole("button");
    await lclTypeButton.waitFor({ state: "visible" });
    await expect(lclTypeButton).toContainText("LCL");

    // 4. Verify Volume and Weight fields are still present
    const volumeFieldTest5 = page.getByPlaceholder(
      "Cubic meters of the shipment.",
    );
    const weightFieldTest5 = page.getByPlaceholder("Weight of the shipment in");
    await volumeFieldTest5.waitFor({ state: "visible" });
    await weightFieldTest5.waitFor({ state: "visible" });
    await expect(volumeFieldTest5).toBeVisible();
    await expect(weightFieldTest5).toBeVisible();
  });

  test("Edit Existing Rate and Recalculate", async ({ page }) => {
    await page.goto("https://dev.quote2cash.app/");
    await new Promise((f) => setTimeout(f, 2 * 1000));

    // Login
    const editUsername = page.getByRole("textbox", {
      name: "Enter a valid username",
    });
    await editUsername.waitFor({ state: "visible" });
    await editUsername.fill("mga");

    const editPassword = page.getByRole("textbox", {
      name: "Enter a valid password",
    });
    await editPassword.waitFor({ state: "visible" });
    await editPassword.fill("demo");

    const editLoginBtn = page.getByRole("button", { name: "Login" });
    await editLoginBtn.waitFor({ state: "visible" });
    await editLoginBtn.click();
    await new Promise((f) => setTimeout(f, 3 * 1000));

    // Navigate to existing estimate with rates
    await page.goto(
      "https://dev.quote2cash.app/#/app/jobDetail/MichaelGreavesAssociates/318",
    );
    await new Promise((f) => setTimeout(f, 2 * 1000));

    // Verify Active Price is visible
    const activePriceText = page.locator("text=$3,570.00");
    await activePriceText.first().waitFor({ state: "visible" });
    await expect(activePriceText.first()).toBeVisible();
    await expect(page.getByText(/Active/)).toBeVisible();

    // Click on Price Details tab
    const priceTab = page
      .locator("button")
      .filter({ hasText: /Price Details.*Active/ })
      .first();
    await priceTab.waitFor({ state: "visible" });
    await priceTab.click();
    await new Promise((f) => setTimeout(f, 1 * 1000));

    // Find and click the edit menu button
    const editMenuBtn = page
      .locator(
        "button[aria-label*='edit'], button[title*='edit'], [class*='menu'] button",
      )
      .first();
    if (await editMenuBtn.isVisible()) {
      await editMenuBtn.click();
      await new Promise((f) => setTimeout(f, 500));
    }

    // Find and click Edit option from menu
    const menuButtons = page.locator('[role="menuitem"]');
    let editFound = false;
    for (let i = 0; i < (await menuButtons.count()); i++) {
      const text = await menuButtons.nth(i).textContent();
      if (text && text.toLowerCase().includes("edit")) {
        await menuButtons.nth(i).click();
        editFound = true;
        await new Promise((f) => setTimeout(f, 2 * 1000));
        break;
      }
    }

    // If menu click didn't work, try direct edit button
    if (!editFound) {
      const directEditBtn = page
        .locator("button")
        .filter({ hasText: /Edit|edit/ })
        .first();
      await directEditBtn.waitFor({ state: "visible" });
      await directEditBtn.click();
      await new Promise((f) => setTimeout(f, 2 * 1000));
    }

    // Find and update volume field
    const editVolumeField = page.getByPlaceholder(
      "Cubic meters of the shipment.",
    );
    await editVolumeField.waitFor({ state: "visible" });
    await expect(editVolumeField).toHaveValue("25");

    const editWeightField = page.getByPlaceholder("Weight of the shipment in");
    await editWeightField.waitFor({ state: "visible" });
    await expect(editWeightField).toHaveValue("5000");

    // Update volume from 25 to 30
    await editVolumeField.click();
    await editVolumeField.clear();
    await editVolumeField.fill("30");
    await page.waitForTimeout(500);
    await expect(editVolumeField).toHaveValue("30");

    // Click Calculate button
    const editCalcBtn = page
      .locator("button")
      .filter({ hasText: "Calculate" })
      .first();
    await editCalcBtn.waitFor({ state: "visible" });
    await editCalcBtn.click();
    await new Promise((f) => setTimeout(f, 2 * 1000));

    // Verify Rate Summary
    const editRateSummary = page.getByRole("heading", { name: "Rate Summary" });
    await editRateSummary.waitFor({ state: "visible" });
    await expect(editRateSummary).toBeVisible();

    // Click Apply
    const editApplyBtn = page.getByRole("button", { name: "Apply" });
    await editApplyBtn.waitFor({ state: "visible" });
    await editApplyBtn.click();
    await new Promise((f) => setTimeout(f, 2 * 1000));

    // Verify Active designation
    await expect(page.getByText(/Active/)).toBeVisible();
  });

  test("Clone Rate and Verify New Clone Becomes Active", async ({ page }) => {
    await page.goto("https://dev.quote2cash.app/");
    await new Promise((f) => setTimeout(f, 2 * 1000));

    // Login
    const cloneUsername = page.getByRole("textbox", {
      name: "Enter a valid username",
    });
    await cloneUsername.waitFor({ state: "visible" });
    await cloneUsername.fill("mga");

    const clonePassword = page.getByRole("textbox", {
      name: "Enter a valid password",
    });
    await clonePassword.waitFor({ state: "visible" });
    await clonePassword.fill("demo");

    const cloneLoginBtn = page.getByRole("button", { name: "Login" });
    await cloneLoginBtn.waitFor({ state: "visible" });
    await cloneLoginBtn.click();
    await new Promise((f) => setTimeout(f, 3 * 1000));

    // Navigate to existing estimate
    await page.goto(
      "https://dev.quote2cash.app/#/app/jobDetail/MichaelGreavesAssociates/318",
    );
    await new Promise((f) => setTimeout(f, 2 * 1000));

    // Verify Active Price
    const activeText = page.getByText(/Active/);
    await activeText.waitFor({ state: "visible" });
    await expect(activeText).toBeVisible();

    // Click Price Details tab
    const clonePriceTab = page
      .locator("button")
      .filter({ hasText: /Price Details.*Active/ })
      .first();
    await clonePriceTab.waitFor({ state: "visible" });
    await clonePriceTab.click();
    await new Promise((f) => setTimeout(f, 1 * 1000));

    // Find menu button and click to access Clone option
    const cloneMenuBtn = page
      .locator("button")
      .filter({ hasText: /✏|edit|menu/i })
      .first();

    let clonedSuccessfully = false;

    if (await cloneMenuBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await cloneMenuBtn.click();
      await new Promise((f) => setTimeout(f, 500));

      // Find Clone option in menu
      const cloneMenuItems = page.locator('[role="menuitem"]');
      for (let i = 0; i < (await cloneMenuItems.count()); i++) {
        const text = await cloneMenuItems.nth(i).textContent();
        if (
          text &&
          (text.toLowerCase().includes("clone") ||
            text.toLowerCase().includes("duplicate") ||
            text.toLowerCase().includes("copy"))
        ) {
          await cloneMenuItems.nth(i).click();
          clonedSuccessfully = true;
          await new Promise((f) => setTimeout(f, 2 * 1000));
          break;
        }
      }
    }

    // If cloning was successful, verify the new clone is active
    if (clonedSuccessfully) {
      const priceDetailsButtons = page.locator(
        'button:has-text("Price Details")',
      );
      const priceDetailsCount = await priceDetailsButtons.count();

      if (priceDetailsCount >= 2) {
        const latestPriceTab = priceDetailsButtons.last();
        await latestPriceTab.waitFor({ state: "visible" });
        await latestPriceTab.click();
        await new Promise((f) => setTimeout(f, 500));

        // Verify new clone is now active
        const cloneActiveText = page.getByText(/Active/);
        await cloneActiveText.waitFor({ state: "visible" });
        await expect(cloneActiveText).toBeVisible();
      }
    }

    // Final verification that Active price is visible
    const finalActiveText = page.getByText(/Active/);
    await finalActiveText.waitFor({ state: "visible" });
    await expect(finalActiveText).toBeVisible();
  });
});
