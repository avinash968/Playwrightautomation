# Quote2Cash Login and Dashboard Test Plan

## Application Overview

This test plan covers the login feature and dashboard for Quote2Cash application. The tests validate successful authentication, error handling for invalid credentials, dashboard page load, and verification of all dashboard UI elements and navigation.

## Test Scenarios

### 1. Login - Happy Path

**Seed:** `tests/seed.spec.ts`

#### 1.1. Login with valid credentials successfully

**File:** `tests/login/login-happy-path.spec.ts`

**Steps:**
  1. Navigate to https://dev.quote2cash.app/
    - expect: Login page loads with heading 'Welcome to Quote2Cash'
    - expect: Username and Password input fields are visible and empty
    - expect: Login button is present and enabled
    - expect: Forgot username/password links are visible
  2. Enter 'mga' in the Username field
    - expect: Username field displays 'mga'
    - expect: No validation errors are shown
  3. Enter 'demo' in the Password field
    - expect: Password field displays masked characters (not visible text)
    - expect: No validation errors are shown
  4. Click the 'Login' button
    - expect: Login button shows loading state or is disabled
    - expect: Page redirects to dashboard
    - expect: User is authenticated and logged in
  5. Verify dashboard is fully loaded
    - expect: Page URL is https://dev.quote2cash.app/#/app/salesLeads
    - expect: Dashboard title shows 'Sales Leads'
    - expect: Left sidebar navigation menu is visible
    - expect: Top header bar with Quote2Cash logo is visible
    - expect: User menu showing 'Michael' is visible in top right

#### 1.2. Dashboard displays all navigation menu items

**File:** `tests/login/login-happy-path.spec.ts`

**Steps:**
  1. Login with valid credentials (mga/demo)
    - expect: User is logged in and on Sales Leads dashboard
  2. Verify left sidebar navigation menu contains all items
    - expect: Sales Leads menu item is visible and highlighted (current page)
    - expect: Orders menu item is visible
    - expect: Customers menu item is visible
    - expect: Rates menu item is visible
    - expect: Company Calendar menu item is visible
    - expect: My Schedule menu item is visible
    - expect: My Emails menu item is visible
    - expect: All Documents menu item is visible
    - expect: Reports menu item is visible
    - expect: Settings menu item is visible

#### 1.3. Dashboard header displays all elements

**File:** `tests/login/login-happy-path.spec.ts`

**Steps:**
  1. Login with valid credentials (mga/demo)
    - expect: User is on the dashboard
  2. Verify top header bar contains all elements
    - expect: Quote2Cash logo link is visible
    - expect: Q2C abbreviation link is visible
    - expect: Search/notification button is visible
    - expect: Alerts dropdown is visible
    - expect: Chat link is visible
    - expect: Task link is visible
    - expect: Create button is visible
    - expect: User profile menu showing 'Michael' is visible

#### 1.4. Dashboard content displays sales leads metrics

**File:** `tests/login/login-happy-path.spec.ts`

**Steps:**
  1. Login with valid credentials (mga/demo)
    - expect: User is on the Sales Leads dashboard
  2. Verify dashboard displays sales metrics
    - expect: Page title 'Sales Leads' is displayed
    - expect: Quarterly revenue shows '$0.00/ qrt' (no current data)
    - expect: Days remaining shows '47 days left' in quarter
    - expect: Number of Opportunities shows '0'
    - expect: Won Count shows '0'
    - expect: Loss Count shows '0'
    - expect: Won Value shows '$0.00'
    - expect: Loss Value shows '$0.00'
    - expect: Forecast Opportunity shows '$0.00'

#### 1.5. Dashboard action buttons are available

**File:** `tests/login/login-happy-path.spec.ts`

**Steps:**
  1. Login with valid credentials (mga/demo)
    - expect: User is on the Sales Leads dashboard
  2. Verify action buttons are present and clickable
    - expect: 'Create Lead' button is visible and enabled
    - expect: 'Edit Quota' button is visible and enabled
    - expect: 'Import Leads' button is visible and enabled

### 2. Login - Input Validation

**Seed:** `tests/seed.spec.ts`

#### 2.1. Empty username field shows validation error

**File:** `tests/login/login-validation.spec.ts`

**Steps:**
  1. Navigate to https://dev.quote2cash.app/
    - expect: Login page is displayed
  2. Leave Username field empty and enter password 'demo'
    - expect: Username field remains empty
  3. Click Login button
    - expect: Login fails
    - expect: Validation error message appears for username field
    - expect: User remains on login page
    - expect: Password field retains the entered value

#### 2.2. Empty password field shows validation error

**File:** `tests/login/login-validation.spec.ts`

**Steps:**
  1. Navigate to https://dev.quote2cash.app/
    - expect: Login page is displayed
  2. Enter username 'mga' and leave Password field empty
    - expect: Username field shows 'mga'
    - expect: Password field remains empty
  3. Click Login button
    - expect: Login fails
    - expect: Validation error message appears for password field
    - expect: User remains on login page
    - expect: Username field retains the entered value

#### 2.3. Both fields empty shows validation errors

**File:** `tests/login/login-validation.spec.ts`

**Steps:**
  1. Navigate to https://dev.quote2cash.app/
    - expect: Login page is displayed
    - expect: Both Username and Password fields are empty
  2. Click Login button without entering credentials
    - expect: Login fails
    - expect: Validation error messages appear for both fields
    - expect: User remains on login page

#### 2.4. Login button requires both fields to be filled

**File:** `tests/login/login-validation.spec.ts`

**Steps:**
  1. Navigate to https://dev.quote2cash.app/
    - expect: Login page is displayed
  2. Verify Login button state with empty fields
    - expect: Login button may be disabled or will show error on click
  3. Enter only username 'mga'
    - expect: Username field shows 'mga'
  4. Click Login button
    - expect: Login fails with validation error for password field

### 3. Login - Authentication Errors

**Seed:** `tests/seed.spec.ts`

#### 3.1. Invalid username shows authentication error

**File:** `tests/login/login-errors.spec.ts`

**Steps:**
  1. Navigate to https://dev.quote2cash.app/
    - expect: Login page is displayed
  2. Enter invalid username 'invaliduser' and correct password 'demo'
    - expect: Username field shows 'invaliduser'
    - expect: Password field is filled
  3. Click Login button
    - expect: Login fails
    - expect: Authentication error message appears (e.g., 'Invalid credentials' or 'User not found')
    - expect: User remains on login page
    - expect: Password field is cleared for security

#### 3.2. Invalid password shows authentication error

**File:** `tests/login/login-errors.spec.ts`

**Steps:**
  1. Navigate to https://dev.quote2cash.app/
    - expect: Login page is displayed
  2. Enter correct username 'mga' and incorrect password 'wrongpassword'
    - expect: Username field shows 'mga'
    - expect: Password field is filled
  3. Click Login button
    - expect: Login fails
    - expect: Authentication error message appears
    - expect: User remains on login page
    - expect: Partial or no field clearing occurs to allow user to retry

#### 3.3. Both username and password invalid shows authentication error

**File:** `tests/login/login-errors.spec.ts`

**Steps:**
  1. Navigate to https://dev.quote2cash.app/
    - expect: Login page is displayed
  2. Enter invalid username 'invaliduser' and invalid password 'wrongpassword'
    - expect: Username field shows 'invaliduser'
    - expect: Password field is filled
  3. Click Login button
    - expect: Login fails
    - expect: Authentication error message appears
    - expect: User remains on login page

### 4. Login - UI Elements and Interactions

**Seed:** `tests/seed.spec.ts`

#### 4.1. Password field shows/hides password toggle

**File:** `tests/login/login-ui.spec.ts`

**Steps:**
  1. Navigate to https://dev.quote2cash.app/
    - expect: Login page is displayed
    - expect: Password visibility toggle icon is visible next to password field
  2. Enter 'demo' in the Password field
    - expect: Password displays as masked characters (dots or asterisks)
  3. Click password toggle/eye icon
    - expect: Password becomes visible showing 'demo' in plain text
  4. Click password toggle/eye icon again
    - expect: Password is hidden again showing masked characters

#### 4.2. Forgot username link is accessible

**File:** `tests/login/login-ui.spec.ts`

**Steps:**
  1. Navigate to https://dev.quote2Cash.app/
    - expect: Login page is displayed
    - expect: Forgot username link is visible
  2. Verify 'Forgot username' link text and styling
    - expect: Link text reads 'username'
    - expect: Link appears as clickable (underlined or different color)
  3. Click Forgot username link
    - expect: User is navigated to password recovery page or modal appears
    - expect: Recovery form is displayed for username recovery

#### 4.3. Forgot password link is accessible

**File:** `tests/login/login-ui.spec.ts`

**Steps:**
  1. Navigate to https://dev.quote2cash.app/
    - expect: Login page is displayed
    - expect: Forgot password link is visible
  2. Verify 'Forgot password' link text and styling
    - expect: Link text reads 'password'
    - expect: Link appears as clickable (underlined or different color)
  3. Click Forgot password link
    - expect: User is navigated to password recovery page or modal appears
    - expect: Recovery form is displayed for password reset

#### 4.4. Login page displays copyright and branding

**File:** `tests/login/login-ui.spec.ts`

**Steps:**
  1. Navigate to https://dev.quote2cash.app/
    - expect: Login page is displayed
  2. Verify page branding and footer
    - expect: Quote2Cash logo/image is visible on login page
    - expect: Page title shows 'Welcome to Quote2Cash'
    - expect: Instructions text 'Please enter your username and password to log in.' is visible
    - expect: Copyright text '2026 © Quote2Cash' is displayed at the bottom

### 5. Dashboard - Page Load and Navigation

**Seed:** `tests/seed.spec.ts`

#### 5.1. Dashboard loads with correct URL after successful login

**File:** `tests/login/dashboard-navigation.spec.ts`

**Steps:**
  1. Navigate to https://dev.quote2cash.app/
    - expect: Login page is displayed
  2. Login with valid credentials (mga/demo)
    - expect: Login is successful
  3. Verify dashboard page URL
    - expect: Page URL is https://dev.quote2cash.app/#/app/salesLeads
    - expect: Page does not redirect to other pages
    - expect: URL contains '#/app/salesLeads' hash route

#### 5.2. Navigation to Orders page from dashboard

**File:** `tests/login/dashboard-navigation.spec.ts`

**Steps:**
  1. Login with valid credentials (mga/demo)
    - expect: User is on Sales Leads dashboard
  2. Click 'Orders' in the left sidebar menu
    - expect: Page navigates to Orders page
    - expect: URL changes to https://dev.quote2cash.app/#/app/jobboard
    - expect: Orders page content is loaded

#### 5.3. Navigation to Customers page from dashboard

**File:** `tests/login/dashboard-navigation.spec.ts`

**Steps:**
  1. Login with valid credentials (mga/demo)
    - expect: User is on Sales Leads dashboard
  2. Click 'Customers' in the left sidebar menu
    - expect: Page navigates to Customers page
    - expect: URL changes to https://dev.quote2cash.app/#/app/customers
    - expect: Customers page content is loaded

#### 5.4. Logo click returns to home dashboard

**File:** `tests/login/dashboard-navigation.spec.ts`

**Steps:**
  1. Login with valid credentials (mga/demo) and navigate to Orders page
    - expect: User is on Orders page
  2. Click the 'Quote2Cash' logo in the header
    - expect: Page navigates back to Sales Leads dashboard
    - expect: URL returns to https://dev.quote2cash.app/#/app/salesLeads

### 6. Dashboard - User Profile and Logout

**Seed:** `tests/seed.spec.ts`

#### 6.1. User profile shows logged-in user name

**File:** `tests/login/dashboard-profile.spec.ts`

**Steps:**
  1. Login with valid credentials (mga/demo)
    - expect: User is logged in
    - expect: Top right corner shows user menu with name 'Michael'
  2. Verify user name display in profile menu
    - expect: User name 'Michael' is visible in the header
    - expect: Profile menu is clickable
    - expect: Name represents the logged-in user 'mga' (display name is Michael)

#### 6.2. User profile menu opens on click

**File:** `tests/login/dashboard-profile.spec.ts`

**Steps:**
  1. Login with valid credentials (mga/demo)
    - expect: User is logged in
    - expect: User profile 'Michael' is visible in header
  2. Click on user profile menu 'Michael'
    - expect: Profile dropdown menu opens
    - expect: Menu displays profile options (e.g., Profile, Settings, Logout)
    - expect: Menu is positioned near the clicked element

#### 6.3. Logout functionality from dashboard

**File:** `tests/login/dashboard-profile.spec.ts`

**Steps:**
  1. Login with valid credentials (mga/demo)
    - expect: User is logged in and on dashboard
  2. Click on user profile menu and select Logout
    - expect: User is logged out
    - expect: Page redirects to login page
    - expect: URL returns to https://dev.quote2cash.app/#/login/signin
