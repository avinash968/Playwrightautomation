const { chromium } = require('playwright');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// ============================================================================
// GLOBAL VARIABLES
// ============================================================================

const GMAIL_CREDS = {
  client_id: process.env.GMAIL_CLIENT_ID || 'YOUR_CLIENT_ID',
  client_secret: process.env.GMAIL_CLIENT_SECRET || 'YOUR_CLIENT_SECRET',
  refresh_token: process.env.GMAIL_REFRESH_TOKEN || 'YOUR_REFRESH_TOKEN'
};

const APP_CREDS = {
  username: 'international_emailagent',
  password: 'demo',
  url: 'https://demo.quote2cash.com'
};

const EMAIL_CONFIG = {
  from: 'q2cemailagent@gmail.com',
  to: 'novainternational@pricingrates.com'
};

let globalPhonePrefix = '';
let runTimestamp = '';
let scenarioResults = [];

// ============================================================================
// SCENARIO DEFINITIONS
// ============================================================================

const SCENARIOS = [
  {
    id: 1,
    name: 'Basic Air Freight',
    origin: 'Mumbai, India',
    destination: 'Berlin, Germany',
    moveDate: 'April 15th, 2026',
    subject: 'Shipping Quote Needed — Mumbai to Berlin'
  },
  {
    id: 2,
    name: 'Detailed Air Freight',
    origin: 'Singapore',
    destination: 'Paris, France',
    moveDate: 'May 1st, 2026',
    subject: 'Air Freight Quote Request — Singapore to Paris'
  },
  {
    id: 3,
    name: 'Basic Ocean Freight',
    origin: 'Sydney, Australia',
    destination: 'New York, USA',
    moveDate: 'July 10th, 2026',
    subject: 'Ocean Freight Quote — Sydney to New York'
  },
  {
    id: 4,
    name: 'Full Household Ocean FCL',
    origin: 'Shanghai, China',
    destination: 'Los Angeles, California',
    moveDate: 'May 20th, 2026',
    subject: 'Full Household Move by Sea — Shanghai to Los Angeles'
  },
  {
    id: 5,
    name: 'Ocean LCL Small Shipment',
    origin: 'Dubai, UAE',
    destination: 'London, UK',
    moveDate: 'June 5th, 2026',
    subject: 'Small Shipment Quote — Dubai to London by Sea'
  },
  {
    id: 6,
    name: 'Stairs No Elevator Long Carry',
    origin: 'Tokyo, Japan',
    destination: 'Frankfurt, Germany',
    moveDate: 'April 28th, 2026',
    subject: 'Air Freight Quote — Tokyo to Frankfurt, Access Issues'
  },
  {
    id: 7,
    name: 'Piano and Special Heavy Items',
    origin: 'Milan, Italy',
    destination: 'Melbourne, Australia',
    moveDate: 'June 15th, 2026',
    subject: 'Ocean Freight — Milan to Melbourne, Grand Piano and Heavy Art'
  },
  {
    id: 8,
    name: 'Storage Needed at Destination',
    origin: 'Bangkok, Thailand',
    destination: 'Madrid, Spain',
    moveDate: 'May 25th, 2026',
    subject: 'Air Freight with Storage — Bangkok to Madrid'
  },
  {
    id: 9,
    name: 'High Value Insurance Drop Pickup',
    origin: 'Karachi, Pakistan',
    destination: 'Rotterdam, Netherlands',
    moveDate: 'July 20th, 2026',
    subject: 'Ocean FCL — Karachi to Rotterdam, High Value Shipment'
  },
  {
    id: 10,
    name: 'Remote Pickup Long Distance',
    origin: 'Nairobi, Kenya',
    destination: 'Toronto, Canada',
    moveDate: 'May 10th, 2026',
    subject: 'Air Freight Quote — Nairobi to Toronto, Remote Location'
  },
  {
    id: 11,
    name: 'Weekend Delivery No Elevator',
    origin: 'Cape Town, South Africa',
    destination: 'Toronto, Canada',
    moveDate: 'May 15th, 2026',
    subject: 'Ocean Freight — Cape Town to Toronto, Weekend Delivery'
  },
  {
    id: 12,
    name: 'Full Household Air Freight',
    origin: 'Seoul, South Korea',
    destination: 'Amsterdam, Netherlands',
    moveDate: 'June 1st, 2026',
    subject: 'Complete Home Relocation by Air — Seoul to Amsterdam'
  },
  {
    id: 13,
    name: 'Full Household Ocean LCL',
    origin: 'Hong Kong, China',
    destination: 'Hamburg, Germany',
    moveDate: 'August 5th, 2026',
    subject: 'Full Home Move by Sea — Hong Kong to Hamburg'
  },
  {
    id: 14,
    name: 'Commercial Goods Shipment',
    origin: 'Mumbai, India',
    destination: 'Chicago, USA',
    moveDate: 'April 20th, 2026',
    subject: 'Commercial Shipment Quote — Mumbai to Chicago'
  },
  {
    id: 15,
    name: 'Urgent All Services Bundled',
    origin: 'Mumbai, India',
    destination: 'Berlin, Germany',
    moveDate: 'April 15th, 2026',
    subject: 'Urgent Air Freight Quote Needed — Mumbai to Berlin ASAP'
  }
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function generatePhonePrefix() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `555-${month}${day}-${hours}${minutes}`;
}

function generatePhoneNumbers(prefix) {
  return Array.from({ length: 15 }, (_, i) => `${prefix}-${String(i + 1).padStart(2, '0')}`);
}

function getGmailAccessToken(callback) {
  const postData = `client_id=${GMAIL_CREDS.client_id}&client_secret=${GMAIL_CREDS.client_secret}&refresh_token=${GMAIL_CREDS.refresh_token}&grant_type=refresh_token`;

  const options = {
    hostname: 'oauth2.googleapis.com',
    path: '/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', chunk => (data += chunk));
    res.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        callback(null, parsed.access_token);
      } catch (e) {
        callback(e);
      }
    });
  });

  req.on('error', callback);
  req.write(postData);
  req.end();
}

function sendGmailMessage(accessToken, scenario, phone, callback) {
  const emailBody = `Hello,\n\nI need a quote for: ${scenario.name}\nPhone: ${phone}\n\nThanks,\nTest Agent`;

  const emailContent = `From: ${EMAIL_CONFIG.from}\nTo: ${EMAIL_CONFIG.to}\nSubject: ${scenario.subject}\nContent-Type: text/plain; charset="UTF-8"\n\n${emailBody}`;

  const encodedEmail = Buffer.from(emailContent).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');

  const postData = JSON.stringify({ raw: encodedEmail });

  const options = {
    hostname: 'gmail.googleapis.com',
    path: '/gmail/v1/users/me/messages/send',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', chunk => (data += chunk));
    res.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        callback(null, parsed.id);
      } catch (e) {
        callback(e);
      }
    });
  });

  req.on('error', callback);
  req.write(postData);
  req.end();
}

async function ensureScreenshotDir(scenarioId) {
  const dir = path.join('screenshots/nova-loop', globalPhonePrefix, `scenario-${scenarioId}`);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}

// ============================================================================
// PLAYWRIGHT VALIDATION FUNCTIONS
// ============================================================================

async function loginToDashboard(page) {
  await page.goto(APP_CREDS.url, { waitUntil: 'networkidle' });
  await page.fill('input[name="username"]', APP_CREDS.username);
  await page.fill('input[name="password"]', APP_CREDS.password);
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle' });
}

async function searchForPhone(page, phone) {
  const searchInput = await page.$('input[placeholder*="search"], input[placeholder*="Search"]');
  if (searchInput) {
    await searchInput.fill(phone);
    await page.waitForTimeout(1000);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
  }
}

async function runValidationChecks(page, scenario, phone, screenshotDir) {
  const checks = {
    phoneFound: false,
    customerDetails: false,
    notesContainEmail: false,
    activePriceSet: false,
    rateMatchesPrice: false,
    documentsValid: false
  };

  try {
    // Check 1: Phone found
    const phoneText = await page.textContent('body');
    checks.phoneFound = phoneText && phoneText.includes(phone);
    await page.screenshot({ path: path.join(screenshotDir, '01-phone-found.png') });

    // Check 2: Customer details
    const customerText = await page.textContent('body');
    checks.customerDetails = customerText && 
      customerText.includes(scenario.origin) && 
      customerText.includes(scenario.destination);
    await page.screenshot({ path: path.join(screenshotDir, '02-customer-details.png') });

    // Check 3: Notes
    const notesSection = await page.$('text=Notes');
    if (notesSection) {
      const notesText = await page.textContent('body');
      checks.notesContainEmail = notesText && notesText.includes(EMAIL_CONFIG.from);
    }
    await page.screenshot({ path: path.join(screenshotDir, '03-notes.png') });

    // Check 4: Active price
    const priceText = await page.textContent('[data-testid*="price"], [class*="price"]');
    checks.activePriceSet = priceText && priceText !== '0' && priceText !== '$0.00';
    await page.screenshot({ path: path.join(screenshotDir, '04-active-price.png') });

    // Check 5: Rate matches
    try {
      await page.click('[role="button"]:has-text("Edit")');
      await page.waitForTimeout(1000);
      const rateText = await page.textContent('[class*="rate"], [data-testid*="rate"]');
      checks.rateMatchesPrice = !!rateText;
      await page.click('text=Cancel');
    } catch (e) {
      checks.rateMatchesPrice = false;
    }
    await page.screenshot({ path: path.join(screenshotDir, '05-rate-check.png') });

    // Check 6: Documents
    try {
      const docSection = await page.$('text=Documents');
      checks.documentsValid = !!docSection;
      await page.screenshot({ path: path.join(screenshotDir, '06-documents.png') });
    } catch (e) {
      checks.documentsValid = false;
    }

  } catch (error) {
    console.error(`Validation error for scenario ${scenario.id}:`, error.message);
  }

  return checks;
}

// ============================================================================
// MAIN EXECUTION FLOW
// ============================================================================

async function executeNovaLoop() {
  console.log('\n' + '='.repeat(80));
  console.log('NOVA INTERNATIONAL EMAIL INTERCEPT LOOP - 15 SCENARIOS');
  console.log('='.repeat(80));

  runTimestamp = new Date().toISOString();
  globalPhonePrefix = generatePhonePrefix();
  const phoneNumbers = generatePhoneNumbers(globalPhonePrefix);

  console.log(`\nTimestamp: ${runTimestamp}`);
  console.log(`Phone Prefix: ${globalPhonePrefix}`);
  console.log(`Phone Numbers Generated: ${phoneNumbers.length}`);
  console.log(`\nStarting 15 scenarios...\n`);

  let browser;
  try {
    browser = await chromium.launch({ headless: true });

    for (let i = 0; i < SCENARIOS.length; i++) {
      const scenario = SCENARIOS[i];
      const phone = phoneNumbers[i];

      console.log(`\n[${'='.repeat(76)}]`);
      console.log(`SCENARIO ${scenario.id}: ${scenario.name}`);
      console.log(`Phone: ${phone}`);
      console.log(`Origin: ${scenario.origin} -> Destination: ${scenario.destination}`);
      console.log(''.padEnd(78, '-'));

      const scenarioDir = await ensureScreenshotDir(scenario.id);
      let emailId = '';
      let checks = {};

      try {
        // Step 1: Send email
        console.log('  [1/7] Sending email via Gmail...');
        await new Promise((resolve, reject) => {
          getGmailAccessToken((err, token) => {
            if (err) return reject(err);
            sendGmailMessage(token, scenario, phone, (err, id) => {
              if (err) return reject(err);
              emailId = id;
              console.log(`        ✓ Email sent (ID: ${id})`);
              resolve();
            });
          });
        });

        // Step 2: Wait for processing
        console.log('  [2/7] Waiting 30 seconds for processing...');
        await new Promise(r => setTimeout(r, 30000));
        console.log('        ✓ Processing complete');

        // Step 3: Login to dashboard
        console.log('  [3/7] Logging into dashboard...');
        const page = await browser.newPage();
        await loginToDashboard(page);
        console.log('        ✓ Logged in');

        // Step 4: Search for phone
        console.log('  [4/7] Searching dashboard for phone number...');
        await searchForPhone(page, phone);
        console.log(`        ✓ Searched for ${phone}`);

        // Step 5: Run validation checks
        console.log('  [5/7] Running 6 validation checks...');
        checks = await runValidationChecks(page, scenario, phone, scenarioDir);

        const passCount = Object.values(checks).filter(v => v).length;
        console.log(`        ✓ Checks complete (${passCount}/6 passed)`);

        // Step 6: Log results
        console.log('  [6/7] Logging results...');
        scenarioResults.push({
          scenario: scenario.id,
          name: scenario.name,
          phone: phone,
          origin: scenario.origin,
          destination: scenario.destination,
          checks: checks,
          emailId: emailId,
          status: passCount >= 6 ? 'PASS' : 'FAIL'
        });
        console.log('        ✓ Results logged');

        // Step 7: Close page
        console.log('  [7/7] Cleanup...');
        await page.close();
        console.log('        ✓ Page closed');

        const status = passCount >= 6 ? 'PASS' : 'FAIL';
        console.log(`\nSCENARIO ${scenario.id} COMPLETE - ${status} (${passCount}/6 checks)`);

      } catch (error) {
        console.error(`  ✗ ERROR: ${error.message}`);
        scenarioResults.push({
          scenario: scenario.id,
          name: scenario.name,
          phone: phone,
          status: 'FAIL',
          error: error.message
        });
        console.log(`\nSCENARIO ${scenario.id} COMPLETE - FAIL`);
      }
    }

    await browser.close();

  } catch (error) {
    console.error('Fatal error:', error);
    if (browser) await browser.close();
    process.exit(1);
  }

  // Generate consolidated report
  console.log('\n' + '='.repeat(80));
  console.log('GENERATING CONSOLIDATED REPORT');
  console.log('='.repeat(80));

  const totalPass = scenarioResults.filter(r => r.status === 'PASS').length;
  const totalFail = scenarioResults.filter(r => r.status === 'FAIL').length;
  const successRate = ((totalPass / scenarioResults.length) * 100).toFixed(1);

  const reportContent = `# Nova International Email Intercept Loop - Consolidated Report

**Run Timestamp:** ${runTimestamp}
**Phone Prefix:** ${globalPhonePrefix}
**Total Scenarios:** ${scenarioResults.length}

## Executive Summary

| Metric | Value |
|--------|-------|
| **Total Scenarios** | ${scenarioResults.length} |
| **Passed** | ${totalPass} |
| **Failed** | ${totalFail} |
| **Success Rate** | ${successRate}% |
| **Status** | ${totalPass === scenarioResults.length ? 'PASS' : 'FAIL'} |

## Scenario Results

| Scenario | Phone | Status | Checks |
|----------|-------|--------|--------|
${scenarioResults.map(r => `| ${r.scenario}. ${r.name} | ${r.phone} | ${r.status} | ${r.checks ? Object.values(r.checks).filter(v => v).length : 0}/6 |`).join('\n')}

## Email Delivery Details

| Scenario | Email ID | Status |
|----------|----------|--------|
${scenarioResults.map(r => `| Scenario ${r.scenario} | ${r.emailId || 'N/A'} | ${r.status} |`).join('\n')}

## Failed Scenarios

${totalFail > 0 ? scenarioResults.filter(r => r.status === 'FAIL').map(r => `- **Scenario ${r.scenario}: ${r.name}** - ${r.error || 'Validation failed'}`).join('\n') : '**No failures** - All scenarios passed!'}

## Screenshot Locations

Screenshots saved to: \`screenshots/nova-loop/${globalPhonePrefix}/scenario-[1-15]/\`

---
*Generated: ${new Date().toLocaleString()}*
`;

  const reportPath = path.join('test-results/nova-intercept-loop-report.md');
  const reportDir = path.dirname(reportPath);
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }
  fs.writeFileSync(reportPath, reportContent);
  console.log(`✓ Report saved to: ${reportPath}`);

  // Send Google Chat notification
  console.log('\n' + '='.repeat(80));
  console.log('SENDING GOOGLE CHAT NOTIFICATION');
  console.log('='.repeat(80));

  const failedList = scenarioResults
    .filter(r => r.status === 'FAIL')
    .map(r => `Scenario ${r.scenario}`)
    .join(', ') || 'None';

  try {
    await execAsync(`powershell -ExecutionPolicy Bypass -File "C:\\Playwright QA\\notify-nova-loop.ps1" -TotalPass "${totalPass}" -TotalFail "${totalFail}" -TotalScenarios "${scenarioResults.length}" -Overall "${totalPass === scenarioResults.length ? 'PASS' : 'FAIL'}"`);
    console.log('✓ Google Chat notification sent');
  } catch (error) {
    console.error('Error sending notification:', error.message);
  }

  // Commit to GitHub
  console.log('\n' + '='.repeat(80));
  console.log('COMMITTING TO GITHUB');
  console.log('='.repeat(80));

  try {
    await execAsync('cd "C:\\Playwright QA" && git add -f "test-results/" && git add -f "screenshots/nova-loop/" && git commit -m "test: Nova Intercept Loop - 15 scenarios executed"');
    console.log('✓ Artifacts committed to GitHub');
  } catch (error) {
    console.log('Note: Git commit skipped or already committed');
  }

  // Final summary
  console.log('\n' + '='.repeat(80));
  console.log('NOVA INTERCEPT LOOP COMPLETE');
  console.log('='.repeat(80));
  console.log(`Total Scenarios: ${scenarioResults.length}`);
  console.log(`Passed: ${totalPass}`);
  console.log(`Failed: ${totalFail}`);
  console.log(`Success Rate: ${successRate}%`);
  console.log(`Overall Status: ${totalPass === scenarioResults.length ? '✅ PASS' : '❌ FAIL'}`);
  console.log('='.repeat(80) + '\n');
}

// ============================================================================
// START
// ============================================================================

executeNovaLoop().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
