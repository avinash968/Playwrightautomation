const fs = require("fs");
const path = require("path");

const today = new Date().toISOString().split("T")[0];

const filePath = path.join(
  "C:",
  "Playwright QA",
  "reports",
  "nova-loop",
  today,
  "results.json"
);

const data = {
  title: "Nova Report",
  app: "demo.quote2cash.com",
  workflow: "Email Intercept",
  duration: "10m",
  scenarios: [
    {
      scenario: "Test Scenario 1",
      checks: {
        login: { status: "PASS" },
        email: { status: "PASS" }
      }
    }
  ]
};

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

console.log("✅ Clean JSON written:", filePath);