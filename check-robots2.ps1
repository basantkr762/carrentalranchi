# Deep check - compare what's being served vs what we expect
Write-Host "=== CHECKING WHAT robots.txt IS BEING SERVED ===" -ForegroundColor Cyan
$r = Invoke-WebRequest -Uri 'https://rohittravels.com/robots.txt' -UseBasicParsing -TimeoutSec 15
Write-Host "Full robots.txt content:" -ForegroundColor Yellow
Write-Host $r.Content
Write-Host ""
Write-Host "=== ALL RESPONSE HEADERS ===" -ForegroundColor Cyan
$r.Headers.GetEnumerator() | ForEach-Object { Write-Host "$($_.Key): $($_.Value)" }
