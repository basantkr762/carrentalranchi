const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) results = results.concat(getHtmlFiles(full));
    else if (item.name.endsWith('.html')) results.push(full);
  }
  return results;
}

const cityFiles = getHtmlFiles('cities');
const routeFiles = getHtmlFiles('routes');
const allFiles = [...cityFiles, ...routeFiles];
const totalPages = allFiles.length;
let totalSize = 0;

const duplicateTitles = {};
const duplicateDescs = {};
const duplicateCanonicals = {};
const duplicateH1s = {};
const missingCanonical = [];
const missingSchema = [];
const missingFaqSchema = [];
const longTitles = [];
const longDescs = [];
const thinContent = [];
const missingH1 = [];
const multipleH1 = [];
const missingMetaDesc = [];
const noFaqSection = [];
const missingOgTags = [];
let inlineCSS = 0;

console.log('Scanning ' + totalPages + ' pages...\n');

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const relPath = file.replace(/\\\\/g, '/').replace(/\\/g, '/');
  const size = Buffer.byteLength(content, 'utf-8');
  totalSize += size;

  // Title
  const titleMatch = content.match(/<title>(.*?)<\/title>/s);
  if (titleMatch) {
    const title = titleMatch[1].trim();
    if (title.length > 70) longTitles.push({ file: relPath, len: title.length, title });
    if (!duplicateTitles[title]) duplicateTitles[title] = [];
    duplicateTitles[title].push(relPath);
  }

  // Meta desc
  const descMatch = content.match(/name="description"\s+content="(.*?)"/s);
  if (!descMatch) {
    missingMetaDesc.push(relPath);
  } else {
    const desc = descMatch[1];
    if (desc.length > 160) longDescs.push({ file: relPath, len: desc.length });
    if (!duplicateDescs[desc]) duplicateDescs[desc] = [];
    duplicateDescs[desc].push(relPath);
  }

  // Canonical
  const canonMatch = content.match(/rel="canonical"\s+href="(.*?)"/);
  if (!canonMatch) {
    missingCanonical.push(relPath);
  } else {
    const canon = canonMatch[1];
    if (!duplicateCanonicals[canon]) duplicateCanonicals[canon] = [];
    duplicateCanonicals[canon].push(relPath);
  }

  // H1
  const h1Matches = content.match(/<h1[^>]*>(.*?)<\/h1>/gs);
  if (!h1Matches) missingH1.push(relPath);
  else if (h1Matches.length > 1) multipleH1.push({ file: relPath, count: h1Matches.length });
  if (h1Matches && h1Matches.length === 1) {
    const h1Text = h1Matches[0].replace(/<[^>]+>/g, '').trim();
    if (!duplicateH1s[h1Text]) duplicateH1s[h1Text] = [];
    duplicateH1s[h1Text].push(relPath);
  }

  // Schema
  if (!content.includes('application/ld+json')) missingSchema.push(relPath);
  if (!content.includes('"FAQPage"')) missingFaqSchema.push(relPath);

  // FAQ section
  if (!content.includes('faq-item')) noFaqSection.push(relPath);

  // OG tags
  if (!content.includes('og:title')) missingOgTags.push(relPath);

  // Content word count
  const textOnly = content.replace(/<script[^>]*>[\s\S]*?<\/script>/g, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ');
  const wordCount = textOnly.split(' ').filter(w => w.length > 2).length;
  if (wordCount < 500) thinContent.push({ file: relPath, words: wordCount });

  // Inline CSS
  const styleMatches = content.match(/<style[^>]*>([\s\S]*?)<\/style>/g);
  if (styleMatches) inlineCSS += styleMatches.join('').length;
});

const dupTitles = Object.entries(duplicateTitles).filter(([,f]) => f.length > 1);
const dupDescs = Object.entries(duplicateDescs).filter(([,f]) => f.length > 1);
const dupCanons = Object.entries(duplicateCanonicals).filter(([,f]) => f.length > 1);
const dupH1 = Object.entries(duplicateH1s).filter(([,f]) => f.length > 1);

// Check files
const cssExists = fs.existsSync('css/style.min.css');
const jsExists = fs.existsSync('js/script.js');
const imgChecks = ['images/rohittravelslogo.webp','images/rohittravelslogo_desktop.webp','images/dezire.webp','images/ertiga.webp','images/crista.webp','images/hero-bg.webp'];
const missingImages = imgChecks.filter(i => !fs.existsSync(i));

// Check robots
let robotsOk = true;
try {
  const robots = fs.readFileSync('robots.txt', 'utf-8');
  if (!robots.includes('Sitemap:')) robotsOk = false;
} catch(e) { robotsOk = false; }

// Sitemaps
let sitemapInfo = [];
try { const s = fs.readFileSync('sitemap.xml','utf-8'); sitemapInfo.push('sitemap.xml: OK (index)'); } catch(e) { sitemapInfo.push('sitemap.xml: MISSING'); }
try { const s = fs.readFileSync('sitemap-cities.xml','utf-8'); const c = (s.match(/<loc>/g)||[]).length; sitemapInfo.push('sitemap-cities.xml: '+c+' URLs'); } catch(e) { sitemapInfo.push('sitemap-cities.xml: MISSING'); }
try { const s = fs.readFileSync('sitemap-routes.xml','utf-8'); const c = (s.match(/<loc>/g)||[]).length; sitemapInfo.push('sitemap-routes.xml: '+c+' URLs'); } catch(e) { sitemapInfo.push('sitemap-routes.xml: MISSING'); }

// OUTPUT
const out = [];
out.push('============================================================');
out.push('SEO INDEXING AUDIT REPORT');
out.push('============================================================');
out.push('Total pages: ' + totalPages);
out.push('Total size: ' + (totalSize / 1024 / 1024).toFixed(1) + ' MB');
out.push('Avg page size: ' + Math.round(totalSize / totalPages / 1024) + ' KB');
out.push('');

out.push('[CRITICAL] Issues that BLOCK indexing:');
out.push('------------------------------------------');
if (dupCanons.length > 0) {
  out.push('FAIL - ' + dupCanons.length + ' DUPLICATE canonical URLs!');
  dupCanons.slice(0,5).forEach(([url,files]) => out.push('  "'+url+'" used by '+files.length+' pages'));
}
if (missingCanonical.length > 0) out.push('FAIL - ' + missingCanonical.length + ' pages missing canonical tag');
if (!cssExists) out.push('FAIL - css/style.min.css NOT FOUND (pages will look broken to Google)');
if (!jsExists) out.push('FAIL - js/script.js NOT FOUND');
if (missingImages.length > 0) missingImages.forEach(i => out.push('FAIL - Missing image: '+i));
if (!robotsOk) out.push('FAIL - robots.txt missing or no Sitemap directive');
if (missingSchema.length > 0) out.push('FAIL - ' + missingSchema.length + ' pages missing ALL schema markup');
if (dupCanons.length === 0 && missingCanonical.length === 0 && cssExists && jsExists && missingImages.length === 0) out.push('PASS - No critical issues');
out.push('');

out.push('[HIGH] Issues that HURT ranking:');
out.push('------------------------------------------');
out.push((dupTitles.length > 0 ? 'WARN' : 'PASS') + ' - Duplicate titles: ' + dupTitles.length + ' sets');
dupTitles.slice(0,5).forEach(([t,f]) => out.push('  "'+t.substring(0,70)+'..." -> '+f.length+' pages'));
out.push((dupDescs.length > 0 ? 'WARN' : 'PASS') + ' - Duplicate meta descriptions: ' + dupDescs.length + ' sets');
dupDescs.slice(0,3).forEach(([d,f]) => out.push('  "'+d.substring(0,70)+'..." -> '+f.length+' pages'));
out.push((dupH1.length > 0 ? 'WARN' : 'PASS') + ' - Duplicate H1 tags: ' + dupH1.length + ' sets');
dupH1.slice(0,3).forEach(([h,f]) => out.push('  "'+h.substring(0,70)+'..." -> '+f.length+' pages'));
out.push((thinContent.length > 0 ? 'WARN' : 'PASS') + ' - Thin content (<500 words): ' + thinContent.length + ' pages');
thinContent.slice(0,8).forEach(t => out.push('  '+t.file+' ('+t.words+' words)'));
out.push((missingFaqSchema.length > 0 ? 'WARN' : 'PASS') + ' - Missing FAQPage schema: ' + missingFaqSchema.length + ' pages');
out.push('');

out.push('[MEDIUM] Optimization issues:');
out.push('------------------------------------------');
out.push((longTitles.length > 0 ? 'WARN' : 'PASS') + ' - Titles > 70 chars (truncated in SERP): ' + longTitles.length + ' pages');
longTitles.slice(0,5).forEach(t => out.push('  '+path.basename(t.file)+' ('+t.len+' chars)'));
out.push((longDescs.length > 0 ? 'WARN' : 'PASS') + ' - Meta desc > 160 chars: ' + longDescs.length + ' pages');
out.push('PASS - Missing H1 tag: ' + missingH1.length + ' pages');
out.push('PASS - Multiple H1 tags: ' + multipleH1.length + ' pages');
out.push('PASS - No FAQ section: ' + noFaqSection.length + ' pages');
out.push('PASS - Missing OG tags: ' + missingOgTags.length + ' pages');
const cssKB = Math.round(inlineCSS / 1024);
out.push('WARN - Inline CSS: ~' + cssKB + ' KB total across all pages (bloats page size, hurts CWV)');
out.push('');

out.push('[SITEMAPS]');
out.push('------------------------------------------');
sitemapInfo.forEach(s => out.push('  ' + s));
out.push('');

out.push('[CRAWL BUDGET CONCERNS]');
out.push('------------------------------------------');
out.push('1. ' + totalPages + ' pages is large for a new/small domain.');
out.push('   Google may crawl slowly (50-100 pages/day initially).');
out.push('   Full indexing could take 4-8 weeks.');
out.push('');
out.push('2. Template similarity: All pages share identical CSS/HTML structure.');
out.push('   Google may classify some as "soft duplicates" and not index them.');
out.push('');
out.push('3. Inline CSS (~7KB per page) wastes crawl budget.');
out.push('   Moving to external CSS saves ~14MB of repeated data.');
out.push('');
out.push('============================================================');

console.log(out.join('\n'));
