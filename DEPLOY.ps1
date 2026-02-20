# 🚀 QUICK DEPLOYMENT SCRIPT
# Rohit Travels Website - One-Click Deploy

Write-Host "`n🚀 Deploying Rohit Travels Website...`n" -ForegroundColor Cyan

# Check for changes
$status = git status --porcelain
if ([string]::IsNullOrEmpty($status)) {
    Write-Host "✓ No changes to deploy. Already up to date!" -ForegroundColor Green
    exit 0
}

# Show what's changed
Write-Host "📝 Changes to deploy:" -ForegroundColor Yellow
git status --short

# Stage all changes
Write-Host "`n📦 Staging files..." -ForegroundColor Yellow
git add .

# Commit with timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$message = "Update: $timestamp"
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m $message

# Push to deploy
Write-Host "`n🚀 Pushing to GitHub Pages..." -ForegroundColor Yellow
Write-Host "Note: If prompted for password, use your Personal Access Token" -ForegroundColor Cyan
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n╔════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║   ✅ DEPLOYMENT SUCCESSFUL! ✅        ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Green
    
    Write-Host "`n🌐 Your website will be live at:" -ForegroundColor Cyan
    Write-Host "   https://rohittravels.com" -ForegroundColor White
    
    Write-Host "`n⏱️  Deployment time: 1-2 minutes" -ForegroundColor Yellow
    Write-Host "   GitHub Pages is building your site...`n" -ForegroundColor White
    
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Wait 2 minutes for build to complete" -ForegroundColor White
    Write-Host "2. Visit https://rohittravels.com to verify" -ForegroundColor White
    Write-Host "3. Clear browser cache (Ctrl+F5) if you don't see changes" -ForegroundColor White
    Write-Host "4. Check Google Search Console for indexing status`n" -ForegroundColor White
    
    # Optional: Open website after delay
    Write-Host "Opening website in 10 seconds..." -ForegroundColor Yellow
    Start-Sleep -Seconds 10
    Start-Process "https://rohittravels.com"
    
} else {
    Write-Host "`n❌ DEPLOYMENT FAILED!" -ForegroundColor Red
    Write-Host "Error: Authentication required or network issue`n" -ForegroundColor Yellow
    
    Write-Host "Quick Fix:" -ForegroundColor Cyan
    Write-Host "1. Get your GitHub Personal Access Token:" -ForegroundColor White
    Write-Host "   https://github.com/settings/tokens" -ForegroundColor White
    Write-Host "2. Create new token with 'repo' permissions" -ForegroundColor White
    Write-Host "3. Run this script again" -ForegroundColor White
    Write-Host "4. When prompted for password, paste the token`n" -ForegroundColor White
    
    # Open token page
    Start-Process "https://github.com/settings/tokens"
}
