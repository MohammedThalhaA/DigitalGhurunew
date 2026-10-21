const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', '.next', 'server', 'app', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

console.log('=== SCRIPTS IN INDEX.HTML ===');
const scriptRegex = /<script\s+[^>]*src="([^"]+)"/gi;
let m;
let scriptCount = 0;
while ((m = scriptRegex.exec(html)) !== null) {
  scriptCount++;
  console.log(`[Script #${scriptCount}] ${m[1]}`);
}

console.log('\n=== CSS LINK TAGS ===');
const linkCssRegex = /<link\s+[^>]*rel="stylesheet"[^>]*href="([^"]+)"/gi;
let cssCount = 0;
while ((m = linkCssRegex.exec(html)) !== null) {
  cssCount++;
  console.log(`[CSS #${cssCount}] ${m[1]}`);
}

console.log('\n=== PRELOAD / PRECONNECT LINKS ===');
const linkPreloadRegex = /<link\s+[^>]*href="([^"]+)"[^>]*>/gi;
let preloadCount = 0;
while ((m = linkPreloadRegex.exec(html)) !== null) {
  if (m[0].includes('rel="preload"') || m[0].includes('rel="prefetch"')) {
    preloadCount++;
    console.log(`[Preload #${preloadCount}] ${m[1]}`);
  }
}

console.log('\n=== IMAGES IN INDEX.HTML ===');
const imgRegex = /<img\s+[^>]*>/gi;
let imgCount = 0;
while ((m = imgRegex.exec(html)) !== null) {
  imgCount++;
  const tag = m[0];
  const src = (tag.match(/src="([^"]+)"/i) || [])[1] || '';
  const loading = (tag.match(/loading="([^"]+)"/i) || [])[1] || 'eager';
  const alt = (tag.match(/alt="([^"]*)"/i) || [])[1] || '';
  console.log(`[Image #${imgCount}] loading="${loading}" | ${alt.slice(0, 25)} | ${src.slice(0, 60)}`);
}

console.log(`\nSummary: ${scriptCount} scripts, ${cssCount} CSS links, ${preloadCount} preloads, ${imgCount} images.`);

