const fs = require('fs');

const routeHtml = fs.readFileSync('routes/ranchi-to-jamshedpur-cab.html', 'utf8');

const headMatch = routeHtml.match(/<head>[\s\S]*?<\/head>/i);
if (headMatch) {
    const head = headMatch[0];
    const linkMatches = head.match(/<link[\s\S]*?>/gi);
    console.log('--- Link tags in routeHtml head ---');
    if (linkMatches) {
        linkMatches.forEach(l => console.log(l));
    }
}
