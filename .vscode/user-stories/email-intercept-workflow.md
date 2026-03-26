# Email Intercept Workflow

# Feature: Agentic Email Intercept QA Validation

# 3 Clients: Van Line Movers, Iron Haul Auto Transport, Nova International Movers

---

## OVERVIEW

This workflow validates that when a customer sends an email to the
application inbox, the system automatically creates an estimate/order,
populates customer details, calculates pricing, and generates documents.

---

## GLOBAL RULES

- Never pause between steps
- Always proceed automatically without human intervention
- Print STEP [N] COMPLETE after each step
- This is NOT an MGA client workflow - do not follow MGA steps
- Do not create new documents - only validate existing ones
- Do not make changes in edit rate - only validate pricing

---

## APPLICATION CREDENTIALS

### Client 1 - Van Line Movers

- URL: https://demo.quote2cash.app
- Username: vanline_emailagent
- Password: demo

### Client 2 - Iron Haul Auto Transport

- URL: https://demo.quote2cash.app
- Username: ironhaul_emailagent
- Password: demo

### Client 3 - Nova International Movers

- URL: https://demo.quote2cash.app
- Username: international_emailagent
- Password: demo

---

## EMAIL SENDER

- Gmail Account: q2cemailagent@gmail.com
- Gmail Refresh Token: configured in mcp.json

---

## CLIENT 1: VAN LINE MOVERS

### Email Details

- To: vanlinemovers@pricingrates.com
- From: q2cemailagent@gmail.com
- Subject: Quote Request - 3 Bedroom Move Tampa FL to Birmingham AL

### Email Body

```
Hello there,

I need to ship my 3-bedroom storage items load from
1908 Bay Street, Tampa, FL 33606, to
507 Highland Ave, Birmingham, AL 35205.

Preferred shipping date is April 3rd.
Please send me a quote and delivery estimate.

You can contact me at q2cemailagent@gmail.com or call 813-555-2002

Thanks,
Test Agent
```

### Expected Customer Details in App

- Customer email: q2cemailagent@gmail.com
- Customer phone: 813-555-2002
- Origin: 1908 Bay Street, Tampa, FL 33606
- Destination: 507 Highland Ave, Birmingham, AL 35205
- Job Date: April 3rd

### Validation Checklist

- [ ] Order/Estimate appears in dashboard table
- [ ] Customer name matches email signature
- [ ] Customer email matches: q2cemailagent@gmail.com
- [ ] Customer phone matches: 813-555-2002
- [ ] Notes section contains original email content
- [ ] Origin address matches email
- [ ] Destination address matches email
- [ ] Active price is set
- [ ] Edit rate price matches active price
- [ ] Document exists in document table (do not create new)
- [ ] PDF opens in new tab
- [ ] PDF price matches active price

---

## CLIENT 2: IRON HAUL AUTO TRANSPORT

### Email Details

- To: ironhaulautotransport@pricingrates.com
- From: q2cemailagent@gmail.com
- Subject: Auto Transport Quote - 2 Vehicles NJ to OH

### Email Body

```
Hi team,

Can I get another quote for a 2013 Toyota Corolla &
2017 Hyundai Elantra from Somerset, NJ 08873 to
STRONGSVILLE, OH 44136.

Move date May 10th.
You can contact me at q2cemailagent@gmail.com or 7010972074.

Thanks & Regards,
Test Agent
```

### Expected Customer Details in App

- Customer email: q2cemailagent@gmail.com
- Customer phone: 7010972074
- Origin: Somerset, NJ 08873
- Destination: Strongsville, OH 44136
- Job Date: May 10th
- Vehicles: 2013 Toyota Corolla, 2017 Hyundai Elantra

### Validation Checklist

- [ ] Order/Estimate appears in dashboard table
- [ ] Customer name matches email signature
- [ ] Customer email matches: q2cemailagent@gmail.com
- [ ] Customer phone matches: 7010972074
- [ ] Notes section contains original email content
- [ ] Origin matches: Somerset, NJ 08873
- [ ] Destination matches: Strongsville, OH 44136
- [ ] Vehicle details present (Toyota Corolla, Hyundai Elantra)
- [ ] Active price is set
- [ ] Edit rate price matches active price
- [ ] Document exists in document table (do not create new)
- [ ] PDF opens in new tab
- [ ] PDF price matches active price

---

## CLIENT 3: NOVA INTERNATIONAL MOVERS

### Email Details

- To: novainternational@pricingrates.com
- From: q2cemailagent@gmail.com
- Subject: International Freight Quote - Mumbai to Berlin Air Freight

### Email Body

```
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
```

### Expected Customer Details in App

- Customer email: q2cemailagent@gmail.com
- Customer phone: +91 98761 23456
- Origin: Mumbai, India
- Destination: Berlin, Germany
- Shipment type: Air freight
- Volume: 324 cubic feet
- Job Date: April 15th, 2026
- Accessorials: Origin stairs, Destination long carry

### Validation Checklist

- [ ] Order/Estimate appears in dashboard table
- [ ] Customer name matches email signature
- [ ] Customer email matches: q2cemailagent@gmail.com
- [ ] Customer phone matches: +91 98761 23456
- [ ] Notes section contains original email content
- [ ] Origin matches: Mumbai, India
- [ ] Destination matches: Berlin, Germany
- [ ] Shipment type: Air freight
- [ ] Volume: 324 cubic feet
- [ ] Accessorials present: origin stairs, destination long carry
- [ ] Active price is set
- [ ] Edit rate price matches active price
- [ ] Document exists in document table (do not create new)
- [ ] PDF opens in new tab
- [ ] PDF price matches active price

---

## HAPPY PATH SCENARIO - ALL 3 CLIENTS

### Step 1 - Send Email via Gmail MCP

Use Gmail MCP to send the email template to the client inbox address.
Capture the message ID and timestamp.

### Step 2 - Login to Application

Navigate to demo.quote2cash.com and login with client credentials.
Assert dashboard is visible and loaded correctly.

### Step 3 - Find Order in Dashboard

Look at the dashboard table for the newly created order/estimate.
The order will be created automatically by the email agent.
It will contain the name, email and phone from the email template.
Click on the specific order that matches the sent email.

### Step 4 - Validate Customer Details

On the order/estimate page verify:

- Customer name matches the email signature
- Customer email matches q2cemailagent@gmail.com
- Customer phone matches the number in the email
- Origin address/location matches the email
- Destination address/location matches the email
- Job date matches the date mentioned in the email

### Step 5 - Validate Notes Section

Scroll down to the Notes section on the order page.
Click on Notes to expand it.
Verify the original email content is present in the notes.
The email body text should appear exactly as sent.

### Step 6 - Validate Active Price

Check that an Active Price is displayed on the order page.
The active price must not be zero or empty.
Capture the active price value for comparison.

### Step 7 - Validate Edit Rate Matches Active Price

Click the 3-dot menu next to the Active Price.
Click Edit option.
DO NOT make any changes.
Check the Rate Summary total in the edit section.
Verify the Rate Summary total matches the Active Price exactly.
Click Cancel or close without saving.

### Step 8 - Validate Documents

Navigate to the Documents section on the order page.
DO NOT click Create New Document.
Check if a document already exists in the document table.
If document exists:

- Look for the PDF icon in the document row
- Click the PDF icon
- Document opens in a new browser tab
- In the PDF verify the price matches the Active Price
- Verify company logo is present in the document header
- Check document alignment and layout
  If document does NOT exist:
- Mark as PENDING - document not yet generated
- Log this as an observation

### Step 9 - Capture Results

Take screenshots at every key validation step.
Save screenshots to: screenshots/email-intercept/[client-name]/
Record PASS or FAIL for each checklist item.

---

## VALIDATION SUMMARY TABLE

| Check                    | Van Line Movers | Iron Haul Auto | Nova International |
| ------------------------ | --------------- | -------------- | ------------------ |
| Email sent               |                 |                |                    |
| Order in dashboard       |                 |                |                    |
| Customer details match   |                 |                |                    |
| Notes has email content  |                 |                |                    |
| Active price set         |                 |                |                    |
| Edit rate matches active |                 |                |                    |
| Document exists          |                 |                |                    |
| PDF opens                |                 |                |                    |
| PDF price matches        |                 |                |                    |
| Overall                  |                 |                |                    |

---

## NOTES

- This is NOT MGA client workflow
- Do not create new documents - validate existing only
- Do not save any changes in edit rate section
- Take screenshots as evidence for every validation
- If order not found in dashboard wait 30 seconds and refresh
- All 3 clients use same app URL: demo.quote2cash.com
- Each client has different login credentials
