# MGA Workflow - Quote2Cash Complete Test Plan

## Application Overview

Comprehensive test plan for the Quote2Cash application covering the complete MGA workflow from user login through estimate creation, rate calculation, and document generation. This plan validates end-to-end functionality including customer details entry, moving information capture, shipment type selection with dynamic field validation, rate calculation with various accessorial options, and document generation with price verification.

## Test Scenarios

### 1. Authentication & Login

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful Login with Valid Credentials

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Navigate to https://dev.quote2cash.com
    - expect: Login page is displayed
    - expect: Username and password input fields are visible
    - expect: Login button is visible and enabled
  2. Enter username 'mga' in the username field
    - expect: Username is populated in the field
    - expect: No validation error appears
  3. Enter password 'demo' in the password field
    - expect: Password field is masked/hidden
    - expect: No validation error appears
  4. Click the Login button
    - expect: Page loading spinner appears
    - expect: Network request is sent to authenticate user
  5. Wait for page to load completely
    - expect: Dashboard page is displayed
    - expect: Main content area is visible
    - expect: No error messages appear
    - expect: User is successfully authenticated

#### 1.2. Login Rejection with Invalid Credentials

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Navigate to https://dev.quote2cash.com
    - expect: Login page loads successfully
  2. Enter username 'invalid_user' in the username field
    - expect: Username field is populated
  3. Enter password 'wrong_password' in the password field
    - expect: Password field is populated
  4. Click the Login button
    - expect: Loading indicator appears briefly
    - expect: Error message is displayed indicating invalid credentials
  5. Verify error message content
    - expect: Error message contains 'Invalid', 'Incorrect', or 'Failed' text
    - expect: User remains on login page
    - expect: Username and password fields are still editable

#### 1.3. Login Validation with Empty Fields

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Navigate to https://dev.quote2cash.com
    - expect: Login page is displayed
  2. Leave username and password fields empty
    - expect: Both fields remain empty
  3. Attempt to click the Login button
    - expect: Login button is disabled (grayed out)
    - expect: OR validation messages appear indicating required fields are empty
  4. Check field validation if button is enabled
    - expect: Required field error messages appear
    - expect: User is not authenticated
    - expect: Page remains on login screen

#### 1.4. Login with Page Load Delays

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Navigate to https://dev.quote2cash.com with simulated network latency
    - expect: Page begins loading
    - expect: Loading spinner is visible
  2. Wait for page to fully load despite delays
    - expect: Login form becomes visible and interactive
    - expect: All input fields are enabled
    - expect: Login button is clickable
  3. Enter valid credentials while page might still be loading
    - expect: Form accepts input without errors
    - expect: Fields populate correctly
  4. Click Login button
    - expect: Request is sent to server
    - expect: Page navigates to Dashboard after loading completes

### 2. Estimate Creation & Navigation

**Seed:** `tests/seed.spec.ts`

#### 2.1. Navigate from Dashboard to Estimate Creation

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Login with valid credentials (mga/demo)
    - expect: User is authenticated
    - expect: Dashboard page is displayed
  2. Locate and click the 'Create' or 'New Estimate' button on the dashboard
    - expect: Button is visible and clickable
    - expect: Loading indicator appears
    - expect: Estimate detail page starts to load
  3. Verify navigation to estimate creation screen
    - expect: Estimate creation page title appears
    - expect: Form sections are visible
    - expect: Navigation breadcrumbs show current location
  4. Click the 'Create' button to initiate a new estimate
    - expect: New estimate form initializes
    - expect: Customer Details section becomes active
    - expect: Page is ready for data entry

#### 2.2. Estimate Detail Page Loads Successfully

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Login and navigate to estimate creation
    - expect: Dashboard loads after login
  2. Click Create > New Estimate sequence
    - expect: Estimate creation page begins loading
  3. Wait for page to fully render
    - expect: All form sections are visible
    - expect: Customer Details section is displayed with input fields
    - expect: No loading spinners remain
    - expect: Page is fully interactive

### 3. Customer Details Section

**Seed:** `tests/seed.spec.ts`

#### 3.1. Fill Customer Details with Valid Data

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Navigate to the Customer Details section in estimate creation
    - expect: Customer Details form is visible
    - expect: All required input fields are present
  2. Enter customer name 'John Doe Moving Company' in the customer name field
    - expect: Field accepts alphanumeric input
    - expect: Text is displayed in the field
    - expect: No validation errors appear
  3. Enter email 'john.doe@movingcompany.com' in the email field
    - expect: Email field accepts the value
    - expect: Email format is recognized
    - expect: No validation error appears
  4. Enter phone number '+1-555-123-4567' in the phone field
    - expect: Phone field accepts formatted phone number
    - expect: Field properly handles special characters
    - expect: No validation errors
  5. Click on the Request Job Date field
    - expect: Date picker appears or field becomes editable
    - expect: Today's date is highlighted as recommended
  6. Select today's date from the date picker
    - expect: Today's date is populated in the field
    - expect: Date format is correct (YYYY-MM-DD or MM/DD/YYYY)
    - expect: Field shows the selected date
  7. Click the 'Next' button to proceed
    - expect: Next button is enabled
    - expect: Form is validated
    - expect: Page transitions to the next section

#### 3.2. Validate Required Fields Enforcement

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Navigate to Customer Details section
    - expect: Form is displayed
  2. Leave all required fields empty (customer name, email, phone, date)
    - expect: Fields remain empty
  3. Attempt to click the Next button without filling required fields
    - expect: Next button is either disabled or validation messages appear
    - expect: User cannot proceed to next section
  4. Observe validation error messages if displayed
    - expect: Error messages clearly indicate which fields are required
    - expect: Error messages appear near the respective fields or at the top of the form
  5. Fill only one required field and attempt to proceed
    - expect: Incomplete form still cannot be submitted
    - expect: Validation errors persist for unfilled required fields

#### 3.3. Date Picker Accepts Today's Date

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Navigate to Customer Details section
    - expect: Form is displayed
  2. Click on the Request Job Date field
    - expect: Date picker or calendar widget opens
    - expect: Current date is highlighted or marked as 'Today'
  3. Select or confirm today's date
    - expect: Date field is populated with today's date
    - expect: Date format is YYYY-MM-DD
    - expect: No error validation message appears
  4. Verify date is properly stored in the form
    - expect: When viewing the field, today's date is displayed
    - expect: Date remains unchanged after interaction with other fields

#### 3.4. Date Picker Rejects Past Date

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Navigate to Customer Details section
    - expect: Form is displayed
  2. Click on the Request Job Date field
    - expect: Date picker opens
  3. Attempt to select a date from 5 or more days in the past
    - expect: Past dates are either disabled/grayed out in the picker
    - expect: OR date field rejects the past date entry
    - expect: OR an error message appears indicating date cannot be in the past
  4. Verify that past dates cannot be confirmed
    - expect: User cannot select a past date
    - expect: Form validation prevents submission with past date

#### 3.5. Next Button Enabled Only with Complete Data

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Navigate to Customer Details section
    - expect: Form is displayed
    - expect: Next button is visible
  2. Observe Next button state with empty form
    - expect: Next button is disabled (grayed out or non-clickable)
  3. Fill customer name only
    - expect: Next button remains disabled
  4. Add email address
    - expect: Next button remains disabled
  5. Add phone number
    - expect: Next button remains disabled
  6. Select a valid date
    - expect: All required fields are now complete
    - expect: Next button becomes enabled (appears clickable)
  7. Click the enabled Next button
    - expect: Form is validated successfully
    - expect: Page transitions to Moving Information section

### 4. Moving Information Section

**Seed:** `tests/seed.spec.ts`

#### 4.1. Fill Moving Information and Confirm Popup

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Complete Customer Details and navigate to Moving Information section
    - expect: Moving Information section is displayed
    - expect: Moving From and Moving To zipcodes fields are visible
  2. Enter origin zipcode '10001' in the 'Moving From' field
    - expect: Field accepts numeric input
    - expect: Zipcode '10001' is populated in the field
  3. Enter destination zipcode '90001' in the 'Moving To' field
    - expect: Field accepts numeric input
    - expect: Zipcode '90001' is populated in the field
  4. Click the Save button
    - expect: Loading indicator appears
    - expect: Confirmation popup/modal appears on screen
  5. Verify confirmation popup displays
    - expect: Popup title or message is visible
    - expect: OK/Confirm button is displayed
    - expect: Cancel button is available
  6. Click OK button on the confirmation popup
    - expect: Popup closes
    - expect: Page transitions to Order Detail page
    - expect: Loading completes
  7. Verify Order Detail page loads
    - expect: Order details section is visible
    - expect: Zi pcodes are retained from previous entry
    - expect: Add Rate section is accessible

#### 4.2. Zipcodes Pre-fill in Add Rate Section

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Complete Moving Information with origin zipcode 10001 and destination 90001
    - expect: Order Detail page loads
  2. Locate and click the 'Add Rate' button
    - expect: Add Rate form section opens or expands
    - expect: Loading indicates new section is loading
  3. Check the origin zipcode field
    - expect: Origin zipcode field shows '10001'
    - expect: Field is pre-populated from Moving Information
  4. Check the destination zipcode field
    - expect: Destination zipcode field shows '90001'
    - expect: Field is pre-populated from Moving Information
  5. Verify user can modify pre-filled zipcodes if needed
    - expect: Fields are editable
    - expect: User can change values if necessary
    - expect: Changes propagate correctly

#### 4.3. Cancel Confirmation Popup

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Fill Moving Information with zipcodes 10001 and 90001
    - expect: Fields are populated
  2. Click Save button
    - expect: Confirmation popup appears
  3. Click Cancel button on the popup
    - expect: Popup closes without proceeding
    - expect: User remains on Moving Information section
    - expect: Previously entered zipcodes are still visible
  4. Verify data is preserved
    - expect: Zipcodes still show in their respective fields
    - expect: User can modify and re-save

### 5. Rate Form - Shipment Type Selection

**Seed:** `tests/seed.spec.ts`

#### 5.1. Container Shipment Type Complete Flow

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Navigate to Add Rate section after confirming Moving Information
    - expect: Shipment Type dropdown is visible and accessible
  2. Click on Shipment Type dropdown
    - expect: Dropdown opens and displays available options
    - expect: Options include: Container, LCL, Air
  3. Select 'Container' from the dropdown
    - expect: Container option is highlighted and selected
    - expect: Form updates to show Container-specific fields
  4. Verify Container Size dropdown appears
    - expect: Container Size field becomes visible and required
    - expect: Dropdown contains options like 20ft, 40ft, etc.
  5. Select Container Size '20ft'
    - expect: Size is selected and displayed in the field
  6. Fill Volume (CBM) field with valid value '25'
    - expect: Field accepts numeric input
    - expect: Value is displayed in the field
    - expect: No validation error appears
  7. Fill Weight (LBS) field with valid value '5000'
    - expect: Field accepts numeric input
    - expect: Value is displayed
    - expect: No validation error appears
  8. Select Terminal Handling (radio button)
    - expect: Radio button selection is saved
    - expect: Only one option is selected
  9. Verify all mandatory fields for Container type are complete
    - expect: All required fields are populated with valid data
  10. Click the Calculate button
    - expect: Loading indicator appears
    - expect: Rate calculation processes on server
  11. Verify Rate Summary appears with calculated values
    - expect: Rate Summary section is visible
    - expect: Subtotal is displayed
    - expect: Base rate is shown

#### 5.2. LCL Shipment Type Complete Flow

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Navigate to Add Rate section
    - expect: Form is ready for shipment selection
  2. Select 'LCL' from Shipment Type dropdown
    - expect: LCL option is selected
    - expect: Form updates to show LCL-specific fields
    - expect: Container Size field is no longer displayed
  3. Fill Volume field with valid value '15'
    - expect: Volume field accepts input
    - expect: Value is stored correctly
  4. Fill Weight field with valid value '3000'
    - expect: Weight field accepts input
    - expect: Value is stored correctly
  5. Complete any additional LCL-specific required fields
    - expect: All mandatory LCL fields are visible and fillable
  6. Click Calculate
    - expect: Rate calculation processes
    - expect: Rate Summary appears with LCL pricing

#### 5.3. Air Shipment Type Complete Flow

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Navigate to Add Rate section
    - expect: Form is ready for shipment selection
  2. Select 'Air' from Shipment Type dropdown
    - expect: Air option is selected
    - expect: Form updates with Air-specific fields
  3. Fill Volume field with valid value '8'
    - expect: Volume field accepts input
  4. Fill Weight field with valid value '1500'
    - expect: Weight field accepts input
  5. Complete all required Air shipment fields
    - expect: All mandatory fields are visible and complete
  6. Click Calculate
    - expect: Rate calculation processes
    - expect: Rate Summary appears with Air freight pricing

#### 5.4. Switching Shipment Types Updates Required Fields Dynamically

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Select 'Container' shipment type and fill initial data
    - expect: Container-specific fields are visible and populated
    - expect: Container Size field is present
  2. Change Shipment Type to 'LCL'
    - expect: Form field set updates immediately
    - expect: Container Size field is removed or hidden
    - expect: LCL-specific mandatory fields appear
  3. Observe the form state
    - expect: Previous Container data is either cleared or preserved in hidden fields
    - expect: New mandatory fields for LCL are highlighted
  4. Fill LCL required fields
    - expect: New form accepts LCL data without conflict
  5. Click Calculate with updated fields
    - expect: Rate calculation uses LCL shipment type
    - expect: Summary displays LCL pricing

### 6. Rate Form - Validations & Conditions

**Seed:** `tests/seed.spec.ts`

#### 6.1. Numeric Field Validation - Reject Negative Values

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Navigate to Add Rate form
    - expect: Form is displayed
  2. Select Container shipment type
    - expect: Container fields are displayed
  3. Attempt to enter negative volume value '-100' in Volume field
    - expect: Either field rejects negative input at browser level
    - expect: OR validation error message appears: 'Volume must be positive'
  4. If value is accepted, attempt to calculate rate
    - expect: Server rejects the request with error
    - expect: Form validation error appears
  5. Verify negative value is not stored
    - expect: Field is empty or shows only positive values

#### 6.2. Numeric Field Validation - Zero Values Rejected

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Navigate to Add Rate form
    - expect: Form is displayed
  2. Select Container type and fill Volume with '25'
    - expect: Volume field has valid data
  3. Enter '0' in the Weight field
    - expect: Field displays zero value
  4. Click Calculate button
    - expect: Form validation prevents calculation
    - expect: Error message appears: 'Weight must be greater than 0'
  5. Verify Calculate button is disabled or form shows error state
    - expect: User cannot submit form with zero weight

#### 6.3. Conditional Field: Trip Count Required with 'By Trip' Selection

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Navigate to Add Rate form with valid shipment data
    - expect: Form displays shipment information
  2. Locate and select Shuttle Service 'By Trip' radio button
    - expect: 'By Trip' option is selected
  3. Observe Trip Count field appearance
    - expect: Trip Count input field appears/becomes visible
    - expect: Field is marked as required
    - expect: Field is empty by default
  4. Attempt to calculate rate without entering trip count
    - expect: Form validation error appears
    - expect: Error message: 'Trip Count is required'
    - expect: Calculation is prevented
  5. Fill Trip Count with valid value '5'
    - expect: Field accepts numeric input
    - expect: Value is stored
  6. Click Calculate
    - expect: Calculation proceeds successfully
    - expect: Rate Summary includes trip count pricing

#### 6.4. Only One Terminal Handling Option Selectable

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Navigate to Add Rate form
    - expect: Terminal Handling radio button group is visible
  2. Select first Terminal Handling option
    - expect: First option is checked/selected
    - expect: Other options appear unselected
  3. Click on a different Terminal Handling option
    - expect: First option is automatically deselected
    - expect: Only the newly clicked option is selected
  4. Verify radio button behavior
    - expect: Only one option can be selected at a time
    - expect: Switching selection deselects previous option

#### 6.5. Multiple Accessorials Selection Allowed

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Scroll to Handling & Accessorials section
    - expect: Accessorials checkboxes are visible
  2. Select first accessorial checkbox
    - expect: First checkbox shows checked state
  3. Select second accessorial checkbox
    - expect: Second checkbox shows checked state
    - expect: First checkbox remains checked
  4. Select additional accessorials
    - expect: Multiple checkboxes can remain checked simultaneously
  5. Deselect one accessorial
    - expect: Only the deselected checkbox is unchecked
    - expect: Others remain checked

#### 6.6. Required Fields Enforcement Prevents Form Submission

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Navigate to Add Rate form
    - expect: Form is displayed
  2. Leave mandatory fields empty (e.g., Volume, Weight)
    - expect: Fields remain empty
  3. Click Calculate button
    - expect: Form does not submit
    - expect: Validation errors appear next to each empty required field
  4. Fill one required field
    - expect: Error for that field disappears
  5. Complete all required fields incrementally
    - expect: As each field is filled, its error is removed
    - expect: Once all required fields are complete, Calculate button is fully enabled

### 7. Rate Calculation & Summary

**Seed:** `tests/seed.spec.ts`

#### 7.1. Rate Summary Display After Calculate

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Complete Add Rate form with valid shipment and pricing data
    - expect: All required fields are filled
  2. Click Calculate button
    - expect: Loading spinner appears briefly
    - expect: Server processes rate calculation
  3. Verify Rate Summary section appears
    - expect: Summary section is displayed below the rate form
    - expect: Summary is visible on the current page
  4. Check for tax and duties line items
    - expect: 'Taxes and Duties' line is displayed in summary
    - expect: Amount is shown with currency
  5. Check for refundable deposits if applicable
    - expect: 'Refundable Deposits' section appears (if applicable to shipment type)
    - expect: Amount is clearly displayed
  6. Verify total rate calculation
    - expect: Total/Grand Total is prominently displayed
    - expect: All line items sum correctly

#### 7.2. Rate Summary Validates All Selected Line Items

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Select Container shipment with size 20ft
    - expect: Form displays Container-specific fields
  2. Fill volume 25 CBM, weight 5000 LBS
    - expect: Values are populated
  3. Select Terminal Handling option
    - expect: Option is selected
  4. Select by-trip shuttle service and enter trip count 3
    - expect: Values are populated
  5. Select multiple accessorials (e.g., Uncrating, Special Items)
    - expect: Checkboxes show selected state
  6. Click Calculate
    - expect: Rate Summary appears
  7. Verify all selected items appear in description/summary
    - expect: Container (20ft) is listed
    - expect: Terminal handling charge is shown
    - expect: Shuttle service (by trip x3) is itemized
    - expect: Accessorial charges are listed individually

### 8. Apply & Edit Rate Scenarios

**Seed:** `tests/seed.spec.ts`

#### 8.1. Apply Rate and Display Active Price

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Complete rate calculation and display Rate Summary
    - expect: Summary section is visible with total rate
  2. Click Apply button
    - expect: Loading indicator appears
    - expect: Request is sent to save the rate
  3. Verify Apply completes successfully
    - expect: Loading completes
    - expect: Rate Summary is replaced or updated
  4. Locate Active Price display
    - expect: Active Price section appears
    - expect: Price value matches the calculated summary total
    - expect: Price is formatted with currency (e.g., $5,250.00)
  5. Verify Active Price is prominently displayed
    - expect: Active Price is visible in a dedicated section
    - expect: Price stands out visually
    - expect: Price is clearly labeled as 'Active Price', 'Current Rate', or similar

#### 8.2. Edit Existing Rate and Recalculate

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Apply a rate and verify Active Price displays
    - expect: Active Price is visible
  2. Locate three-dot menu or Edit button near Active Price
    - expect: Menu button is visible and clickable
  3. Click menu button
    - expect: Dropdown menu appears with options
  4. Select 'Edit Rate' or 'Edit' option
    - expect: Rate form re-opens with current values populated
    - expect: Form fields show the previously entered data
  5. Modify a value (e.g., change volume from 25 to 30)
    - expect: Field value updates in the form
  6. Click Calculate to recalculate
    - expect: New rate is calculated with updated values
  7. Verify updated Rate Summary displays
    - expect: Summary shows new calculated total
    - expect: Total is higher due to increased volume
  8. Click Apply to save the edited rate
    - expect: New rate is saved
    - expect: Active Price updates to reflect new total

#### 8.3. Clone Rate and Verify New Clone Becomes Active

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Apply an initial rate with Active Price displayed
    - expect: Active Price is showing with original amount
  2. Click three-dot menu near Active Price
    - expect: Menu options appear
  3. Select 'Clone Price Details' or 'Clone Rate' option
    - expect: Clone action is triggered
    - expect: Confirmation or loading indicator appears
  4. Confirm the clone action
    - expect: Clone process completes
  5. Verify cloned rate appears in the list or form
    - expect: New cloned rate is visible
    - expect: Cloned rate has identical values to original
  6. Verify the cloned rate becomes the Active Price
    - expect: Latest cloned rate is now marked as Active
    - expect: Active Price updates to show cloned rate value
    - expect: Active Price is still editable

### 9. Document Generation

**Seed:** `tests/seed.spec.ts`

#### 9.1. Generate Estimate Document

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Complete estimate creation with applied rate
    - expect: Active Price is set and visible
  2. Navigate to Documents section
    - expect: Documents page or tab is visible
    - expect: Create New or Generate Document button is available
  3. Click 'Create New' document button
    - expect: Document type selection appears
    - expect: Options include: Estimate, Bill of Lading, Invoice
  4. Select 'Estimate' document type
    - expect: Document generation initiates
    - expect: Loading indicator appears
  5. Verify Estimate document preview displays
    - expect: Document preview pane shows the estimate
    - expect: Document layout is professional and formatted correctly
  6. Check for company logo on document
    - expect: Company logo is visible at the top of the document
    - expect: Logo is properly positioned and sized
  7. Verify price information matches Active Price
    - expect: Document shows the applied rate amount
    - expect: Price matches the Active Price from the rate form
  8. Check for 'Description of Service' section
    - expect: Document contains itemized list of selected services
    - expect: All selected shipment details are listed
  9. Click 'Save' button to save the document
    - expect: Document is saved to the system
    - expect: Success message appears

#### 9.2. Generate Bill of Lading Document

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. From estimate with applied rate, navigate to Documents section
    - expect: Documents area is accessible
  2. Click Create New document
    - expect: Document type menu appears
  3. Select 'Bill of Lading' document type
    - expect: BOL document generates
    - expect: Document preview displays
  4. Verify BOL content
    - expect: BOL includes shipment details (origin/destination zipcodes)
    - expect: BOL includes carrier and date information
    - expect: BOL includes customer and consignee information
  5. Check company logo presence
    - expect: Logo is displayed on the BOL
  6. Click Save to save BOL
    - expect: BOL is saved successfully
    - expect: Success message confirms save

#### 9.3. Generate Invoice Document

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. From estimate with applied rate, navigate to Documents
    - expect: Documents area is accessible
  2. Click Create New
    - expect: Document type selection appears
  3. Select 'Invoice' document type
    - expect: Invoice document generates
    - expect: Preview is displayed
  4. Verify Invoice includes pricing from Active Price
    - expect: Invoice shows the calculated rate amount
    - expect: Amount matches Applied Rate total
  5. Check for company information
    - expect: Company name and address appear on invoice
    - expect: Logo is present
  6. Click Save to save Invoice
    - expect: Invoice is saved successfully

#### 9.4. Document Price Validates Against Active Price

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Apply a rate with Active Price of $5,250.00
    - expect: Active Price displays correctly
  2. Generate Estimate document
    - expect: Document preview appears
  3. Locate price field in document
    - expect: Document shows price/total amount
  4. Compare document price to Active Price
    - expect: Document price matches Active Price exactly
    - expect: Both show $5,250.00
  5. Verify price formatting is consistent
    - expect: Currency symbol is present
    - expect: Decimal places are consistent
    - expect: Thousands separator is used if applicable

#### 9.5. View PDF Option Works

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Generate any document (Estimate, BOL, or Invoice)
    - expect: Document preview is displayed
  2. Locate 'View PDF' or 'Download PDF' button
    - expect: PDF button is visible and clickable
  3. Click View PDF button
    - expect: PDF opens in new tab or modal viewer
    - expect: OR PDF download initiates
  4. Verify PDF content
    - expect: PDF displays the document with correct formatting
    - expect: All document elements render properly in PDF format

### 10. Edge Cases & Error Handling

**Seed:** `tests/seed.spec.ts`

#### 10.1. Handle Page Refresh During Estimate Creation

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Start estimate creation and fill Customer Details
    - expect: Form data is entered
  2. Press F5 or click browser refresh button
    - expect: Page begins refreshing
  3. Wait for page to reload
    - expect: Page reloads and remains stable
    - expect: User is not logged out unexpectedly
  4. Navigate back to the estimate
    - expect: Dashboard loads or estimate page shows previous progress
    - expect: Application handles the refresh gracefully

#### 10.2. Prevent Document Generation Without Active Price

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Create an estimate but do NOT apply any rate
    - expect: Estimate exists but has no Active Price
  2. Navigate to Documents section
    - expect: Documents area is accessible
  3. Attempt to create a document
    - expect: 'Create New' button is disabled
    - expect: OR error message appears: 'Please apply a rate before generating documents'
  4. Verify document cannot be generated
    - expect: User cannot proceed without an Active Price

#### 10.3. Handle Special Characters in Customer Name

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. In Customer Details, enter customer name with special characters: "O'Brien & Sons LLC"
    - expect: Field accepts the input
    - expect: Special characters (apostrophe, ampersand) are not rejected
  2. Fill remaining required fields
    - expect: Other fields populate normally
  3. Proceed through the form to rate calculation
    - expect: Form submits successfully with special characters in name
    - expect: No validation errors occur
  4. Generate a document
    - expect: Document displays the customer name correctly with special characters preserved

#### 10.4. Handle Large Volume Values

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. In Add Rate form, enter very large Volume value: '10000' CBM
    - expect: Field accepts input without overflow
    - expect: Value is displayed correctly
  2. Enter large Weight value: '50000' LBS
    - expect: Weight field accepts large value
  3. Click Calculate
    - expect: Server processes the calculation without timeout
    - expect: Rate Summary displays with calculated totals
  4. Verify Rate Summary displays correctly
    - expect: All values display properly in the summary
    - expect: No truncation or overflow of numbers

#### 10.5. Duplicate Clone Rate Attempt

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Apply a rate and verify Active Price
    - expect: Active Price is displayed
  2. Clone the rate
    - expect: First clone succeeds and becomes Active
  3. Click menu and attempt to clone again
    - expect: Clone option is available
  4. Clone the rate a second time
    - expect: Second clone is created successfully
    - expect: Second clone replaces first clone as Active Price
  5. Verify no errors or conflicts occur
    - expect: System handles multiple clones without issues
    - expect: Each clone has unique identity

#### 10.6. Handle UI Latency and Delayed Element Visibility

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. Complete estimate form and click through pages quickly
    - expect: Navigation is smooth
  2. On Moving Information page with slow network, click Save
    - expect: LoadingIndicator appears and remains visible
    - expect: Confirmation popup eventually appears after delay
  3. Wait for confirmation popup to appear
    - expect: Popup eventually displays despite network latency
    - expect: Popup is clickable and functional
  4. Click OK on popup
    - expect: Order Detail page loads
    - expect: No timeout errors occur

#### 10.7. Required Fields Empty Validation

**File:** `tests/e2e/mga-workflow.spec.ts`

**Steps:**
  1. On Customer Details form, leave all fields empty
    - expect: Fields remain empty
  2. Click Next button (if enabled)
    - expect: Form validation errors appear for all empty required fields
    - expect: Multiple error messages display indicating which fields are mandatory
  3. On Add Rate form, fill shipment type but skip Volume field
    - expect: Volume field remains empty
  4. Click Calculate
    - expect: Error appears indicating Volume is required
    - expect: Calculation is blocked
