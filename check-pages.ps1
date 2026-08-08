$urls = @(
    "https://rohittravels.com/cities/ranchi/",
    "https://rohittravels.com/cities/ranchi/index.html",
    "https://rohittravels.com/routes/ranchi-airport-taxi/",
    "https://rohittravels.com/cities/",
    "https://rohittravels.com/routes/"
)
foreach ($url in $urls) {
    try {
        $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10
        Write-Host "[OK $($r.StatusCode)] $url" -ForegroundColor Green
    } catch {
        Write-Host "[FAIL] $url - $($_.Exception.Message)" -ForegroundColor Red
    }
}
