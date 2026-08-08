const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const routeHtml = fs.readFileSync('routes/ranchi-to-jamshedpur-cab.html', 'utf8');

console.log('index.html contains rel="stylesheet":', indexHtml.includes('rel="stylesheet"'));
console.log('routeHtml contains rel="stylesheet":', routeHtml.includes('rel="stylesheet"'));

// Let's find all <link> tags in index.html head
const headMatch = indexHtml.match(/<head>[\s\S]*?<\/head>/i);
if (headMatch) {
    const head = headMatch[0];
    const linkMatches = head.match(/<link[\s\S]*?>/gi);
    console.log('\n--- Link tags in index.html head ---');
    if (linkMatches) {
        linkMatches.forEach(l => console.log(l));
    }
}
