param(
    [string]$Passed        = "0",
    [string]$Failed        = "0",
    [string]$Healed        = "0",
    [string]$PassRate      = "0",
    [string]$Duration      = "0m",
    [string]$BugCount      = "0",
    [string]$BugList       = "None",
    [string]$AuthPass      = "0",
    [string]$AuthTotal     = "0",
    [string]$EstimatePass  = "0",
    [string]$EstimateTotal = "0",
    [string]$RatePass      = "0",
    [string]$RateTotal     = "0",
    [string]$DocsPass      = "0",
    [string]$DocsTotal     = "0",
    [string]$ReportFile    = "mga-quote2cash-test-report.md",
    [string]$CommitSHA     = "master"
)

$webhookUrl = "https://chat.googleapis.com/v1/spaces/AAQAzNNfZ8Q/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=CRU5uVKwHAnkAqIPjBygCGsMRCsPq3hv6WdCJ6YL0vE"

if ([int]$PassRate -eq 100)    { $status = "All Tests Passed" }
elseif ([int]$PassRate -ge 80) { $status = "Some Tests Failed" }
else                           { $status = "QA Failed - Action Needed" }

function SuiteResult($pass, $total) {
    if ($pass -eq $total) { return "[PASS]" } else { return "[FAIL]" }
}

$authResult     = SuiteResult $AuthPass $AuthTotal
$estimateResult = SuiteResult $EstimatePass $EstimateTotal
$rateResult     = SuiteResult $RatePass $RateTotal
$docsResult     = SuiteResult $DocsPass $DocsTotal

$mdReportLink   = "https://github.com/avinash968/Playwrightautomation/blob/$CommitSHA/test-results/$ReportFile"
$htmlReportLink = "https://avinash968.github.io/Playwrightautomation/playwright-report/index.html"

$message = "*SCRUM-101 QA Report - $status*
*App:* dev.quote2cash.app | *Branch:* master | *Duration:* $Duration

*Passed:* $Passed | *Failed:* $Failed | *Healed:* $Healed
*Pass Rate:* $PassRate% | *Bugs Found:* $BugCount

*Test Suite Results*
$authResult Authentication suite      $AuthPass / $AuthTotal passed
$estimateResult Estimate Creation suite   $EstimatePass / $EstimateTotal passed
$rateResult Rate Management suite     $RatePass / $RateTotal passed
$docsResult Document Generation suite $DocsPass / $DocsTotal passed

*Bugs Found*
$BugList

*Full MD Report*
$mdReportLink

*Full HTML Report (Visual)*
$htmlReportLink"

$body = @{ text = $message } | ConvertTo-Json
Invoke-RestMethod -Uri $webhookUrl -Method Post -ContentType "application/json" -Body $body
Write-Host "Sent successfully!"
