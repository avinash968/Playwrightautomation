# End-to-End QA Workflow with Natural Language

## Workflow Overview

This prompt guides you through a complete 7-step QA workflow using MCP servers and AI agents to go from user story to committed automated test scripts for the Quote2Cash international shipment estimate and rate management feature. ---

🎯 STEP 1: Read User Story Prompt:
I need to start a new testing workflow.
Please read the user story from the file: user-stories\mgaworkflow.md
Summarize the key requirements, acceptance criteria, and testing scope.

Expected Output:
• Summary of the user story
• List of acceptance criteria (AC1–AC15)
• Application URL and test credentials
• Key modules to be tested: Authentication, Estimate Creation, Moving Info, Rate Management, Document Generation —

📋 STEP 2: Create Test Plan Prompt:
Based on the user story that we just reviewed, use the playwright-test-planner agent to:

1. Read the application URL and test credentials from the user story - URL: https://dev.quote2cash.app - Username: mga | Password: demo
2. Explore the application and understand all workflows mentioned in the acceptance criteria
3. Create a comprehensive test plan that covers all acceptance criteria including: - Happy path scenarios - Negative scenarios (validation errors, empty fields, invalid data) - Edge cases and boundary conditions - Navigation flow tests - UI element validation - Shipment type-specific mandatory field variations (Container, LCL, Air) - Dynamic field visibility tests (Storage, Trip Count, Handyman sub-fields)
4. Save the test plan as: specs/mga-quote2cash-test-plan.md
   Ensure each test scenario includes: - Clear test case title - Detailed step-by-step instructions - Expected results for each step - Test data requirements

Expected Output:
• Complete test plan markdown file saved to specs/
• Organized test scenarios with clear structure
• Browser exploration screenshots (if needed) ---

✏️ STEP 3: Perform Exploratory Testing Prompt:
Now I need to perform manual exploratory testing using Playwright MCP browser tools. Please read the test plan from: specs/mga-quote2cash-test-plan.md
Then execute the test scenarios defined in that plan:

1. Use Playwright browser tools to manually execute each test scenario from the plan
2. Follow the step-by-step instructions in each test case
3. Verify expected results match actual results
4. Take screenshots at key steps and error states: - Dashboard after login - New Estimate form - Moving Info section - Order Detail page - Rate form with each shipment type selected (Container, LCL, Air) - Rate Summary after Calculate - Active Price on Order Detail - Edit Rate and Clone Price flows - Each document type (Estimate, Bill of Lading, Invoice)
5. Document your findings: - Test execution results for each scenario - Any UI inconsistencies or unexpected behaviors - Missing validations or bugs discovered - Screenshots as evidence

Expected Output:
• Manual test execution results
• Screenshots of the application at various states
• List of observations and findings
• Any issues discovered during exploration —

⚙️ STEP 4: Generate Automation Scripts Prompt:
Now I need to create automated test scripts using the playwright-test-generator agent. Please review:

1.  Test plan from: specs/mga-quote2cash-test-plan.md (for test scenarios and steps)
2.  Exploratory testing results from Step 3 (for actual element selectors and UI insights) Using insights from the manual exploratory testing: - Leverage the element selectors and locators that were successfully used in Step 3 - Use stable element properties (IDs, data attributes, roles) discovered during exploration - Apply wait strategies and UI behaviors observed during manual testing - Incorporate any workarounds for UI quirks discovered Generate Playwright JavaScript automation scripts:
3.  Create scripts for each test scenario from the test plan
4.  Organize scripts into appropriate test suite files in: tests/mga-quote2cash/
5.  Use the test case names and steps from the test plan
6.  Use reliable selectors and strategies from exploratory testing Requirements for all scripts: - Follow Playwright best practices - Use Page Object Model (POM) pattern - Include proper assertions using expect() - Use descriptive test names matching the format in the test plan - Use robust element selectors discovered during manual testing - Add comments for complex steps - Use proper wait strategies based on actual application behavior - Add proper test hooks (beforeEach, afterEach) - Store test data in a separate testData.js fixture file - Capture screenshots on failure automatically - Cover all 3 shipment types: Container, LCL, Air - Cover rate actions: Apply, Edit Rate, Clone Price - Cover all 3 document types: Estimate, Bill of Lading, Invoice - Configure for Chrome as primary browser After generating the scripts, run the tests to verify they pass.

Expected Output:
• Playwright test scripts saved in tests/mga-quote2cash/
• Page Object files in tests/mga-quote2cash/pages/
• Test data fixture in tests/mga-quote2cash/fixtures/testData.js
• playwright.config.js configured for the project
• Initial test run results ---
🔧 STEP 5: Execute and Heal Automation Tests Prompt:
Now I need to execute the generated automation scripts and heal any failures using the playwright-test-healer agent.

1. Run all automation scripts in: tests/mga-quote2cash/
2. Identify any failing tests
3. For each failing test, use the playwright-test-healer agent to: - Analyze the failure (selector issues, timing issues, assertion failures) - Auto-heal the test by fixing selectors, adding waits, or adjusting assertions - Update the test script with the fixes
4. Re-run the healed tests to verify they pass
5. Repeat the heal process until all tests are stable and passing (maximum 3 healing attempts per test)
6. If a test cannot be healed after 3 attempts, mark as BUG_CONFIRMED and escalate
7. Document: - Initial test results (pass/fail count) - Healing activities performed - Final test results after healing - Any tests that couldn't be auto-healed Expected Output:
   • All automation tests executed
   • Failing tests identified and healed using test-healer agent
   • Healed test scripts updated in tests/mga-heal-quote2cash/
   • Final stable test execution results
   • Summary of healing activities performed —

📊 STEP 6: Create Test Report Prompt:
Now I need to create a comprehensive test execution report based on manual testing, automation execution, and healing activities.
Please compile results from: - Step 3:
Manual exploratory testing results - Step 4:
Generated automation scripts - Step 5:
Automated test execution and healing results Structure the report as: test-results/mga-quote2cash-test-report.md
Include:

1. Executive Summary - Total test cases planned - Test cases executed (manual + automated) - Overall Pass/Fail/Blocked status - Pass rate percentage

2. Manual Test Results - Results from Step 3 exploratory testing - Screenshots and observations - Issues found during manual testing

3. Automated Test Results - Initial automation results from Step 5 - Healing activities performed - Final test execution results after healing - Test suite execution summary - Pass/Fail count for each test suite:

- Authentication suite
- Estimate Creation suite
- Rate Management suite (Container/LCL/Air)
- Document Generation suite

4. Defects Log - For any failed tests (manual or automated):

- Bug ID
- Severity (Critical/High/Medium/Low)
- Title and Description
- Steps to Reproduce
- Expected vs Actual Behavior
- Screenshots/Evidence
- Environment Details

5. Test Coverage Analysis - Which acceptance criteria (AC1–AC15) are covered - Coverage from manual vs automated tests - Any gaps in test coverage - Recommendations for additional testing

6. Summary and Recommendations - Overall quality assessment - Risk areas - Next steps Expected Output: • Comprehensive test execution report covering both manual and automated testing • Clear PASS/FAIL status for all test scenarios • Detailed bug reports for failures • Complete test coverage analysis against AC1–AC15 • Evidence and screenshots attached ---

STEP 7 - NOTIFY GOOGLE CHAT:
After generating the test report at:
C:\Playwright QA\test-results\mga-quote2cash-test-report.md

Read the report carefully and extract these exact values:

- PASSED = total passed tests (number only)
- FAILED = total failed tests (number only)
- HEALED = total healed tests (number only)
- PASSRATE = pass percentage (number only e.g. 93)
- DURATION = total run time (e.g. 4m22s)
- BUGCOUNT = number of BUG_CONFIRMED items
- BUGLIST = each bug on a new line with severity emoji
  use 🔴 for Critical, 🟡 for High,
  🔵 for Medium, ⚪ for Low
- AUTHPASS = passed count for Authentication suite
- AUTHTOTAL = total count for Authentication suite
- ESTIMATEPASS = passed count for Estimate Creation suite
- ESTIMATETOTAL = total count for Estimate Creation suite
- RATEPASS = passed count for Rate Management suite
- RATETOTAL = total count for Rate Management suite
- DOCSPASS = passed count for Document Generation suite
- DOCSTOTAL = total count for Document Generation suite
- COMMITSHA = the git commit SHA from Step 7 (use main if not available)

Then run this command in PowerShell terminal:

powershell -ExecutionPolicy Bypass -File "C:\Playwright QA\notify-googlechat.ps1" `  -Passed "PASSED"`
-Failed "FAILED" `  -Healed "HEALED"`
-PassRate "PASSRATE" `  -Duration "DURATION"`
-BugCount "BUGCOUNT" `  -BugList "BUGLIST"`
-AuthPass "AUTHPASS" -AuthTotal "AUTHTOTAL" `  -EstimatePass "ESTIMATEPASS" -EstimateTotal "ESTIMATETOTAL"`
-RatePass "RATEPASS" -RateTotal "RATETOTAL" `  -DocsPass "DOCSPASS" -DocsTotal "DOCSTOTAL"`
-ReportFile "mga-quote2cash-test-report.md" `
-CommitSHA "COMMITSHA"

Replace every value in capitals with the actual extracted value.

🚀 STEP 8: Commit to Git Repository Git Repository URL:

https://github.com/avinash968/Playwrightautomation Prompt:

Now I need to commit all the test artifacts to the Git repository using the GitHub MCP agent. Git Repository URL: https://github.com/avinash968/Playwrightautomation

Please perform the following Git operations:

1. Initialize Git repository if not already initialized
2. Stage all files in the workspace (all new and modified files): - user-stories/ - specs/ - tests/ - test-results/ - screenshots/
3. Create a commit with the message: "feat(tests): Add complete test suite for SCRUM-101 quote2cash estimate workflow - Add user story documentation - Add comprehensive test plan with all scenarios - Add test execution report with results - Add automated test scripts for estimate and rate management - Include Container, LCL and Air shipment type tests - Include document generation tests for all 3 document types - Include validation, navigation, and edge case tests Resolves SCRUM-101"
4. Push all changes to the Git repository
5. Provide a summary of what was committed

Expected Output:
• All workspace files committed to Git
• Descriptive commit message following conventional commit format
• Confirmation of successful push to the provided repository
• Summary of changes —

🎬 Complete Workflow Execution Single Combined Prompt (for Full Run):
I want to demonstrate a complete end-to-end QA workflow using natural language and MCP servers.
STEP 1 - READ USER STORY: First, read the user story from: user-stories\mgaworkflow.md Provide a brief summary of what needs to be tested.

STEP 2 - CREATE TEST PLAN: Use the playwright-test-planner agent to create a comprehensive test plan based on the user story. The agent should explore https://dev.quote2cash.app using credentials mga/demo and cover all 15 acceptance criteria. Save it as: specs/mga-quote2cash-test-plan.md

STEP 3 - EXPLORATORY TESTING: Read the test plan from specs/mga-quote2cash-test-plan.md and use Playwright browser tools to manually execute each test scenario. Document findings with screenshots and note any issues discovered.

STEP 4 - GENERATE AUTOMATION SCRIPTS: Review both the test plan (specs/mga-quote2cash-test-plan.md) and exploratory testing results from Step 3. Use the playwright-test-generator agent to create JavaScript automation scripts leveraging the element selectors and insights discovered during manual testing. Save scripts in tests/mga-quote2cash/

STEP 5 - EXECUTE AND HEAL TESTS: Run all automation scripts from tests/mga-quote2cash/ . Use the playwright-test-healer agent to identify and auto-heal any failing tests. Re-run tests until all are stable and passing. Document healing activities.

STEP 6 - CREATE TEST REPORT: Create a comprehensive test execution report at: test-results/mga-quote2cash-test-report.md
Compile results from Step 3 (manual testing), Step 4 (script generation), and Step 5 (execution and healing). Include PASS/FAIL status, healing summary, defects log, and test coverage analysis against all 15 acceptance criteria.

STEP 7 - COMMIT TO GIT: Use the GitHub MCP agent to commit all new files with a descriptive message and push to the repository. Execute this complete workflow and provide status updates after each step.
