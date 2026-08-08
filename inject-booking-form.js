const fs = require('fs');
const path = require('path');

const bookingFormHTML = `
<!-- UNIVERSAL BOOKING FORM -->
<section class="booking-section-container" style="padding:40px 15px;background:linear-gradient(135deg, #0a6b61 0%, #06453e 100%);color:#fff;margin:30px 0;">
    <div class="container" style="max-width:600px;margin:0 auto;">
        <div style="background:#ffffff;padding:30px 25px;border-radius:18px;box-shadow:0 15px 35px rgba(0,0,0,0.25);color:#2d3436;">
            <h3 style="margin-top:0;margin-bottom:8px;color:#0a6b61;text-align:center;font-size:22px;font-weight:700;">Book Your Ride Now</h3>
            <p style="text-align:center;color:#636e72;font-size:14px;margin-bottom:20px;">Instant Online Cab Booking – 24/7 Service</p>
            <form class="customBookingForm" method="POST" action="https://docs.google.com/forms/d/e/1FAIpQLSdPrjsDtouGldWc3OcUciV7Gavjs4CkjZyVyEPKaGrUblanmg/formResponse" target="hidden_iframe_booking" onsubmit="return handleBookingFormSubmit(this);">
                <div style="margin-bottom:14px;">
                    <input type="text" name="entry.1071487397" placeholder="Your Name *" required style="width:100%;padding:12px 14px;border:1px solid #cbd5e1;border-radius:8px;font-size:15px;box-sizing:border-box;">
                </div>
                <div style="margin-bottom:14px;">
                    <input type="tel" name="entry.429615587" placeholder="Phone Number *" required style="width:100%;padding:12px 14px;border:1px solid #cbd5e1;border-radius:8px;font-size:15px;box-sizing:border-box;">
                </div>
                <div style="margin-bottom:14px;">
                    <input type="text" name="entry.713662380" placeholder="Pickup Location *" required style="width:100%;padding:12px 14px;border:1px solid #cbd5e1;border-radius:8px;font-size:15px;box-sizing:border-box;">
                </div>
                <div style="margin-bottom:14px;">
                    <input type="text" name="entry.929679028" placeholder="Drop Location *" required style="width:100%;padding:12px 14px;border:1px solid #cbd5e1;border-radius:8px;font-size:15px;box-sizing:border-box;">
                </div>
                <div style="margin-bottom:14px;">
                    <input type="date" name="entry.1937996992" required style="width:100%;padding:12px 14px;border:1px solid #cbd5e1;border-radius:8px;font-size:15px;color:#334155;box-sizing:border-box;">
                </div>
                <div style="margin-bottom:14px;">
                    <textarea name="entry.488826511" placeholder="Special Requests / Message" rows="2" style="width:100%;padding:12px 14px;border:1px solid #cbd5e1;border-radius:8px;font-size:15px;resize:vertical;box-sizing:border-box;"></textarea>
                </div>
                <button type="submit" class="btn-submit-booking" style="width:100%;background:linear-gradient(135deg, #0a6b61 0%, #38ef7d 100%);color:#fff;border:none;padding:14px;border-radius:8px;font-weight:700;font-size:16px;cursor:pointer;transition:transform 0.2s, box-shadow 0.2s;box-shadow:0 4px 15px rgba(10,107,97,0.3);">Submit Booking Request</button>
                <div class="bookingSuccessMsg" style="display:none;color:#0a6b61;margin-top:14px;font-weight:600;background:#e6fff2;padding:14px;border-radius:8px;text-align:center;border:1px solid #a3e635;">Thank you! Your booking has been submitted successfully. We will contact you soon.</div>
            </form>
            <iframe name="hidden_iframe_booking" style="display:none;"></iframe>
        </div>
    </div>
</section>
<script>
if (typeof handleBookingFormSubmit === 'undefined') {
    function handleBookingFormSubmit(form) {
        var btn = form.querySelector('.btn-submit-booking');
        var msg = form.querySelector('.bookingSuccessMsg');
        if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
        setTimeout(function() {
            form.reset();
            if (btn) { btn.disabled = false; btn.textContent = 'Submit Booking Request'; }
            if (msg) {
                msg.style.display = 'block';
                setTimeout(function() { msg.style.display = 'none'; }, 6000);
            }
        }, 1200);
        return true;
    }
}
</script>
`;

function getHtmlFiles(dir, filesList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            getHtmlFiles(filePath, filesList);
        } else if (file.endsWith('.html')) {
            filesList.push(filePath);
        }
    }
    return filesList;
}

const rootDir = __dirname;
const allHtmlFiles = getHtmlFiles(rootDir);

let updatedCount = 0;
let skippedCount = 0;

allHtmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if form is already present
    if (content.includes('customBookingForm') || content.includes('1FAIpQLSdPrjsDtouGldWc3OcUciV7Gavjs4CkjZyVyEPKaGrUblanmg')) {
        skippedCount++;
        return;
    }
    
    // Inject form before footer or before closing </body>
    if (content.includes('<!-- Footer -->') || content.includes('<footer')) {
        content = content.replace(/(<!-- Footer -->|<footer)/i, `${bookingFormHTML}\n$1`);
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    } else if (content.includes('</body>')) {
        content = content.replace('</body>', `${bookingFormHTML}\n</body>`);
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    }
});

console.log(`\n🎉 Booking Form Injection Complete!`);
console.log(`Updated Files: ${updatedCount}`);
console.log(`Skipped Files (Already had form): ${skippedCount}`);
console.log(`Total HTML Files Scanned: ${allHtmlFiles.length}\n`);
