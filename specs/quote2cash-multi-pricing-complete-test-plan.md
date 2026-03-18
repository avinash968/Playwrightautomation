# Quote2Cash Multi-Pricing Complete Test Plan

## Application Overview

Comprehensive end-to-end test plan for Quote2Cash application validating complete order lifecycle with multiple pricing configurations (Perm Storage, HHG, and SIT). Tests cover authentication, order creation, pricing application, active price management, error handling, and all edge cases for multi-pricing validation.

## Test Scenarios

### 1. Authentication & Dashboard

**Seed:** `tests/seed.spec.ts`

#### 1.1. Login with Valid Credentials

**File:** `tests/auth/valid-login.spec.ts`

**Steps:**
  1. Navigate to https://dev.quote2cash.app
    - expect: Login page displays with username and password fields
    - expect: Quote2Cash branding visible
  2. Enter username 'bvl' in the username field
    - expect: Username field populated with 'bvl'
  3. Enter password 'demo' in the password field
    - expect: Password field populated (masked)
  4. Click the 'Login' button
    - expect: Page redirects to dashboard
    - expect: Loading spinner appears briefly
  5. Wait for dashboard to fully load (3 seconds)
    - expect: Dashboard displays with 'Create' button visible
    - expect: 'Orders' navigation menu visible
    - expect: User status indicators visible on top navbar

#### 1.2. Login with Invalid Username

**File:** `tests/auth/invalid-username.spec.ts`

**Steps:**
  1. Navigate to https://dev.quote2cash.app
    - expect: Login page displays
  2. Enter username 'invaliduser' and password 'demo'
    - expect: Credentials filled in
  3. Click Login button
    - expect: Error message displays
    - expect: User remains on login page
    - expect: Error text indicates 'Invalid username or password'

#### 1.3. Login with Invalid Password

**File:** `tests/auth/invalid-password.spec.ts`

**Steps:**
  1. Navigate to https://dev.quote2cash.app and enter username 'bvl'
    - expect: Username field populated
  2. Enter password 'wrongpassword' and click Login
    - expect: Error message displays
    - expect: User remains on login page

#### 1.4. Login with Empty Fields

**File:** `tests/auth/empty-fields.spec.ts`

**Steps:**
  1. Navigate to login page without entering any credentials
    - expect: Login page displays with empty fields
  2. Click Login button without entering credentials
    - expect: Validation error appears
    - expect: Fields marked as required/invalid
    - expect: Login button remains disabled or shows error

### 2. Order Creation & Management

**Seed:** `tests/seed.spec.ts`

#### 2.1. Create New Order with Valid Data

**File:** `tests/orders/create-order-valid.spec.ts`

**Steps:**
  1. Login with credentials bvl/demo and wait for dashboard
    - expect: Dashboard loads successfully
    - expect: Create button visible
  2. Click 'Create' button
    - expect: Dropdown menu appears
    - expect: Options include 'New Order'
  3. Click 'New Order' option
    - expect: Order creation form modal/dialog opens
    - expect: Form contains First Name, Last Name, Email, Phone fields
  4. Fill First Name with 'John'
    - expect: First Name field contains 'John'
  5. Fill Last Name with 'Doe'
    - expect: Last Name field contains 'Doe'
  6. Fill Email with 'john.doe@example.com'
    - expect: Email field contains valid email format
    - expect: No validation error displays
  7. Fill Phone with '(555) 987-6543'
    - expect: Phone field populated with formatted number
  8. Click 'Save' button
    - expect: Confirmation popup/toast appears
    - expect: Success message indicates order creation
    - expect: New order ID assigned
  9. Handle confirmation popup by clicking OK or closing it
    - expect: Popup disappears
    - expect: Order appears in orders list with 'Quote' status

#### 2.2. Create Order with Empty Required Fields

**File:** `tests/orders/create-order-empty-fields.spec.ts`

**Steps:**
  1. Login and navigate to Create > New Order
    - expect: Order creation form opens
  2. Click Save without filling any fields
    - expect: Validation errors appear
    - expect: Required fields highlighted in red/error state
    - expect: Save button disabled or prevents submission

#### 2.3. Create Order with Invalid Email Format

**File:** `tests/orders/create-order-invalid-email.spec.ts`

**Steps:**
  1. Login and open New Order form
    - expect: New Order form displays
  2. Fill all fields with valid data except Email = 'invalidformat'
    - expect: Email field populated with invalid format
  3. Click Save button
    - expect: Email validation error displays
    - expect: Order not created
    - expect: Form remains open for correction

#### 2.4. Open Created Order Details

**File:** `tests/orders/open-order-details.spec.ts`

**Steps:**
  1. Login and navigate to Orders list
    - expect: Panel containing list of orders displays
  2. Locate and click on newly created order row (John Doe with Quote status)
    - expect: Order details page loads
    - expect: Customer name 'John Doe' visible
    - expect: Order status shows 'Quote'
  3. Verify order details page contains Add Rate button
    - expect: 'Add Rate' button visible in Price Details section
    - expect: No pricing currently applied

### 3. Perm Storage Pricing - Initial Pricing

**Seed:** `tests/seed.spec.ts`

#### 3.1. Add Perm Storage Pricing - Complete Workflow

**File:** `tests/pricing/perm-storage-complete.spec.ts`

**Steps:**
  1. Create order and open order details page
    - expect: Order details page loads
    - expect: Add Rate button visible
  2. Click 'Add Rate' button
    - expect: Rate selection dialog opens
    - expect: Multiple pricing options visible (HHG, Recurring Storage Billing, etc.)
  3. Click 'Recurring Storage Billing' radio button
    - expect: Recurring Storage Billing option selected
    - expect: Select button becomes enabled
  4. Click 'Select' button to proceed
    - expect: Recurring Storage Billing form opens
    - expect: Form contains Billing Type, Start Date, Location, Weight, Daily Rate fields
  5. Click Billing Type dropdown
    - expect: Dropdown opens
    - expect: Options include 'Perm Storage' and 'SIT Storage'
  6. Select 'Perm Storage' from dropdown
    - expect: Perm Storage selected (button label updates)
  7. Enter Start Date as '02-27-2026'
    - expect: Date field populated
    - expect: Date format valid
  8. Click Location dropdown
    - expect: Location dropdown opens
    - expect: Multiple location options visible (CASC, warehouse codes, etc.)
  9. Select 'CASC - 31' from locations
    - expect: CASC - 31 selected
  10. Enter Weight as '1500' lbs
    - expect: Weight field populated with 1500
  11. Enter Daily Rate as '5.00'
    - expect: Daily Rate field shows $5.00
  12. Click 'Bill To' dropdown
    - expect: Bill To dropdown opens
    - expect: Options include Account, Shipper, Custom
  13. Select 'Account' from Bill To dropdown
    - expect: Account selected
  14. Handle warning popup asking to confirm account assignment
    - expect: Confirmation dialog appears with 'Are you sure you want to assign this account to the order?'
  15. Click 'Yes' button on warning popup
    - expect: Popup closes
    - expect: Account Name dropdown becomes available
  16. Click Account Name dropdown and select first available account
    - expect: Account dropdown shows list of accounts
    - expect: Selection accepted
    - expect: Payment Terms auto-populate
  17. Enter Auth Days as '30'
    - expect: Auth Days field contains 30
  18. Click 'Bill to Shipper after Auth Days' checkbox
    - expect: Checkbox becomes checked/enabled
  19. Scroll down to Additional Charges section and click 'Add More'
    - expect: New charge row appears in table
  20. Enter charge Line Item Name as 'Delivery Fee'
    - expect: Line Item Name field populated
  21. Click Frequency dropdown and select 'Recurring'
    - expect: Recurring selected
    - expect: Note displays: 'Applied monthly every bill'
  22. Click Type of Charge dropdown and select 'Add to Total'
    - expect: Add to Total selected
  23. Enter charge Value as '50'
    - expect: Charge amount field shows $50.00
  24. Click 'Calculate' button
    - expect: Perm Billing Summary displays
    - expect: Summary shows Start Date, Location, Day Rate, Weight
    - expect: Bill #1 pricing calculated
    - expect: First bill amount = (28 days × $5.00) + $50.00 = $2,150.00
  25. Click 'Apply' button to apply pricing
    - expect: Success dialog appears
    - expect: Message indicates 'Storage Billing created successfully'
    - expect: Offers to update order status to 'In Storage'
  26. Click 'Yes' on status update confirmation
    - expect: Order status updates to 'In Storage'
    - expect: Storage Billing tab shows $2,150.00 with 'Active' and 'Ongoing' status
    - expect: Price Details reflects new active price

#### 3.2. Perm Storage - Validation on Missing Required Fields

**File:** `tests/pricing/perm-storage-missing-fields.spec.ts`

**Steps:**
  1. Create order and open Recurring Storage Billing form for Perm Storage
    - expect: Perm Storage form displays
  2. Leave Start Date empty and click Calculate
    - expect: Validation error appears
    - expect: Start Date field highlighted
    - expect: Calculate button disabled or error message shown
  3. Fill Start Date but leave Location empty, then click Calculate
    - expect: Validation error for Location field
    - expect: Form prevents calculation
  4. Fill all storage fields but leave Auth Days blank, then click Calculate
    - expect: Validation error for Auth Days (required field)
    - expect: Calculate fails

#### 3.3. Perm Storage - Invalid Date Format

**File:** `tests/pricing/perm-storage-invalid-date.spec.ts`

**Steps:**
  1. Open Perm Storage pricing form
    - expect: Form loads
  2. Enter invalid date format like '13-45-2026' in Start Date
    - expect: Date validation error displays
    - expect: Invalid month/day highlighted
  3. Enter date in past (before today 02-27-2026)
    - expect: Past date validation error displays or warning
    - expect: Form prevents applying past dates

#### 3.4. Perm Storage - Invalid Rate Values

**File:** `tests/pricing/perm-storage-invalid-rates.spec.ts`

**Steps:**
  1. Open Perm Storage form and fill all fields
    - expect: Form ready for rate entry
  2. Enter negative value '-5' in Daily Rate field
    - expect: Validation error for negative rates
    - expect: Field rejects negative input
  3. Enter zero value '0' in Daily Rate
    - expect: Validation error or warning
    - expect: Calculate disabled for zero rates
  4. Enter very large value '99999' in Daily Rate
    - expect: System accepts or shows warning for unusually high rates

### 4. HHG Pricing - Additional Pricing

**Seed:** `tests/seed.spec.ts`

#### 4.1. Add HHG Pricing via 3-Dot Menu

**File:** `tests/pricing/hhg-add-pricing.spec.ts`

**Steps:**
  1. Create order with Perm Storage pricing applied (Active status)
    - expect: Order shows Storage Billing with Active and $2,150.00
  2. Look for 3-dot menu icon beside the Active Price
    - expect: 3-dot menu (⋮ or Options) visible next to Storage Billing tab
  3. Click 3-dot menu beside Active pricing
    - expect: Dropdown menu appears
    - expect: Options include 'Add New Price', 'Edit', 'Delete'
  4. Select 'Add New Price' from menu
    - expect: Rate selection dialog opens
    - expect: Same pricing options available as first pricing
  5. Click 'HHG' radio button
    - expect: HHG option selected
  6. Click 'Select' button
    - expect: HHG Shipment form opens
    - expect: Form contains Origin, Destination, Weight, Rate, Additional Charges fields
  7. Scroll and verify all required shipment fields are present
    - expect: Origin Zip Code field visible
    - expect: Destination Zip Code field visible
    - expect: Weight/Cubic Feet field visible
    - expect: Rate options/dropdown visible
    - expect: Additional Charges section present
  8. Enter Origin Zip Code as '94105' (valid US zip)
    - expect: Origin Zip field populated
  9. Enter Destination Zip Code as '90210' (valid US zip)
    - expect: Destination Zip field populated
  10. Enter Weight as '5000' lbs
    - expect: Weight field populated
  11. Click Rate dropdown and select first available rate
    - expect: Rate dropdown opens
    - expect: Rate options display with pricing
    - expect: First rate selected
  12. Enter Price Detail Name as 'BOL-AR'
    - expect: BOL-AR entered in name field
  13. Click 'Calculate' button
    - expect: HHG pricing calculated
    - expect: Summary displays with calculated total
  14. Verify calculated value matches expected pricing before apply
    - expect: Calculation visible (base rate + weight calculations)
    - expect: Total shown in summary
  15. Click 'Apply' button
    - expect: Success message appears
    - expect: Confirmation dialog shows new HHG pricing added
  16. Verify HHG pricing now shows as Active (most recently applied)
    - expect: HHG pricing tab appears next to Perm Storage tab
    - expect: HHG tab shows 'Active' status
    - expect: Perm Storage pricing shows 'Inactive' or background status
  17. Click on previous Perm Storage tab to view it
    - expect: Perm Storage pricing still available but not Active
    - expect: Shows full pricing details

#### 4.2. HHG Pricing - Validation on Missing Required Fields

**File:** `tests/pricing/hhg-missing-fields.spec.ts`

**Steps:**
  1. Open HHG pricing form via Add New Price menu
    - expect: HHG form displays
  2. Click Calculate without entering Origin Zip
    - expect: Validation error for Origin Zip
    - expect: Field highlighted as required
  3. Fill Origin Zip but leave Destination Zip empty and click Calculate
    - expect: Validation error for Destination Zip
    - expect: Calculate blocked
  4. Fill both zips but leave Weight empty and click Calculate
    - expect: Validation error for Weight field
    - expect: Form prevents calculation
  5. Fill shipment details but don't select a Rate, then click Calculate
    - expect: Rate selection required error
    - expect: Calculate fails without rate selection

#### 4.3. HHG Pricing - Invalid Zip Code Format

**File:** `tests/pricing/hhg-invalid-zip.spec.ts`

**Steps:**
  1. Open HHG pricing form
    - expect: Form loads
  2. Enter invalid Origin Zip Code like 'ABCDE' (non-numeric)
    - expect: Validation error for invalid zip format
    - expect: Field only accepts numbers
  3. Enter zip code with incorrect length '123' (less than 5 digits)
    - expect: Validation error for zip length
    - expect: Field requires 5-digit format
  4. Enter non-existent zip code '00000'
    - expect: System accepts or warns about invalid zip area

#### 4.4. HHG Pricing - Weight Validation

**File:** `tests/pricing/hhg-invalid-weight.spec.ts`

**Steps:**
  1. Open HHG pricing form with valid zip codes
    - expect: Zip codes accepted
  2. Enter Weight as '-1000' (negative)
    - expect: Validation error for negative weight
    - expect: Field rejects negative values
  3. Enter Weight as '0'
    - expect: Validation error or warning for zero weight
    - expect: Calculate may be blocked
  4. Enter extremely high weight '999999999'
    - expect: System accepts or warns about unusually high weights
    - expect: Rate may increase proportionally

### 5. SIT Storage Pricing - Third Pricing Type

**Seed:** `tests/seed.spec.ts`

#### 5.1. Add SIT Storage Pricing via 3-Dot Menu

**File:** `tests/pricing/sit-add-pricing.spec.ts`

**Steps:**
  1. Create order with Perm Storage and HHG pricing applied
    - expect: Order shows two pricing types with HHG as Active
  2. Click 3-dot menu beside HHG Active pricing
    - expect: Options menu appears
  3. Click 'Add New Price'
    - expect: Rate selection dialog opens third time
  4. Click 'Recurring Storage Billing' radio button
    - expect: Recurring Storage Billing selected
  5. Click 'Select' button
    - expect: Recurring Storage form opens for SIT configuration
  6. Click Billing Type dropdown
    - expect: Dropdown shows Perm Storage and SIT options
  7. Select 'SIT' from Billing Type dropdown
    - expect: SIT selected (form may have different fields than Perm)
  8. Enter Start Date as '03-01-2026'
    - expect: Start date populated
  9. Click Location dropdown and select available location
    - expect: Location selected
  10. Enter Weight as '2500' lbs
    - expect: Weight field contains 2500
  11. Enter Daily Rate as '3.50'
    - expect: Daily Rate shows $3.50
  12. Click Bill To dropdown and select 'Account'
    - expect: Account option selected
  13. Click Yes on warning popup
    - expect: Account Name dropdown becomes available
  14. Select account from Account Name dropdown
    - expect: Account selected, Payment Terms auto-populate
  15. Fill Auth Days as '45'
    - expect: Auth Days field contains 45
  16. Enable 'Bill to Shipper after Auth Days' checkbox
    - expect: Checkbox marked as enabled
  17. Click 'Add More' for additional charges
    - expect: New charge row added
  18. Add 'Handling Fee' charge with value '25' and Recurring frequency
    - expect: Charge configured with Handling Fee name and $25 amount
  19. Click 'Calculate' button
    - expect: SIT Billing Summary displays
    - expect: Daily rate $3.50 shown
    - expect: Multiple billing periods displayed
  20. Click 'Apply' to activate SIT pricing
    - expect: Success confirmation
    - expect: SIT pricing now shows as Active
  21. Verify all three pricing types are accessible
    - expect: Order shows 3 pricing tabs: Perm Storage (inactive), HHG (inactive), SIT (Active)
    - expect: Can click between tabs to view each pricing

#### 5.2. SIT Pricing - Complete Calculation Validation

**File:** `tests/pricing/sit-calculation-validation.spec.ts`

**Steps:**
  1. Set up SIT pricing with Start Date 03-01-2026, Weight 2500 lbs, Daily Rate $3.50
    - expect: Form filled with values
  2. Add additional charge of $25 (Handling Fee) as recurring
    - expect: Charge row shows Handling Fee $25 recurring
  3. Click Calculate and review bill breakdown
    - expect: Bill #1 calculated showing: (day count × 2500 lbs × $3.50) + $25.00
    - expect: Multiple future bills displayed
  4. Verify daily rate and weight are correctly multiplied in calculation
    - expect: Calculation = storage days × weight × daily rate = correct total per day
    - expect: Monthly total correctly computed

#### 5.3. SIT Pricing - Missing Required Fields

**File:** `tests/pricing/sit-missing-fields.spec.ts`

**Steps:**
  1. Open SIT pricing form
    - expect: Form displays
  2. Click Calculate with empty Start Date
    - expect: Validation error for Start Date
  3. Leave Daily Rate empty and attempt Calculate
    - expect: Validation error for Daily Rate
    - expect: Calculate blocked

### 6. Active Pricing Management

**Seed:** `tests/seed.spec.ts`

#### 6.1. Verify Active Price Updates on New Application

**File:** `tests/pricing/active-price-transitions.spec.ts`

**Steps:**
  1. Create order and add Perm Storage pricing ($2,150.00)
    - expect: Order shows Perm Storage with Active status
    - expect: Grand Total shows $2,150.00
  2. Add second pricing via 3-dot menu (HHG with calculated value $4,500.00)
    - expect: HHG pricing applied
    - expect: HHG becomes Active
    - expect: Perm Storage becomes inactive
  3. Verify Grand Total updates to reflect HHG pricing
    - expect: Grand Total changes from $2,150.00 to $4,500.00
    - expect: Active price reflects current HHG rate
  4. Add third pricing (SIT with value $3,200.00)
    - expect: SIT pricing applied
    - expect: SIT becomes Active
    - expect: Previous pricings become inactive
  5. Verify Grand Total updates to SIT amount $3,200.00
    - expect: Grand Total shows $3,200.00
    - expect: Only SIT marked as Active

#### 6.2. Switch Between Inactive and Active Pricing

**File:** `tests/pricing/pricing-tab-navigation.spec.ts`

**Steps:**
  1. Set up order with 3 pricing types (Perm, HHG, SIT with SIT as Active)
    - expect: All three pricing tabs visible
    - expect: SIT marked Active
  2. Click on Perm Storage pricing tab
    - expect: Perm Storage tab content displays
    - expect: Can view all Perm Storage details (location, daily rate, auth days)
    - expect: Grand Total does NOT change (remains SIT value)
  3. Click on HHG pricing tab
    - expect: HHG details display
    - expect: Can review HHG shipment data
    - expect: Grand Total remains SIT amount
  4. Return to SIT tab
    - expect: SIT content displays
    - expect: SIT remains marked as Active

#### 6.3. Pricing Mismatch - Calculated Value vs Applied Value

**File:** `tests/pricing/pricing-mismatch-detection.spec.ts`

**Steps:**
  1. Create HHG pricing with specific weight and rate
    - expect: Form filled with specific values
  2. Click Calculate and note the calculated total (e.g., $4,500)
    - expect: Perm Billing Summary or Calculated Summary shows $4,500
  3. Click Apply button
    - expect: Pricing applied
    - expect: Applied amount matches calculated amount
  4. Verify that applied price equals calculated price before apply
    - expect: No mismatch between calculated and applied values
    - expect: Grand Total matches expected calculation

#### 6.4. Verify Pricing History Across Multiple Orders

**File:** `tests/pricing/multi-order-pricing.spec.ts`

**Steps:**
  1. Create first order (Order A) with Perm Storage pricing
    - expect: Order A shows Perm Storage pricing
  2. Navigate away from order and create second order (Order B)
    - expect: New order created separately
  3. Add HHG pricing to Order B
    - expect: Order B shows HHG pricing
  4. Return to Order A details
    - expect: Order A still shows Perm Storage (HHG not applied to Order A)
  5. Verify each order maintains independent pricing
    - expect: Pricing from Order B doesn't affect Order A
    - expect: Correct pricing displays for each order

### 7. Error Handling & Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 7.1. Handle Warning Popup for Account Assignment

**File:** `tests/error-handling/account-assignment-warning.spec.ts`

**Steps:**
  1. Add Recurring Storage Billing form and select Bill To = Account
    - expect: Warning dialog appears
    - expect: Message: 'Are you sure you want to assign this account to the order?'
  2. Click 'No' on warning popup
    - expect: Popup closes
    - expect: Account assignment cancelled
    - expect: Bill To reverts to unselected state
  3. Attempt account assignment again and click 'Yes'
    - expect: Account assignment confirmed
    - expect: Account Name dropdown becomes available
    - expect: Proceeding with form allowed

#### 7.2. Handle Status Update Confirmation Popup

**File:** `tests/error-handling/status-update-confirmation.spec.ts`

**Steps:**
  1. Add and apply Perm Storage pricing to completion
    - expect: Status update confirmation popup appears
    - expect: Asking 'Would you like to update order status to In Storage?'
  2. Click 'No' on confirmation
    - expect: Popup closes
    - expect: Pricing applied but order status remains 'Quote'
    - expect: Pricing still visible and active
  3. Manually open 3-dot menu and check if status can be updated after pricing
    - expect: Status update option available in menu

#### 7.3. Handle Calculation Failures

**File:** `tests/error-handling/calculation-failures.spec.ts`

**Steps:**
  1. Open Perm Storage pricing form and intentionally enter extreme values
    - expect: Form accepts values
  2. Click Calculate with Weight = 999999999 and Rate = 99999
    - expect: Calculation completes or shows warning
    - expect: System handles large numbers gracefully
  3. Try Calculate with conflicting data (future end date before start date)
    - expect: Validation error appears
    - expect: Calculate prevented

#### 7.4. Handle Network/Timeout Errors During Apply

**File:** `tests/error-handling/network-timeout.spec.ts`

**Steps:**
  1. Open dev tools and simulate slow network (3G throttling)
    - expect: Network throttling active
  2. Add and Calculate pricing, then click Apply
    - expect: Request goes to server
    - expect: Loading indicator may appear
  3. Wait for response or timeout to occur
    - expect: Success message appears when network recovers
    - expect: Or error message if timeout occurs
    - expect: Order state remains consistent

#### 7.5. Handle Duplicate Pricing Prevention (If Applicable)

**File:** `tests/error-handling/duplicate-pricing.spec.ts`

**Steps:**
  1. Add Perm Storage pricing and apply
    - expect: Perm Storage active on order
  2. Attempt to add duplicate Perm Storage pricing via 3-dot menu
    - expect: System either prevents duplicate or displays warning
    - expect: Form prevents applying identical pricing

### 8. Page Interactions & UI Behavior

**Seed:** `tests/seed.spec.ts`

#### 8.1. Dropdown Menu Operating as Expected

**File:** `tests/ui/dropdown-interactions.spec.ts`

**Steps:**
  1. Click Billing Type dropdown in Perm Storage form
    - expect: Dropdown expands
    - expect: Options visible: Perm Storage, SIT
    - expect: Correct option can be selected
  2. Click dropdown again to collapse
    - expect: Dropdown collapses
    - expect: Selected value remains visible
  3. Click outside dropdown
    - expect: Dropdown closes automatically
    - expect: Selected value persists

#### 8.2. Date Picker Functionality

**File:** `tests/ui/date-picker.spec.ts`

**Steps:**
  1. Click on Start Date field in Perm Storage form
    - expect: Date input field becomes active or date picker appears
  2. Type valid date '02-27-2026'
    - expect: Date populated correctly
    - expect: Format preserved
  3. Clear date and enter new date '03-15-2026'
    - expect: Date updates without errors

#### 8.3. Checkbox Toggle Functionality

**File:** `tests/ui/checkbox-toggle.spec.ts`

**Steps:**
  1. Locate 'Bill to Shipper after Auth Days' checkbox in unchecked state
    - expect: Checkbox is unchecked initially
  2. Click checkbox to enable
    - expect: Checkbox becomes checked
    - expect: Visual indicator shows enabled state
  3. Click checkbox again to disable
    - expect: Checkbox becomes unchecked
    - expect: Visual feedback confirms toggle

#### 8.4. Button State Changes (Disabled/Enabled)

**File:** `tests/ui/button-states.spec.ts`

**Steps:**
  1. View pricing form with empty required fields
    - expect: Calculate button appears disabled (grayed out or non-clickable)
  2. Fill all required fields
    - expect: Calculate button becomes enabled (clickable)
    - expect: Visual state changes
  3. Click Calculate and wait for response
    - expect: Apply button becomes enabled after calculation
    - expect: Button becomes clickable

#### 8.5. Tab Navigation Between Pricing Types

**File:** `tests/ui/tab-navigation.spec.ts`

**Steps:**
  1. View order with 3 pricing types (tabs visible)
    - expect: Perm Storage tab (inactive)
    - expect: HHG tab (inactive)
    - expect: SIT tab (Active/selected)
  2. Click on Perm Storage tab
    - expect: Tab becomes selected (highlighted)
    - expect: Perm Storage content displays
    - expect: SIT tab becomes unselected
  3. Click HHG tab
    - expect: HHG content displays
    - expect: Correct tab highlighted

#### 8.6. 3-Dot Menu Accessibility and Options

**File:** `tests/ui/three-dot-menu.spec.ts`

**Steps:**
  1. Hover over or locate 3-dot menu icon beside pricing
    - expect: Menu icon visible and interactive
  2. Click 3-dot menu
    - expect: Menu opens with options: 'Add New Price', 'Edit', 'Delete'
  3. Click outside menu to close
    - expect: Menu closes
    - expect: No action triggered
  4. Open menu again and click on 'Add New Price'
    - expect: Rate selection dialog opens
    - expect: Menu closes

#### 8.7. Scroll and Viewport Behavior

**File:** `tests/ui/scroll-behavior.spec.ts`

**Steps:**
  1. Open pricing form that extends beyond viewport
    - expect: Form content visible with scrollable area
  2. Scroll down to view Additional Charges section
    - expect: Additional Charges section appears
    - expect: 'Add More' button accessible
  3. Scroll to Calculate button
    - expect: Calculate button visible and clickable
  4. Click Calculate and scroll to view summary
    - expect: Perm Billing Summary or equivalent appears
    - expect: Can scroll to view all bill details

### 9. Data Persistence & State Management

**Seed:** `tests/seed.spec.ts`

#### 9.1. Form Data Persists During Navigation

**File:** `tests/state-management/form-data-persistence.spec.ts`

**Steps:**
  1. Fill Perm Storage pricing form with various values (Start Date, Location, Weight, etc.)
    - expect: All fields contain entered values
  2. Don't click Calculate, instead click outside form or navigate
    - expect: Form data may persist or be discarded (depending on UX design)
  3. Return to pricing form if still open
    - expect: Form either retains data or resets to blank (consistent behavior)

#### 9.2. Pricing Data Persists After Apply

**File:** `tests/state-management/pricing-persistence.spec.ts`

**Steps:**
  1. Apply Perm Storage pricing with specific values
    - expect: Pricing stored and displayed as Active
  2. Refresh page (F5 or browser refresh)
    - expect: Page reloads
    - expect: Order still shows Perm Storage pricing
    - expect: Data persisted to database
  3. Navigate away from order and back
    - expect: Order retains all pricing information
    - expect: Active pricing status preserved

#### 9.3. Order Status Persists Correctly

**File:** `tests/state-management/order-status-persistence.spec.ts`

**Steps:**
  1. Create order (status: Quote) and add pricing, confirm status update to In Storage
    - expect: Order status changes to 'In Storage'
  2. Refresh page
    - expect: Status still shows 'In Storage'
    - expect: Not reverted to Quote
  3. Log out and log back in
    - expect: Order status maintained as 'In Storage'
