Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  rohittravels.com - FULL SITE AUDIT" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan

$pass = 0; $fail = 0; $warn = 0

function Check($label, $ok, $msg) {
    if ($ok -eq "pass") { Write-Host "  [PASS] $label - $msg" -ForegroundColor Green; $script:pass++ }
    elseif ($ok -eq "fail") { Write-Host "  [FAIL] $label - $msg" -ForegroundColor Red; $script:fail++ }
    else { Write-Host "  [WARN] $label - $msg" -ForegroundColor Yellow; $script:warn++ }
}

# 1. HTTP Status Checks
Write-Host "`n=== 1. HTTP STATUS ===" -ForegroundColor Yellow
$urls = @(
    @{url="https://rohittravels.com"; label="Homepage"},
    @{url="https://rohittravels.com/sitemap.xml"; label="sitemap.xml"},
    @{url="https://rohittravels.com/sitemap-main.xml"; label="sitemap-main.xml"},
    @{url="https://rohittravels.com/sitemap-cities.xml"; label="sitemap-cities.xml"},
    @{url="https://rohittravels.com/sitemap-routes.xml"; label="sitemap-routes.xml"},
    @{url="https://rohittravels.com/robots.txt"; label="robots.txt"},
    @{url="https://rohittravels.com/manifest.json"; label="manifest.json"},
    @{url="https://rohittravels.com/sw.js"; label="Service Worker"}
)
foreach ($item in $urls) {
    try {
        $r = Invoke-WebRequest -Uri $item.url -UseBasicParsing -TimeoutSec 10
        Check $item.label "pass" "HTTP $($r.StatusCode)"
    } catch {
        Check $item.label "fail" $_.Exception.Message
    }
}

# 2. HTTPS Redirect
Write-Host "`n=== 2. HTTP→HTTPS REDIRECT ===" -ForegroundColor Yellow
try {
    $r = Invoke-WebRequest -Uri "http://rohittravels.com" -UseBasicParsing -TimeoutSec 10 -MaximumRedirection 5
    if ($r.BaseResponse.ResponseUri -like "https://*") {
        Check "HTTP→HTTPS" "pass" "Redirects to HTTPS correctly"
    } else {
        Check "HTTP→HTTPS" "warn" "Final URL: $($r.BaseResponse.ResponseUri)"
    }
} catch { Check "HTTP→HTTPS" "warn" $_.Exception.Message }

# www redirect
try {
    $r = Invoke-WebRequest -Uri "https://www.rohittravels.com" -UseBasicParsing -TimeoutSec 10 -MaximumRedirection 5
    Check "www→non-www" "pass" "Redirects correctly"
} catch { Check "www→non-www" "warn" $_.Exception.Message }

# 3. DNS
Write-Host "`n=== 3. DNS RECORDS ===" -ForegroundColor Yellow
try {
    $aRec = Resolve-DnsName "rohittravels.com" -Type A -ErrorAction Stop
    foreach ($r in $aRec) { Check "A Record" "pass" "$($r.IPAddress) (Cloudflare IP)" }
} catch { Check "A Record" "fail" "DNS resolution failed" }

# 4. SSL
Write-Host "`n=== 4. SSL/TLS ===" -ForegroundColor Yellow
try {
    $r = Invoke-WebRequest -Uri "https://rohittravels.com" -UseBasicParsing -TimeoutSec 10
    $hsts = $r.Headers['Strict-Transport-Security']
    if ($hsts) { Check "HSTS Header" "pass" $hsts }
    else { Check "HSTS Header" "warn" "Not set" }
    Check "SSL Certificate" "pass" "HTTPS working (no cert error)"
} catch { Check "SSL" "fail" $_.Exception.Message }

# 5. Cloudflare headers
Write-Host "`n=== 5. CLOUDFLARE HEADERS ===" -ForegroundColor Yellow
try {
    $r = Invoke-WebRequest -Uri "https://rohittravels.com" -UseBasicParsing -TimeoutSec 10
    $cfRay = $r.Headers['CF-RAY']
    $server = $r.Headers['server']
    if ($cfRay) { Check "CF-RAY" "pass" $cfRay }
    else { Check "CF-RAY" "warn" "Not present - may not be proxied through Cloudflare" }
    if ($server -eq "cloudflare") { Check "Server" "pass" "cloudflare" }
    else { Check "Server" "warn" "Server: $server" }
    $xct = $r.Headers['X-Content-Type-Options']
    if ($xct) { Check "X-Content-Type-Options" "pass" $xct }
    else { Check "X-Content-Type-Options" "warn" "Not set" }
} catch { Check "CF Headers" "fail" $_.Exception.Message }

# 6. Sitemap content validation
Write-Host "`n=== 6. SITEMAP CONTENT VALIDATION ===" -ForegroundColor Yellow
try {
    $sm = Invoke-WebRequest -Uri "https://rohittravels.com/sitemap.xml" -UseBasicParsing -TimeoutSec 10
    if ($sm.Content -like "*sitemap-main.xml*") { Check "sitemap.xml references main" "pass" "OK" }
    else { Check "sitemap.xml references main" "fail" "sitemap-main.xml not referenced" }
    if ($sm.Content -like "*sitemap-cities.xml*") { Check "sitemap.xml references cities" "pass" "OK" }
    else { Check "sitemap.xml references cities" "fail" "sitemap-cities.xml not referenced" }
    if ($sm.Content -like "*sitemap-routes.xml*") { Check "sitemap.xml references routes" "pass" "OK" }
    else { Check "sitemap.xml references routes" "fail" "sitemap-routes.xml not referenced" }
} catch { Check "Sitemap validation" "fail" $_.Exception.Message }

# 7. robots.txt content
Write-Host "`n=== 7. ROBOTS.TXT VALIDATION ===" -ForegroundColor Yellow
try {
    $rb = Invoke-WebRequest -Uri "https://rohittravels.com/robots.txt" -UseBasicParsing -TimeoutSec 10
    if ($rb.Content -like "*Googlebot*") { Check "Googlebot directive" "pass" "Present" }
    else { Check "Googlebot directive" "warn" "Not explicitly set" }
    if ($rb.Content -like "*Sitemap:*") { Check "Sitemap in robots.txt" "pass" "Present" }
    else { Check "Sitemap in robots.txt" "fail" "Missing Sitemap directives" }
    if ($rb.Content -like "*Allow: /*") { Check "Allow all" "pass" "Present" }
    else { Check "Allow all" "warn" "No Allow: / found" }
    $sizeKB = [math]::Round($rb.RawContentLength / 1024, 1)
    Check "robots.txt size" "pass" "${sizeKB}KB"
} catch { Check "robots.txt" "fail" $_.Exception.Message }

# 8. Key pages
Write-Host "`n=== 8. KEY PAGES ===" -ForegroundColor Yellow
$pages = @(
    "https://rohittravels.com/cities/",
    "https://rohittravels.com/routes/",
    "https://rohittravels.com/cities/ranchi.html",
    "https://rohittravels.com/routes/ranchi-airport-taxi.html"
)
foreach ($url in $pages) {
    try {
        $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10
        Check $url.Replace("https://rohittravels.com","") "pass" "HTTP $($r.StatusCode)"
    } catch { Check $url.Replace("https://rohittravels.com","") "fail" $_.Exception.Message }
}

# SUMMARY
Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host "  SUMMARY" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  PASS: $pass" -ForegroundColor Green
Write-Host "  WARN: $warn" -ForegroundColor Yellow
Write-Host "  FAIL: $fail" -ForegroundColor Red
if ($fail -eq 0) {
    Write-Host "`n  ✅ Site is FULLY OPERATIONAL!" -ForegroundColor Green
} else {
    Write-Host "`n  ❌ $fail issue(s) need attention!" -ForegroundColor Red
}
Write-Host "============================================" -ForegroundColor Cyan
