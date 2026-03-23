param(
    [string]$TotalPass    = "0",
    [string]$TotalFail    = "0",
    [string]$TotalPending = "0",
    [string]$FailedList   = "None",
    [string]$Overall      = "FAIL"
)

$webhookUrl = "https://chat.googleapis.com/v1/spaces/AAQAzNNfZ8Q/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=CRU5uVKwHAnkAqIPjBygCGsMRCsPq3hv6WdCJ6YL0vE"

$overallIcon = if ($Overall -eq "PASS") { "[PASS]" } else { "[FAIL]" }

$reportLink = "https://github.com/avinash968/Playwrightautomation/blob/master/test-results/nova-intercept-loop-report.md"
$htmlLink   = "https://avinash968.github.io/Playwrightautomation/playwright-report/index.html"

$message = "*Nova International - Email Intercept Loop $overallIcon $Overall*
*App:* demo.quote2cash.com | *Scenarios:* 15

*Results Summary*
Total Passed  : $TotalPass / 15
Total Failed  : $TotalFail / 15
Total Pending : $TotalPending / 15

*Failed Scenarios*
$FailedList

*Report Links*
MD Report  : $reportLink
HTML Report: $htmlLink"

$body = @{ text = $message } | ConvertTo-Json
Invoke-RestMethod -Uri $webhookUrl -Method Post -ContentType "application/json" -Body $body
Write-Host "Nova loop notification sent!"
