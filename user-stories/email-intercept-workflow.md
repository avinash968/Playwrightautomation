# Email Intercept Workflow
# Feature: Agentic Email Intercept QA Validation
# 3 Clients: Van Line Movers, Iron Haul Auto Transport, Nova International Movers

## OVERVIEW
This workflow validates that when a customer sends an email to the
application inbox, the system automatically creates an estimate/order,
populates customer details, calculates pricing, and generates documents.

## GLOBAL RULES
- Never pause between steps
- Always proceed automatically without human intervention
- This is NOT an MGA client workflow
- Do not create new documents - only validate existing ones
- Do not make changes in edit rate - only validate pricing
- Take screenshots at every key step

## APPLICATION CREDENTIALS

### Client 1 - Van Line Movers
- URL:      https://demo.quote2cash.com
- Username: vanline_emailagent
- Password: demo

### Client 2 - Iron Haul Auto Transport
- URL:      https://demo.quote2cash.com
- Username: ironhaul_emailagent
- Password: demo

### Client 3 - Nova International Movers
- URL:      https://demo.quote2cash.com
- Username: international_emailagent
- Password: demo

## EMAIL SENDER
- Gmail Account: q2cemailagent@gmail.com

## CLIENT 1: VAN LINE MOVERS
- To:      vanlinemovers@pricingrates.com
- Subject: Quote Request - 3 Bedroom Move Tampa FL to Birmingham AL
- Body:
  Hello there,
  I need to ship my 3-bedroom storage items load from
  1908 Bay Street, Tampa, FL 33606, to
  507 Highland Ave, Birmingham, AL 35205.
  Preferred shipping date is April 3rd.
  You can contact me at q2cemailagent@gmail.com or call 813-555-2002
  Thanks, Test Agent

- Expected customer email: q2cemailagent@gmail.com
- Expected customer phone: 813-555-2002
- Expected origin:         Tampa FL 33606
- Expected destination:    Birmingham AL 35205
- Expected job date:       April 3rd

## CLIENT 2: IRON HAUL AUTO TRANSPORT
- To:      ironhaulautotransport@pricingrates.com
- Subject: Auto Transport Quote - 2 Vehicles NJ to OH
- Body:
  Hi team,
  Can I get another quote for a 2013 Toyota Corolla and
  2017 Hyundai Elantra from Somerset, NJ 08873 to
  STRONGSVILLE, OH 44136.
  Move date May 10th.
  You can contact me at q2cemailagent@gmail.com or 7010972074.
  Thanks and Regards, Test Agent

- Expected customer email: q2cemailagent@gmail.com
- Expected customer phone: 7010972074
- Expected origin:         Somerset NJ 08873
- Expected destination:    Strongsville OH 44136
- Expected job date:       May 10th
- Expected vehicles:       2013 Toyota Corolla, 2017 Hyundai Elantra

## CLIENT 3: NOVA INTERNATIONAL MOVERS
- To:      novainternational@pricingrates.com
- Subject: International Freight Quote - Mumbai to Berlin Air Freight
- Body:
  Hello,
  Please provide a quote for shipping 324 cubic feet of
  household goods from Mumbai, India to Berlin, Germany via air freight.
  Packing and loading should take place on April 15th, 2026.
  Please include accessorials: origin stairs and destination long carry.
  You can reach me at +91 98761 23456 or q2cemailagent@gmail.com.
  Thanks, Test Agent

- Expected customer email: q2cemailagent@gmail.com
- Expected customer phone: +91 98761 23456
- Expected origin:         Mumbai India
- Expected destination:    Berlin Germany
- Expected shipment type:  Air freight
- Expected volume:         324 cubic feet
- Expected job date:       April 15th 2026
- Expected accessorials:   origin stairs, destination long carry

## HAPPY PATH SCENARIO - ALL 3 CLIENTS

Step 1 - Send email via Gmail MCP to client inbox
Step 2 - Navigate to demo.quote2cash.com and login with client credentials
Step 3 - Assert dashboard is visible
Step 4 - Find auto-created order in dashboard table
         Look for customer email q2cemailagent@gmail.com or phone number
         Wait 30 seconds and refresh if not visible
         Click on the specific order
Step 5 - Validate customer details match email template
         Check name, email, phone, origin, destination, job date
Step 6 - Scroll down to Notes section and click on it
         Verify original email content is present in notes
Step 7 - Check Active Price is set and not zero
         Capture active price value
Step 8 - Click 3-dot menu next to Active Price
         Click Edit option
         DO NOT make any changes
         Verify Rate Summary matches Active Price
         Click Cancel - do not save
Step 9 - Navigate to Documents section
         DO NOT click Create New
         If document exists click PDF icon
         Verify PDF opens in new tab
         Verify PDF price matches Active Price
         Verify company logo is present

## NOTES
- This is NOT MGA client workflow
- Do not create new documents
- Do not save any changes in edit rate
- All 3 clients use same URL: demo.quote2cash.com
- Each client has different login credentials
