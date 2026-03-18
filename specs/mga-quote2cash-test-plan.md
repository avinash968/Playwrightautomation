# Quote2Cash Estimate Workflow Comprehensive Test Plan

## Application Overview

Quote2Cash is an enterprise SaaS platform designed for freight/moving companies to create estimates, manage quotes, calculate shipping rates, and generate documents. The system supports multiple shipment types (Container, LCL, Air) with specific mandatory fields for each. Sales representatives can create estimates with customer details, moving information, configure rates, apply pricing, and generate professional shipping documents. This test plan covers the complete estimate workflow from authentication through document generation.

## Test Scenarios

### 1. AC1: Authentication & Dashboard Access

**Seed:** `tests/seed.spec.ts`

#### 1.1. AC1.1 - Successful Login with Valid Credentials

**File:** `tests/e2e/authentication/ac1-login-success.spec.ts`

**Steps:**
  1. Navigate to https://dev.quote2cash.app
    - expect: Login page is displayed with username and password fields
    - expect: Page title shows 'Quote2Cash - Quote Automation, Invoice/ Estimate Creation, Payments'
  2. Enter username 'mga' in the username field
    - expect: Username field contains 'mga'
  3. Enter password 'demo' in the password field
    - expect: Password field is filled (contents masked)
  4. Click the 'Login' button
    - expect: Login is processed and page navigates to dashboard
    - expect: URL changes to #/app/jobboard
    - expect: Page title shows 'Quote2Cash - Estimates'
  5. Verify dashboard is displayed
    - expect: Dashboard contains job list with estimates
    - expect: Left sidebar navigation is visible
    - expect: Top navbar shows user information and company name

#### 1.2. AC1.2 - Login Failure with Invalid Credentials

**File:** `tests/e2e/authentication/ac1-login-invalid.spec.ts`

**Steps:**
  1. Navigate to https://dev.quote2cash.app
    - expect: Login page is displayed
  2. Enter username 'invaliduser' in the username field
    - expect: Username field contains 'invaliduser'
  3. Enter password 'wrongpassword' in the password field
    - expect: Password field is filled
  4. Click the 'Login' button
    - expect: Login fails
    - expect: Error message is displayed to the user
    - expect: User remains on login page

#### 1.3. AC1.3 - Login with Empty Fields (Validation)

**File:** `tests/e2e/authentication/ac1-login-empty-validation.spec.ts`

**Steps:**
  1. Navigate to https://dev.quote2cash.app
    - expect: Login page is displayed
  2. Leave username field empty
    - expect: Username field is empty
  3. Leave password field empty
    - expect: Password field is empty
  4. Click the 'Login' button
    - expect: Form validation prevents submission OR error message displayed
    - expect: User remains on login page

#### 1.4. AC1.4 - Dashboard Navigation After Login

**File:** `tests/e2e/authentication/ac1-dashboard-navigation.spec.ts`

**Steps:**
  1. Login successfully with valid credentials
    - expect: Dashboard is displayed with jobboard
  2. Verify left sidebar navigation elements
    - expect: Sidebar contains menu items: Sales Leads, Estimates, Customers, My Schedule, All Documents, Reports, Settings
  3. Verify top navbar elements
    - expect: Navbar displays company name and user profile section
    - expect: Navbar contains Create dropdown menu
    - expect: Navbar contains Alerts section
  4. Verify job list on dashboard
    - expect: Current estimates are displayed in list format
    - expect: Job list shows customer names, estimate numbers, and status

### 2. AC2: Create New Estimate

**Seed:** `tests/seed.spec.ts`

#### 2.1. AC2.1 - Create New Estimate via Create Menu

**File:** `tests/e2e/estimates/ac2-create-new-estimate.spec.ts`

**Steps:**
  1. Login with valid credentials and access dashboard
    - expect: Dashboard is displayed
  2. Click on 'Create' dropdown menu in the navbar
    - expect: Create menu expands showing options: 'New Estimate', 'New Task'
  3. Click on 'New Estimate' option
    - expect: Create Inquiry modal dialog opens
    - expect: Modal title shows 'Create Inquiry'
    - expect: Modal displays Customer Info tab (active) and Moving Info tab
  4. Verify modal contains required fields
    - expect: Customer Info section has fields: Full Name, Phone Number, Email Address, Req Job Date
    - expect: Next button is visible
    - expect: Save button is visible

#### 2.2. AC2.2 - Modal Title and Location Selection

**File:** `tests/e2e/estimates/ac2-location-selection.spec.ts`

**Steps:**
  1. Click on Create > New Estimate to open the Create Inquiry modal
    - expect: Create Inquiry modal opens
    - expect: Modal shows dropdown for location selection with 'Michael Greaves Associates' as default
  2. Verify default location is selected
    - expect: 'Michael Greaves Associates' is pre-selected in the location dropdown

### 3. AC3: Customer Details & Job Date Entry

**Seed:** `tests/seed.spec.ts`

#### 3.1. AC3.1 - Enter Customer Full Name

**File:** `tests/e2e/estimates/ac3-customer-full-name.spec.ts`

**Steps:**
  1. Open Create Inquiry modal via Create > New Estimate
    - expect: Modal is displayed with Customer Info tab active
  2. Click on Full Name field
    - expect: Full Name field is active and ready for input
  3. Type 'John Smith' in the Full Name field
    - expect: Full Name field contains 'John Smith'
  4. Verify field accepts alphanumeric characters
    - expect: Field accepts letters, spaces, and numbers

#### 3.2. AC3.2 - Enter Phone Number

**File:** `tests/e2e/estimates/ac3-customer-phone.spec.ts`

**Steps:**
  1. Open Create Inquiry modal via Create > New Estimate
    - expect: Modal is displayed with Customer Info tab active
  2. Click on Phone Number field
    - expect: Phone Number field is active and ready for input
  3. Type '5551234567' in the Phone Number field
    - expect: Phone Number field contains '5551234567'
  4. Verify field accepts numeric characters
    - expect: Field accepts 10-digit phone number format

#### 3.3. AC3.3 - Enter Email Address

**File:** `tests/e2e/estimates/ac3-customer-email.spec.ts`

**Steps:**
  1. Open Create Inquiry modal via Create > New Estimate
    - expect: Modal is displayed with Customer Info tab active
  2. Click on Email Address field
    - expect: Email Address field is active and ready for input
  3. Type 'john.smith@email.com' in the Email Address field
    - expect: Email Address field contains 'john.smith@email.com'
  4. Verify field accepts email format
    - expect: Field accepts standard email format with @ and domain

#### 3.4. AC3.4 - Enter Required Job Date

**File:** `tests/e2e/estimates/ac3-job-date-entry.spec.ts`

**Steps:**
  1. Open Create Inquiry modal via Create > New Estimate
    - expect: Modal is displayed with Customer Info tab active
  2. Click on 'Req Job Date' field (marked with red asterisk as required)
    - expect: Date picker calendar opens showing current month (March 2026)
  3. Select a date in the future (e.g., March 25, 2026)
    - expect: Selected date appears in the Req Job Date field as 'MM-DD-YYYY' format
  4. Verify date picker has Today, Clear, and Close buttons
    - expect: Calendar picker contains navigation buttons for selection convenience

#### 3.5. AC3.5 - Job Date Validation (Past Date Rejection)

**File:** `tests/e2e/estimates/ac3-job-date-past-validation.spec.ts`

**Steps:**
  1. Open Create Inquiry modal via Create > New Estimate
    - expect: Modal is displayed
  2. Try to select a date in the past (e.g., March 1, 2026 when current date is March 18, 2026)
    - expect: Past dates may be disabled or validation message appears
    - expect: Only future dates are selectable or with warning

#### 3.6. AC3.6 - Customer Details Tab Completion and Next Navigation

**File:** `tests/e2e/estimates/ac3-complete-customer-details.spec.ts`

**Steps:**
  1. Open Create Inquiry modal and enter all customer details
    - expect: All fields are filled: Full Name, Phone Number, Email Address, Job Date
  2. Click the 'Next' button to proceed to Moving Info
    - expect: Modal transitions to Moving Info tab
    - expect: Customer details tab is now inactive
    - expect: Moving Info fields are visible

### 4. AC4: Moving Info - Origin & Destination Entry

**Seed:** `tests/seed.spec.ts`

#### 4.1. AC4.1 - Enter Origin City and Country

**File:** `tests/e2e/estimates/ac4-origin-entry.spec.ts`

**Steps:**
  1. Complete Customer Info and navigate to Moving Info tab
    - expect: Moving Info tab is active
    - expect: Moving From City Name field is visible
  2. Click on 'Moving From City Name' field
    - expect: Field is active and ready for input
  3. Type 'New York' in the Moving From City Name field
    - expect: Field contains 'New York'
  4. Click on 'Moving From Country Name' field
    - expect: Field is active and ready for input
  5. Type 'United States' in the Moving From Country Name field
    - expect: Field contains 'United States'

#### 4.2. AC4.2 - Enter Destination City and Country

**File:** `tests/e2e/estimates/ac4-destination-entry.spec.ts`

**Steps:**
  1. Complete Origin fields and proceed to Destination fields
    - expect: Moving To City Name field is visible
  2. Click on 'Moving To City Name' field
    - expect: Field is active and ready for input
  3. Type 'Los Angeles' in the Moving To City Name field
    - expect: Field contains 'Los Angeles'
  4. Click on 'Moving To Country Name' field
    - expect: Field is active and ready for input
  5. Type 'United States' in the Moving To Country Name field
    - expect: Field contains 'United States'

#### 4.3. AC4.3 - Enter Additional Details

**File:** `tests/e2e/estimates/ac4-additional-details.spec.ts`

**Steps:**
  1. Complete Origin and Destination fields
    - expect: Additional Details field is visible
  2. Click on 'Additional Details' text area
    - expect: Field is active and ready for input
  3. Type 'Standard household goods move with fragile items' in the Additional Details field
    - expect: Field contains the entered text

#### 4.4. AC4.4 - Save Estimate After Moving Info

**File:** `tests/e2e/estimates/ac4-save-estimate.spec.ts`

**Steps:**
  1. Complete all Customer Details and Moving Info fields
    - expect: All fields are populated with valid data
  2. Click the 'Save' button to save the estimate
    - expect: Modal closes
    - expect: Page navigates to job detail page
    - expect: Estimate is created with unique ID (e.g., Estimate #319)
    - expect: Customer name 'John Smith' is visible on detail page

#### 4.5. AC4.5 - Moving Info with International Destinations

**File:** `tests/e2e/estimates/ac4-international-move.spec.ts`

**Steps:**
  1. Create estimate with international moving info
    - expect: System accepts international city and country combinations
  2. Enter 'Toronto' as origin city and 'Canada' as origin country
    - expect: Fields accept international location data
  3. Enter 'Tokyo' as destination city and 'Japan' as destination country
    - expect: Fields accept international destinations

### 5. AC5: Rate Form - Zip Code Pre-fill Validation

**Seed:** `tests/seed.spec.ts`

#### 5.1. AC5.1 - Origin Address Pre-filled in Rate Form

**File:** `tests/e2e/rates/ac5-origin-prefill.spec.ts`

**Steps:**
  1. Create estimate with origin 'New York, United States' and destination 'Los Angeles'
    - expect: Estimate is saved successfully
  2. Click on 'Add Rate' button in the Price Details section
    - expect: MGA Rate form modal opens
  3. Verify Origin field in the Rate form
    - expect: Origin field is pre-filled with 'New York, United States'
    - expect: Pre-filled value matches the origin entered in Moving Info

#### 5.2. AC5.2 - Destination Address Pre-filled in Rate Form

**File:** `tests/e2e/rates/ac5-destination-prefill.spec.ts`

**Steps:**
  1. Open rate form for an estimate with destination 'Los Angeles'
    - expect: Rate form modal opens
  2. Verify Destination field in the Rate form
    - expect: Destination field is pre-filled with 'Los Angeles'
    - expect: Pre-filled value matches the destination entered in Moving Info

#### 5.3. AC5.3 - Modify Origin in Rate Form

**File:** `tests/e2e/rates/ac5-modify-origin.spec.ts`

**Steps:**
  1. Open rate form with pre-filled origin
    - expect: Origin field is pre-filled
  2. Clear the Origin field and enter a different city 'Chicago'
    - expect: Field is editable
    - expect: Old value is cleared
    - expect: New value 'Chicago' is entered
  3. Verify form accepts the modification
    - expect: Origin field now contains 'Chicago'

#### 5.4. AC5.4 - Modify Destination in Rate Form

**File:** `tests/e2e/rates/ac5-modify-destination.spec.ts`

**Steps:**
  1. Open rate form with pre-filled destination
    - expect: Destination field is pre-filled
  2. Clear the Destination field and enter a different city 'Miami'
    - expect: Field is editable
    - expect: Old value is cleared
    - expect: New value 'Miami' is entered
  3. Verify form accepts the modification
    - expect: Destination field now contains 'Miami'

### 6. AC6: Container Shipment Type Configuration

**Seed:** `tests/seed.spec.ts`

#### 6.1. AC6.1 - Select Container as Shipment Type

**File:** `tests/e2e/rates/ac6-select-container.spec.ts`

**Steps:**
  1. Open MGA Rate form for an estimate
    - expect: Rate form is displayed with Shipment Basics section
  2. Click on 'Shipment Type' dropdown (marked as required with red asterisk)
    - expect: Dropdown menu opens showing options: Select an option, Container, LCL, Air
  3. Click on 'Container' option
    - expect: Shipment Type field now shows 'Container' as selected

#### 6.2. AC6.2 - Container Size Becomes Mandatory

**File:** `tests/e2e/rates/ac6-container-size-mandatory.spec.ts`

**Steps:**
  1. Select 'Container' as Shipment Type
    - expect: Container Size field becomes visible and marked as required (red asterisk)
  2. Click on Container Size dropdown
    - expect: Dropdown menu opens showing options: Select an option, 20, 40, 40 HC
  3. Select '20' for 20ft container
    - expect: Container Size field now shows '20' as selected

#### 6.3. AC6.3 - Terminal Handling Charges Section for Container

**File:** `tests/e2e/rates/ac6-terminal-handling-charges.spec.ts`

**Steps:**
  1. Select Container as Shipment Type
    - expect: New section 'Terminal Handling Charges' appears below Container Size field
  2. Verify Terminal Handling Charges options
    - expect: Section contains two radio button options:
    - expect: 1. THC WITH unstuffing
    - expect: 2. THC NO unstuffing
  3. Select 'THC WITH unstuffing' radio button
    - expect: Radio button is selected

#### 6.4. AC6.4 - Required Fields for Container Type (Volume and Weight)

**File:** `tests/e2e/rates/ac6-container-required-fields.spec.ts`

**Steps:**
  1. Select Container and Container Size in rate form
    - expect: Form shows required fields: Origin, Destination, Volume (CBM), Weight (LBS)
  2. Enter Volume '20' CBM
    - expect: Volume field contains numeric value
  3. Enter Weight '5000' LBS
    - expect: Weight field contains numeric value
  4. Attempt to calculate without filling all required fields
    - expect: System may prevent calculation or show validation message

#### 6.5. AC6.5 - Container Available Sizes

**File:** `tests/e2e/rates/ac6-container-size-options.spec.ts`

**Steps:**
  1. Select Container and click on Container Size dropdown
    - expect: Dropdown shows three standard container sizes:
    - expect: - 20 (20ft container)
    - expect: - 40 (40ft container)
    - expect: - 40 HC (40ft High Cube container)

#### 6.6. AC6.6 - Container with Optional Accessorials

**File:** `tests/e2e/rates/ac6-container-accessorials.spec.ts`

**Steps:**
  1. Complete Container shipment basic configuration
    - expect: Form shows optional sections: Handling & Accessorials, Storage & Detention, Special Items
  2. Verify optional checkboxes in Handling & Accessorials section
    - expect: Checkboxes available for: Long Carry, Elevator Carry, Stair Carry, Warehouse Handling
    - expect: Each has description of cost/service

### 7. AC7: LCL Shipment Type Configuration

**Seed:** `tests/seed.spec.ts`

#### 7.1. AC7.1 - Select LCL as Shipment Type

**File:** `tests/e2e/rates/ac7-select-lcl.spec.ts`

**Steps:**
  1. Open MGA Rate form for an estimate
    - expect: Rate form is displayed
  2. Click on 'Shipment Type' dropdown
    - expect: Dropdown menu opens with options including LCL
  3. Click on 'LCL' option
    - expect: Shipment Type field now shows 'LCL' as selected

#### 7.2. AC7.2 - LCL Configuration without Container Size

**File:** `tests/e2e/rates/ac7-lcl-no-container-size.spec.ts`

**Steps:**
  1. Select 'LCL' as Shipment Type
    - expect: Container Size field is not visible or disabled for LCL
    - expect: Form only shows relevant fields for LCL
  2. Verify visible fields for LCL
    - expect: Required fields: Origin, Destination, Volume (CBM), Weight (LBS)
    - expect: Container Size field is absent or not applicable to LCL

#### 7.3. AC7.3 - LCL Required Fields (Volume and Weight)

**File:** `tests/e2e/rates/ac7-lcl-required-fields.spec.ts`

**Steps:**
  1. Select LCL as Shipment Type
    - expect: Form displays Volume and Weight as required fields
  2. Enter Volume '10' CBM
    - expect: Volume field contains numeric value
  3. Enter Weight '2000' LBS
    - expect: Weight field contains numeric value

#### 7.4. AC7.4 - LCL Specific Rate Calculation

**File:** `tests/e2e/rates/ac7-lcl-rate-calculation.spec.ts`

**Steps:**
  1. Complete LCL shipment configuration with volume and weight
    - expect: All required fields are filled
  2. Click Calculate button
    - expect: Rate calculation processes
    - expect: Rate summary appears showing LCL-specific charges
    - expect: Summary includes volume-based and weight-based calculations

#### 7.5. AC7.5 - LCL with Terminal Handling Charges

**File:** `tests/e2e/rates/ac7-lcl-terminal-handling.spec.ts`

**Steps:**
  1. Select LCL shipment type
    - expect: Verify if Terminal Handling Charges section appears for LCL
    - expect: If present, options may differ from Container type

### 8. AC8: Air Shipment Type Configuration

**Seed:** `tests/seed.spec.ts`

#### 8.1. AC8.1 - Select Air as Shipment Type

**File:** `tests/e2e/rates/ac8-select-air.spec.ts`

**Steps:**
  1. Open MGA Rate form for an estimate
    - expect: Rate form is displayed
  2. Click on 'Shipment Type' dropdown
    - expect: Dropdown menu opens with options including Air
  3. Click on 'Air' option
    - expect: Shipment Type field now shows 'Air' as selected

#### 8.2. AC8.2 - Air Configuration without Container Size

**File:** `tests/e2e/rates/ac8-air-no-container-size.spec.ts`

**Steps:**
  1. Select 'Air' as Shipment Type
    - expect: Container Size field is not visible or disabled for Air
    - expect: Form only shows relevant fields for Air

#### 8.3. AC8.3 - Air Required Fields (Volume and Weight)

**File:** `tests/e2e/rates/ac8-air-required-fields.spec.ts`

**Steps:**
  1. Select Air as Shipment Type
    - expect: Form displays Volume and Weight as required fields
  2. Enter Volume '5' CBM
    - expect: Volume field contains numeric value
  3. Enter Weight '500' LBS
    - expect: Weight field contains numeric value

#### 8.4. AC8.4 - Air Specific Rate Calculation

**File:** `tests/e2e/rates/ac8-air-rate-calculation.spec.ts`

**Steps:**
  1. Complete Air shipment configuration with volume and weight
    - expect: All required fields are filled
  2. Click Calculate button
    - expect: Rate calculation processes
    - expect: Rate summary appears showing Air-specific charges
    - expect: Summary shows air shipment pricing

#### 8.5. AC8.5 - Air Shipment Type Cost Comparison

**File:** `tests/e2e/rates/ac8-air-cost-comparison.spec.ts`

**Steps:**
  1. Calculate rate for Air shipment with standard volume/weight
    - expect: Air rate is generated
  2. Note the total charges for Air shipment
    - expect: Rate can be compared with Container and LCL rates for same volume

### 9. AC9: Rate Calculation & Summary Validation

**Seed:** `tests/seed.spec.ts`

#### 9.1. AC9.1 - Rate Summary Display After Calculation

**File:** `tests/e2e/rates/ac9-rate-summary-display.spec.ts`

**Steps:**
  1. Complete rate form with Container, 20ft size, Volume 20 CBM, Weight 5000 LBS
    - expect: All required fields are filled with valid data
  2. Click the 'Calculate' button
    - expect: Rate calculation processes without errors
    - expect: Calculate button shows 'active' state during processing
  3. Verify Rate Summary section appears
    - expect: 'Rate Summary' heading is displayed
    - expect: Summary shows line items with Description, CWT/Qty, Rate, and Charges columns

#### 9.2. AC9.2 - Rate Calculation Line Items

**File:** `tests/e2e/rates/ac9-line-items-validation.spec.ts`

**Steps:**
  1. Calculate rate for Container shipment
    - expect: Rate summary displays with line items
  2. Verify line item details
    - expect: Line item shows Description: 'Container Charge - 20'
    - expect: Line item shows CWT/Qty: '1'
    - expect: Line item shows Rate value
    - expect: Line item shows calculated Charges: '$2,970.00'

#### 9.3. AC9.3 - Total Charges Calculation

**File:** `tests/e2e/rates/ac9-total-charges.spec.ts`

**Steps:**
  1. Complete rate calculation
    - expect: Rate summary is displayed
  2. Verify Total Charges line in summary
    - expect: 'Total Charges' row is displayed at bottom of rate table
    - expect: Total shows: '$2,970.00' (or appropriate amount based on shipment configuration)

#### 9.4. AC9.4 - Taxes and Duties Display

**File:** `tests/e2e/rates/ac9-taxes-duties-display.spec.ts`

**Steps:**
  1. Calculate rate for any shipment type
    - expect: Rate summary is displayed
  2. Verify Taxes and Duties line
    - expect: Text shows 'Taxes and Duties: $0.00' (or appropriate amount)
    - expect: Refundable Deposits shown (if applicable)

#### 9.5. AC9.5 - Zero Volume/Weight Validation

**File:** `tests/e2e/rates/ac9-zero-volume-validation.spec.ts`

**Steps:**
  1. Attempt to calculate rate with Volume '0' and Weight '0'
    - expect: System may reject calculation
    - expect: Validation error message displayed: 'Volume and Weight must be greater than zero'

#### 9.6. AC9.6 - Negative Volume/Weight Validation

**File:** `tests/e2e/rates/ac9-negative-values-validation.spec.ts`

**Steps:**
  1. Enter negative values in Volume or Weight fields
    - expect: System may reject negative values
    - expect: Fields may have min=0 constraint
    - expect: Validation prevents calculation with negative numbers

#### 9.7. AC9.7 - Summary Precision and Currency

**File:** `tests/e2e/rates/ac9-summary-precision.spec.ts`

**Steps:**
  1. Calculate rate and view summary
    - expect: All monetary values display with proper currency format
    - expect: Values show cents precision (e.g., $2,970.00)
    - expect: Summary uses appropriate rounding for calculations

### 10. AC10: Apply Rate & Active Price Assertion

**Seed:** `tests/seed.spec.ts`

#### 10.1. AC10.1 - Apply Button Visibility After Calculation

**File:** `tests/e2e/rates/ac10-apply-button-visibility.spec.ts`

**Steps:**
  1. Complete rate calculation and view Rate Summary
    - expect: Rate Summary is displayed with total charges
  2. Verify Apply button appears
    - expect: 'Apply' button is visible below the rate summary
    - expect: Button is enabled and clickable

#### 10.2. AC10.2 - Click Apply to Confirm Rate

**File:** `tests/e2e/rates/ac10-apply-rate.spec.ts`

**Steps:**
  1. View the calculated rate with Apply button visible
    - expect: Rate summary shows total of $2,970.00 (or calculated amount)
  2. Click the 'Apply' button
    - expect: Rate modal closes
    - expect: System processes the rate application
    - expect: Page returns to job detail view

#### 10.3. AC10.3 - Price Reflected in Job Detail After Apply

**File:** `tests/e2e/rates/ac10-price-in-job-detail.spec.ts`

**Steps:**
  1. Apply a rate of $2,970.00 for a Container shipment
    - expect: Modal closes and returns to job detail page
  2. Verify Grand Total on job detail page
    - expect: 'Grand Total' field is updated
    - expect: Grand Total now shows the applied rate amount (e.g., '$2,970.00')
    - expect: Previously showed '$0.00' before rate was applied

#### 10.4. AC10.4 - Documents Button Enabled After Rate Applied

**File:** `tests/e2e/rates/ac10-documents-button-enabled.spec.ts`

**Steps:**
  1. Initially view job detail without any rate applied
    - expect: 'Documents' button is disabled (grayed out)
  2. Add and apply a rate
    - expect: After rate is applied, Documents button becomes enabled
    - expect: Button is now clickable to generate documents

#### 10.5. AC10.5 - Multiple Rates in Job

**File:** `tests/e2e/rates/ac10-multiple-rates.spec.ts`

**Steps:**
  1. Apply first rate (e.g., Container rate of $2,970.00)
    - expect: First rate is applied and shows in Grand Total
  2. Click 'Add Rate' button again to add another rate
    - expect: Rate form opens again
    - expect: Can add additional shipment rate for same job
  3. Complete and apply second rate (e.g., LCL rate of $1,500.00)
    - expect: Second rate is applied
    - expect: Grand Total accumulates both rates
    - expect: Grand Total shows $2,970.00 + $1,500.00 = $4,470.00

### 11. AC11: Edit Rate

**Seed:** `tests/seed.spec.ts`

#### 11.1. AC11.1 - Edit Icon or Button Visibility

**File:** `tests/e2e/rates/ac11-edit-button-visibility.spec.ts`

**Steps:**
  1. Apply a rate to an estimate
    - expect: Rate appears in the Price Details section
  2. Look for edit option on the applied rate
    - expect: Edit icon or 'Edit' link is visible on the rate row
    - expect: Edit button is clickable

#### 11.2. AC11.2 - Open Rate Form to Edit

**File:** `tests/e2e/rates/ac11-open-edit-form.spec.ts`

**Steps:**
  1. Click the edit button/icon next to an applied rate
    - expect: Rate form modal opens with pre-filled data from the applied rate
    - expect: Modal shows all previously entered values
  2. Verify pre-filled values
    - expect: Shipment Type continues to show selected type (Container/LCL/Air)
    - expect: Volume, Weight, and other fields show previous values
    - expect: Form is in edit mode

#### 11.3. AC11.3 - Modify Rate Details

**File:** `tests/e2e/rates/ac11-modify-rate-details.spec.ts`

**Steps:**
  1. Open rate form in edit mode
    - expect: Form is displayed with previous values
  2. Change Volume from '20' to '25' CBM
    - expect: Volume field is updated to '25'
  3. Change Weight from '5000' to '6000' LBS
    - expect: Weight field is updated to '6000'

#### 11.4. AC11.4 - Recalculate After Edit

**File:** `tests/e2e/rates/ac11-recalculate-after-edit.spec.ts`

**Steps:**
  1. Modify rate details in edit form
    - expect: Changes are made to Volume/Weight
  2. Click 'Calculate' button to recalculate
    - expect: Rate Summary updates with new calculation
    - expect: Total Charges reflects the new volume/weight
    - expect: New total should be higher (e.g., from $2,970.00 to updated amount)

#### 11.5. AC11.5 - Apply Edited Rate

**File:** `tests/e2e/rates/ac11-apply-edited-rate.spec.ts`

**Steps:**
  1. Recalculate edited rate
    - expect: New Rate Summary is displayed
  2. Click 'Apply' button to save edited rate
    - expect: Rate modal closes
    - expect: Job detail page refreshes
    - expect: Grand Total updates to reflect new rate amount

#### 11.6. AC11.6 - Change Shipment Type During Edit

**File:** `tests/e2e/rates/ac11-change-shipment-type.spec.ts`

**Steps:**
  1. Edit a Container rate (20ft size)
    - expect: Form shows Container configuration with mandatory Container Size field
  2. Change Shipment Type from Container to LCL
    - expect: Container Size field disappears
    - expect: Terminal Handling Charges section is removed
    - expect: Form restructures for LCL configuration
  3. Keep same volume and weight, calculate new rate
    - expect: New LCL rate is calculated and may differ from Container rate

### 12. AC12: Clone Price

**Seed:** `tests/seed.spec.ts`

#### 12.1. AC12.1 - Clone Button/Icon Visibility

**File:** `tests/e2e/rates/ac12-clone-button-visibility.spec.ts`

**Steps:**
  1. Apply a rate to an estimate (e.g., Container 20ft rate of $2,970.00)
    - expect: Rate appears in Price Details section
  2. Look for clone option on the rate
    - expect: Clone icon or 'Clone' button is visible on the rate row

#### 12.2. AC12.2 - Open Rate Form via Clone

**File:** `tests/e2e/rates/ac12-clone-open-form.spec.ts`

**Steps:**
  1. Click the clone button for an applied rate
    - expect: Rate form modal opens
    - expect: Form is pre-filled with all details from the cloned rate
    - expect: Modal shows the same Shipment Type, Container Size, Volume, Weight as original
  2. Verify cloned values match original
    - expect: Shipment Type: Container
    - expect: Container Size: 20
    - expect: Volume: 20 CBM
    - expect: Weight: 5000 LBS

#### 12.3. AC12.3 - Modify Cloned Rate

**File:** `tests/e2e/rates/ac12-modify-cloned-rate.spec.ts`

**Steps:**
  1. Clone an existing Container rate
    - expect: Rate form opens with original values
  2. Change Shipment Type from Container to LCL
    - expect: Form structure changes for LCL
    - expect: Create a variant without modifying original
  3. Modify Volume to '15' CBM
    - expect: Original rate and new rate are separate instances

#### 12.4. AC12.4 - Calculate and Apply Cloned Rate

**File:** `tests/e2e/rates/ac12-apply-cloned-rate.spec.ts`

**Steps:**
  1. Modify cloned rate values
    - expect: Changes are made to the cloned form
  2. Click 'Calculate' button
    - expect: New rate is calculated based on modified values
  3. Click 'Apply' button
    - expect: New rate is added as additional rate to the job
    - expect: Both original and cloned rates now appear in Price Details
    - expect: Grand Total accumulates both rates

#### 12.5. AC12.5 - Multiple Cloned Rates

**File:** `tests/e2e/rates/ac12-multiple-clones.spec.ts`

**Steps:**
  1. Clone the same rate multiple times with different modifications
    - expect: Each clone creates a new variant
    - expect: System allows multiple rate variations
  2. Create 3 different rate versions (Container 20, Container 40, LCL)
    - expect: All three rates are applied
    - expect: Price Details section shows all three rates
    - expect: Grand Total sums all applied rates

### 13. AC13: Document Generation - Estimate

**Seed:** `tests/seed.spec.ts`

#### 13.1. AC13.1 - Documents Button Enabled with Applied Rate

**File:** `tests/e2e/documents/ac13-documents-button.spec.ts`

**Steps:**
  1. Create estimate and add rate without applying it
    - expect: Documents button appears disabled (grayed out)
  2. Apply the rate
    - expect: Documents button becomes enabled
    - expect: Button is clickable

#### 13.2. AC13.2 - Open Documents Modal

**File:** `tests/e2e/documents/ac13-open-documents-modal.spec.ts`

**Steps:**
  1. Click on the enabled 'Documents' button
    - expect: Documents modal/dialog opens
    - expect: Modal shows available document types to generate

#### 13.3. AC13.3 - Estimate Document Selection

**File:** `tests/e2e/documents/ac13-select-estimate.spec.ts`

**Steps:**
  1. Open Documents modal with active estimate containing applied rates
    - expect: Modal displays document options including 'Estimate'
  2. Click on or select 'Estimate' document type
    - expect: Estimate option is highlighted/selected
    - expect: Generate or View button for Estimate is visible

#### 13.4. AC13.4 - Generate Estimate Document

**File:** `tests/e2e/documents/ac13-generate-estimate.spec.ts`

**Steps:**
  1. Select Estimate document type
    - expect: Estimate option is selected
  2. Click 'Generate' or appropriate button to create document
    - expect: Document is generated
    - expect: System processes the request
  3. Verify document is created
    - expect: Document file is generated (PDF or downloadable format)
    - expect: Document contains estimate details

#### 13.5. AC13.5 - Estimate Document Content Validation

**File:** `tests/e2e/documents/ac13-estimate-content.spec.ts`

**Steps:**
  1. Generate an Estimate document for job with customer 'John Smith'
    - expect: Document is successfully created
  2. Open/view the generated Estimate document
    - expect: Document displays customer name 'John Smith'
    - expect: Document shows moving from/to information
    - expect: Document displays applied rates and total charges
    - expect: Document shows estimate number (e.g., 319)
    - expect: Document shows job date
    - expect: Document is formatted professionally

#### 13.6. AC13.6 - Multiple Rates in Estimate Document

**File:** `tests/e2e/documents/ac13-estimate-multiple-rates.spec.ts`

**Steps:**
  1. Create estimate with multiple applied rates (e.g., Container and LCL)
    - expect: Both rates are active
  2. Generate Estimate document
    - expect: Document is created
  3. Verify document shows all rates
    - expect: Document displays all line items (Container Charge, LCL Charge)
    - expect: Document shows combined total charges
    - expect: All rate details are included in estimate

### 14. AC14: Document Generation - Bill of Lading

**Seed:** `tests/seed.spec.ts`

#### 14.1. AC14.1 - Bill of Lading Document Selection

**File:** `tests/e2e/documents/ac14-select-bol.spec.ts`

**Steps:**
  1. Open Documents modal for an estimate with applied rates
    - expect: Modal displays available document types
  2. Look for 'Bill of Lading' option in document list
    - expect: 'Bill of Lading' document type is available in the list
    - expect: Option can be selected

#### 14.2. AC14.2 - Generate Bill of Lading Document

**File:** `tests/e2e/documents/ac14-generate-bol.spec.ts`

**Steps:**
  1. Select 'Bill of Lading' document type from Documents modal
    - expect: Bill of Lading option is selected
  2. Click 'Generate' or create button
    - expect: System generates the Bill of Lading document
    - expect: Processing completes
  3. Verify document is available
    - expect: Bill of Lading file is created (PDF or downloadable format)

#### 14.3. AC14.3 - Bill of Lading Content Validation

**File:** `tests/e2e/documents/ac14-bol-content.spec.ts`

**Steps:**
  1. Generate Bill of Lading for an estimate
    - expect: Document is successfully created
  2. Open/view the generated Bill of Lading
    - expect: Document displays shipper information (origin city and country)
    - expect: Document displays consignee information (destination city and country)
    - expect: Document shows shipment details (volume, weight)
    - expect: Document includes shipment type information
    - expect: Document displays rates and charges
    - expect: Document shows estimate/reference number

#### 14.4. AC14.4 - Bill of Lading for Different Shipment Types

**File:** `tests/e2e/documents/ac14-bol-shipment-types.spec.ts`

**Steps:**
  1. Create and apply a Container rate, generate BoL
    - expect: BoL is generated for Container shipment
  2. Open BoL and verify Container details are present
    - expect: BoL shows container size (20ft), volume, weight
    - expect: Container-specific charges are listed
  3. Create separate estimate with LCL rate, generate BoL
    - expect: BoL is generated for LCL shipment
  4. Verify BoL shows LCL-specific information
    - expect: BoL shows LCL rates and charges
    - expect: Container Size field is absent or marked N/A
    - expect: Volume and weight are shown appropriately

#### 14.5. AC14.5 - Bill of Lading Printability

**File:** `tests/e2e/documents/ac14-bol-print.spec.ts`

**Steps:**
  1. Open generated Bill of Lading document
    - expect: Document is viewable in PDF viewer or document format
  2. Verify document is print-ready
    - expect: Document layout is optimized for printing
    - expect: Page breaks are appropriate
    - expect: All content is visible and readable

### 15. AC15: Document Generation - Invoice

**Seed:** `tests/seed.spec.ts`

#### 15.1. AC15.1 - Invoice Document Selection

**File:** `tests/e2e/documents/ac15-select-invoice.spec.ts`

**Steps:**
  1. Open Documents modal for an estimate with applied rates
    - expect: Modal shows document options
  2. Look for 'Invoice' option in document list
    - expect: 'Invoice' document type is available
    - expect: Can be selected

#### 15.2. AC15.2 - Generate Invoice Document

**File:** `tests/e2e/documents/ac15-generate-invoice.spec.ts`

**Steps:**
  1. Select 'Invoice' document type from Documents modal
    - expect: Invoice option is selected
  2. Click 'Generate' button to create invoice
    - expect: System generates the Invoice document
    - expect: Processing completes successfully
  3. Verify invoice is available
    - expect: Invoice file is created (PDF or downloadable format)

#### 15.3. AC15.3 - Invoice Content Validation

**File:** `tests/e2e/documents/ac15-invoice-content.spec.ts`

**Steps:**
  1. Generate Invoice for an estimate with applied rates
    - expect: Invoice is successfully created
  2. Open/view the generated Invoice
    - expect: Invoice displays company information (Michael Greaves Associates)
    - expect: Invoice shows customer details (name, address if available)
    - expect: Invoice displays itemized list of charges
    - expect: Invoice shows line items: Description, Quantity, Rate, Amount
    - expect: Invoice shows subtotal
    - expect: Invoice shows taxes/duties (if applicable)
    - expect: Invoice shows Grand Total or Amount Due
    - expect: Invoice displays invoice number
    - expect: Invoice shows date/period

#### 15.4. AC15.4 - Invoice with Single Rate

**File:** `tests/e2e/documents/ac15-invoice-single-rate.spec.ts`

**Steps:**
  1. Create estimate with single applied rate (e.g., Container $2,970.00)
    - expect: Estimate has one rate applied
  2. Generate Invoice
    - expect: Invoice is created
  3. Verify invoice line items
    - expect: Invoice shows single line item: 'Container Charge - 20'
    - expect: Amount Due shows $2,970.00
    - expect: Invoice is clear and properly formatted

#### 15.5. AC15.5 - Invoice with Multiple Rates

**File:** `tests/e2e/documents/ac15-invoice-multiple-rates.spec.ts`

**Steps:**
  1. Create estimate with multiple applied rates (Container $2,970 + LCL $1,500)
    - expect: Both rates are applied
  2. Generate Invoice
    - expect: Invoice is created
  3. Verify invoice includes all charges
    - expect: Invoice lists multiple line items
    - expect: First line: Container Charge - $2,970.00
    - expect: Second line: LCL Charge - $1,500.00
    - expect: Grand Total: $4,470.00
    - expect: Invoice correctly accumulates all charges

#### 15.6. AC15.6 - Invoice Format and Branding

**File:** `tests/e2e/documents/ac15-invoice-format.spec.ts`

**Steps:**
  1. Generate and open Invoice document
    - expect: Invoice is viewable
  2. Verify document branding and professionalism
    - expect: Invoice has company logo or branding
    - expect: Document uses professional font and layout
    - expect: All text is readable and properly aligned
    - expect: Colors and formatting are consistent
    - expect: Document is suitable for sending to customer

#### 15.7. AC15.7 - Invoice Download Functionality

**File:** `tests/e2e/documents/ac15-invoice-download.spec.ts`

**Steps:**
  1. Generate Invoice and access document view
    - expect: Invoice is displayed
  2. Click download or save button
    - expect: Invoice file is downloaded to user's device
    - expect: File is in PDF format with appropriate naming
