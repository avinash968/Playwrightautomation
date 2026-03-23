param(
    [string]$VanLine   = "PENDING",
    [string]$IronHaul  = "PENDING",
    [string]$Nova      = "PENDING",
    [string]$TotalPass = "0",
    [string]$TotalFail = "0",
    [string]$Overall   = "FAIL"
)

$webhookUrl = "https://chat.googleapis.com/v1/spaces/AAQAzNNfZ8Q/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=CRU5uVKwHAnkAqIPjBygCGsMRCsPq3hv6WdCJ6YL0vE"

Write-Host "Pushing latest reports to GitHub..."
Set-Location "C:\Playwright QA"
git add -f "playwright-report/" 2>$null
git add -f "test-results/" 2>$null
git add -f "screenshots/" 2>$null
git commit -m "docs: update reports - Email Intercept $Overall" 2>$null
git push origin master 2>$null
Write-Host "Reports pushed to GitHub!"

Start-Sleep -Seconds 5

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
Write-Host "Google Chat notification sent!"
