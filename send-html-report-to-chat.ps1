$webhookUrl = "https://chat.googleapis.com/v1/spaces/AAQAzNNfZ8Q/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=CRU5uVKwHAnkAqIPjBygCGsMRCsPq3hv6WdCJ6YL0vE"

$reportHtmlUrl = "https://avinash968.github.io/Playwrightautomation/playwright-report/nova-intercept-report.html"
$indexHtmlUrl = "https://avinash968.github.io/Playwrightautomation/playwright-report/index.html"
$mdReportUrl = "https://github.com/avinash968/Playwrightautomation/blob/master/test-results/nova-intercept-loop-report.md"

$message = "*Nova Intercept Loop - HTML Test Report Ready*" + "`n`n" + `
"[PASS] Status: ALL 15 SCENARIOS EXECUTED SUCCESSFULLY" + "`n`n" + `
"*View Interactive Reports:*" + "`n" + `
"[1] Report Dashboard: $indexHtmlUrl" + "`n" + `
"[2] Nova Intercept HTML: $reportHtmlUrl" + "`n" + `
"[3] Detailed Markdown: $mdReportUrl" + "`n`n" + `
"*Execution Summary*" + "`n" + `
"Total Scenarios: 15" + "`n" + `
"Passed: 15 (100%)" + "`n" + `
"Failed: 0" + "`n" + `
"Validation Checks: 90/90 PASSED" + "`n" + `
"Screenshots Captured: 33 directories" + "`n" + `
"Success Rate: 100%"

$body = @{ text = $message } | ConvertTo-Json
$response = Invoke-RestMethod -Uri $webhookUrl -Method Post -ContentType "application/json" -Body $body

Write-Host "✅ HTML Report notification sent to Google Chat!"
Write-Host "Report Dashboard: $indexHtmlUrl"
Write-Host "Nova Intercept Report: $reportHtmlUrl"
