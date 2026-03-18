# Quote2Cash Application Test Plan

## Application Overview

Quote2Cash is a comprehensive quote automation, invoice/estimate creation, and payment processing platform. The application allows users to manage orders, customers, rates, documents, schedules, and financial reports. After successful authentication with username and password, users gain access to a dashboard showing orders with various statuses (Quote, Estimate, In Storage, Booked, etc.), customer management capabilities, rate management, document creation and tracking, payment reporting, and task scheduling. The system integrates multiple business functions including order management, customer relationship management, pricing controls, document generation, and financial reporting.

## Test Scenarios

### 1. Authentication & Login

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful login with valid credentials

**File:** `tests/auth/login-success.spec.ts`

**Steps:**
  1. Navigate to the login page at https://dev.quote2cash.app/#/login/signin
    - expect: The login form is displayed with Username and Password input fields
    - expect: A Login button is visible
  2. Enter username 'BVL' in the Username field
    - expect: The username 'BVL' is entered in the Username field
  3. Enter password 'demo' in the Password field
    - expect: The password is entered in the Password field
  4. Click the Login button
    - expect: The application authenticates the user
    - expect: The user is redirected to the Orders/Jobboard page
    - expect: The page title changes to 'Quote2Cash - Orders'
    - expect: The main dashboard displays with navigation menu on the left

#### 1.2. Login with invalid credentials

**File:** `tests/auth/login-invalid.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: The login form is displayed
  2. Enter an incorrect username 'InvalidUser' in the Username field
    - expect: The username is entered
  3. Enter an incorrect password 'wrongpassword' in the Password field
    - expect: The password is entered
  4. Click the Login button
    - expect: An error message is displayed indicating invalid credentials
    - expect: The user remains on the login page
    - expect: The login form is not cleared

#### 1.3. Login with empty fields

**File:** `tests/auth/login-empty-fields.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: The login form is displayed
  2. Leave the Username field empty
    - expect: The Username field remains empty
  3. Leave the Password field empty
    - expect: The Password field remains empty
  4. Click the Login button
    - expect: A validation error message is displayed
    - expect: The user is not authenticated
    - expect: The user remains on the login page

#### 1.4. Forgot password link functionality

**File:** `tests/auth/forgot-password.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: The login form is displayed
    - expect: A 'Forgot username' link is visible
    - expect: A 'Forgot password' link is visible
  2. Click on the 'Forgot password' link
    - expect: The user is navigated to a password reset page or a recovery email is sent
    - expect: A message confirms the password reset process has been initiated

### 2. Orders Management

**Seed:** `tests/seed.spec.ts`

#### 2.1. View all orders on dashboard

**File:** `tests/orders/view-orders-dashboard.spec.ts`

**Steps:**
  1. Log in with valid credentials (BVL/demo)
    - expect: The user is logged in successfully
    - expect: The Orders/Jobboard page is displayed
  2. View the orders table on the dashboard
    - expect: A table is displayed with multiple orders
    - expect: Order columns include: Order Ref #, Customer Name, Status, Account Name, Email, Phone #, Est Move Date, Created By, Created Date, Amount
    - expect: Multiple orders with various statuses are visible (Quote, In Storage, Booked, etc.)
    - expect: Total order count is displayed at the top
  3. Scroll through the orders list
    - expect: The table supports pagination or scrolling
    - expect: Multiple pages of orders can be accessed

#### 2.2. Filter orders by status

**File:** `tests/orders/filter-orders-by-status.spec.ts`

**Steps:**
  1. Log in and navigate to Orders page
    - expect: The Orders page is displayed
  2. Click on the 'Quote' status filter button
    - expect: Only orders with 'Quote' status are displayed
    - expect: The filter button is highlighted indicating it is active
  3. Click on the 'In Storage' status filter button
    - expect: Only orders with 'In Storage' status are displayed
    - expect: The filter changes to show only In Storage orders
  4. Click on the 'Booked' status filter button
    - expect: Only orders with 'Booked' status are displayed

#### 2.3. Search for specific order

**File:** `tests/orders/search-order.spec.ts`

**Steps:**
  1. Log in and navigate to Orders page
    - expect: The Orders page is displayed
    - expect: A search box is visible
  2. Click on the Search field and enter an order reference number (e.g., 'OR12')
    - expect: The search field accepts the input
  3. Press Enter or wait for auto-search
    - expect: The orders table is filtered to show only the matching order
    - expect: The specific order 'OR12' with customer 'john merry' is displayed

#### 2.4. Click on an order to view details

**File:** `tests/orders/view-order-details.spec.ts`

**Steps:**
  1. Log in and navigate to Orders page
    - expect: The Orders page is displayed with order table
  2. Click on a specific order row (e.g., OR12)
    - expect: The order details page opens
    - expect: Order information is displayed including customer details, status, amount, and other relevant data

#### 2.5. Sort orders by different columns

**File:** `tests/orders/sort-orders.spec.ts`

**Steps:**
  1. Log in and navigate to Orders page
    - expect: The Orders page is displayed
  2. Click on the 'Order Ref #' column header
    - expect: The orders are sorted by Order Ref # in ascending order
    - expect: A sort indicator (arrow) is visible on the column
  3. Click on the 'Order Ref #' column header again
    - expect: The orders are now sorted in descending order
  4. Click on the 'Amount' column header
    - expect: The orders are sorted by Amount
    - expect: The sort direction indicator updates

### 3. Customers Management

**Seed:** `tests/seed.spec.ts`

#### 3.1. View all customers

**File:** `tests/customers/view-customers.spec.ts`

**Steps:**
  1. Log in with valid credentials
    - expect: The user is logged in
  2. Click on 'Customers' in the left navigation menu
    - expect: The Customers page is displayed
    - expect: A table showing all customers is visible
  3. Verify customer table columns
    - expect: Customer table displays: Customer #, Name, Email Address, Phone #, Type, Address, Open Balance
    - expect: Multiple customers are listed with their information

#### 3.2. Search for a specific customer

**File:** `tests/customers/search-customer.spec.ts`

**Steps:**
  1. Log in and navigate to Customers page
    - expect: The Customers page is displayed
  2. Click on the search field and enter a customer name (e.g., 'Mohanraj')
    - expect: The search field accepts the input
  3. Press Enter or wait for auto-search results
    - expect: The customers table is filtered to show matching customers
    - expect: Customers with 'Mohanraj' in their name are displayed

#### 3.3. Sort customers by different columns

**File:** `tests/customers/sort-customers.spec.ts`

**Steps:**
  1. Log in and navigate to Customers page
    - expect: The Customers page is displayed
  2. Click on the 'Name' column header
    - expect: Customers are sorted by Name in ascending order
    - expect: A sort indicator is visible
  3. Click on the 'Open Balance' column header
    - expect: Customers are sorted by Open Balance

#### 3.4. Click on a customer to view details

**File:** `tests/customers/view-customer-details.spec.ts`

**Steps:**
  1. Log in and navigate to Customers page
    - expect: The Customers page is displayed
  2. Click on a customer row (e.g., 'Mohanraj Rajangam')
    - expect: The customer details page opens
    - expect: Customer information including name, email, phone, address, and open balance is displayed

### 4. Rate Management

**Seed:** `tests/seed.spec.ts`

#### 4.1. View all rates

**File:** `tests/rates/view-rates.spec.ts`

**Steps:**
  1. Log in with valid credentials
    - expect: The user is logged in
  2. Click on 'Rates' in the left navigation menu
    - expect: The Rate Management page is displayed
    - expect: The page title shows 'Rate Management'
  3. View the rates table
    - expect: A table is displayed with rate information
    - expect: Table columns include: Rate Name, Approved Date, Approved By, Rate Mode, Open Orders, Order Count, Revenue

#### 4.2. Filter rates by status (Active/Inactive/Removed)

**File:** `tests/rates/filter-rates-by-status.spec.ts`

**Steps:**
  1. Log in and navigate to Rates page
    - expect: The Rates page is displayed
  2. Click on the 'Active' tab
    - expect: Rates with Active status are displayed
    - expect: The Active tab is highlighted
  3. Click on the 'Inactive' tab
    - expect: Rates with Inactive status are displayed
    - expect: Multiple inactive rates are shown
  4. Click on the 'Removed' tab
    - expect: Rates with Removed status are displayed

#### 4.3. Search for a specific rate

**File:** `tests/rates/search-rate.spec.ts`

**Steps:**
  1. Log in and navigate to Rates page
    - expect: The Rates page is displayed
    - expect: A search box is visible
  2. Enter a rate name in the search field (e.g., 'NJ Testing')
    - expect: The search field accepts the input
  3. Press Enter or wait for auto-search
    - expect: The rates table is filtered to show matching rates
    - expect: The rate 'NJ Testing Local' is displayed

#### 4.4. View rate statistics

**File:** `tests/rates/view-rate-statistics.spec.ts`

**Steps:**
  1. Log in and navigate to Rates page
    - expect: The Rates page is displayed
  2. Look for rate statistics at the top of the page
    - expect: Statistics are displayed showing 'In Use', 'Not In Use', and 'Total Revenue'
    - expect: Numerical values are shown for each statistic

### 5. Documents Management

**Seed:** `tests/seed.spec.ts`

#### 5.1. View all documents

**File:** `tests/documents/view-documents.spec.ts`

**Steps:**
  1. Log in with valid credentials
    - expect: The user is logged in
  2. Click on 'All Documents' in the left navigation menu
    - expect: The All Documents page is displayed
    - expect: The page title shows 'All Documents'
  3. View the documents table
    - expect: A table is displayed with document information
    - expect: Table columns include: Select, Signed, Doc Name, Doc Type, Order Ref #, Doc #, Create Date, Created By, Sent Date, Send To, Action

#### 5.2. Search for a specific document

**File:** `tests/documents/search-document.spec.ts`

**Steps:**
  1. Log in and navigate to All Documents page
    - expect: The Documents page is displayed
    - expect: A search box with placeholder 'Search Documents...' is visible
  2. Enter a document name in the search field (e.g., 'Storage Billing')
    - expect: The search field accepts the input
  3. Press Enter or wait for auto-search
    - expect: The documents table is filtered to show matching documents
    - expect: Multiple 'Storage Billing' documents are displayed

#### 5.3. Filter documents by type

**File:** `tests/documents/filter-documents-by-type.spec.ts`

**Steps:**
  1. Log in and navigate to All Documents page
    - expect: The Documents page is displayed
  2. Identify document type filters if available
    - expect: Different document types are visible in the table (e.g., 'BVL General Invoice', 'Estimate')
  3. Look for filter options to filter by document type
    - expect: Filter controls are available for document type selection

#### 5.4. Select and download multiple documents

**File:** `tests/documents/select-download-documents.spec.ts`

**Steps:**
  1. Log in and navigate to All Documents page
    - expect: The Documents page is displayed with checkboxes for each document
  2. Click the 'Select All' checkbox
    - expect: All documents in the current view are selected
    - expect: All checkboxes are checked
  3. Click the 'Download' button
    - expect: The selected documents are downloaded
    - expect: A download confirmation is provided

#### 5.5. Sort documents by column

**File:** `tests/documents/sort-documents.spec.ts`

**Steps:**
  1. Log in and navigate to All Documents page
    - expect: The Documents page is displayed
  2. Click on the 'Doc Name' column header
    - expect: Documents are sorted by document name
    - expect: A sort indicator is visible
  3. Click on the 'Create Date' column header
    - expect: Documents are sorted by creation date

### 6. Reports & Payments

**Seed:** `tests/seed.spec.ts`

#### 6.1. View Payments report

**File:** `tests/reports/view-payments-report.spec.ts`

**Steps:**
  1. Log in with valid credentials
    - expect: The user is logged in
  2. Click on 'Reports' in the left navigation menu
    - expect: The Reports page is displayed
  3. Click on the 'Payments' tab
    - expect: The Payments report is displayed
    - expect: Multiple payment status tabs are visible (Partially Paid, Fully Paid, Failed)
  4. View the payments table
    - expect: A table is displayed with columns: Select, Confirmation #, Customer Name, Email, Phone, Order Ref #, Date, Amount, Fee, Card #, Expires, Status
    - expect: Multiple payment records are shown

#### 6.2. Filter payments by status

**File:** `tests/reports/filter-payments-by-status.spec.ts`

**Steps:**
  1. Log in and navigate to Reports > Payments
    - expect: The Payments page is displayed
  2. Click on the 'Partially Paid' status tab
    - expect: Only partially paid payments are displayed
    - expect: The tab is highlighted
  3. Click on the 'Fully Paid' status tab
    - expect: Only fully paid payments are displayed
    - expect: Payment records show 'Fully Paid' status
  4. Click on the 'Failed' status tab
    - expect: Only failed payments are displayed

#### 6.3. Select and download payment records

**File:** `tests/reports/download-payment-records.spec.ts`

**Steps:**
  1. Log in and navigate to Reports > Payments
    - expect: The Payments page is displayed with downloadable records
  2. Click the 'Select All' checkbox
    - expect: All visible payment records are selected
    - expect: All checkboxes are marked
  3. Click the 'Download' button
    - expect: The Download button becomes enabled
    - expect: Payment records are downloaded in the appropriate format

#### 6.4. Search payment records

**File:** `tests/reports/search-payment-records.spec.ts`

**Steps:**
  1. Log in and navigate to Reports > Payments
    - expect: The Payments page is displayed
  2. Enter a customer name or confirmation number in the search field
    - expect: The search field accepts the input
  3. Press Enter or wait for auto-search
    - expect: The payments table is filtered to show matching records

### 7. Navigation & UI

**Seed:** `tests/seed.spec.ts`

#### 7.1. Left sidebar navigation

**File:** `tests/navigation/left-sidebar-navigation.spec.ts`

**Steps:**
  1. Log in with valid credentials
    - expect: The user is logged in and the dashboard is displayed
  2. Verify the left sidebar menu contains all main sections
    - expect: The left sidebar displays: Orders, Customers, Rates, My Schedule, All Documents, Reports, Settings
    - expect: Each menu item has an icon and text label
  3. Click on each menu item to verify navigation
    - expect: Each menu item navigates to the correct page
    - expect: The active menu item is highlighted

#### 7.2. Top navigation bar elements

**File:** `tests/navigation/top-navbar.spec.ts`

**Steps:**
  1. Log in and view the dashboard
    - expect: The top navigation bar is displayed
  2. Verify top navbar contains: Quote2Cash logo, Create button, Alerts, Task link, User profile
    - expect: Logo is visible and clickable
    - expect: Create button is present
    - expect: Alerts section is visible
    - expect: Task link is available
    - expect: User profile dropdown is present showing 'Bvl'
  3. Click on the Quote2Cash logo
    - expect: Navigation returns to the home/orders page

#### 7.3. Breadcrumb navigation

**File:** `tests/navigation/breadcrumb.spec.ts`

**Steps:**
  1. Log in and navigate to different pages
    - expect: Breadcrumb navigation is displayed at the top of the page content
    - expect: Breadcrumb shows: Home > Current Page
  2. Navigate to Customers page
    - expect: Breadcrumb shows: Home / Customers
  3. Click on 'Home' in the breadcrumb
    - expect: Navigation returns to the home/orders page

#### 7.4. Page title updates

**File:** `tests/navigation/page-title-updates.spec.ts`

**Steps:**
  1. Log in and navigate to Orders page
    - expect: Page title in browser tab shows 'Quote2Cash - Orders'
  2. Click on Customers menu
    - expect: Page title changes to 'Quote2Cash - Customers'
  3. Click on Reports menu
    - expect: Page title changes to 'Quote2Cash - Reports'

### 8. Error Handling & Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 8.1. Handle empty data tables gracefully

**File:** `tests/edge-cases/empty-data-tables.spec.ts`

**Steps:**
  1. Log in and navigate to a section that might have no data
    - expect: The application handles empty states gracefully
  2. Filter or search to produce no results
    - expect: A 'No Records Found' message is displayed
    - expect: The table structure is maintained
    - expect: No errors are shown in console

#### 8.2. Session timeout handling

**File:** `tests/edge-cases/session-timeout.spec.ts`

**Steps:**
  1. Log in with valid credentials
    - expect: The user is authenticated
  2. Wait for session to timeout (if applicable) or manually clear session
    - expect: The application either redirects to login page or shows session timeout message
  3. Attempt to navigate to a protected page after session timeout
    - expect: User is redirected to login page
    - expect: Previous data is not displayed

#### 8.3. Large data set handling

**File:** `tests/edge-cases/large-dataset.spec.ts`

**Steps:**
  1. Log in and navigate to Orders page showing 2345 total orders
    - expect: The page loads successfully
    - expect: Pagination or lazy loading is implemented
  2. Scroll through multiple pages of orders
    - expect: The application remains responsive
    - expect: Data loads correctly for each page
    - expect: No UI lag or freezing occurs

#### 8.4. Special characters in search

**File:** `tests/edge-cases/special-characters-search.spec.ts`

**Steps:**
  1. Navigate to Orders search
    - expect: The search field is displayed
  2. Enter special characters (e.g., '@#$%') in search field
    - expect: The search field handles special characters safely
    - expect: No errors or unexpected behavior occurs
  3. Clear and perform a normal search
    - expect: The application returns to normal search functionality

### 9. Data Validation & Input

**Seed:** `tests/seed.spec.ts`

#### 9.1. Login field validation

**File:** `tests/validation/login-field-validation.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: The login form is displayed
  2. Verify username field displays placeholder 'Enter a valid username'
    - expect: The placeholder text is visible
  3. Verify password field displays placeholder 'Enter a valid password'
    - expect: The placeholder text is visible

#### 9.2. Table column sorting maintains data integrity

**File:** `tests/validation/table-sorting-integrity.spec.ts`

**Steps:**
  1. Log in and navigate to Orders page
    - expect: The Orders page is displayed
  2. Click to sort by Amount column
    - expect: Orders are sorted by amount
    - expect: All data remains intact and visible
  3. Verify each order's data matches the correct row
    - expect: Data integrity is maintained
    - expect: No data is lost or misaligned during sort

#### 9.3. Currency display formatting

**File:** `tests/validation/currency-formatting.spec.ts`

**Steps:**
  1. Log in and navigate to Orders page
    - expect: The Orders page displays amounts
  2. Verify currency formatting in Amount column
    - expect: All amounts display with $ symbol
    - expect: Amounts use comma separators for thousands (e.g., $1,216.61)
    - expect: Decimal places are consistent (2 decimal places)
  3. Navigate to Customers page and verify Open Balance formatting
    - expect: Currency formatting is consistent across pages
