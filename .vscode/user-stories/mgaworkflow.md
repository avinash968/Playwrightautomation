# Story Title

As a Sales Representative, I want to create a new estimate, configure
shipment rates, and generate shipping documents so that I can provide
accurate pricing and verified documentation for international moves.

---

# Story Description

Implement a complete end-to-end estimate and rate management flow that
allows sales representatives to create estimates, enter customer and
moving details, configure shipment rates based on shipment type
(Container, LCL, Air), apply and manage pricing, and generate official
shipping documents (Estimate, Bill of Lading, Invoice). The workflow
should be intuitive, validate all mandatory fields dynamically, and
ensure document pricing always reflects the active rate.

---

# Application URL

https://dev.quote2cash.app

---

# Test Credentials

Username: mga
Password: demo

---

# Acceptance Criteria

## AC1: Authentication & Dashboard Access

GIVEN I navigate to https://dev.quote2cash.app
WHEN I enter valid credentials (username: mga, password: demo)
THEN I should be authenticated successfully
AND I should see the Dashboard with all expected widgets and modules visible

---

## AC2: Create New Estimate

GIVEN I am on the Dashboard
WHEN I navigate to the Estimate Detail page
AND I click on "Create" → "New Estimate"
THEN a new estimate creation form should open

---

## AC3: Customer Details & Job Date Entry

GIVEN the New Estimate form is open
WHEN I fill in valid Customer Details
AND I set the Required Job Date to today's date
AND I click the "Next" button
THEN the system should accept all inputs without validation errors
AND I should be navigated to the Moving Info section

---

## AC4: Moving Info – Origin & Destination Entry

GIVEN I am on the Moving Info section
WHEN I enter "10001" as the Moving From zip code
AND I enter "90001" as the Moving To zip code
AND I click the "Save" button
THEN a Confirmation popup should appear
WHEN I click "OK" on the popup
THEN the moving details should be saved
AND I should be redirected to the Order Detail page
AND the Order Detail page should display all entered details correctly
AND the "Add Rate" button should be visible and clickable

---

## AC5: Rate Form – Zip Code Pre-fill Validation

GIVEN I am on the Order Detail page
WHEN I click the "Add Rate" button
THEN the Rate form should open
AND the Origin Zip Code field should be pre-filled with "10001"
AND the Destination Zip Code field should be pre-filled with "90001"

---

## AC6: Shipment Type – Container

GIVEN the Rate form is open
WHEN I select "Container" from the Shipment Type dropdown
THEN the following mandatory fields should be visible and required:

- Container Size (dropdown – any valid option must be selected)
- Volume (CBM) – valid numeric value required
- Weight (LBS) – valid numeric value required
- Terminal Handling Charges – one radio button must be selected
- Shuttle Service Details – one radio button must be selected
  - IF "By Trip" is selected THEN Trip Count field becomes mandatory
- Handling & Accessorials – one or more checkboxes can be selected
- Uncrating – Number of Crates – required input fields must be filled
- Handyman Services Details – one radio button must be selected
  - Sub-fields under the selected category must be filled
- Storage & Detention:
  - Enable Storage checkbox must be toggled on
  - Remaining input fields become visible and must be filled
- Special Items – one or more checkboxes can be selected
- Motorcycle / Duties & Taxes – all required fields must be filled
  WHEN I fill all mandatory fields and click "Calculate"
  THEN the Rate Summary should be displayed with a full breakdown

---

## AC7: Shipment Type – LCL

GIVEN the Rate form is open
WHEN I select "LCL" from the Shipment Type dropdown
THEN Container Size should NOT be a mandatory field
AND all other applicable mandatory fields from AC6 should apply
AND the user should be able to fill all required fields and proceed to Calculate

---

## AC8: Shipment Type – Air

GIVEN the Rate form is open
WHEN I select "Air" from the Shipment Type dropdown
THEN Container Size should NOT be a mandatory field
AND all other applicable mandatory fields from AC6 should apply
AND the user should be able to fill all required fields and proceed to Calculate

---

## AC9: Rate Calculation & Summary Validation

GIVEN all mandatory fields for the selected shipment type are filled
WHEN I click the "Calculate" button
THEN the Rate Summary section should display a full line item breakdown
AND Taxes and Duties should be shown if applicable based on the input
AND Refundable Deposits should be shown if applicable based on the input
AND the Description of Service section should list ALL selected line items
AND every checkbox and option selected must appear as a line item
in the Description of Service

---

## AC10: Apply Rate & Active Price Assertion

GIVEN the Rate Summary is displayed after calculation
WHEN I click the "Apply" button
THEN the rate should be saved and set as the Active Price
AND the Active Price displayed on the Order Detail page must exactly
match the total shown in the Rate Summary

---

## AC11: Edit Rate

GIVEN an Active Price exists on the Order Detail page
WHEN I click the 3-dot menu (⋮) next to the Active Price
AND I select "Edit Rate"
THEN the rate form should open pre-populated with existing values
WHEN I edit any value and click "Calculate" then "Apply"
THEN the Active Price should update to reflect the new calculated value
AND the updated price should be visible on the Order Detail page

---

## AC12: Clone Price

GIVEN an Active Price exists on the Order Detail page
WHEN I click the 3-dot menu (⋮) next to the Active Price
AND I select "Clone Price Details"
AND I click "Confirm" on the confirmation dialog
THEN a new cloned price entry should be created
AND the newly cloned price should automatically be set as the Active Price
AND the previous price should no longer be marked as active

---

## AC13: Document Generation – Estimate

GIVEN I am on the Order Detail page with an Active Price set
WHEN I click the "Documents" button → "Create New"
AND I select "Estimate" as the document type
THEN the Estimate document should be generated successfully
AND the price shown in the document must match the current Active Price
AND the company logo must be visible in the document header
AND the document layout and field alignments must be correct with no overlap
AND a "View PDF" option must be available and render the document correctly
WHEN I click "Save"
THEN the document should be saved successfully

---

## AC14: Document Generation – Bill of Lading

GIVEN I am on the Document creation screen
WHEN I select "Bill of Lading" as the document type
THEN the Bill of Lading document should be generated successfully
AND the price shown in the document must match the current Active Price
AND the company logo must be visible in the document header
AND the document layout and field alignments must be correct with no overlap
AND a "View PDF" option must be available and render the document correctly
WHEN I click "Save"
THEN the document should be saved successfully

---

## AC15: Document Generation – Invoice

GIVEN I am on the Document creation screen
WHEN I select "Invoice" as the document type
THEN the Invoice document should be generated successfully
AND the price shown in the document must match the current Active Price
AND the company logo must be visible in the document header
AND the document layout and field alignments must be correct with no overlap
AND a "View PDF" option must be available and render the document correctly
WHEN I click "Save"
THEN the document should be saved successfully

---

# Business Rules

- User must be authenticated to access any part of the estimate workflow
- Required Job Date must default to or accept today's date
- Origin and Destination zip codes must always pre-fill in the Rate form
  based on the Moving Info entered
- Mandatory fields in the Rate form vary dynamically based on selected
  Shipment Type (Container, LCL, Air)
- Container Size is mandatory only when Shipment Type is "Container"
- Trip Count is mandatory only when Shuttle Service "By Trip" is selected
- Storage input fields are visible only when the Storage checkbox is enabled
- Taxes, Duties, and Refundable Deposits appear conditionally based on input
- All selected line items must appear in the Description of Service section
- Active Price must always reflect the most recently applied or cloned rate
- Document prices must always match the current Active Price at time of generation
- Only one price can be active at a time; cloning replaces the current active price

---

# Technical Notes

- Use Playwright for test automation with JavaScript
- Use Page Object Model (POM) pattern for all page interactions
- Test on Chrome as the primary browser
- Use data-testid selectors where available; fall back to role/label selectors
- Avoid hard-coded waits; use waitForSelector or waitForResponse
- Capture screenshots on failure automatically
- Store all test data in a separate testData.js fixture file
- Use Playwright's storageState for session management across tests
- reporter: ['html', 'json', 'list'] in playwright.config.js
- retries: 1, timeout: 30000

---

# Definition of Done

☐ All acceptance criteria (AC1–AC15) have corresponding test cases
☐ Manual exploratory testing completed with screenshots saved
☐ Automated Playwright test scripts created for all ACs
☐ All automated tests passing or healed with documented fixes
☐ Rate Summary and Active Price cross-validation assertions in place
☐ Document price vs Active Price assertions passing for all 3 document types
☐ Test results documented in test-results/SCRUM-101-test-report.md
☐ Bugs logged with severity, steps to reproduce, and screenshots
☐ All artifacts committed to Git repository via GitHub MCP AgentS
