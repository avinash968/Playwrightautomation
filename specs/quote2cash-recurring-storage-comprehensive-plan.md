# Quote2Cash Recurring Storage Comprehensive Test Plan

## Application Overview

Quote2Cash is an AngularJS-based quote automation and invoice creation platform. This comprehensive test plan covers the complete Recurring Storage pricing workflow, enabling users to create orders and configure recurring storage billing with support for three pricing types: Permanent Storage, HHG (Household Goods), and SIT (Storage in Transit). The test plan encompasses login validation, order creation, pricing configuration with billing type selection, recurring bill count validation, popup/modal handling, edge cases, and data persistence. All 90+ test cases are designed to verify positive paths, negative scenarios, boundary conditions, and complex workflows involving conditional logic and state management.

## Test Scenarios

### 1. Login and Authentication

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful login with valid credentials

**File:** `tests/e2e/login.spec.ts`

**Steps:**
  1. Navigate to https://dev.quote2cash.app
    - expect: Login page displays with 'Welcome to Quote2Cash' heading
    - expect: Username and password fields are empty and visible
  2. Enter username 'bvl'
    - expect: Username field populated
  3. Enter password 'demo'
    - expect: Password field populated (masked)
  4. Click Login button
    - expect: Dashboard loads successfully
    - expect: Left sidebar shows navigation menu
    - expect: Top navbar displays username 'Bvl'
    - expect: Orders page visible with existing orders list

#### 1.2. Login with invalid username

**File:** `tests/e2e/login.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page displays
  2. Enter invalid username 'wronguser' and password 'demo'
    - expect: Fields populate
  3. Click Login
    - expect: Login fails
    - expect: Error message displays
    - expect: User stays on login page

#### 1.3. Login with empty credentials

**File:** `tests/e2e/login.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Page displays
  2. Try to click Login with empty fields
    - expect: Login button disabled or validation prevents submission

#### 1.4. Password visibility toggle

**File:** `tests/e2e/login.spec.ts`

**Steps:**
  1. Enter password in password field
    - expect: Text masked with dots
  2. Click password visibility toggle icon (if available)
    - expect: Password becomes visible or stays masked based on implementation

#### 1.5. Forgot password link accessibility

**File:** `tests/e2e/login.spec.ts`

**Steps:**
  1. Click 'Forgot username' link
    - expect: Link is clickable
    - expect: Navigates to password recovery or shows reset options
  2. Click 'Forgot password' link
    - expect: Link is clickable
    - expect: Recovery flow opens

### 2. Order Creation

**Seed:** `tests/seed.spec.ts`

#### 2.1. Create new order with valid customer data

**File:** `tests/e2e/order-creation.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: Dashboard loads
  2. Click Create button in toolbar
    - expect: Dropdown menu shows 'New Order' and 'New Task'
  3. Click 'New Order'
    - expect: Create Inquiry dialog opens with Customer Info tab active
  4. Enter First Name: 'John', Last Name: 'Doe', Email: 'john@test.com', Phone: '(555) 123-4567'
    - expect: All fields populate with entered data
  5. Click Save
    - expect: Confirmation dialog appears: 'Order Created Successfully'
  6. Click OK on confirmation
    - expect: Navigates to order detail page
    - expect: Order shows John Doe's information
    - expect: Price Details tab visible with $0.00 and '+ Add Rate' button

#### 2.2. Order creation with empty required fields

**File:** `tests/e2e/order-creation.spec.ts`

**Steps:**
  1. Open Create Order dialog
    - expect: Dialog shows with empty form
  2. Leave First Name empty and fill other fields
    - expect: Fields populate except First Name
  3. Click Save
    - expect: Validation error for First Name
    - expect: Order not created
    - expect: User can correct and retry

#### 2.3. Order creation with invalid email

**File:** `tests/e2e/order-creation.spec.ts`

**Steps:**
  1. Open Create Order with invalid email 'notanemail'
    - expect: Email field accepts input
  2. Click Save
    - expect: Email validation error displays
    - expect: Order creation blocked
    - expect: Error message indicates invalid format

#### 2.4. Cancel order creation

**File:** `tests/e2e/order-creation.spec.ts`

**Steps:**
  1. Open Create Order dialog and fill some fields
    - expect: Form populates
  2. Click Cancel button
    - expect: Dialog closes
    - expect: No order is created
    - expect: Returns to dashboard

#### 2.5. Order creation with special characters

**File:** `tests/e2e/order-creation.spec.ts`

**Steps:**
  1. Create order with First Name: 'Jean-Paul', Last Name: "D'Oe's Company"
    - expect: Special characters accepted in names
    - expect: Order creates successfully
    - expect: Data displays correctly

### 3. Charging Type Selection and Basic Pricing Flow

**Seed:** `tests/seed.spec.ts`

#### 3.1. Rate Selection dialog displays billing type options

**File:** `tests/e2e/billing-type-selection.spec.ts`

**Steps:**
  1. Create order and navigate to order detail
    - expect: Order detail page loads
  2. Click '+ Add Rate' button
    - expect: Rate Selection dialog opens
    - expect: Shows 'Select Pricing' section with radio buttons
    - expect: HHG pre-selected by default

#### 3.2. Select HHG pricing type

**File:** `tests/e2e/billing-type-selection.spec.ts`

**Steps:**
  1. Open Rate Selection dialog with HHG pre-selected
    - expect: HHG radio button checked
  2. Click Select button
    - expect: HHG form opens with rate and price detail fields

#### 3.3. Select Recurring Storage Billing pricing type

**File:** `tests/e2e/billing-type-selection.spec.ts`

**Steps:**
  1. Open Rate Selection dialog
    - expect: Dialog shows
  2. Click 'Recurring Storage Billing' radio button
    - expect: Selection changes to Recurring Storage Billing
    - expect: Price Details Name field shows 'Storage Billing'
  3. Click Select
    - expect: Storage Billing form opens with sections: Storage Info, Billing Info, Additional Charges

#### 3.4. Storage Billing form displays all billing types

**File:** `tests/e2e/billing-type-selection.spec.ts`

**Steps:**
  1. Open Storage Billing form (Recurring Storage selected)
    - expect: Form displays
  2. Click 'Billing Type' dropdown
    - expect: Opens with options: Perm Storage, HHG, SIT

### 4. Permanent Storage Pricing Workflow

**Seed:** `tests/seed.spec.ts`

#### 4.1. Complete Perm Storage pricing workflow

**File:** `tests/e2e/perm-storage-pricing.spec.ts`

**Steps:**
  1. Create order and click '+ Add Rate'
    - expect: Rate Selection dialog
  2. Select Recurring Storage Billing and click Select
    - expect: Storage Billing form opens
  3. Select 'Perm Storage' from Billing Type dropdown
    - expect: Perm Storage selected
  4. Fill Billing Start Date: '03-04-2026'
    - expect: Date field shows MM-DD-YYYY format
  5. Fill Weight: '5000' lbs
    - expect: Weight shows 5000 lbs
  6. Fill Daily Rate: '0.50'
    - expect: Daily Rate shows $0.50
  7. Select Billing Cycle: 'Monthly' (or available option)
    - expect: Cycle selected
  8. Fill Bill To: 'Account', Name, Email
    - expect: Billing info populated
  9. Click Calculate
    - expect: Price calculated and shows in Storage Summary
    - expect: Amount > $0.00
    - expect: Storage Summary updates with billing details
  10. Click Apply
    - expect: Active Price appears in Price Details section
    - expect: Price amount matches calculated value
    - expect: Only one Active price exists

#### 4.2. Perm Storage with Auth Days = 0

**File:** `tests/e2e/perm-storage-pricing.spec.ts`

**Steps:**
  1. Open Perm Storage form
    - expect: Form displays
  2. Fill all fields and set Auth Days to '0'
    - expect: All fields populated
  3. Click Calculate
    - expect: System processes Auth Days = 0
    - expect: Calculation succeeds or shows validation

#### 4.3. Perm Storage skip additional charges and calculate

**File:** `tests/e2e/perm-storage-pricing.spec.ts`

**Steps:**
  1. Open Perm Storage form
    - expect: Form shows
  2. Fill mandatory fields only (skip Additional Charges)
    - expect: Storage Info and Billing Info complete
  3. Click Calculate
    - expect: Price calculated without additional charges
  4. Click Apply
    - expect: Price applies successfully

#### 4.4. Perm Storage with additional charges

**File:** `tests/e2e/perm-storage-pricing.spec.ts`

**Steps:**
  1. Open Perm Storage form
    - expect: Form displays
  2. Fill mandatory fields and click 'Add More' in Additional Charges
    - expect: Additional charge fields appear
  3. Fill charge details (line item, amount, frequency)
    - expect: Charge configured
  4. Click Calculate
    - expect: Price calculated including additional charges
    - expect: Final amount includes base rate + charges
  5. Click Apply
    - expect: Price with charges applies successfully

### 5. HHG Pricing Workflow

**Seed:** `tests/seed.spec.ts`

#### 5.1. HHG pricing with valid zip codes

**File:** `tests/e2e/hhg-pricing.spec.ts`

**Steps:**
  1. Create order and click '+ Add Rate'
    - expect: Rate Selection dialog with HHG pre-selected
  2. Click Select
    - expect: HHG form opens with zip code fields
  3. Fill origin zip: '95110', destination zip: '90001'
    - expect: Both zips populate
  4. Fill other HHG fields (weight, rate selection)
    - expect: All fields complete
  5. Click Calculate
    - expect: Price calculated based on zip route
    - expect: Amount displays
  6. Click Apply
    - expect: HHG price becomes Active
    - expect: Price Details shows new price

#### 5.2. HHG with invalid zip codes

**File:** `tests/e2e/hhg-pricing.spec.ts`

**Steps:**
  1. Open HHG form
    - expect: Form displays
  2. Fill origin zip with invalid format 'ABC123' or too many digits '1234567'
    - expect: Field accepts or validates input
  3. Try to Calculate
    - expect: Either validation error or calculation adjusts value

#### 5.3. HHG with same origin and destination zip

**File:** `tests/e2e/hhg-pricing.spec.ts`

**Steps:**
  1. Open HHG form
    - expect: Form shows
  2. Fill both origin and destination with same zip '95110'
    - expect: Both fields have same value
  3. Complete form and Calculate
    - expect: System processes same-location scenario
    - expect: Price calculates based on business rules

### 6. SIT Billing and Recurring Count Validation

**Seed:** `tests/seed.spec.ts`

#### 6.1. SIT billing with Monthly cycle

**File:** `tests/e2e/sit-pricing.spec.ts`

**Steps:**
  1. Open Recurring Storage form
    - expect: Form displays
  2. Select 'SIT' from Billing Type dropdown
    - expect: SIT selected
  3. Select 'Monthly' from Billing Cycle
    - expect: Monthly cycle selected
  4. Fill all SIT fields appropriately
    - expect: All fields populated
  5. Click Calculate
    - expect: Price calculated for monthly SIT billing
  6. Verify recurring bill count: if > 5 bills, should show 1 Current + 3 Upcoming + 1 Next
    - expect: Bill distribution follows rules

#### 6.2. SIT billing with Weekly cycle

**File:** `tests/e2e/sit-pricing.spec.ts`

**Steps:**
  1. Open SIT form
    - expect: Form shows
  2. Select 'SIT' billing type and 'Weekly' cycle
    - expect: Selections made
  3. Fill fields and Calculate
    - expect: Weekly pricing calculated

#### 6.3. SIT billing with Daily cycle

**File:** `tests/e2e/sit-pricing.spec.ts`

**Steps:**
  1. Open SIT form
    - expect: Form displays
  2. Select 'SIT' and 'Daily' cycle
    - expect: Daily selected
  3. Set billing dates close together (e.g., 03-04-2026 to 03-10-2026)
    - expect: Date range entered
  4. Calculate
    - expect: Daily pricing calculated
    - expect: Recurring count reflects daily intervals

#### 6.4. Recurring bill count = 6 (verify 1+3+1 distribution)

**File:** `tests/e2e/sit-pricing.spec.ts`

**Steps:**
  1. Configure SIT billing to generate exactly 6 recurring bills
    - expect: Setup complete
  2. Calculate and verify in Storage Summary
    - expect: Shows 1 Current Bill
    - expect: Shows 3 Upcoming Bills
    - expect: Shows 1 Next Bill

#### 6.5. Recurring bill count = 5 (verify ≤5 distribution rule)

**File:** `tests/e2e/sit-pricing.spec.ts`

**Steps:**
  1. Configure SIT to generate exactly 5 bills
    - expect: Setup complete
  2. Calculate and check bill distribution
    - expect: Shows 1 Current
    - expect: Shows 1 Upcoming
    - expect: Shows 1 Next (total 3 displayed)

#### 6.6. Recurring bill count = 1 (single bill edge case)

**File:** `tests/e2e/sit-pricing.spec.ts`

**Steps:**
  1. Configure timeframe for single bill only
    - expect: Dates set for single billing period
  2. Calculate
    - expect: Single bill appears in summary

### 7. Popup and Conditional Flow Handling

**Seed:** `tests/seed.spec.ts`

#### 7.1. Order creation confirmation dialog

**File:** `tests/e2e/popup-handling.spec.ts`

**Steps:**
  1. Create order and click Save
    - expect: Confirmation popup: 'Order Created Successfully'
  2. Verify popup shows 'Click OK to visit the order detail page'
    - expect: Message displays correctly
  3. Click OK
    - expect: Modal closes
    - expect: Navigates to order detail page

#### 7.2. Order creation confirmation - click Cancel

**File:** `tests/e2e/popup-handling.spec.ts`

**Steps:**
  1. Create order modal and trigger confirmation popup
    - expect: Popup appears
  2. Click Cancel
    - expect: Popup closes
    - expect: Returns to previous view
    - expect: Order still created

#### 7.3. Account warning popup on price apply

**File:** `tests/e2e/popup-handling.spec.ts`

**Steps:**
  1. Create price with Bill To='Account' but no account selected
    - expect: Price form complete
  2. Click Apply
    - expect: Warning popup appears: 'Please select Account' or similar
    - expect: Yes/No buttons present
  3. Click Yes
    - expect: Popup closes
    - expect: Allows retry of account selection

#### 7.4. Status update popup after successful operations

**File:** `tests/e2e/popup-handling.spec.ts`

**Steps:**
  1. Complete pricing workflow and Apply successfully
    - expect: If status popup shows, it indicates success
  2. Click OK/Close on popup
    - expect: Popup closes
    - expect: Price Details updated

### 8. Active Price Management

**Seed:** `tests/seed.spec.ts`

#### 8.1. Only one Active Price exists after applying new price

**File:** `tests/e2e/active-pricing.spec.ts`

**Steps:**
  1. Add first Perm Storage price and Apply
    - expect: First price becomes Active
  2. Add second price (HHG) and Apply
    - expect: Second price becomes Active
    - expect: First price becomes Inactive
    - expect: Exactly one Active price in Price Details
  3. Verify no duplicate Active prices
    - expect: Count of Active prices = 1

#### 8.2. Active Price equals last calculated value

**File:** `tests/e2e/active-pricing.spec.ts`

**Steps:**
  1. Create price with calculated amount $1,234.56
    - expect: Calculate displays this amount
  2. Click Apply
    - expect: Active Price in Price Details = $1,234.56
    - expect: Exact match

#### 8.3. Price history maintains all previous prices (inactive)

**File:** `tests/e2e/active-pricing.spec.ts`

**Steps:**
  1. Add and apply 3 different prices over time
    - expect: Each addition succeeds
  2. View Price Details section
    - expect: All 3 prices visible
    - expect: One marked Active, two marked Inactive
    - expect: Price history preserved for audit

#### 8.4. New price application deactivates all previous prices

**File:** `tests/e2e/active-pricing.spec.ts`

**Steps:**
  1. Add price A and Apply (Active)
    - expect: Price A shows Active status
  2. Add price B and Apply
    - expect: Price A becomes Inactive automatically
    - expect: Price B becomes Active
    - expect: No manual deactivation needed

### 9. Edge Cases and Boundary Conditions

**Seed:** `tests/seed.spec.ts`

#### 9.1. Calculate multiple times without changing fields

**File:** `tests/e2e/edge-cases.spec.ts`

**Steps:**
  1. Fill all price fields and click Calculate
    - expect: Price calculated
  2. Click Calculate again immediately
    - expect: Recalculation succeeds
    - expect: Same price shown
    - expect: No error

#### 9.2. Modify single field and recalculate

**File:** `tests/e2e/edge-cases.spec.ts`

**Steps:**
  1. Calculate initial price with Weight=5000
    - expect: Initial price calculated
  2. Change Weight to 6000 and Calculate
    - expect: Price recalculates with new weight
    - expect: Updated price displays

#### 9.3. Double-click Apply button to prevent duplicate prices

**File:** `tests/e2e/edge-cases.spec.ts`

**Steps:**
  1. Double-click Apply button rapidly
    - expect: Price applies only once
    - expect: No duplicate price created
    - expect: Button debounced/disabled after first click

#### 9.4. Apply without Calculate should fail or be disabled

**File:** `tests/e2e/edge-cases.spec.ts`

**Steps:**
  1. Fill form and immediately try to click Apply without Calculate
    - expect: Apply button disabled until Calculate is clicked
    - expect: Or error message: 'Please calculate first'

#### 9.5. Large monetary values (999,999.99)

**File:** `tests/e2e/edge-cases.spec.ts`

**Steps:**
  1. Enter Daily Rate: '999.99' to trigger large calculated amount
    - expect: Field accepts value
  2. Calculate
    - expect: Large price calculated correctly
    - expect: Formatted as currency: $999,999.99
    - expect: Displays without overflow

#### 9.6. Decimal rounding in price calculation

**File:** `tests/e2e/edge-cases.spec.ts`

**Steps:**
  1. Enter Daily Rate: '0.333333' (repeating decimal)
    - expect: Field accepts many decimal places
  2. Calculate
    - expect: Final price rounded to 2 decimal places
    - expect: Format: $X.XX
    - expect: Rounding logic correct

#### 9.7. Browser refresh during active workflow

**File:** `tests/e2e/edge-cases.spec.ts`

**Steps:**
  1. Fill price form with partial data
    - expect: Form populated
  2. Refresh browser
    - expect: Page reloads
    - expect: Form may reset or maintain data based on implementation
  3. Verify order still exists and accessible
    - expect: No data loss on critical order
    - expect: Can re-add prices

#### 9.8. Missing mandatory field validation

**File:** `tests/e2e/edge-cases.spec.ts`

**Steps:**
  1. Fill all fields except Weight (required)
    - expect: Form shows 3 of 4 mandatory fields
  2. Click Calculate
    - expect: Validation error for Weight
    - expect: Calculation prevented
    - expect: Error message indicates requirement

#### 9.9. Date boundary: month-end dates

**File:** `tests/e2e/edge-cases.spec.ts`

**Steps:**
  1. Set Billing Start Date to '01-31-2026' (month end)
    - expect: Date accepted
  2. Calculate price
    - expect: Calculation proceeds without error
    - expect: Date handled correctly

#### 9.10. Zero-value daily rate

**File:** `tests/e2e/edge-cases.spec.ts`

**Steps:**
  1. Enter Daily Rate: '0.00'
    - expect: Field accepts zero value
  2. Calculate
    - expect: System processes $0 rate
    - expect: Result may be $0 price or validation error based on business rules

### 10. UI State and Interaction Validation

**Seed:** `tests/seed.spec.ts`

#### 10.1. Buttons enabled/disabled based on form state

**File:** `tests/e2e/ui-interactions.spec.ts`

**Steps:**
  1. Open empty Storage Billing form
    - expect: Calculate button disabled (grayed)
    - expect: Apply button disabled
  2. Fill all mandatory fields
    - expect: Calculate button becomes enabled
  3. Click Calculate
    - expect: Apply button becomes enabled

#### 10.2. Form field values retained during Calculate/Apply cycle

**File:** `tests/e2e/ui-interactions.spec.ts`

**Steps:**
  1. Fill Date='03-04-2026', Weight='5000', Rate='0.50'
    - expect: All fields populated
  2. Click Calculate
    - expect: All values remain in form fields
  3. Modify one field (Weight to 6000) and Calculate
    - expect: Modified field updates
    - expect: Other fields retain original values

#### 10.3. Dropdown options populate from system data

**File:** `tests/e2e/ui-interactions.spec.ts`

**Steps:**
  1. Click Billing Type dropdown
    - expect: Shows: Perm Storage, HHG, SIT
  2. Click Location dropdown
    - expect: Shows available locations (populated from system)
  3. Click Bill To dropdown
    - expect: Shows options: Account, Customer, etc.

#### 10.4. Storage Summary section updates on Calculate

**File:** `tests/e2e/ui-interactions.spec.ts`

**Steps:**
  1. Fill form and click Calculate
    - expect: Storage Summary section on right updates
    - expect: Shows Billing Start Date, calculated amount, bill count info
  2. Modify field and Calculate again
    - expect: Storage Summary instantly refreshes with new values

### 11. Data Persistence and Session Management

**Seed:** `tests/seed.spec.ts`

#### 11.1. Form data persists through Calculate operation

**File:** `tests/e2e/data-persistence.spec.ts`

**Steps:**
  1. Fill all Storage Billing fields with specific values
    - expect: Form complete
  2. Click Calculate
    - expect: Price calculates
  3. Verify all form fields still show original values
    - expect: No data lost
    - expect: All fields retain entries

#### 11.2. Active price persists after page refresh

**File:** `tests/e2e/data-persistence.spec.ts`

**Steps:**
  1. Add and Apply price successfully
    - expect: Price shows as Active in Price Details, amount $XXX.XX
  2. Refresh page (F5)
    - expect: Page reloads
  3. Navigate back to order
    - expect: Active price still visible
    - expect: Same amount displayed
    - expect: Active status preserved

#### 11.3. Order data persists after logout/login

**File:** `tests/e2e/data-persistence.spec.ts`

**Steps:**
  1. Create order with multiple prices, set one as Active
    - expect: Order and prices created
  2. Click user menu and Logout
    - expect: Redirected to login page
  3. Login with same credentials
    - expect: Dashboard loads
  4. Navigate to previously created order
    - expect: Order displays with all prices intact
    - expect: Active status preserved
    - expect: No data loss

#### 11.4. Price history maintained across sessions

**File:** `tests/e2e/data-persistence.spec.ts`

**Steps:**
  1. Add multiple prices over time (prices A, B, C)
    - expect: All prices created
  2. Logout and login
    - expect: Session changes
  3. View order again
    - expect: All 3 prices visible in Price Details
    - expect: Complete price history maintained
