# Nova International — Email Intercept Automation Loop
# 15 Scenarios — Dynamic Phone Numbers Per Run
# Phone format: 555-MMDD-HHMM-XX (unique per run per scenario)

## GLOBAL RULES
- Never pause between scenarios or ask for confirmation
- Always proceed automatically to the next scenario
- Generate dynamic phone numbers at the START of the run
- Use the generated phone number to find each estimate in dashboard
- Do NOT create new documents — only validate existing
- Do NOT save changes in edit rate — only validate
- Take screenshot at every key step
- After ALL 15 scenarios complete — generate consolidated report
- Print: SCENARIO [N] COMPLETE — [PASS/FAIL] after each one

## APPLICATION CREDENTIALS
- URL:      https://demo.quote2cash.com
- Username: international_emailagent
- Password: demo

## EMAIL DETAILS
- From: q2cemailagent@gmail.com
- To:   novainternational@pricingrates.com

## DYNAMIC PHONE NUMBER GENERATION
At the very start of the run before sending any email:
1. Get current date and time
2. Format as: MMDD-HHMM (e.g. March 20 at 2:30 PM = 0320-1430)
3. Generate 15 phone numbers using this format:
   PHONE_PREFIX = 555-MMDD-HHMM
   Scenario 1  phone = PHONE_PREFIX-01
   Scenario 2  phone = PHONE_PREFIX-02
   Scenario 3  phone = PHONE_PREFIX-03
   ...
   Scenario 15 phone = PHONE_PREFIX-15

Example for a run on March 20 at 2:30 PM:
   Scenario 1  = 555-0320-1430-01
   Scenario 2  = 555-0320-1430-02
   Scenario 15 = 555-0320-1430-15

Store all 15 phone numbers in memory before starting loop.
Use the correct phone number in each email body.
Use the same phone number when searching dashboard.

## SCREENSHOT FOLDER
Save all screenshots to:
screenshots/nova-loop/[MMDD-HHMM]/scenario-[N]/

## THE LOOP — RUN ALL 15 IN SEQUENCE
For EACH scenario from 1 to 15:
1. Pick the pre-generated phone number for this scenario
2. Send the email with that phone number in the body
3. Wait 30 seconds for app to process the email
4. Login to demo.quote2cash.com with international_emailagent / demo
5. Search dashboard for that exact phone number
6. Wait up to 60 seconds and refresh if not found immediately
7. Click on that specific estimate
8. Run all 6 validation checks
9. Log PASS or FAIL for each check
10. Save screenshots to correct scenario folder
11. Move immediately to next scenario

## SCENARIO 1 — Basic Air Freight
Subject: Shipping Quote Needed — Mumbai to Berlin
Body:
Hello,
I need to ship some household items from Mumbai, India
to Berlin, Germany. I am looking for an air freight option
as I need it delivered fairly quickly.
The shipment is about 324 cubic feet and weighs around 850 pounds.
Moving date is April 15th, 2026.
Please send me a quote.
You can reach me at q2cemailagent@gmail.com or [PHONE-01].
Thanks, Test Agent

Validate:
- Phone [PHONE-01] found in dashboard
- Origin: Mumbai India
- Destination: Berlin Germany
- Move date: April 15th 2026
- Notes contains email body
- Active price is set
- Edit rate matches active price
- Documents if present

## SCENARIO 2 — Detailed Air Freight
Subject: Air Freight Quote Request — Singapore to Paris
Body:
Hi there,
I am relocating from Singapore to Paris next month and
would like a detailed air freight quote for my belongings.
Moving from: Singapore. Moving to: Paris, France.
Volume: approximately 180 cubic feet. Weight: around 420 pounds.
Preferred move date: May 1st, 2026.
I need door to door service — pickup from my apartment
and delivery to my new place in Paris.
Contact me at q2cemailagent@gmail.com or [PHONE-02].
Thank you, Test Agent

Validate:
- Phone [PHONE-02] found in dashboard
- Origin: Singapore
- Destination: Paris France
- Move date: May 1st 2026
- Door to door noted
- Active price is set

## SCENARIO 3 — Basic Ocean Freight
Subject: Ocean Freight Quote — Sydney to New York
Body:
Hello,
I need to ship my household goods from Sydney, Australia
to New York, USA by sea freight.
Volume is 900 cubic feet. I would prefer a full container.
Planned shipment date is July 10th, 2026.
Contact: q2cemailagent@gmail.com or [PHONE-03].
Thanks, Test Agent

Validate:
- Phone [PHONE-03] found in dashboard
- Origin: Sydney Australia
- Destination: New York USA
- Ocean freight full container noted
- Active price is set

## SCENARIO 4 — Full Household Ocean FCL
Subject: Full Household Move by Sea — Shanghai to Los Angeles
Body:
Hello Nova International Team,
My family is relocating from Shanghai, China to Los Angeles,
California. We have 4 bedrooms of belongings — about 1200
cubic feet. We need a full container.
Important access details at our Shanghai home:
- Elevator is available
- We have 3 lift vans worth of items
- About 5 crates needed for fragile items
- Shuttle service needed — large trucks cannot access building
- 3 flights of stairs at the pickup location
We need insurance for valuable antique furniture pieces.
Planned move: May 20th, 2026.
Contact: q2cemailagent@gmail.com or [PHONE-04].
Thanks, Test Agent

Validate:
- Phone [PHONE-04] found in dashboard
- Origin: Shanghai China
- Destination: Los Angeles USA
- Full container FCL
- Elevator lift vans crates shuttle stairs noted
- Insurance requested
- Active price is set

## SCENARIO 5 — Ocean LCL Small Shipment
Subject: Small Shipment Quote — Dubai to London by Sea
Body:
Hi,
I am moving from Dubai to London and only have a small
amount of goods — not enough to fill a full container.
Volume is approximately 280 cubic feet, weight around 620 pounds.
Please send me a quote for LCL shared container ocean freight.
Move date: June 5th, 2026.
Contact: q2cemailagent@gmail.com or [PHONE-05].
Thank you, Test Agent

Validate:
- Phone [PHONE-05] found in dashboard
- Origin: Dubai UAE
- Destination: London UK
- LCL shared container noted
- Active price is set

## SCENARIO 6 — Stairs No Elevator Long Carry
Subject: Air Freight Quote — Tokyo to Frankfurt, Access Issues
Body:
Hello,
I need an air freight quote from Tokyo, Japan to Frankfurt, Germany.
Volume: 240 cubic feet, weight about 560 pounds.
I want to flag some important access challenges:
- My building has NO elevator at all
- Items need to be carried down 3 flights of stairs
- Very long corridor from my apartment to street — about 200 feet
- A shuttle vehicle will be needed as trucks cannot park nearby
  (2 shuttle trips required)
Please factor all these access issues into the quote.
Move date: April 28th, 2026.
Contact: q2cemailagent@gmail.com or [PHONE-06].
Thanks, Test Agent

Validate:
- Phone [PHONE-06] found in dashboard
- Origin: Tokyo Japan
- Destination: Frankfurt Germany
- No elevator stairs long carry shuttle noted
- Active price is set

## SCENARIO 7 — Piano and Special Heavy Items
Subject: Ocean Freight — Milan to Melbourne, Grand Piano and Heavy Art
Body:
Hello Nova International Team,
I am relocating from Milan, Italy to Melbourne, Australia and
have some special items requiring professional handling:
- 1 Grand Piano needing specialist piano movers
- 1 Upright Piano
- Large heavy sculptures requiring crane assistance for loading
- 4 custom wooden crates for fragile art pieces
Total volume approximately 1400 cubic feet — full container needed.
I will also need piano and art handling at the Melbourne end.
Comprehensive insurance is essential for these valuable items.
Planned move: June 15th, 2026.
Contact: q2cemailagent@gmail.com or [PHONE-07].
Thank you, Test Agent

Validate:
- Phone [PHONE-07] found in dashboard
- Origin: Milan Italy
- Destination: Melbourne Australia
- Grand piano upright piano crane crates noted
- Insurance requested
- Full container
- Active price is set

## SCENARIO 8 — Storage Needed at Destination
Subject: Air Freight with Storage — Bangkok to Madrid
Body:
Hello,
I need an air freight quote from Bangkok, Thailand to Madrid, Spain.
Volume around 200 cubic feet, weight 460 pounds.
My situation — my new Madrid apartment will not be ready
until 10 days after my goods arrive. I need the shipment
stored at a warehouse near Madrid for approximately 10 days
before final delivery.
Please include storage charges for 10 days and warehouse
handling costs in the quote.
Insurance for my belongings would also be appreciated.
Move date: May 25th, 2026.
Contact: q2cemailagent@gmail.com or [PHONE-08].
Thanks, Test Agent

Validate:
- Phone [PHONE-08] found in dashboard
- Origin: Bangkok Thailand
- Destination: Madrid Spain
- 10 days storage warehouse handling noted
- Insurance requested
- Active price is set

## SCENARIO 9 — High Value Insurance Drop Pickup
Subject: Ocean FCL — Karachi to Rotterdam, High Value Shipment
Body:
Hello,
I need to ship a full container of household goods and antiques
from Karachi, Pakistan to Rotterdam, Netherlands.
Volume: approximately 1100 cubic feet.
My shipment contains high value antiques and art pieces.
I need full comprehensive insurance coverage for everything.
I also need a drop and pickup arrangement at both ends —
I cannot be flexible with timing for a live unload.
Planned shipment: July 20th, 2026.
Contact: q2cemailagent@gmail.com or [PHONE-09].
Thank you, Test Agent

Validate:
- Phone [PHONE-09] found in dashboard
- Origin: Karachi Pakistan
- Destination: Rotterdam Netherlands
- Drop pickup arrangement noted
- High value insurance requested
- Active price is set

## SCENARIO 10 — Remote Pickup Long Distance
Subject: Air Freight Quote — Nairobi to Toronto, Remote Location
Body:
Hello Nova International Team,
I need an air freight quote from Nairobi, Kenya to Toronto, Canada.
Volume: approximately 170 cubic feet, weight 400 pounds.
My pickup location in Nairobi is quite far from the airport —
around 4 to 5 hours drive. Please factor in the long distance
pickup charges into the quote.
At the Toronto end I need full door delivery as I have no
transport arranged.
I also need customs clearance assistance at both the Kenyan
and Canadian ends.
Move date: May 10th, 2026.
Contact: q2cemailagent@gmail.com or [PHONE-10].
Thanks, Test Agent

Validate:
- Phone [PHONE-10] found in dashboard
- Origin: Nairobi Kenya
- Destination: Toronto Canada
- Long distance pickup noted
- Customs clearance both ends
- Active price is set

## SCENARIO 11 — Weekend Delivery No Elevator
Subject: Ocean Freight — Cape Town to Toronto, Weekend Delivery
Body:
Hello,
I need an ocean freight quote from Cape Town, South Africa
to Toronto, Canada. Volume: around 195 cubic feet.
I have a specific requirement — I can only receive delivery
at my Toronto apartment on a Saturday. Please include
weekend delivery charges in the quote.
Also important about my Toronto building:
- No elevator — items must go up 4 flights of stairs
- Truck cannot park close to entrance — quite a long carry
I also have a grand piano that needs specialist movers
at the Toronto delivery end.
Planned move: May 15th, 2026.
Contact: q2cemailagent@gmail.com or [PHONE-11].
Thanks, Test Agent

Validate:
- Phone [PHONE-11] found in dashboard
- Origin: Cape Town South Africa
- Destination: Toronto Canada
- Weekend delivery no elevator stairs long carry noted
- Grand piano at destination
- Active price is set

## SCENARIO 12 — Full Household Air Freight
Subject: Complete Home Relocation by Air — Seoul to Amsterdam
Body:
Hello Nova International Team,
My family is relocating from Seoul, South Korea to Amsterdam,
Netherlands and need complete door to door air freight service.
Volume: approximately 160 cubic feet. Weight: around 380 pounds.
Details about our move:
- Pickup from Seoul apartment — elevator is available
- We have an upright piano needing careful handling
- Some items need crating — about 2 crates
- Shuttle service needed in Seoul as big trucks cannot reach us
- Full customs clearance at Seoul and Amsterdam airports
- Door to door delivery to our new Amsterdam address
Move date: June 1st, 2026.
Contact: q2cemailagent@gmail.com or [PHONE-12].
Thank you, Test Agent

Validate:
- Phone [PHONE-12] found in dashboard
- Origin: Seoul South Korea
- Destination: Amsterdam Netherlands
- Elevator upright piano crates shuttle customs noted
- Active price is set

## SCENARIO 13 — Full Household Ocean LCL
Subject: Full Home Move by Sea — Hong Kong to Hamburg
Body:
Hi there,
Moving entire family from Hong Kong to Hamburg, Germany by sea freight.
Volume: approximately 350 cubic feet. Weight: around 750 pounds.
What we need in the quote:
- Full packing and loading at Hong Kong address
- 2 lift vans needed
- Shared container LCL service is fine for our volume
- Customs clearance at Hong Kong departure port
- Customs clearance and duties at Hamburg arrival port
- Terminal handling at both ports
- Storage at Hamburg if any customs delay
- Door to door delivery to Hamburg address
- Full insurance for all items
Move date: August 5th, 2026.
Contact: q2cemailagent@gmail.com or [PHONE-13].
Thank you, Test Agent

Validate:
- Phone [PHONE-13] found in dashboard
- Origin: Hong Kong China
- Destination: Hamburg Germany
- LCL lift vans customs terminal storage insurance noted
- Active price is set

## SCENARIO 14 — Commercial Goods Shipment
Subject: Commercial Shipment Quote — Mumbai to Chicago
Body:
Hello,
We need a quote for shipping commercial goods by air freight
from Mumbai, India to Chicago, USA.
Volume: 310 cubic feet. Weight: 720 pounds.
This is a commercial shipment and we need:
- All export documentation handled at Mumbai end
- Full customs clearance and import duty processing at Chicago
- Security screening at origin airport
- Inspection if required at either end
- Terminal handling charges at both airports
- Document charges for commercial invoice and packing list
Delivery to our Chicago warehouse from our Mumbai factory.
Planned shipment: April 20th, 2026.
Contact: q2cemailagent@gmail.com or [PHONE-14].
Thanks, Test Agent

Validate:
- Phone [PHONE-14] found in dashboard
- Origin: Mumbai India
- Destination: Chicago USA
- Commercial customs documentation security noted
- Active price is set

## SCENARIO 15 — Urgent All Services Bundled
Subject: Urgent Air Freight Quote Needed — Mumbai to Berlin ASAP
Body:
Hello Nova International Team,
I need an URGENT air freight quote from Mumbai, India to
Berlin, Germany. I have accepted a job offer and must arrive
by April 15th 2026 so I need my belongings shipped as soon
as possible.
Volume: 324 cubic feet. Weight: 850 pounds.
Everything I need included:
- Packing and loading at my Mumbai address
- I have an upright piano needing careful packing — 3 crates needed
- 2 lift vans required
- Shuttle vehicle needed — trucks cannot access my street
- Elevator is available at my Mumbai building
- Full airport handling and customs clearance at both ends
- Door delivery to my Berlin apartment
- Insurance for all my belongings
- 5 days storage in Berlin in case apartment not ready
- Weekend availability as I cannot take weekdays off work
This is time sensitive so please respond urgently.
Contact: q2cemailagent@gmail.com or [PHONE-15].
Thanks, Test Agent

Validate:
- Phone [PHONE-15] found in dashboard
- Origin: Mumbai India
- Destination: Berlin Germany
- All services upright piano crates lift vans shuttle noted
- Customs insurance storage weekend noted
- Active price is set

## VALIDATION CHECKS — SAME FOR ALL 15 SCENARIOS

Check 1 — Find estimate by phone number in dashboard
  Search dashboard for [PHONE-XX]
  Wait up to 60 seconds refreshing if needed
  PASS = found, FAIL = not found after 60 seconds

Check 2 — Customer details match email
  Verify phone number matches exactly
  Verify email = q2cemailagent@gmail.com
  Verify origin matches email
  Verify destination matches email
  Verify move date matches email
  PASS = all match, FAIL = any mismatch

Check 3 — Notes section has email body
  Scroll to Notes section and expand it
  Verify original email text is present
  PASS = present, FAIL = missing or truncated

Check 4 — Active price set
  Check active price displayed and not zero
  Capture price value for comparison
  PASS = price set, FAIL = zero or empty

Check 5 — Edit rate matches active price
  Click 3-dot menu then Edit
  DO NOT make any changes
  Check Rate Summary total
  Verify Rate Summary = Active Price exactly
  Click Cancel — do not save anything
  PASS = match, FAIL = mismatch

Check 6 — Documents
  Go to Documents section
  DO NOT click Create New
  If document exists — click PDF icon
  Verify PDF opens in new tab
  Verify PDF price = Active Price
  Verify company logo present
  PASS = all verified, PENDING = no document yet

## RESULT TRACKING
Track per scenario:
SCENARIO-[N] | PHONE | ORIGIN | DESTINATION | C1 | C2 | C3 | C4 | C5 | C6 | OVERALL

## CONSOLIDATED REPORT
After all 15 complete generate:
test-results/nova-intercept-loop-report.md

Include:
1. Run timestamp and phone prefix used
2. Executive summary — total pass fail pending
3. Per scenario result table
4. Failed scenarios with reason
5. Screenshots list

Then notify Google Chat:
powershell -ExecutionPolicy Bypass -File "C:\Playwright QA\notify-nova-loop.ps1" -TotalPass "X" -TotalFail "X" -TotalPending "X" -FailedList "scenarios that failed" -Overall "PASS or FAIL"

Then commit to GitHub using GitHub MCP.

## SINGLE TRIGGER PROMPT FOR COPILOT

I want to run the Nova International Email Intercept Loop
for all 15 scenarios defined in:
C:\Playwright QA\user-stories\nova-intercept-loop.md

FIRST — generate dynamic phone numbers for this run:
Get current date and time right now.
Format as MMDD-HHMM (month day hour minute).
Create 15 phone numbers:
  PHONE-01 = 555-[MMDD]-[HHMM]-01
  PHONE-02 = 555-[MMDD]-[HHMM]-02
  ...
  PHONE-15 = 555-[MMDD]-[HHMM]-15

Store all 15 phone numbers in memory.
Print all 15 phone numbers before starting.

THEN run all 15 scenarios in sequence:
For each scenario:
1. Replace [PHONE-XX] in email body with the actual generated number
2. Send email via Gmail MCP to novainternational@pricingrates.com
3. Wait 30 seconds for app to process
4. Login to demo.quote2cash.com — international_emailagent / demo
5. Search dashboard for that exact phone number
6. Click on matching estimate
7. Run all 6 validation checks
8. Log PASS or FAIL with screenshot
9. Move immediately to next scenario without stopping

After all 15 done:
- Generate report at test-results/nova-intercept-loop-report.md
- Run notify-nova-loop.ps1 with results
- Commit everything to GitHub master branch

Rules:
- Do NOT create documents
- Do NOT save edit rate changes
- Do NOT stop between scenarios
- Use dynamic phone number to find each estimate
- Run all 15 without any human intervention
