param(
    [string]$VanLine   = "PENDING",
    [string]$IronHaul  = "PENDING",
    [string]$Nova      = "PENDING",
    [string]$TotalPass = "0",
    [string]$TotalFail = "0",
    [string]$Overall   = "FAIL"
)

$webhookUrl = "https://chat.googleapis.com/v1/spaces/AAQAzNNfZ8Q/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=CRU5uVKwHAnkAqIPjBygCGsMRCsPq3hv6WdCJ6YL0vE"

function StatusIcon($s) {
    if ($s -eq "PASS") { return "[PASS]" } else { return "[FAIL]" }
}

$overallIcon = if ($Overall -eq "PASS") { "[PASS]" } else { "[FAIL]" }

$reportLink = "https://github.com/avinash968/Playwrightautomation/blob/master/test-results/email-intercept-report.md"
$htmlLink   = "https://avinash968.github.io/Playwrightautomation/playwright-report/index.html"

$message = "*Email Intercept QA Report - $overallIcon $Overall*
*App:* demo.quote2cash.com | *Workflow:* Email Intercept Validation

*Client Results*
$(StatusIcon $VanLine)  Van Line Movers            : $VanLine
$(StatusIcon $IronHaul) Iron Haul Auto Transport   : $IronHaul
$(StatusIcon $Nova)     Nova International Movers  : $Nova

*Summary*
*Total Passed:* $TotalPass
*Total Failed:* $TotalFail

*Report Links*
MD Report  : $reportLink
HTML Report: $htmlLink"

$body = @{ text = $message } | ConvertTo-Json
Invoke-RestMethod -Uri $webhookUrl -Method Post -ContentType "application/json" -Body $body
Write-Host "Email intercept notification sent!"
