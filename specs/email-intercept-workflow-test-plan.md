# Email Intercept QA Workflow - Comprehensive Test Plan

## Application Overview

Comprehensive Playwright test plan for validating the Email Intercept QA Workflow on demo.quote2cash.com. This plan covers end-to-end validation of 3 distinct client scenarios where emails are sent via Gmail MCP and automatically create orders in the Quote2Cash system with correct customer details, pricing, and documents. Each client scenario includes 8 detailed test cases covering email delivery, order creation, customer validation, pricing validation, and document verification.

## Test Scenarios

### 1. Van Line Movers Email Intercept - Complete Workflow

**Seed:** `tests/email-intercept-workflow/van-line-movers.spec.ts`

#### 1.1. Email Delivery and Message ID Capture

**File:** `tests/email-intercept-workflow/van-line-movers/01-email-delivery-message-id.spec.ts`

**Steps:**
  1. Log in to the Quote2Cash dashboard using Van Line Movers credentials (vanline_emailagent / demo)
    - expect: User is successfully authenticated
    - expect: Dashboard is displayed with navigation menu visible
  2. Open Gmail MCP email composition interface or trigger email sending script to vanlinemovers@pricingrates.com
    - expect: Email interface is ready or sending process is initiated
    - expect: No errors are displayed
  3. Send test email to vanlinemovers@pricingrates.com with move details (Customer: q2cemailagent@gmail.com, Phone: 813-555-2002, Origin: 1908 Bay Street Tampa FL, Destination: 507 Highland Ave Birmingham AL, Date: April 3 2026)
    - expect: Email is successfully sent
    - expect: Gmail MCP returns success confirmation
  4. Capture the unique message ID from Gmail API response or email header
    - expect: Message ID is captured and logged
    - expect: Message ID format is valid (e.g., contains alphanumeric characters)
  5. Wait 5-10 seconds for email processing by the intercept system
    - expect: No errors in system logs
    - expect: Order creation process should be initiated

#### 1.2. Order Creation in Dashboard

**File:** `tests/email-intercept-workflow/van-line-movers/02-order-creation-dashboard.spec.ts`

**Steps:**
  1. Log in to Quote2Cash dashboard with vanline_emailagent / demo credentials
    - expect: Dashboard loads successfully
    - expect: User is authenticated
  2. Navigate to Orders or Quote Management section of the dashboard
    - expect: Orders list view is displayed
    - expect: New orders can be viewed
  3. Refresh the page or use dashboard refresh button to load latest orders
    - expect: New order from email intercept appears in the orders list
    - expect: Order status is visible
  4. Verify the newly created order is present with email source indication
    - expect: Order shows 'Email' as source or has email-related identifier
    - expect: Order ID is visible and valid
    - expect: Order date matches current date
  5. Click on the order to open the order detail view
    - expect: Order detail modal or page opens
    - expect: All order information is displayed
    - expect: No loading errors present
  6. Take a screenshot of the order overview section
    - expect: Screenshot captures full order details
    - expect: Image is saved to screenshots/email-intercept/ directory

#### 1.3. Customer Details Validation

**File:** `tests/email-intercept-workflow/van-line-movers/03-customer-details-validation.spec.ts`

**Steps:**
  1. Open the recently created order in dashboard detail view
    - expect: Order detail page or modal is displayed
  2. Verify customer email field contains 'q2cemailagent@gmail.com'
    - expect: Email matches exactly: q2cemailagent@gmail.com
    - expect: Email field is editable if required
  3. Verify phone field contains '813-555-2002'
    - expect: Phone matches exactly: 813-555-2002 or formatted version
    - expect: Phone is in correct format
  4. Verify origin address contains 'Bay Street' and 'Tampa, FL'
    - expect: Origin shows: 1908 Bay Street, Tampa, FL 33606
    - expect: Address is properly parsed and displayed
  5. Verify destination address contains 'Highland Ave' and 'Birmingham, AL'
    - expect: Destination shows: 507 Highland Ave, Birmingham, AL 35205
    - expect: Address is properly parsed and displayed
  6. Verify job date field shows April 3rd, 2026 or correct formatted date
    - expect: Date is correctly captured: April 3, 2026
    - expect: Date format matches system standard
  7. Take screenshot of customer details section
    - expect: Screenshot shows all validated fields

#### 1.4. Notes Section Validation

**File:** `tests/email-intercept-workflow/van-line-movers/04-notes-section-validation.spec.ts`

**Steps:**
  1. Open order detail view and scroll to Notes or Comments section
    - expect: Notes section is visible
    - expect: Section contains email content or metadata
  2. Verify notes/comments section contains extracted email body or summary
    - expect: Email content or reference is present in notes
    - expect: Notes are not empty or placeholder
  3. Verify email timestamp is captured in notes metadata if applicable
    - expect: Timestamp is visible: April 3, 2026 or email send time
    - expect: Format is readable
  4. Check for email sender information (should reference the email address that triggered the order)
    - expect: Email source is documented
    - expect: No sensitive data is exposed
  5. Verify the notes section content is searchable and indexable
    - expect: Notes content can be viewed and edited
    - expect: No formatting errors present

#### 1.5. Active Price Validation

**File:** `tests/email-intercept-workflow/van-line-movers/05-active-price-validation.spec.ts`

**Steps:**
  1. Open order detail and locate Active Price or Pricing section
    - expect: Pricing section is displayed
    - expect: Price value is visible
  2. Verify Active Price value is not zero (0.00)
    - expect: Active Price is greater than 0.00
    - expect: Value appears to be reasonable for move estimate
  3. Verify Active Price displays in correct currency format (USD)
    - expect: Price format is correct (e.g., $XXX.XX)
    - expect: Currency symbol or code is displayed
  4. Capture the exact Active Price value for later PDF comparison
    - expect: Price value is noted/logged: e.g., $2,500.00
    - expect: Value is stored for validation
  5. Verify there are no error indicators on the pricing field
    - expect: No red error messages present
    - expect: Pricing calculation appears valid
  6. Take screenshot of the pricing section
    - expect: Screenshot clearly shows the Active Price value

#### 1.6. Edit Rate Modal Validation

**File:** `tests/email-intercept-workflow/van-line-movers/06-edit-rate-modal.spec.ts`

**Steps:**
  1. In order detail view, locate and click the 'Edit Rate' or 'Edit Pricing' button
    - expect: Edit Rate modal opens
    - expect: Modal displays current pricing information
  2. Verify the rate shown in the modal matches the Active Price from order detail
    - expect: Rate in modal equals Active Price: verified price amount
    - expect: No discrepancies in values
  3. Verify the modal displays rate calculation breakdown if available
    - expect: Breakdown shows line items or calculation details
    - expect: Total in breakdown matches displayed rate
  4. Verify modal has 'Save' and 'Cancel' buttons and they are functional
    - expect: Both buttons are visible and clickable
    - expect: Buttons respond to interaction
  5. Click Cancel to close the modal without making changes
    - expect: Modal closes
    - expect: Order detail page returns to normal state
    - expect: Active Price remains unchanged
  6. Take screenshot of the Edit Rate modal showing the matching rate
    - expect: Screenshot captures full modal with rate information

#### 1.7. Document Existence and PDF Validation

**File:** `tests/email-intercept-workflow/van-line-movers/07-document-existence-pdf.spec.ts`

**Steps:**
  1. In order detail view, navigate to Documents or Attachments section
    - expect: Documents section is visible
    - expect: At least one document or PDF is listed
  2. Verify a PDF quote or estimate document has been generated and is present
    - expect: PDF document is listed with a name like 'Quote_[Order_ID].pdf' or similar
    - expect: Document has a file size indication (not 0 KB)
  3. Verify the document is in PDF format (check file extension)
    - expect: File extension is .pdf
    - expect: MIME type indicates PDF format
  4. Verify document has a created timestamp
    - expect: Document creation date is visible and recent (today's date)
    - expect: Timestamp is readable
  5. Verify the document can be downloaded or previewed
    - expect: Download or preview button is present and clickable
    - expect: No file access errors
  6. Take screenshot of the documents section
    - expect: Screenshot shows the list of documents with all details

#### 1.8. PDF Content Validation

**File:** `tests/email-intercept-workflow/van-line-movers/08-pdf-content-validation.spec.ts`

**Steps:**
  1. Download or open the generated PDF document
    - expect: PDF opens successfully in browser or PDF viewer
    - expect: Document content is readable
  2. Verify PDF contains the company name or branding (Van Line Movers or quote2cash branding)
    - expect: Company logo or name is visible in the PDF
    - expect: Branding is professionally displayed
  3. Verify PDF displays customer information: q2cemailagent@gmail.com and 813-555-2002
    - expect: Email is present in PDF: q2cemailagent@gmail.com
    - expect: Phone is present in PDF: 813-555-2002
  4. Verify PDF shows origin address: 1908 Bay Street, Tampa, FL 33606
    - expect: Full origin address is visible in PDF
  5. Verify PDF shows destination address: 507 Highland Ave, Birmingham, AL 35205
    - expect: Full destination address is visible in PDF
  6. Verify PDF displays the pricing that matches Active Price from dashboard (e.g., $2,500.00)
    - expect: Price amount in PDF matches the Active Price captured in step 05
    - expect: Price is prominently displayed
  7. Verify PDF includes job date: April 3, 2026
    - expect: Date is correctly shown in the PDF
    - expect: Date format is consistent with other fields
  8. Take screenshot of the PDF document showing the critical information
    - expect: Screenshot captures price, company branding, and customer details

### 2. Iron Haul Auto Transport Email Intercept - Complete Workflow

**Seed:** `tests/email-intercept-workflow/iron-haul-transport.spec.ts`

#### 2.1. Email Delivery and Message ID Capture

**File:** `tests/email-intercept-workflow/iron-haul-transport/01-email-delivery-message-id.spec.ts`

**Steps:**
  1. Log in to Quote2Cash dashboard using Iron Haul credentials (ironhaul_emailagent / demo)
    - expect: User is successfully authenticated
    - expect: Dashboard displays Van Line Movers context
  2. Send email to ironhaulautotransport@pricingrates.com with car transport details (Customer: q2cemailagent@gmail.com, Phone: 7010972074, Origin: Somerset, NJ 08873, Destination: Strongsville, OH 44136, Vehicles: 2013 Toyota Corolla & 2017 Hyundai Elantra, Date: May 10 2026)
    - expect: Email is sent successfully
    - expect: Gmail MCP confirms delivery
  3. Capture the unique message ID from the email transaction
    - expect: Message ID is logged
    - expect: ID is in valid format
  4. Wait for email intercept processing (5-10 seconds)
    - expect: System processes the email without errors

#### 2.2. Order Creation in Dashboard

**File:** `tests/email-intercept-workflow/iron-haul-transport/02-order-creation-dashboard.spec.ts`

**Steps:**
  1. Navigate to Orders section and refresh the dashboard
    - expect: New auto transport order appears in the list
    - expect: Order shows as email-sourced
  2. Click on the newly created Iron Haul order
    - expect: Order detail view opens
    - expect: All order fields are accessible
  3. Verify order is associated with Iron Haul Auto Transport client
    - expect: Client/Company field shows Iron Haul or reference
    - expect: Order metadata indicates email source
  4. Take screenshot of the Iron Haul order in dashboard
    - expect: Screenshot shows order overview with all details

#### 2.3. Customer Details Validation

**File:** `tests/email-intercept-workflow/iron-haul-transport/03-customer-details-validation.spec.ts`

**Steps:**
  1. In order detail view, verify customer email: q2cemailagent@gmail.com
    - expect: Email field matches: q2cemailagent@gmail.com
  2. Verify customer phone: 7010972074
    - expect: Phone matches: 7010972074 or formatted as 701-097-2074
  3. Verify origin: Somerset, NJ 08873
    - expect: Origin address is complete: Somerset, NJ 08873
  4. Verify destination: Strongsville, OH 44136
    - expect: Destination address is complete: Strongsville, OH 44136
  5. Verify job date: May 10, 2026
    - expect: Date field shows: May 10, 2026 or May 10th, 2026
  6. Verify vehicle information is captured: 2013 Toyota Corolla and 2017 Hyundai Elantra
    - expect: Vehicle list shows both vehicles with correct years and makes
    - expect: Vehicle count is 2
  7. Take screenshot of customer details including vehicles
    - expect: Screenshot shows all validated information

#### 2.4. Notes Section Validation

**File:** `tests/email-intercept-workflow/iron-haul-transport/04-notes-section-validation.spec.ts`

**Steps:**
  1. Navigate to Notes or Comments section in order detail
    - expect: Notes section is visible and populated
  2. Verify notes contain vehicle information: 2013 Toyota Corolla and 2017 Hyundai Elantra
    - expect: Both vehicles are referenced in notes
    - expect: Vehicle details are accurate
  3. Verify notes show origin and destination cities
    - expect: Somerset, NJ and Strongsville, OH are mentioned
    - expect: Context is clear
  4. Verify email timestamp and source metadata is present
    - expect: Email send time is recorded
    - expect: Source is documented as email intercept

#### 2.5. Active Price Validation

**File:** `tests/email-intercept-workflow/iron-haul-transport/05-active-price-validation.spec.ts`

**Steps:**
  1. Locate the Active Price or Rate field in the order detail
    - expect: Pricing section is displayed
  2. Verify Active Price is not zero and is suitable for a 2-vehicle auto transport
    - expect: Price is greater than 0.00
    - expect: Price appears reasonable for auto transport service
  3. Verify price format is USD with correct currency symbol
    - expect: Format is $XXX.XX or similar
    - expect: Currency is clearly indicated
  4. Capture the Active Price value for PDF comparison
    - expect: Price value is logged
    - expect: Value is stored for validation
  5. Verify no pricing errors or warnings are displayed
    - expect: No error messages or red indicators
  6. Take screenshot of the pricing section
    - expect: Screenshot shows Active Price clearly

#### 2.6. Edit Rate Modal Validation

**File:** `tests/email-intercept-workflow/iron-haul-transport/06-edit-rate-modal.spec.ts`

**Steps:**
  1. Click the Edit Rate or Edit Pricing button
    - expect: Edit Rate modal opens
    - expect: Current rate is displayed
  2. Verify modal rate matches order Active Price
    - expect: Rate in modal equals Active Price
    - expect: No discrepancies
  3. Verify modal shows per-vehicle breakdown if applicable
    - expect: Breakdown shows 2 vehicles
    - expect: Price calculation is visible
  4. Verify Save and Cancel buttons are functional
    - expect: Buttons are clickable
    - expect: Modal responds to interactions
  5. Click Cancel to close modal
    - expect: Modal closes without changes
    - expect: Active Price remains unchanged
  6. Take screenshot of Edit Rate modal
    - expect: Modal showing rate and vehicle breakdown is captured

#### 2.7. Document Existence and PDF Validation

**File:** `tests/email-intercept-workflow/iron-haul-transport/07-document-existence-pdf.spec.ts`

**Steps:**
  1. Navigate to Documents section in order detail
    - expect: Documents list is visible
    - expect: At least one PDF document exists
  2. Verify PDF quote/estimate document is present with valid filename
    - expect: PDF file is listed with appropriate name
    - expect: File has reasonable size (not 0 KB)
  3. Verify document format is PDF
    - expect: File extension is .pdf
    - expect: Document can be downloaded
  4. Verify document has recent creation timestamp
    - expect: Document was created today
    - expect: Timestamp is readable
  5. Take screenshot of documents section
    - expect: Screenshot shows document list with all details

#### 2.8. PDF Content Validation

**File:** `tests/email-intercept-workflow/iron-haul-transport/08-pdf-content-validation.spec.ts`

**Steps:**
  1. Download and open the PDF document
    - expect: PDF opens successfully
    - expect: Content is readable
  2. Verify PDF contains company branding (Iron Haul Auto Transport or quote2cash branding)
    - expect: Company logo or name is visible
    - expect: Professional appearance
  3. Verify PDF shows customer email and phone: q2cemailagent@gmail.com and 7010972074
    - expect: Both contact details are present in PDF
  4. Verify PDF displays origin and destination: Somerset, NJ and Strongsville, OH
    - expect: Both locations are clearly visible
  5. Verify PDF lists both vehicles: 2013 Toyota Corolla and 2017 Hyundai Elantra
    - expect: Both vehicles are listed with years and makes
  6. Verify PDF shows pricing matching Active Price from dashboard
    - expect: Price in PDF matches captured Active Price
  7. Verify PDF includes job date: May 10, 2026
    - expect: Date is correct and properly formatted
  8. Take screenshot of PDF showing pricing and vehicle information
    - expect: Critical information is visible in screenshot

### 3. Nova International Movers Email Intercept - Complete Workflow

**Seed:** `tests/email-intercept-workflow/nova-international.spec.ts`

#### 3.1. Email Delivery and Message ID Capture

**File:** `tests/email-intercept-workflow/nova-international/01-email-delivery-message-id.spec.ts`

**Steps:**
  1. Log in to Quote2Cash dashboard using Nova International credentials (international_emailagent / demo)
    - expect: User is authenticated
    - expect: Dashboard is ready
  2. Send email to novainternational@pricingrates.com with international shipment details (Customer: q2cemailagent@gmail.com, Phone: +91 98761 23456, Origin: Mumbai India, Destination: Berlin Germany, Shipment: Air freight 324 cubic feet, Accessorials: origin stairs & destination long carry, Date: April 15 2026)
    - expect: Email is sent successfully
    - expect: Gmail MCP confirms delivery
  3. Capture message ID from email transaction
    - expect: Message ID is logged
    - expect: ID format is valid
  4. Wait for intercept processing (5-10 seconds)
    - expect: System processes without errors

#### 3.2. Order Creation in Dashboard

**File:** `tests/email-intercept-workflow/nova-international/02-order-creation-dashboard.spec.ts`

**Steps:**
  1. Navigate to Orders section and refresh dashboard
    - expect: New international shipment order appears in list
    - expect: Order is marked as email source
  2. Click on the newly created Nova order
    - expect: Order detail view opens
    - expect: All fields are accessible
  3. Verify order is associated with Nova International Movers
    - expect: Client field shows Nova International
    - expect: Email source is indicated
  4. Take screenshot of Nova order overview
    - expect: Screenshot captures order with all visible information

#### 3.3. Customer Details Validation

**File:** `tests/email-intercept-workflow/nova-international/03-customer-details-validation.spec.ts`

**Steps:**
  1. In order detail, verify customer email: q2cemailagent@gmail.com
    - expect: Email field matches: q2cemailagent@gmail.com
  2. Verify customer phone: +91 98761 23456
    - expect: Phone matches: +91 98761 23456 or normalized format
    - expect: International format is preserved
  3. Verify origin: Mumbai, India
    - expect: Origin shows: Mumbai, India or full address if parsed
  4. Verify destination: Berlin, Germany
    - expect: Destination shows: Berlin, Germany or full address if parsed
  5. Verify job date: April 15, 2026
    - expect: Date is correct: April 15, 2026
  6. Verify shipment type shows Air freight
    - expect: Air freight is indicated in order
    - expect: Shipment type is captured
  7. Verify shipment weight/volume: 324 cubic feet
    - expect: Volume or weight field shows: 324 cubic feet or parsed numeric value
  8. Take screenshot of international shipment details
    - expect: All customer details and shipment info visible

#### 3.4. Notes Section Validation

**File:** `tests/email-intercept-workflow/nova-international/04-notes-section-validation.spec.ts`

**Steps:**
  1. Navigate to Notes/Comments section
    - expect: Notes section is populated
  2. Verify notes contain shipment details: Air freight, 324 cubic feet
    - expect: Shipment specifications are documented in notes
  3. Verify notes show accessorials: origin stairs & destination long carry
    - expect: Both accessorials are mentioned
    - expect: Services are clearly documented
  4. Verify notes show international routing: Mumbai to Berlin
    - expect: Route is documented
    - expect: Countries are mentioned
  5. Verify email timestamp and intercept metadata is present
    - expect: Email send time is recorded
    - expect: Source is documented

#### 3.5. Active Price Validation

**File:** `tests/email-intercept-workflow/nova-international/05-active-price-validation.spec.ts`

**Steps:**
  1. Locate Active Price field in order detail
    - expect: Pricing section is visible
  2. Verify Active Price is not zero and reflects international air freight rates
    - expect: Price is greater than 0.00
    - expect: Price appears reasonable for international shipment
  3. Verify price format is USD or appropriate currency
    - expect: Currency symbol or code is displayed
    - expect: Format is correct
  4. Capture Active Price for PDF comparison
    - expect: Price value is logged
  5. Verify no pricing errors displayed
    - expect: No error indicators or warnings
  6. Take screenshot of pricing section
    - expect: Screenshot shows Active Price clearly

#### 3.6. Edit Rate Modal Validation

**File:** `tests/email-intercept-workflow/nova-international/06-edit-rate-modal.spec.ts`

**Steps:**
  1. Click Edit Rate button
    - expect: Modal opens
    - expect: Current rate is shown
  2. Verify modal rate matches Active Price from order
    - expect: Rate amounts match
    - expect: No discrepancies
  3. Verify modal shows rate breakdown with accessorial charges if applicable
    - expect: Origin stairs charge is shown
    - expect: Destination long carry charge is shown
    - expect: Total calculation is visible
  4. Verify Save and Cancel buttons are functional
    - expect: Both buttons work correctly
  5. Click Cancel to close
    - expect: Modal closes
    - expect: No changes are made
  6. Take screenshot of Edit Rate modal with breakdown
    - expect: Modal showing complete rate and accessorials captured

#### 3.7. Document Existence and PDF Validation

**File:** `tests/email-intercept-workflow/nova-international/07-document-existence-pdf.spec.ts`

**Steps:**
  1. Navigate to Documents section
    - expect: Documents list is visible
    - expect: PDF document is present
  2. Verify PDF quote document exists with valid filename
    - expect: PDF file is listed
    - expect: File size is greater than 0 KB
  3. Verify document is in PDF format
    - expect: File extension is .pdf
    - expect: Document can be accessed
  4. Verify document creation timestamp is recent
    - expect: Created today
    - expect: Timestamp is readable
  5. Take screenshot of documents section
    - expect: Document list is fully visible

#### 3.8. PDF Content Validation

**File:** `tests/email-intercept-workflow/nova-international/08-pdf-content-validation.spec.ts`

**Steps:**
  1. Download and open the PDF
    - expect: PDF opens successfully
    - expect: Content is readable
  2. Verify PDF contains company branding (Nova International or quote2cash)
    - expect: Company identification is visible
    - expect: Professional formatting
  3. Verify PDF shows customer contact: q2cemailagent@gmail.com and +91 98761 23456
    - expect: Email is present
    - expect: International phone is present
  4. Verify PDF displays origin and destination: Mumbai, India and Berlin, Germany
    - expect: Both locations clearly visible
  5. Verify PDF shows shipment type and volume: Air freight, 324 cubic feet
    - expect: All shipment details are present
  6. Verify PDF lists accessorials: origin stairs, destination long carry
    - expect: Both services listed with charges
  7. Verify PDF shows pricing matching Active Price from dashboard
    - expect: Price in PDF matches captured value
  8. Verify PDF includes job date: April 15, 2026
    - expect: Date is correct and properly formatted
  9. Take screenshot of PDF showing international shipment details and pricing
    - expect: All critical information visible in screenshot
