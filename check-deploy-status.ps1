# Cloudflare Cache Purge for robots.txt
# Account ID from URL: d6cd7a515bcdabd4aa173643fe51b405
# We need the Zone ID for rohittravels.com

$accountId = "d6cd7a515bcdabd4aa173643fe51b405"

Write-Host "=== Cloudflare Cache Purge Guide ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your Cloudflare Dashboard is open. Please do this NOW:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. In your Cloudflare tab (rohittravels.com overview)" -ForegroundColor White
Write-Host "   LEFT SIDEBAR -> Caching -> Configuration" -ForegroundColor Green
Write-Host "   Click 'Purge Everything' -> Confirm" -ForegroundColor Green
Write-Host ""
Write-Host "2. OR purge just robots.txt:" -ForegroundColor White
Write-Host "   Caching -> Configuration -> Custom Purge" -ForegroundColor Green
Write-Host "   Enter: https://rohittravels.com/robots.txt" -ForegroundColor Green
Write-Host "   Click Purge" -ForegroundColor Green
Write-Host ""
Write-Host "After purge, wait 30 seconds then check:" -ForegroundColor Yellow
$r = Invoke-WebRequest -Uri 'https://rohittravels.com/robots.txt' -UseBasicParsing -TimeoutSec 10
$lines = ($r.Content -split "`n").Count
Write-Host "Current robots.txt lines: $lines (should be ~115 after new deploy)" -ForegroundColor Cyan
if ($lines -lt 120) {
    Write-Host "✅ NEW version deployed! (no Crawl-delay lines)" -ForegroundColor Green
} else {
    Write-Host "⏳ Still serving OLD version - need cache purge" -ForegroundColor Yellow
}
