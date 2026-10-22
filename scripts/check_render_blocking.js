const fs = require('fs');

const html = fs.readFileSync('.next/server/app/index.html', 'utf8');
const head = html.match(/<head>([\s\S]*?)<\/head>/i)[1];
const withoutNoscript = head.replace(/<noscript>[\s\S]*?<\/noscript>/gi, '');
// Extract link tags and check their rel attribute (not inside onload)
const links = withoutNoscript.match(/<link[^>]+>/gi) || [];
const plainStylesheets = links.filter(l => {
  const relMatch = l.match(/\brel=["']([^"']+)["']/i);
  return relMatch && relMatch[1].toLowerCase() === 'stylesheet';
});

console.log('Render-blocking stylesheets in <head> outside <noscript>:', plainStylesheets.length);
if (plainStylesheets.length > 0) {
  console.log('Blocking styles:', plainStylesheets);
}

const preloads = head.match(/<link[^>]*rel=["']preload["'][^>]*>/gi) || [];
const cssPreloads = preloads.filter(p => p.includes('.css'));
console.log('Non-blocking CSS preloads:', cssPreloads.length);
cssPreloads.forEach(p => console.log(p));
