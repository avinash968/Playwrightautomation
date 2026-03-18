# Quote2Cash End-to-End Automation Test Plan

## Application Overview


Quote2Cash is a quote automation and invoice creation platform. This comprehensive test plan covers end-to-end automation testing for order creation, pricing management with multiple storage types (Permanent Storage, HHG, SIT), and complete workflows with billing calculations.

**Application URL:** https://dev.quote2cash.app
**Login Credentials:** Username: bvl | Password: demo
**Company:** Budd Van Lines
**Tested Browser:** Chromium

The application features:
- Order management dashboard with search, filtering, and sorting
- Create new orders with customer information (First Name, Last Name, Email, Phone, optional Order Ref #)
- Price management with multiple billing type options
- Storage billing with recurring charges and automatic calculations
- Order status management (Quote, In Storage, Booking Pending, etc.)
- Multi-tab order detail interface (Status, Dates, Customer Details, Inventory, Price Details, Notes)


## Test Scenarios

### 1. Login & Dashboard Validation

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Application Login and Dashboard Access

**File:** `tests/e2e/login-dashboard.spec.ts`

**Steps:**
  1. Launch the Quote2Cash application at https://dev.quote2cash.app
    - expect: Login page loads successfully
    - expect: Username and Password input fields are visible
    - expect: Login button is enabled
  2. Enter valid credentials - Username: bvl and Password: demo
    - expect: Fields accept input
    - expect: Password field masks the entered text
  3. Click the Login button
    - expect: Login request is processed
    - expect: Page transitions to dashboard
  4. Wait for dashboard to load completely
    - expect: Dashboard page loads with Orders table
    - expect: Create button is visible in top navigation
    - expect: Create button is enabled
    - expect: Orders table displays 2500+ orders
  5. Verify navigation sidebar is visible
    - expect: Left sidebar displays with menu items: Orders, Customers, Rates, My Schedule, All Documents, Reports, Settings
    - expect: Active menu item shows as highlighted
  6. Verify dashboard status summary section
    - expect: Status summary shows counts: Quote, Estimate, Estimate Sent, Rating, In Storage, Booking Pending, Booked
    - expect: Estimated Total amount is displayed (e.g., $96,392,573.66)
  7. Verify table columns and data
    - expect: Table headers display: Order Ref #, Customer Name, Status, Account Name, Email, Phone #, Est Move Date, Created By, Created Date, Amount
    - expect: Table body displays at least 5 orders
    - expect: Each order row shows correct data

#### 1.2. Verify Dashboard Navigation Elements

**File:** `tests/e2e/dashboard-navigation.spec.ts`

**Steps:**
  1. Complete login and access dashboard
    - expect: Dashboard loads successfully
  2. Click on Customers menu item
    - expect: Navigation occurs to Customers page
    - expect: URL changes to #/app/customers
  3. Click on Rates menu item
    - expect: Navigation occurs to Rates page
    - expect: URL changes to #/app/tariff/0/active
  4. Click on Orders menu item to return to dashboard
    - expect: Returns to Orders dashboard page
    - expect: URL changes to #/app/jobboard
  5. Verify search functionality presence
    - expect: Search button/field is visible on dashboard
    - expect: Search field accepts text input
  6. Verify Open/Closed tabs on dashboard
    - expect: Open and Closed filter tabs are present
    - expect: Open tab shows active orders
    - expect: Total Orders count is displayed

### 2. Order Creation

**Seed:** `tests/seed.spec.ts`

#### 2.1. Create New Order with Mandatory Fields

**File:** `tests/e2e/order-creation-mandatory.spec.ts`

**Steps:**
  1. Complete login and access dashboard
    - expect: Dashboard loads with Orders table
  2. Click Create button at top of page
    - expect: Create dropdown menu appears
    - expect: New Order option is visible
    - expect: New Task option is visible
  3. Click on New Order option
    - expect: Create Inquiry dialog opens
    - expect: Dialog title shows 'Create Inquiry'
    - expect: Company selector shows 'Budd Van Lines'
    - expect: Two tabs visible: Customer Info and Additional Info
  4. Verify Customer Info tab is active
    - expect: Customer Info tab is selected
    - expect: Form shows fields: First Name, Last Name, Email, Phone, Order Ref #
  5. Enter First Name: John
    - expect: First Name field accepts input
    - expect: Value displays correctly
  6. Enter Last Name: Smith
    - expect: Last Name field accepts input
    - expect: Value displays correctly
  7. Enter Email: test@example.com
    - expect: Email field accepts input
    - expect: Email format is accepted
    - expect: Helper text notes multiple emails can be entered separated by commas
  8. Enter Phone: 9876543210
    - expect: Phone field accepts input
    - expect: Phone number displays (possibly auto-formatted)
  9. Leave Order Ref # empty (optional field)
    - expect: Order Ref # field is optional
    - expect: Dialog can be submitted without filling this field
  10. Click Save button
    - expect: Dialog processes the submission
    - expect: Loading indicator appears
    - expect: Success confirmation dialog appears with message 'Order Created Successfully'
  11. Click OK on confirmation popup
    - expect: Redirected to order detail page for new order
    - expect: Order detail page loads
    - expect: Customer name displays as John Smith
    - expect: Grand Total shows $0.00

#### 2.2. Create Order with Order Ref # Field

**File:** `tests/e2e/order-creation-with-ref.spec.ts`

**Steps:**
  1. Complete login and navigate to Create New Order dialog
    - expect: Create Inquiry dialog is open
  2. Fill all mandatory fields - First Name: Jennifer, Last Name: Davis, Email: test2@example.com, Phone: 5554321098
    - expect: All fields accept input and display values correctly
  3. Fill optional Order Ref # field with value: ORD-TEST-2024
    - expect: Order Ref # field accepts input
    - expect: Value displays in field
  4. Click Save button
    - expect: Form submission succeeds
    - expect: Success confirmation appears
  5. Click OK on confirmation
    - expect: Order detail page loads
    - expect: Customer name shows Jennifer Davis
    - expect: Order Ref # column shows ORD-TEST-2024 in order list

#### 2.3. Validate Mandatory Field Requirements

**File:** `tests/e2e/order-creation-validation.spec.ts`

**Steps:**
  1. Open Create New Order dialog
    - expect: Create Inquiry dialog opens
  2. Try to save form without entering any fields
    - expect: Save button is either disabled or submission fails
    - expect: Validation error messages appear for required fields
  3. Enter only First Name and try to save
    - expect: Validation errors appear for missing Last Name, Email, Phone
    - expect: Form cannot be submitted
  4. Enter First Name, Last Name, Email but no Phone
    - expect: Phone field shows as required
    - expect: Validation error prevents submission
  5. Enter all mandatory fields correctly
    - expect: No validation errors
    - expect: Save button is enabled
    - expect: Form can be successfully submitted

### 3. Add Permanent Storage Billing

**Seed:** `tests/seed.spec.ts`

#### 3.1. Create Permanent Storage Billing with Full Workflow

**File:** `tests/e2e/permanent-storage-billing.spec.ts`

**Steps:**
  1. Create a new order and navigate to order detail page
    - expect: Order detail page loads
    - expect: Tabs are visible: Status, Dates, Customer Details, Inventory Details, Price Details, Notes
  2. Click on Price Details tab to expand it
    - expect: Price Details tab expands
    - expect: Tab shows message 'Please add the rate'
    - expect: + Add Rate button is visible
    - expect: Grand Total shows $0.00
  3. Click + Add Rate button
    - expect: Rate Selection dialog opens
    - expect: Dialog title shows 'Rate Selection'
    - expect: Select Pricing section shows two radio options: HHG (selected by default) and Recurring Storage Billing
  4. Click on Recurring Storage Billing radio button
    - expect: Recurring Storage Billing is selected
    - expect: Form updates to show Recurring Storage specific fields
    - expect: Price Details Name field auto-fills with 'Storage Billing'
    - expect: Rate Selection dropdown is removed
  5. Verify dialog shows updated fields
    - expect: Visible fields: Price Details Name, Order #, Notes
    - expect: Select button remains enabled
  6. Click Select button to proceed to storage billing form
    - expect: Rate Selection dialog closes
    - expect: Storage Billing form opens
    - expect: Form title shows storage billing configuration options
  7. Verify Storage Billing form structure
    - expect: Form displays sections: Storage Info, Billing Info, Additional Charges
    - expect: Storage Info section shows: Billing Type dropdown, Start Date, End Date, Zip Code, Location, Weight, Daily Rate, Billing Cycle, Bill Date
    - expect: Billing Info section shows: Bill To, Name/Account dropdown, Address, Email, Phone, Auth Days, Payment Terms
  8. Click Billing Type dropdown in Storage Info
    - expect: Dropdown opens showing options: SIT, Perm Storage, Special Rate
  9. Select Perm Storage from dropdown
    - expect: Perm Storage is selected
    - expect: Form updates with predefined values: Daily Rate $0.28, Billing Cycle Month, Bill Date 25th
  10. Enter Billing Start Date: 02-25-2026
    - expect: Date field accepts input
    - expect: Date displays in correct format
  11. Enter Storage Location: CASC-31
    - expect: Location dropdown shows available facilities (CASC, GASC, etc.)
    - expect: CASC-31 option is selectable
    - expect: Location is populated
  12. Enter Weight: 1000 (in pounds)
    - expect: Weight field accepts numeric input
    - expect: Value displays as 1000 lbs
  13. Enter Daily Rate: 5.00
    - expect: Daily Rate field accepts decimal input
    - expect: Value displays with currency format
  14. Click Bill To dropdown and select Account option
    - expect: Bill To dropdown shows options: Account, Shipper, Custom
    - expect: Account option is selectable
  15. Select Account from Bill To dropdown
    - expect: Form updates to show Account Name dropdown
    - expect: Account selection fields appear
  16. Click Account Name dropdown and search for/select account
    - expect: Account dropdown shows list of 100+ accounts
    - expect: Aaversal Global Relocation appears in list
    - expect: Account can be selected
  17. Select Aaversal Global Relocation account
    - expect: Account is selected
    - expect: Confirmation dialog may appear asking to confirm account assignment
    - expect: If dialog appears, click Yes to confirm
  18. Verify account details auto-populate
    - expect: Email field auto-fills with account email
    - expect: Payment Terms auto-fills (e.g., Net 30)
  19. Enter Auth Days: 30
    - expect: Auth Days field accepts numeric input
    - expect: Value displays as 30
  20. Click Calculate button
    - expect: Loading indicator appears
    - expect: Calculation processes billing cycles
    - expect: Billing summary section appears below showing calculated values
  21. Verify billing summary calculations
    - expect: Billing summary header shows 'Perm Billing Summary'
    - expect: Summary displays: Billing Start Date, Location, Day Rate, Weight
    - expect: Multiple billing cycles are listed with calculated amounts
    - expect: First bill shows amount based on formula: Daily Rate × Days in Period
    - expect: For example: $5.00 × 28 days = $1,400.00 first bill
    - expect: Each bill shows date range and amount
    - expect: Current bill tab shows 'Bill: #1 (02/25/2026 - 03/24/2026) Current Bill $1,400.00'
  22. Click Apply button to apply the billing to order
    - expect: Billing is applied to order
    - expect: Storage billing details are saved
  23. Verify order status update dialog
    - expect: Confirmation dialog may appear asking to update status to 'In Storage'
    - expect: Dialog shows Yes/No buttons
  24. Click Yes to confirm status update to In Storage
    - expect: Order status updates from Quote to In Storage
    - expect: Order detail page refreshes
    - expect: Status tab shows new status
  25. Verify pricing is saved to order
    - expect: Price Details tab shows Storage Billing entry
    - expect: Billing amount displays in Price Details
    - expect: Grand Total updates from $0.00 to $1,400.00

#### 3.2. Verify Permanent Storage Billing is Persistent

**File:** `tests/e2e/permanent-storage-persistence.spec.ts`

**Steps:**
  1. Create an order with Permanent Storage billing and verify amount shows $1,400.00
    - expect: Storage billing created successfully
  2. Navigate away from order detail page
    - expect: User can navigate to Orders dashboard or other sections
  3. Return to the created order
    - expect: Order detail page reloads
    - expect: Storage Billing still appears in Price Details tab
    - expect: Amount displays correctly as $1,400.00
    - expect: Status remains as In Storage
  4. Click Save button on order
    - expect: Order saves successfully
    - expect: No data loss occurs
  5. Refresh the page (F5)
    - expect: Page reloads
    - expect: All order data including storage billing persists
    - expect: Grand Total, Status, and billing details are maintained

### 4. Add HHG Storage Pricing

**Seed:** `tests/seed.spec.ts`

#### 4.1. Add HHG Pricing to Existing Order

**File:** `tests/e2e/hhg-pricing.spec.ts`

**Steps:**
  1. Create a new order and navigate to order detail page
    - expect: Order detail page loads
  2. Expand Price Details tab
    - expect: Price Details tab expands
    - expect: + Add Rate button is visible
  3. Click + Add Rate button
    - expect: Rate Selection dialog opens
    - expect: HHG radio is selected by default
  4. Verify HHG is pre-selected
    - expect: HHG radio button is checked
    - expect: Form shows Rate Selection dropdown
    - expect: Form shows Price Details Name dropdown
  5. Click Rate Selection dropdown
    - expect: Dropdown opens showing available HHG rate options
    - expect: Multiple rate options are available
  6. Select an HHG rate from dropdown
    - expect: Rate is selected and displayed in field
  7. Click Price Details Name dropdown
    - expect: Dropdown shows available price detail names
    - expect: Options are selectable
  8. Select a price detail name
    - expect: Price detail name is selected and displayed
  9. Click Select button
    - expect: HHG pricing form is displayed or confirmed
    - expect: Pricing is added to order
  10. Verify HHG pricing appears in Price Details tab
    - expect: HHG pricing entry shows in Price Details
    - expect: Pricing details are displayed
    - expect: Order status remains as Quote (unless auto-updated)

#### 4.2. Create Multiple Storage Types on Single Order

**File:** `tests/e2e/multiple-pricing-types.spec.ts`

**Steps:**
  1. Create an order and add Permanent Storage Billing first
    - expect: Storage Billing shows in Price Details with $1,400.00
  2. Click + Add Rate button to add additional pricing
    - expect: Rate Selection dialog opens again
    - expect: User can add another pricing type to same order
  3. Select HHG radio button
    - expect: HHG form fields appear
  4. Fill HHG rate details and select pricing
    - expect: HHG pricing can be added to existing Storage Billing
  5. Verify both Storage Billing and HHG pricing appear in Price Details
    - expect: Price Details tab displays both pricing entries
    - expect: Amounts are shown for each type
    - expect: Grand Total reflects combined amount

### 5. Add SIT Storage Pricing

**Seed:** `tests/seed.spec.ts`

#### 5.1. Create SIT (Stored In Transit) Storage Billing

**File:** `tests/e2e/sit-storage-billing.spec.ts`

**Steps:**
  1. Create a new order and navigate to order detail page
    - expect: Order detail page loads
  2. Expand Price Details tab and click + Add Rate
    - expect: Rate Selection dialog opens
  3. Click on Recurring Storage Billing radio button
    - expect: Form updates to Recurring Storage Billing fields
  4. Click Select button to proceed to storage form
    - expect: Storage Billing form opens
  5. Click Billing Type dropdown
    - expect: Dropdown shows options: SIT, Perm Storage, Special Rate
  6. Select SIT from Billing Type dropdown
    - expect: SIT is selected
    - expect: Form updates with SIT-specific default values
    - expect: Billing Cycle shows as Month (same as Perm Storage)
    - expect: Bill Date shows as 25th
  7. Fill in required SIT fields: Start Date, Location, Weight, Daily Rate
    - expect: All fields accept input
    - expect: Values display correctly
  8. Select Bill To account and enter Auth Days
    - expect: Account selection works
    - expect: Auth Days accepts numeric input
  9. Click Calculate button
    - expect: Calculation processes
    - expect: Billing summary appears with calculated SIT storage amounts
  10. Click Apply to add SIT billing to order
    - expect: SIT storage billing is added to order
    - expect: Price Details tab shows SIT storage entry
    - expect: Amount is calculated and displayed

#### 5.2. Verify SIT Storage Billing Calculation

**File:** `tests/e2e/sit-calculation-verification.spec.ts`

**Steps:**
  1. Create SIT storage billing with defined daily rate and date range
    - expect: Billing summary shows calculated amounts
  2. Verify billing cycles are calculated monthly
    - expect: Billing Cycle field shows Month
    - expect: Billing summary displays multiple months
    - expect: Each month shows calculated amount based on daily rate and days in that month
  3. Verify current bill shows first month's calculation
    - expect: Current Bill tab shows correct first billing period
    - expect: Amount calculation is accurate: Daily Rate × Days in Period

### 6. Pricing Validation & Error Scenarios

**Seed:** `tests/seed.spec.ts`

#### 6.1. Validate Required Fields in Pricing Forms

**File:** `tests/e2e/pricing-validation.spec.ts`

**Steps:**
  1. Open Rate Selection dialog
    - expect: Dialog shows required field indicators (*)
  2. Try to click Select without filling Rate Selection dropdown
    - expect: Select button is disabled or validation error appears for missing Rate Selection
  3. Try to click Select without filling Price Details Name
    - expect: Select button is disabled or validation error appears for missing Price Details Name
  4. Fill all required Rate Selection fields
    - expect: Select button becomes enabled
  5. Proceed to Storage Billing form and try Calculate without filling required fields
    - expect: Calculate button is disabled or validation error appears
    - expect: Required fields (Billing Type, Start Date, Location, Weight, Daily Rate) must be filled
  6. Fill all storage fields correctly and click Calculate
    - expect: Calculation succeeds
    - expect: Billing summary appears

#### 6.2. Validate Email and Phone Formats

**File:** `tests/e2e/contact-validation.spec.ts`

**Steps:**
  1. Create new order and enter invalid email format (e.g., notanemail)
    - expect: Email field accepts input but validation error appears on save attempt or field blur
  2. Enter valid email format (test@example.com)
    - expect: Email validation passes
    - expect: No errors appear
  3. Enter phone number with various formats (9876543210, 987-654-3210, (987)654-3210)
    - expect: Phone field accepts numeric and formatted input
    - expect: Phone field handles various formats
  4. Try to save order with invalid phone (e.g., less than required digits)
    - expect: Validation error appears or phone is rejected
    - expect: Order cannot be saved with invalid phone

#### 6.3. Test Handling of Duplicate Pricing Entries

**File:** `tests/e2e/duplicate-pricing.spec.ts`

**Steps:**
  1. Create an order with Storage Billing for same date range and location
    - expect: First storage billing is added successfully
  2. Try to add another Storage Billing with identical parameters
    - expect: System either prevents duplicate or allows it with confirmation
    - expect: If allowed, both entries appear in Price Details
  3. Verify Grand Total if duplicates are allowed
    - expect: Amount reflects all pricing entries
    - expect: Calculation is correct

#### 6.4. Verify Date Range Validation

**File:** `tests/e2e/date-validation.spec.ts`

**Steps:**
  1. Open Storage Billing form
    - expect: Start Date and End Date fields are visible
  2. Enter End Date that is before Start Date
    - expect: Validation error appears or system prevents invalid date range
  3. Enter valid date range (Start before End)
    - expect: No validation errors
    - expect: Date range is accepted

### 7. Order Status & Navigation

**Seed:** `tests/seed.spec.ts`

#### 7.1. Verify Order Status Transitions

**File:** `tests/e2e/status-transitions.spec.ts`

**Steps:**
  1. Create a new order
    - expect: Order is created with default status Quote
  2. Navigate to order detail and click Status tab
    - expect: Status tab expands
    - expect: Current status shows Quote
    - expect: Status combobox/dropdown is visible
  3. Click status dropdown to view available statuses
    - expect: Dropdown shows available status options: Quote, Estimate, Estimate Sent, Rating, In Storage, Booking Pending, Booked
  4. Select In Storage status
    - expect: Status updates to In Storage
    - expect: Order detail refreshes with new status
  5. Navigate to Orders dashboard and verify status is persisted
    - expect: Orders table shows updated status In Storage for the order

#### 7.2. Verify Tab Navigation Within Order Detail

**File:** `tests/e2e/tab-navigation.spec.ts`

**Steps:**
  1. Navigate to any order detail page
    - expect: All tabs are visible: Status, Dates, Customer Details, Inventory Details, Price Details, Notes
  2. Click Status tab
    - expect: Status tab expands
    - expect: Status information is displayed
  3. Click Dates tab
    - expect: Dates tab expands
    - expect: Date fields are displayed (e.g., Est Move Date, Actual Move Date)
  4. Click Customer Details tab
    - expect: Customer Details tab expands
    - expect: Customer information displays: First Name, Last Name, Email, Phone
  5. Click Inventory Details tab
    - expect: Inventory Details tab expands
    - expect: Inventory section displays (likely showing items if any were added)
  6. Click Price Details tab
    - expect: Price Details tab expands
    - expect: Pricing information and + Add Rate button are visible
  7. Click Notes tab
    - expect: Notes tab expands
    - expect: Text area for notes is displayed
  8. Verify all tabs can be toggled open and closed
    - expect: Clicking tab again collapses it
    - expect: Tab navigation is smooth

#### 7.3. Verify Order Detail Page Buttons

**File:** `tests/e2e/order-buttons.spec.ts`

**Steps:**
  1. Navigate to order detail page
    - expect: Order buttons are visible at bottom: Save, Documents, Revenue, Commission, Options
  2. Click Save button without making changes
    - expect: Save either processes with no errors or shows message that no changes were made
  3. Modify a field (e.g., add Notes) and click Save
    - expect: Changes are saved
    - expect: Save button may be disabled after successful save
  4. Click Documents button
    - expect: Documents section opens or navigates to documents for this order
  5. Verify other buttons (Revenue, Commission, Options) are present
    - expect: All buttons are visible and enabled/disabled appropriately based on order state
