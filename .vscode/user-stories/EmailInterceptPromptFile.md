# Email Intercept Agentic QA Workflow

# Copilot Prompt File - All 3 Clients

---

## WORKFLOW OVERVIEW

This prompt guides the AI agent through a complete email intercept
validation workflow for 3 clients. For each client:

1. Send email via Gmail MCP
2. Login to application and find the auto-created order
3. Validate all customer details, notes, pricing and documents
4. Generate a report and send to Google Chat

---

## GLOBAL RULES

- Never pause between steps or ask for confirmation
- Always proceed automatically to the next step
- Print: STEP [N] COMPLETE - [summary] after each step
- This is NOT MGA workflow - do not follow MGA steps
- Do not create new documents - only validate existing ones
- Do not save any changes in edit rate - only validate
- If order not found wait 30 seconds and refresh dashboard
- Take screenshots at every key step as evidence
- Save all screenshots to: screenshots/email-intercept/

---

## PROJECT PATHS

- Root: C:\Playwright QA
- Workflow MD: C:\Playwright QA\user-stories\email-intercept-workflow.md
- Screenshots: C:\Playwright QA\screenshots\email-intercept\
- Report: C:\Playwright QA\test-results\email-intercept-report.md
- Notify script: C:\Playwright QA\notify-email-intercept.ps1

---

## ====================================================

## CLIENT 1: VAN LINE MOVERS

## ====================================================

### STEP 1 - SEND EMAIL FOR VAN LINE MOVERS

Use Gmail MCP agent to send this exact email:

TO: vanlinemovers@pricingrates.com
FROM: q2cemailagent@gmail.com
SUBJECT: Quote Request - 3 Bedroom Move Tampa FL to Birmingham AL
BODY:
Hello there,

I need to ship my 3-bedroom storage items load from
1908 Bay Street, Tampa, FL 33606, to
507 Highland Ave, Birmingham, AL 35205.

Preferred shipping date is April 3rd.
Please send me a quote and delivery estimate.

You can contact me at q2cemailagent@gmail.com or call 813-555-2002

Thanks,
Test Agent

After sending capture:

- Message ID
- Sent timestamp
- Confirmation email was delivered

Expected Output:

- Email sent successfully to vanlinemovers@pricingrates.com
- Message ID recorded

---

### STEP 2 - LOGIN AND VALIDATE VAN LINE MOVERS

Use Playwright MCP browser to:

1. Navigate to: https://demo.quote2cash.com
2. Login with:
   - Username: vanline_emailagent
   - Password: demo
3. Assert dashboard is visible
4. Take screenshot of dashboard

5. Look at dashboard table for the newly created order/estimate
   - The order was auto-created by the email agent
   - Look for customer with email: q2cemailagent@gmail.com
   - Or phone: 813-555-2002
   - Wait 30 seconds and refresh if not visible
6. Click on that specific order/estimate

7. VALIDATE CUSTOMER DETAILS:
   - Customer email = q2cemailagent@gmail.com [PASS/FAIL]
   - Customer phone = 813-555-2002 [PASS/FAIL]
   - Origin = Tampa, FL / 1908 Bay Street [PASS/FAIL]
   - Destination = Birmingham, AL / 507 Highland Ave [PASS/FAIL]
   - Job Date = April 3rd [PASS/FAIL]
   - Take screenshot of customer details

8. VALIDATE NOTES SECTION:
   - Scroll down to Notes section
   - Click on Notes to expand
   - Verify original email content is present
   - Check email body text matches what was sent
   - Take screenshot of notes section

9. VALIDATE ACTIVE PRICE:
   - Check Active Price is displayed and not zero
   - Capture the active price value
   - Take screenshot of active price

10. VALIDATE EDIT RATE:
    - Click 3-dot menu next to Active Price
    - Click Edit option
    - DO NOT make any changes
    - Check Rate Summary total
    - Verify Rate Summary = Active Price [PASS/FAIL]
    - Click Cancel - do not save anything
    - Take screenshot of rate summary

11. VALIDATE DOCUMENTS:
    - Navigate to Documents section
    - DO NOT click Create New
    - Check if document exists in document table
    - If YES:
      - Click PDF icon
      - Verify PDF opens in new tab
      - Check price in PDF = Active Price [PASS/FAIL]
      - Check company logo present [PASS/FAIL]
      - Take screenshot of PDF
    - If NO:
      - Mark as PENDING
      - Log as observation

Expected Output:

- All validation results recorded as PASS or FAIL
- Screenshots saved to screenshots/email-intercept/vanline/
- Results stored in memory for final report

---

## ====================================================

## CLIENT 2: IRON HAUL AUTO TRANSPORT

## ====================================================

### STEP 3 - SEND EMAIL FOR IRON HAUL AUTO TRANSPORT

Use Gmail MCP agent to send this exact email:

TO: ironhaulautotransport@pricingrates.com
FROM: q2cemailagent@gmail.com
SUBJECT: Auto Transport Quote - 2 Vehicles NJ to OH
BODY:
Hi team,

Can I get another quote for a 2013 Toyota Corolla &
2017 Hyundai Elantra from Somerset, NJ 08873 to
STRONGSVILLE, OH 44136.

Move date May 10th.
You can contact me at q2cemailagent@gmail.com or 7010972074.

Thanks & Regards,
Test Agent

After sending capture:

- Message ID
- Sent timestamp

Expected Output:

- Email sent successfully to ironhaulautotransport@pricingrates.com
- Message ID recorded

---

### STEP 4 - LOGIN AND VALIDATE IRON HAUL AUTO TRANSPORT

Use Playwright MCP browser to:

1. Navigate to: https://demo.quote2cash.com
2. Login with:
   - Username: ironhaul_emailagent
   - Password: demo
3. Assert dashboard is visible
4. Take screenshot of dashboard

5. Look at dashboard table for newly created order/estimate
   - Look for customer with email: q2cemailagent@gmail.com
   - Or phone: 7010972074
   - Wait 30 seconds and refresh if not visible
6. Click on that specific order/estimate

7. VALIDATE CUSTOMER DETAILS:
   - Customer email = q2cemailagent@gmail.com [PASS/FAIL]
   - Customer phone = 7010972074 [PASS/FAIL]
   - Origin = Somerset, NJ 08873 [PASS/FAIL]
   - Destination = Strongsville, OH 44136 [PASS/FAIL]
   - Job Date = May 10th [PASS/FAIL]
   - Vehicle 1 = 2013 Toyota Corolla [PASS/FAIL]
   - Vehicle 2 = 2017 Hyundai Elantra [PASS/FAIL]
   - Take screenshot of customer details

8. VALIDATE NOTES SECTION:
   - Scroll down to Notes section
   - Click on Notes to expand
   - Verify original email content is present
   - Take screenshot of notes section

9. VALIDATE ACTIVE PRICE:
   - Check Active Price is displayed and not zero
   - Capture the active price value
   - Take screenshot of active price

10. VALIDATE EDIT RATE:
    - Click 3-dot menu next to Active Price
    - Click Edit option
    - DO NOT make any changes
    - Check Rate Summary total
    - Verify Rate Summary = Active Price [PASS/FAIL]
    - Click Cancel - do not save anything
    - Take screenshot of rate summary

11. VALIDATE DOCUMENTS:
    - Navigate to Documents section
    - DO NOT click Create New
    - Check if document exists in document table
    - If YES:
      - Click PDF icon
      - Verify PDF opens in new tab
      - Check price in PDF = Active Price [PASS/FAIL]
      - Check company logo present [PASS/FAIL]
      - Take screenshot of PDF
    - If NO:
      - Mark as PENDING
      - Log as observation

Expected Output:

- All validation results recorded as PASS or FAIL
- Screenshots saved to screenshots/email-intercept/ironhaul/
- Results stored in memory for final report

---

## ====================================================

## CLIENT 3: NOVA INTERNATIONAL MOVERS

## ====================================================

### STEP 5 - SEND EMAIL FOR NOVA INTERNATIONAL MOVERS

Use Gmail MCP agent to send this exact email:

TO: novainternational@pricingrates.com
FROM: q2cemailagent@gmail.com
SUBJECT: International Freight Quote - Mumbai to Berlin Air Freight
BODY:
Hello,

Please provide a quote for shipping 324 cubic feet of
household goods from Mumbai, India to Berlin, Germany
via air freight.

Packing and loading should take place on April 15th, 2026.
Please include the following accessorials:
origin stairs & destination long carry.

You can reach me at +91 98761 23456 or q2cemailagent@gmail.com.

Thanks,
Test Agent

After sending capture:

- Message ID
- Sent timestamp

Expected Output:

- Email sent successfully to novainternational@pricingrates.com
- Message ID recorded

---

### STEP 6 - LOGIN AND VALIDATE NOVA INTERNATIONAL MOVERS

Use Playwright MCP browser to:

1. Navigate to: https://demo.quote2cash.com
2. Login with:
   - Username: international_emailagent
   - Password: demo
3. Assert dashboard is visible
4. Take screenshot of dashboard

5. Look at dashboard table for newly created order/estimate
   - Look for customer with email: q2cemailagent@gmail.com
   - Or phone: +91 98761 23456
   - Wait 30 seconds and refresh if not visible
6. Click on that specific order/estimate

7. VALIDATE CUSTOMER DETAILS:
   - Customer email = q2cemailagent@gmail.com [PASS/FAIL]
   - Customer phone = +91 98761 23456 [PASS/FAIL]
   - Origin = Mumbai, India [PASS/FAIL]
   - Destination = Berlin, Germany [PASS/FAIL]
   - Shipment type = Air freight [PASS/FAIL]
   - Volume = 324 cubic feet [PASS/FAIL]
   - Job Date = April 15th 2026 [PASS/FAIL]
   - Accessorials = origin stairs, destination long carry [PASS/FAIL]
   - Take screenshot of customer details

8. VALIDATE NOTES SECTION:
   - Scroll down to Notes section
   - Click on Notes to expand
   - Verify original email content is present
   - Take screenshot of notes section

9. VALIDATE ACTIVE PRICE:
   - Check Active Price is displayed and not zero
   - Capture the active price value
   - Take screenshot of active price

10. VALIDATE EDIT RATE:
    - Click 3-dot menu next to Active Price
    - Click Edit option
    - DO NOT make any changes
    - Check Rate Summary total
    - Verify Rate Summary = Active Price [PASS/FAIL]
    - Click Cancel - do not save anything
    - Take screenshot of rate summary

11. VALIDATE DOCUMENTS:
    - Navigate to Documents section
    - DO NOT click Create New
    - Check if document exists in document table
    - If YES:
      - Click PDF icon
      - Verify PDF opens in new tab
      - Check price in PDF = Active Price [PASS/FAIL]
      - Check company logo present [PASS/FAIL]
      - Take screenshot of PDF
    - If NO:
      - Mark as PENDING
      - Log as observation

Expected Output:

- All validation results recorded as PASS or FAIL
- Screenshots saved to screenshots/email-intercept/nova/
- Results stored in memory for final report

---

## ====================================================

## STEP 7 - GENERATE CONSOLIDATED REPORT

## ====================================================

Compile all results from Steps 1-6 into a report at:
C:\Playwright QA\test-results\email-intercept-report.md

Report must include:

### 1. Executive Summary

- Total validations run
- Total passed
- Total failed
- Total pending
- Overall status: PASS or FAIL

### 2. Results Per Client

#### Van Line Movers

| Validation Check   | Expected                | Actual | Status |
| ------------------ | ----------------------- | ------ | ------ |
| Email sent         | Delivered               |        |        |
| Order in dashboard | Present                 |        |        |
| Customer email     | q2cemailagent@gmail.com |        |        |
| Customer phone     | 813-555-2002            |        |        |
| Origin             | Tampa FL                |        |        |
| Destination        | Birmingham AL           |        |        |
| Notes has email    | Present                 |        |        |
| Active price       | Not zero                |        |        |
| Edit rate = active | Match                   |        |        |
| Document exists    | Present                 |        |        |
| PDF opens          | Opens in tab            |        |        |
| PDF price = active | Match                   |        |        |

#### Iron Haul Auto Transport

| Validation Check   | Expected                | Actual | Status |
| ------------------ | ----------------------- | ------ | ------ |
| Email sent         | Delivered               |        |        |
| Order in dashboard | Present                 |        |        |
| Customer email     | q2cemailagent@gmail.com |        |        |
| Customer phone     | 7010972074              |        |        |
| Origin             | Somerset NJ             |        |        |
| Destination        | Strongsville OH         |        |        |
| Vehicle 1          | Toyota Corolla 2013     |        |        |
| Vehicle 2          | Hyundai Elantra 2017    |        |        |
| Notes has email    | Present                 |        |        |
| Active price       | Not zero                |        |        |
| Edit rate = active | Match                   |        |        |
| Document exists    | Present                 |        |        |
| PDF opens          | Opens in tab            |        |        |
| PDF price = active | Match                   |        |        |

#### Nova International Movers

| Validation Check   | Expected                | Actual | Status |
| ------------------ | ----------------------- | ------ | ------ |
| Email sent         | Delivered               |        |        |
| Order in dashboard | Present                 |        |        |
| Customer email     | q2cemailagent@gmail.com |        |        |
| Customer phone     | +91 98761 23456         |        |        |
| Origin             | Mumbai India            |        |        |
| Destination        | Berlin Germany          |        |        |
| Shipment type      | Air freight             |        |        |
| Volume             | 324 cubic feet          |        |        |
| Accessorials       | Stairs + long carry     |        |        |
| Notes has email    | Present                 |        |        |
| Active price       | Not zero                |        |        |
| Edit rate = active | Match                   |        |        |
| Document exists    | Present                 |        |        |
| PDF opens          | Opens in tab            |        |        |
| PDF price = active | Match                   |        |        |

### 3. Screenshots Evidence

List all screenshots captured with file paths

### 4. Failures and Observations

Any FAIL items with details and screenshot references

### 5. Recommendations

Any issues found or suggestions for improvement

---

## ====================================================

## STEP 8 - NOTIFY GOOGLE CHAT

## ====================================================

After report is generated extract:

- VANLINE_STATUS = PASS or FAIL
- IRONHAUL_STATUS = PASS or FAIL
- NOVA_STATUS = PASS or FAIL
- TOTAL_PASS = number of passed checks
- TOTAL_FAIL = number of failed checks
- OVERALL = PASS or FAIL

Run this command in PowerShell terminal:

powershell -ExecutionPolicy Bypass -File "C:\Playwright QA\notify-email-intercept.ps1" -VanLine "VANLINE_STATUS" -IronHaul "IRONHAUL_STATUS" -Nova "NOVA_STATUS" -TotalPass "TOTAL_PASS" -TotalFail "TOTAL_FAIL" -Overall "OVERALL"

Expected Output:

- Google Chat message sent with all 3 client results
- Full report link included

---

## ====================================================

## STEP 9 - COMMIT TO GIT

## ====================================================

Use GitHub MCP agent to:

1. Stage all files:
   - user-stories/email-intercept-workflow.md
   - test-results/email-intercept-report.md
   - screenshots/email-intercept/

2. Commit with message:
   "test: email intercept validation - [OVERALL STATUS]
   - Van Line Movers: [VANLINE_STATUS]
   - Iron Haul Auto Transport: [IRONHAUL_STATUS]
   - Nova International Movers: [NOVA_STATUS]
   - Total checks passed: [TOTAL_PASS]
   - Total checks failed: [TOTAL_FAIL]"

3. Push to master branch
4. Confirm push successful

Expected Output:

- All artifacts committed and pushed to GitHub
- Commit SHA printed

---

## SINGLE COMBINED TRIGGER PROMPT

I want to run the complete Email Intercept QA validation
for all 3 clients using Gmail MCP and Playwright MCP.

Read the workflow file from:
C:\Playwright QA\user-stories\email-intercept-workflow.md

Then execute all steps in sequence:

STEP 1 - Send email for Van Line Movers via Gmail MCP
STEP 2 - Login to vanline app and validate all details
STEP 3 - Send email for Iron Haul Auto Transport via Gmail MCP
STEP 4 - Login to ironhaul app and validate all details
STEP 5 - Send email for Nova International Movers via Gmail MCP
STEP 6 - Login to nova app and validate all details
STEP 7 - Generate consolidated report for all 3 clients
STEP 8 - Send results to Google Chat via notify script
STEP 9 - Commit all artifacts to GitHub

Important rules:

- Do NOT create new documents - only validate existing
- Do NOT save changes in edit rate - only validate pricing
- Take screenshots at every key validation step
- This is NOT MGA workflow
- Run all 9 steps without stopping

Provide status update after each step completes.
