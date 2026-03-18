# Quote2Cash Order and Storage Management Test Plan

## Application Overview


This test plan covers the complete order creation and storage billing workflow in the Quote2Cash application, including creating new orders with customer information, adding prices for various storage types (Permanent, HHG, and SIT), and managing storage billing options through the recurring storage radio button functionality. The plan includes comprehensive scenarios covering happy paths, edge cases, and all possible storage types.


## Test Scenarios

### 1. Order Creation and Basic Workflow

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successfully Create New Order with Customer Information

**File:** `tests/quote2cash/order-creation-basic.spec.ts`

**Steps:**
  1. Navigate to Quote2Cash application and log in with username 'bvl' and password 'demo'
    - expect: Dashboard is displayed with Orders list
    - expect: User is authenticated as 'Bvl'
  2. Click on 'Create' button in the top navigation
    - expect: Create dropdown menu appears with 'New Order' and 'New Task' options
  3. Select 'New Order' from the dropdown menu
    - expect: Create Inquiry dialog box opens with Customer Info and Additional Info tabs
  4. Enter customer information: First Name: 'John', Last Name: 'Doe', Email: 'john.doe@example.com', Phone: '(555) 123-4567'
    - expect: All fields display success validation (green checkmarks)
    - expect: No error messages appear
  5. Leave Order Ref # field blank and click Save button
    - expect: 'Order Created Successfully' confirmation message appears
    - expect: Dialog offers option to 'Cancel' or 'Ok' to visit order detail page
  6. Click 'Ok' button on the confirmation dialog
    - expect: Order detail page opens
    - expect: Order shows customer name 'John Doe'
    - expect: Status shows 'Quote'
    - expect: Grand Total shows $0.00
    - expect: All tabs visible: Status, Dates, Customer Details, Inventory Details, Price Details, Notes

#### 1.2. Create Order with All Customer Fields (Including Optional Order Ref #)

**File:** `tests/quote2cash/order-creation-with-ref.spec.ts`

**Steps:**
  1. Navigate to Create Inquiry form and fill all fields: First Name: 'Jane', Last Name: 'Smith', Email: 'jane.smith@example.com', Phone: '(555) 987-6543', Order Ref #: 'ORD-2024-001'
    - expect: All fields pass validation
    - expect: Order Ref # field accepts custom order reference number
  2. Click Save button
    - expect: Confirmation message displays 'Order Created Successfully'
    - expect: Order list is updated with new order
  3. Click Ok to go to order details
    - expect: Order detail page shows all entered information correctly

#### 1.3. Create Order with Multiple Email Addresses

**File:** `tests/quote2cash/order-creation-multiple-emails.spec.ts`

**Steps:**
  1. Navigate to Create Inquiry form and enter multiple emails separated by comma: 'email1@example.com, email2@example.com, email3@example.com'
    - expect: Field accepts multiple email addresses
    - expect: Success validation appears
    - expect: Help text displays: 'Note: Enter multiple email addresses separated by commas (Eg: mail1@gmail.com, mail2@gmail.com)'
  2. Complete remaining fields and save order
    - expect: Order is created successfully with all email addresses recorded

### 2. Order Price Management - Recurring Storage Billing

**Seed:** `tests/seed.spec.ts`

#### 2.1. Add Permanent Storage Price with Recurring Storage Billing

**File:** `tests/quote2cash/price-management-permanent-storage.spec.ts`

**Steps:**
  1. Create a new order with customer information and navigate to order detail page
    - expect: Order detail page is displayed
    - expect: Price Details section shows 'Add Rate' button with $0.00 total
  2. Click on 'Add Rate' button in Price Details section
    - expect: Price/Rate entry form opens with fields for price configuration
  3. Look for and select 'Recurring Storage Billing' radio button option
    - expect: Recurring Storage Billing option is selected
    - expect: Form updates to show storage-specific fields
  4. Select 'Permanent Storage' from the storage type options
    - expect: Permanent Storage type is selected
    - expect: All mandatory fields for Permanent Storage are visible
  5. Fill in all mandatory values for Permanent Storage (price, quantity, duration, or other required fields as applicable)
    - expect: All mandatory fields accept input without errors
    - expect: Form validates successfully
  6. Save the price entry
    - expect: Permanent Storage price is added to the order
    - expect: Price Details section now shows calculated amount in Grand Total
    - expect: Entry appears in the price list with storage type indicator

#### 2.2. Add HHG (Household Goods) Storage Price

**File:** `tests/quote2cash/price-management-hhg-storage.spec.ts`

**Steps:**
  1. From existing order or create new order with price detail populated with Permanent Storage
    - expect: Order detail page shows existing price information
  2. Click the 3-dot menu (Options) next to the Permanent Storage price entry
    - expect: Context menu appears with options including 'Add New Price' or similar action
  3. Select 'Add New Price' from the 3-dot menu
    - expect: New price entry form opens
    - expect: Form is ready for new price type
  4. Select 'HHG' (Household Goods) radio button
    - expect: HHG option is selected
    - expect: Form displays HHG-specific fields and requirements
  5. Enter all mandatory values for HHG storage: price amount, storage location, quantity of items, weight/volume, or other required HHG parameters
    - expect: All mandatory HHG fields are filled with valid data
    - expect: Form validation passes
  6. Save the HHG price entry
    - expect: HHG storage price is added to order
    - expect: Price Details section updates to show multiple storage types
    - expect: Grand Total amount increases with new HHG price

#### 2.3. Add SIT (Storage In Transit) Storage Price

**File:** `tests/quote2cash/price-management-sit-storage.spec.ts`

**Steps:**
  1. From order with existing Permanent and/or HHG prices, click 3-dot menu to add another price
    - expect: Options menu appears for adding new price
  2. Select 'Add New Price' option
    - expect: New price form opens
  3. Select 'Recurring Storage' radio button, then choose 'SIT Storage' type
    - expect: SIT Storage option is selected
    - expect: Form displays SIT-specific configuration fields
  4. Fill all mandatory SIT values: daily/monthly rate, number of days/months, facility location, or other SIT-required parameters
    - expect: All mandatory SIT fields accept input
    - expect: Values are properly validated
  5. Save the SIT price
    - expect: SIT storage is added as new price entry
    - expect: Order now contains Permanent, HHG, and SIT storage types
    - expect: Grand Total reflects all three storage prices

### 3. Order Price Management - Advanced Scenarios

**Seed:** `tests/seed.spec.ts`

#### 3.1. Modify Existing Storage Price Entry

**File:** `tests/quote2cash/price-management-modify.spec.ts`

**Steps:**
  1. Navigate to order with multiple storage prices (Permanent, HHG, SIT)
    - expect: All three storage types are displayed in Price Details
  2. Click 3-dot menu on one of the existing storage entries (e.g., Permanent Storage)
    - expect: Options menu appears with edit/modify options
  3. Select edit option and modify the price amount or storage parameters
    - expect: Form opens with existing values pre-populated
    - expect: User can edit and update values
  4. Save the updated price
    - expect: Changes are saved to the storage entry
    - expect: Grand Total is recalculated with new values

#### 3.2. Delete Storage Price Entry

**File:** `tests/quote2cash/price-management-delete.spec.ts`

**Steps:**
  1. From order with multiple prices, click 3-dot menu on a storage entry
    - expect: Context menu displays delete or remove option
  2. Select delete/remove option
    - expect: Confirmation dialog appears asking to confirm deletion
  3. Confirm the deletion
    - expect: Storage price is removed from the order
    - expect: Price Details list is updated
    - expect: Grand Total is recalculated without deleted price

#### 3.3. Add Multiple Prices of Same Storage Type

**File:** `tests/quote2cash/price-management-multiple-same-type.spec.ts`

**Steps:**
  1. Create an order with one Permanent Storage price
    - expect: Order contains first Permanent Storage entry
  2. Use 3-dot menu to add another price and select Permanent Storage again
    - expect: System allows adding multiple entries of same storage type
  3. Fill in different values for the second Permanent Storage entry
    - expect: Both entries are created with different parameters
  4. Save the order
    - expect: Order displays both Permanent Storage entries
    - expect: Grand Total includes amounts from both entries
    - expect: Each entry can be individually edited or deleted

### 4. Edge Cases and Validation Scenarios

**Seed:** `tests/seed.spec.ts`

#### 4.1. Create Order with Invalid Email Format

**File:** `tests/quote2cash/validation-invalid-email.spec.ts`

**Steps:**
  1. Open Create Inquiry form and enter invalid email format in Email field (e.g., 'notanemail' or 'test@')
    - expect: Validation error is displayed
    - expect: Error message indicates invalid email format
  2. Attempt to save the form
    - expect: Save button is disabled or form submission is prevented
    - expect: Error persists until valid email is entered
  3. Correct the email to valid format
    - expect: Error message disappears
    - expect: Success validation appears

#### 4.2. Create Order with Invalid Phone Number Format

**File:** `tests/quote2cash/validation-invalid-phone.spec.ts`

**Steps:**
  1. Enter invalid phone format in Phone field (e.g., '123' or 'abcdef')
    - expect: Phone field shows validation error or formats incorrectly
  2. Try to save with invalid phone
    - expect: System either prevents save or allows it with warning
  3. Enter valid phone format (e.g., '(555) 123-4567')
    - expect: Validation passes and system allows save

#### 4.3. Create Order with Blank Required Fields

**File:** `tests/quote2cash/validation-blank-required-fields.spec.ts`

**Steps:**
  1. Open Create Inquiry form but leave First Name, Last Name, Email, or Phone fields empty
    - expect: Required field indicators appear (asterisks or red highlights)
    - expect: Fields are marked as mandatory
  2. Attempt to save without filling required fields
    - expect: Save button is disabled or validation error appears
    - expect: Error message specifies which fields are required
  3. Fill all required fields
    - expect: Save button becomes enabled
    - expect: Order can be created successfully

#### 4.4. Add Price with Zero or Negative Amount

**File:** `tests/quote2cash/validation-invalid-price-amount.spec.ts`

**Steps:**
  1. Open order and add new storage price, then enter zero or negative amount in price field
    - expect: System validates price amount
    - expect: Either prevents negative/zero values or shows warning
  2. Attempt to save with invalid price
    - expect: Save is prevented or warning is displayed
  3. Enter valid positive price amount
    - expect: Validation passes and price can be saved

#### 4.5. Order Grand Total Calculation Accuracy

**File:** `tests/quote2cash/validation-grand-total-accuracy.spec.ts`

**Steps:**
  1. Create order with three storage types: Permanent Storage ($100), HHG Storage ($250), SIT Storage ($150)
    - expect: Each price entry shows correct individual amount
  2. Verify Grand Total is displayed
    - expect: Grand Total shows $500.00 (sum of all prices)
    - expect: Calculation is accurate
  3. Modify one price and verify total updates
    - expect: Grand Total recalculates immediately
    - expect: New total correctly reflects updated price
  4. Delete one price entry and verify total
    - expect: Grand Total updates to exclude deleted price
    - expect: Final total is correct

### 5. Order Status and Navigation Workflow

**Seed:** `tests/seed.spec.ts`

#### 5.1. Navigate Through Order Detail Tabs

**File:** `tests/quote2cash/order-navigation-tabs.spec.ts`

**Steps:**
  1. Open an order in detail view
    - expect: All tabs are visible: Status, Dates, Customer Details, Inventory Details, Price Details, Notes
  2. Click on 'Status (Quote)' tab
    - expect: Status tab expands showing order status information
  3. Click on 'Dates' tab
    - expect: Dates tab opens showing relevant date fields
  4. Click on 'Customer Details' tab
    - expect: Customer Details tab displays customer information from order creation
  5. Click on 'Inventory Details' tab
    - expect: Inventory Details tab displays inventory-related information
  6. Click on 'Price Details' tab
    - expect: Price Details tab shows all added storage prices and Grand Total
  7. Click on 'Notes' tab
    - expect: Notes tab opens, allowing user to view or add order notes

#### 5.2. Order Status Transitions

**File:** `tests/quote2cash/order-status-transitions.spec.ts`

**Steps:**
  1. Create new order with customer info and view detail page
    - expect: New order status shows as 'Quote'
  2. Look for status change options in Status tab or order options
    - expect: Options to transition status are available or status changes occur through specific actions
  3. If price/inventory details are added, verify status behavior
    - expect: Status may update based on completed order fields
    - expect: Clear indication of current order state

### 6. Order Persistence and Data Integrity

**Seed:** `tests/seed.spec.ts`

#### 6.1. Save Order with Prices and Verify Data Persistence

**File:** `tests/quote2cash/data-persistence-save.spec.ts`

**Steps:**
  1. Create order with full details: customer info + three storage prices (Permanent, HHG, SIT)
    - expect: All data is entered correctly
  2. Click Save button in the order detail page
    - expect: Order is saved to database
    - expect: Success message appears or page updates
  3. Navigate away from the order (back to Orders list)
    - expect: Navigation succeeds
    - expect: Page loads Orders list
  4. Re-open the same order from the list
    - expect: All customer information is preserved
    - expect: All three storage prices are displayed
    - expect: Grand Total matches previous value
    - expect: No data loss occurs

#### 6.2. Order Appears in Dashboard List After Creation

**File:** `tests/quote2cash/data-persistence-list.spec.ts`

**Steps:**
  1. Create new order with customer 'Test User' and email 'test@example.com'
    - expect: Order creation succeeds
  2. Navigate back to Orders dashboard
    - expect: New order appears in the orders table at the top of the list
  3. Verify order row contains correct information: customer name, email, phone, status
    - expect: All columns display correct data from order creation
  4. Click on the order row to re-open it
    - expect: Order detail page loads with all saved information

### 7. User Interface and Button Functionality

**Seed:** `tests/seed.spec.ts`

#### 7.1. Verify All Action Buttons are Functional

**File:** `tests/quote2cash/ui-button-functionality.spec.ts`

**Steps:**
  1. Open order detail page and identify all buttons: Save, Documents, Revenue, Commission, Options
    - expect: All buttons are visible and properly positioned
  2. Click 'Save' button after making a change to order
    - expect: Order is saved without errors
  3. Click 'Documents' button
    - expect: Documents section/dialog opens showing document-related options
  4. Note that 'Revenue' and 'Commission' buttons appear disabled initially
    - expect: These buttons are grayed out as expected until order reaches appropriate status
  5. Click 'Options' button
    - expect: Options menu appears with available actions

#### 7.2. Verify 3-Dot Menu Functionality for Price Entries

**File:** `tests/quote2cash/ui-3dot-menu.spec.ts`

**Steps:**
  1. Create order with multiple storage prices displayed
    - expect: Each price entry shows a 3-dot menu icon on hover or always visible
  2. Click the 3-dot menu on a price entry
    - expect: Context menu appears with options like 'Edit', 'Delete', 'Add New Price', or similar
  3. Verify all menu options are functional
    - expect: Each menu option executes its intended action
