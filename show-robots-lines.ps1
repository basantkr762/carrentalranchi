$r = Invoke-WebRequest -Uri 'https://rohittravels.com/robots.txt' -UseBasicParsing -TimeoutSec 15
$lines = $r.Content -split "`n"
Write-Host "Total lines: $($lines.Count)"
Write-Host ""
$i = 1
foreach ($line in $lines) {
    Write-Host "$i`: $line"
    $i++
}
