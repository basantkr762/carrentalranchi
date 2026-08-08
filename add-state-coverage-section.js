const fs = require('fs');
const path = require('path');

const BASE = process.cwd();
const CITIES_DIR = path.join(BASE, 'cities');

const stateMap = {
  'Jharkhand': [
    'ranchi', 'jamshedpur', 'dhanbad', 'bokaro', 'hazaribagh', 'deoghar', 
    'giridih', 'chaibasa', 'ramgarh', 'lohardaga', 'gumla', 'simdega', 
    'khunti', 'pakur', 'dumka', 'daltonganj', 'latehar', 'saraikela', 
    'adityapur', 'bagodar', 'barhi', 'betla', 'bundu', 'chakradharpur', 
    'chandil', 'chas', 'chatra', 'garhwa', 'ghatshila', 'godda', 'gola', 
    'hussainabad', 'itkhori', 'jamtara', 'jhalda', 'jharia', 'koderma', 
    'madhupur', 'maluti', 'mango', 'mccluskieganj', 'mihijam', 'netarhat', 
    'parasnath', 'patratu', 'phusro', 'rajmahal', 'rajrappa', 'tata-nagar-golmuri', 
    'tenughat', 'tisri', 'topchanchi', 'tundi'
  ],
  'Bihar': ['patna', 'gaya'],
  'West Bengal': ['kolkata', 'asansol'],
  'Odisha': ['bhubaneswar', 'puri', 'rourkela'],
  'Uttar Pradesh': ['varanasi']
};

const stateIcons = {
  'Jharkhand': 'fa-mountain',
  'Bihar': 'fa-landmark',
  'West Bengal': 'fa-gopuram',
  'Odisha': 'fa-water',
  'Uttar Pradesh': 'fa-om'
};

const stateData = {};

for (const [state, folders] of Object.entries(stateMap)) {
  stateData[state] = [];
  folders.forEach(folder => {
    const fp = path.join(CITIES_DIR, folder);
    if (fs.existsSync(fp)) {
      const files = fs.readdirSync(fp).filter(f => f.endsWith('.html') && f !== 'index.html');
      let mainFile = files.find(f => f.includes('taxi-service-in-' + folder)) || files[0];
      const cityName = folder.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      if (mainFile) {
        stateData[state].push({
          name: cityName,
          url: `/cities/${folder}/${mainFile}`,
          subPages: files.length
        });
      }
    }
  });
}

// Generate the State & City Coverage HTML Component
const stateNames = Object.keys(stateData);

let stateButtonsHtml = '';
let cityGridsHtml = '';

stateNames.forEach((state, index) => {
  const isFirst = index === 0;
  const cities = stateData[state];
  const icon = stateIcons[state] || 'fa-map-marker-alt';
  const stateId = 'state-' + state.toLowerCase().replace(/\s+/g, '-');

  // State Card Button
  stateButtonsHtml += `
    <button type="button" class="state-card-btn ${isFirst ? 'active' : ''}" onclick="selectState('${stateId}', this)">
        <div class="state-icon"><i class="fas ${icon}"></i></div>
        <div class="state-info">
            <span class="state-title">${state}</span>
            <span class="state-count">${cities.length} Cities / Areas</span>
        </div>
        <i class="fas fa-check-circle check-mark"></i>
    </button>
  `;

  // City Grid Panel
  let cityCards = cities.map(c => `
    <a href="${c.url}" class="city-nav-card" title="Book Taxi in ${c.name}">
        <div class="city-card-header">
            <i class="fas fa-taxi"></i>
            <span class="city-name">${c.name}</span>
        </div>
        <span class="city-subtext">${c.subPages} Coverage Areas <i class="fas fa-arrow-right"></i></span>
    </a>
  `).join('\n');

  cityGridsHtml += `
    <div id="${stateId}" class="state-city-panel ${isFirst ? 'active' : ''}">
        <div class="state-panel-header">
            <h3><i class="fas ${icon}"></i> Taxi & Cab Services in ${state}</h3>
            <span>Click any city to view its dedicated taxi booking page:</span>
        </div>
        <div class="city-grid">
            ${cityCards}
        </div>
    </div>
  `;
});

const completeSectionHtml = `
<!-- 🗺️ States & Cities Coverage Interactive Section -->
<section class="coverage-section" id="coverage-area">
    <div class="coverage-container">
        <div class="section-heading text-center">
            <h2><i class="fas fa-map-marked-alt"></i> States & Cities We Cover</h2>
            <p>Select any state below to view available cities, and click any city to open its dedicated 24/7 taxi booking page!</p>
        </div>

        <!-- State Selector Cards -->
        <div class="state-cards-grid">
            ${stateButtonsHtml}
        </div>

        <!-- City Panels Container -->
        <div class="city-panels-container">
            ${cityGridsHtml}
        </div>
    </div>
</section>

<style>
    .coverage-section { padding: 60px 20px; background: #f8f9ff; border-top: 1px solid #e9ecef; border-bottom: 1px solid #e9ecef; }
    .coverage-container { max-width: 1200px; margin: 0 auto; }
    .section-heading { text-align: center; margin-bottom: 40px; }
    .section-heading h2 { font-size: 32px; color: #1a1a2e; margin-bottom: 12px; font-weight: 700; }
    .section-heading h2 i { color: #0a6b61; margin-right: 8px; }
    .section-heading p { font-size: 17px; color: #555; max-width: 750px; margin: 0 auto; }

    /* State Cards Grid */
    .state-cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 35px; }
    .state-card-btn { display: flex; align-items: center; gap: 15px; padding: 18px 20px; background: #ffffff; border: 2px solid #e0e0e0; border-radius: 16px; cursor: pointer; transition: all 0.3s ease; text-align: left; position: relative; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
    .state-card-btn:hover { border-color: #0a6b61; transform: translateY(-3px); box-shadow: 0 8px 25px rgba(10,107,97,0.15); }
    .state-card-btn.active { border-color: #0a6b61; background: linear-gradient(135deg, #0a6b61 0%, #11998e 100%); color: #ffffff; box-shadow: 0 10px 30px rgba(10,107,97,0.3); }
    
    .state-icon { width: 44px; height: 44px; border-radius: 12px; background: #e8f5e9; color: #0a6b61; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; transition: all 0.3s; }
    .state-card-btn.active .state-icon { background: rgba(255,255,255,0.2); color: #ffffff; }
    
    .state-info { display: flex; flex-direction: column; flex-grow: 1; }
    .state-title { font-weight: 700; font-size: 16px; margin-bottom: 2px; }
    .state-count { font-size: 12px; opacity: 0.85; }
    .state-card-btn.active .state-count { color: rgba(255,255,255,0.9); }
    
    .check-mark { font-size: 16px; color: #ffffff; opacity: 0; transition: opacity 0.3s; }
    .state-card-btn.active .check-mark { opacity: 1; }

    /* City Panels */
    .city-panels-container { background: #ffffff; border-radius: 20px; padding: 30px; box-shadow: 0 10px 40px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
    .state-city-panel { display: none; }
    .state-city-panel.active { display: block; animation: fadeIn 0.4s ease; }

    .state-panel-header { margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px dashed #edf2f7; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
    .state-panel-header h3 { font-size: 22px; color: #0a6b61; margin: 0; font-weight: 700; }
    .state-panel-header span { font-size: 14px; color: #666; font-weight: 500; }

    .city-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 15px; }
    .city-nav-card { display: flex; flex-direction: column; justify-content: space-between; padding: 16px 18px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; text-decoration: none; color: #2d3748; transition: all 0.3s ease; }
    .city-nav-card:hover { border-color: #0a6b61; background: #ffffff; transform: translateY(-3px); box-shadow: 0 8px 20px rgba(10,107,97,0.12); }
    
    .city-card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
    .city-card-header i { color: #0a6b61; font-size: 16px; }
    .city-name { font-weight: 600; font-size: 15px; }
    
    .city-subtext { font-size: 12px; color: #718096; display: flex; align-items: center; justify-content: space-between; font-weight: 500; }
    .city-nav-card:hover .city-subtext { color: #0a6b61; }
    .city-nav-card:hover .city-subtext i { transform: translateX(3px); transition: transform 0.2s; }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 768px) {
        .coverage-section { padding: 40px 15px; }
        .section-heading h2 { font-size: 24px; }
        .city-panels-container { padding: 20px 15px; }
        .city-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 10px; }
    }
</style>

<script>
    function selectState(panelId, btn) {
        // Remove active class from all buttons
        var btns = document.querySelectorAll('.state-card-btn');
        btns.forEach(function(b) { b.classList.remove('active'); });

        // Add active class to clicked button
        btn.classList.add('active');

        // Hide all panels
        var panels = document.querySelectorAll('.state-city-panel');
        panels.forEach(function(p) { p.classList.remove('active'); });

        // Show target panel
        var target = document.getElementById(panelId);
        if (target) {
            target.classList.add('active');
        }
    }
</script>
`;

// Insert into index.html
const indexFp = path.join(BASE, 'index.html');
let indexHtml = fs.readFileSync(indexFp, 'utf8');

if (!indexHtml.includes('coverage-section')) {
    // Insert before footer or before navigation finder
    if (indexHtml.includes('<section class="coverage-section"') || indexHtml.includes('coverage-area')) {
        console.log('ℹ️ Section already present');
    } else if (indexHtml.includes('<!-- Footer -->') || indexHtml.includes('<footer')) {
        indexHtml = indexHtml.replace('<footer', completeSectionHtml + '\n<footer');
        fs.writeFileSync(indexFp, indexHtml, 'utf8');
        console.log('✅ Created & added "States & Cities We Cover" section to index.html!');
    } else {
        indexHtml = indexHtml.replace('</body>', completeSectionHtml + '\n</body>');
        fs.writeFileSync(indexFp, indexHtml, 'utf8');
        console.log('✅ Created & added "States & Cities We Cover" section to index.html!');
    }
} else {
    console.log('ℹ️ Coverage section already exists');
}
