Write-Host "=== CHECKING _redirects RULES ===" -ForegroundColor Cyan

$redirectTests = @(
    @{from="https://rohittravels.com/ranchi-cab"; expected="routes/ranchi-local-taxi"},
    @{from="https://rohittravels.com/airport-taxi"; expected="routes/ranchi-airport"},
    @{from="https://rohittravels.com/outstation"; expected="routes/"},
    @{from="https://rohittravels.com/city-taxi"; expected="cities/"}
)

foreach ($test in $redirectTests) {
    try {
        $r = Invoke-WebRequest -Uri $test.from -UseBasicParsing -TimeoutSec 10 -MaximumRedirection 5
        Write-Host "[OK $($r.StatusCode)] $($test.from) -> $($r.BaseResponse.ResponseUri)" -ForegroundColor Green
    } catch {
        Write-Host "[INFO] $($test.from) - $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

Write-Host "`n=== SAMPLE ROUTE PAGES ===" -ForegroundColor Cyan
$routePages = @(
    "https://rohittravels.com/routes/ranchi-to-patna-cab.html",
    "https://rohittravels.com/routes/ranchi-to-kolkata-cab.html",
    "https://rohittravels.com/routes/ranchi-to-delhi-cab.html",
    "https://rohittravels.com/routes/index.html",
    "https://rohittravels.com/cities/index.html"
)
foreach ($url in $routePages) {
    try {
        $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10
        Write-Host "[OK $($r.StatusCode)] $url" -ForegroundColor Green
    } catch {
        Write-Host "[FAIL] $url" -ForegroundColor Red
    }
}
