# Check robots.txt live headers
$r = Invoke-WebRequest -Uri 'https://rohittravels.com/robots.txt' -UseBasicParsing -TimeoutSec 15
Write-Host "robots.txt Status:" $r.StatusCode -ForegroundColor Green
Write-Host "Content-Type:" $r.Headers['Content-Type']
Write-Host "Cache-Control:" $r.Headers['Cache-Control']
Write-Host "CF-Cache-Status:" $r.Headers['cf-cache-status']
Write-Host "Server:" $r.Headers['server']
Write-Host ""
$preview = $r.Content.Substring(0, 300)
Write-Host "Content Preview:" -ForegroundColor Cyan
Write-Host $preview
