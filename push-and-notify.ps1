param(
    [string]$Workflow  = "nova-loop",
    [string]$TotalPass = "0",
    [string]$TotalFail = "0",
    [string]$Overall   = "FAIL",
    [string]$Duration  = "N/A",
    [string]$Title     = "QA Report"
)

$webhookUrl = "https://chat.googleapis.com/v1/spaces/AAQAzNNfZ8Q/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=CRU5uVKwHAnkAqIPjBygCGsMRCsPq3hv6WdCJ6YL0vE"
$today      = Get-Date -Format "yyyy-MM-dd"
$icon       = if ($Overall -eq "PASS") { "[PASS]" } else { "[FAIL]" }

Write-Host "Pushing $Workflow report to GitHub..."
Set-Location "C:\Playwright QA"
git add -f "reports/$Workflow/" 2>$null
git commit -m "report: $Workflow $today $Overall" 2>$null
git push origin master 2>$null
Write-Host "Pushed!"

Start-Sleep -Seconds 5

$reportLink = "https://avinash968.github.io/Playwrightautomation/reports/$Workflow/$today/report.html"

$message = "*$Title - $icon $Overall*
*App:* demo.quote2cash.com | *Date:* $today | *Duration:* $Duration

*Passed:* $TotalPass
*Failed:* $TotalFail

*HTML Report (click to open)*
$reportLink"

$body = @{ text = $message } | ConvertTo-Json
Invoke-RestMethod -Uri $webhookUrl -Method Post -ContentType "application/json" -Body $body
Write-Host "Google Chat sent!"
