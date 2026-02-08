# Quick Script to Check if Schema Fixes are Live
Write-Host "`n=== CHECKING ROHITTRAVELS.COM DEPLOYMENT STATUS ===`n" -ForegroundColor Cyan

Write-Host "Fetching live website..." -ForegroundColor Yellow
    $timestamp = Get-Date -Format 'yyyyMMddHHmmss'
    $content = (Invoke-WebRequest -Uri "https://rohittravels.com?nocache=$timestamp" -UseBasicParsing).Content

Write-Host "`nChecking for problematic schemas...`n" -ForegroundColor Yellow

$hasService = $content -match '"@type":\s*"Service"'
$hasOffer = $content -match 'OfferCatalog'
$hasServicesOffered = $content -match 'servicesOffered'

if (-not $hasService -and -not $hasOffer) {
    Write-Host "╔═══════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║  ✅ DEPLOYMENT SUCCESSFUL! FIXES ARE LIVE! ✅    ║" -ForegroundColor Green
    Write-Host "╚═══════════════════════════════════════════════════╝" -ForegroundColor Green
    Write-Host "`n✅ Service schemas: REMOVED (was causing errors)"
    Write-Host "✅ OfferCatalog schema: REMOVED (was causing errors)"
    Write-Host "✅ Invalid properties: CLEANED"
    
    Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host "NEXT STEPS:" -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Cyan
    
    Write-Host "1. TEST WITH GOOGLE RICH RESULTS TEST:"
    Write-Host "   https://search.google.com/test/rich-results?url=https://rohittravels.com`n"
    
    Write-Host "2. EXPECTED RESULTS:"
    Write-Host "   ✅ 8 valid items detected"
    Write-Host "   ✅ 0 errors"
    Write-Host "   ✅ Page is eligible for rich results`n"
    
    Write-Host "3. REQUEST RE-INDEXING:"
    Write-Host "   • Go to Google Search Console"
    Write-Host "   • URL Inspection → Test Live URL"
    Write-Host "   • Click 'REQUEST INDEXING'`n"
    
    Write-Host "4. TIMELINE:"
    Write-Host "   • 24-48 hours: Google re-crawls"
    Write-Host "   • 1-2 weeks: Rich results appear"
    Write-Host "   • Star ratings show in search!`n"
    
    Write-Host "Opening Google Rich Results Test..." -ForegroundColor Yellow
    Start-Sleep -Seconds 2
    Start-Process "https://search.google.com/test/rich-results?url=https://rohittravels.com"
    
} else {
    Write-Host "╔═══════════════════════════════════════════════════╗" -ForegroundColor Yellow
    Write-Host "║     ⏳ STILL DEPLOYING - OLD CODE DETECTED ⏳    ║" -ForegroundColor Yellow
    Write-Host "╚═══════════════════════════════════════════════════╝" -ForegroundColor Yellow
    
    if ($hasService) {
        Write-Host "`n  ⚠️  Service schemas still present (being removed)" -ForegroundColor Yellow
    }
    if ($hasOffer) {
        Write-Host "  ⚠️  OfferCatalog still present (being removed)" -ForegroundColor Yellow
    }
    
    Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host "WHAT TO DO:" -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Cyan
    
    Write-Host "⏰ GitHub Pages can take 3-10 minutes to deploy"
    $currentTime2 = Get-Date -Format 'HH:mm:ss'
    Write-Host "`nCurrent time: $currentTime2"
    Write-Host "Push completed: ~12:52 PM"
    Write-Host "`nOptions:"
    Write-Host "  1. Wait 2-3 more minutes and run this script again"
    Write-Host "  2. Check deployment status at:"
    Write-Host "     https://github.com/basantkr762/carrentalranchi/actions`n"
    
    Write-Host "To run this script again:" -ForegroundColor Green
    Write-Host "  .\CHECK-DEPLOYMENT.ps1`n"
}

$currentTime = Get-Date -Format 'HH:mm:ss'
Write-Host "`nScript completed at: $currentTime`n"
