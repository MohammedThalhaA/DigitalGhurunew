const fs = require('fs');
const path = require('path');

async function check() {
  let html = '';
  const localHtmlPath = path.join(__dirname, '..', '.next', 'server', 'app', 'index.html');
  if (fs.existsSync(localHtmlPath)) {
    console.log(`Reading local production build: ${localHtmlPath}`);
    html = fs.readFileSync(localHtmlPath, 'utf8');
  } else {
    console.log('Fetching live site: https://digitalghuru.com');
    const res = await fetch('https://digitalghuru.com');
    html = await res.text();
  }

  const regex = /<img\s+[^>]*>/gi;
  let match;
  let count = 0;

  console.log('=== IMAGES ANALYSIS ===');
  while ((match = regex.exec(html)) !== null) {
    count++;
    const fullTag = match[0];

    const srcMatch = fullTag.match(/src="([^"]+)"/i) || fullTag.match(/src='([^']+)'/i);
    const src = srcMatch ? srcMatch[1] : '';

    const widthMatch = fullTag.match(/width="?(\d+)"?/i);
    const heightMatch = fullTag.match(/height="?(\d+)"?/i);
    const sizesMatch = fullTag.match(/sizes="([^"]+)"/i);
    const altMatch = fullTag.match(/alt="([^"]*)"/i);

    const alt = altMatch ? altMatch[1] : '';
    const width = widthMatch ? widthMatch[1] : 'auto';
    const height = heightMatch ? heightMatch[1] : 'auto';
    const sizes = sizesMatch ? sizesMatch[1] : 'none';

    let srcW = null;
    if (src.includes('w=')) {
      srcW = Number(src.split('w=')[1].split('&')[0]);
    }

    const isPotentialOversized = (srcW && srcW >= 640 && (width === 'auto' || Number(width) < 200)) || (srcW && srcW >= 1200 && Number(width) < 400);
    const flag = isPotentialOversized ? '⚠️ OVERSIZED' : '✅ OK';
    console.log(`[#${count}] ${flag} | Alt: "${alt.slice(0, 30)}" | w/h: ${width}x${height} | sizes: ${sizes} | default src: w=${srcW || 'orig'}`);
  }
}

check().catch(console.error);
