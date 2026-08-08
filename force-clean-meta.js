const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace exact broken strings in index.html head
html = html.replace('content="4.9<i class="fas fa-star" style="color:#f39c12;"></i> 87+ Google Reviews | <i class="fas fa-star" style="color:#f39c12;"></i> #1 Cabs in Ranchi & Taxi Service in Ranchi (5.0<i class="fas fa-star" style="color:#f39c12;"></i> Google) @₹11/km | Airport Taxi 24/7 | Outstation Cab Jamshedpur, Patna, Kolkata | Wedding Car | Book Now +91-7903629240"',
                   'content="4.9★ 87+ Google Reviews | ★ #1 Cabs in Ranchi & Taxi Service in Ranchi (5.0★ Google) @₹11/km | Airport Taxi 24/7 | Outstation Cab Jamshedpur, Patna, Kolkata | Wedding Car | Book Now +91-7903629240"');

html = html.replace('content="<i class="fas fa-star" style="color:#f39c12;"></i> Best Cabs in Ranchi & Taxi Service @₹11/km | Airport Taxi 24/7 | Outstation Cab | Wedding Cars | Ranchi to Jamshedpur, Patna, Kolkata | Call +91-7903629240"',
                   'content="★ Best Cabs in Ranchi & Taxi Service @₹11/km | Airport Taxi 24/7 | Outstation Cab | Wedding Cars | Ranchi to Jamshedpur, Patna, Kolkata | Call +91-7903629240"');

html = html.replace('content="<i class="fas fa-check-circle" style="color:#2ecc71;"></i> Best Cabs in Ranchi @₹11/km | Ranchi Cab, Ranchi Taxi | Airport Taxi 24/7 | Outstation Cabs to Jamshedpur, Patna, Kolkata | Call +91-7903629240"',
                   'content="✅ Best Cabs in Ranchi @₹11/km | Ranchi Cab, Ranchi Taxi | Airport Taxi 24/7 | Outstation Cabs to Jamshedpur, Patna, Kolkata | Call +91-7903629240"');

fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ Cleaned meta tags in index.html');
