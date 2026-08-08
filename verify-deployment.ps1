# Verify Deployment Script for rohittravels.com
Write-Host "============================================" -ForegroundColor Cyan
Write-Host " rohittravels.com - Deployment Verification" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

$urls = @(
    "https://rohittravels.com",
    "https://rohittravels.com/sitemap.xml",
    "https://rohittravels.com/sitemap-main.xml",
    "https://rohittravels.com/sitemap-cities.xml",
    "https://rohittravels.com/sitemap-routes.xml",
    "https://rohittravels.com/robots.txt"
)

Write-Host "=== HTTP STATUS CHECKS ===" -ForegroundColor Yellow
foreach ($url in $urls) {
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 15
        $status = $response.StatusCode
        $color = if ($status -eq 200) { "Green" } else { "Yellow" }
        Write-Host "  [OK $status] $url" -ForegroundColor $color
    } catch {
        Write-Host "  [FAIL] $url - $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== DNS RESOLUTION ===" -ForegroundColor Yellow
try {
    $dns = Resolve-DnsName "rohittravels.com" -Type A -ErrorAction Stop
    foreach ($record in $dns) {
        Write-Host "  rohittravels.com -> $($record.IPAddress) [A record]" -ForegroundColor Green
    }
} catch {
    Write-Host "  rohittravels.com DNS lookup failed" -ForegroundColor Red
}

try {
    $wwwDns = Resolve-DnsName "www.rohittravels.com" -ErrorAction Stop
    foreach ($record in $wwwDns) {
        if ($record.Type -eq "CNAME") {
            Write-Host "  www.rohittravels.com -> $($record.NameHost) [CNAME]" -ForegroundColor Green
        } elseif ($record.Type -eq "A") {
            Write-Host "  www.rohittravels.com -> $($record.IPAddress) [A record]" -ForegroundColor Green
        }
    }
} catch {
    Write-Host "  www DNS lookup: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== SSL/HTTPS CHECK ===" -ForegroundColor Yellow
try {
    $httpsTest = Invoke-WebRequest -Uri "https://rohittravels.com" -UseBasicParsing -TimeoutSec 10
    Write-Host "  HTTPS: Working (HTTP $($httpsTest.StatusCode))" -ForegroundColor Green
} catch {
    Write-Host "  HTTPS: $($_.Exception.Message)" -ForegroundColor Red
}

try {
    $httpTest = Invoke-WebRequest -Uri "http://rohittravels.com" -UseBasicParsing -TimeoutSec 10 -MaximumRedirection 5
    Write-Host "  HTTP->HTTPS Redirect: Final URL = $($httpTest.BaseResponse.ResponseUri)" -ForegroundColor Green
} catch {
    Write-Host "  HTTP redirect test: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== CLOUDFLARE HEADERS CHECK ===" -ForegroundColor Yellow
try {
    $r = Invoke-WebRequest -Uri "https://rohittravels.com" -UseBasicParsing -TimeoutSec 10
    $cfHeaders = @("cf-ray", "cf-cache-status", "server", "x-content-type-options", "strict-transport-security")
    foreach ($h in $cfHeaders) {
        if ($r.Headers[$h]) {
            Write-Host "  $h`: $($r.Headers[$h])" -ForegroundColor Green
        }
    }
} catch {
    Write-Host "  Header check failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== GIT STATUS ===" -ForegroundColor Yellow
$gitLog = git log --oneline -3 2>&1
Write-Host "  Latest commits:" -ForegroundColor White
foreach ($line in $gitLog) {
    Write-Host "  $line" -ForegroundColor Gray
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host " Verification Complete!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
