const fs = require('fs');
const c = fs.readFileSync('cities/gola/popular-routes.html', 'utf8');
const links = c.match(/<link rel="stylesheet"[^>]*>/g) || [];
console.log('CSS links:', links.length);
console.log(links.join('\n'));
console.log('---');
console.log('has style.min.css link:', c.includes('/css/style.min.css'));
console.log('has page.min.css link:', c.includes('page.min.css'));
