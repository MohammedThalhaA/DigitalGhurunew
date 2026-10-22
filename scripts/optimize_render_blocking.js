const fs = require('fs');
const path = require('path');

function processHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Remove any erroneous script tags loading CSS files
  content = content.replace(/<script[^>]*src="\/_next\/static\/css\/[^"]+\.css"[^>]*><\/script>/gi, '');

  // 2. Transform render-blocking <link rel="stylesheet" ...> for Next.js static CSS chunks into non-blocking preload with onload
  content = content.replace(/<link\s+[^>]+>/gi, (match) => {
    const isStylesheet = /\brel=["']stylesheet["']/i.test(match);
    const hrefMatch = match.match(/\bhref=["'](\/_next\/static\/css\/[^"']+\.css)["']/i);
    if (isStylesheet && hrefMatch) {
      const href = hrefMatch[1];
      return `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'"/><noscript><link rel="stylesheet" href="${href}"/></noscript>`;
    }
    return match;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return 0;
  let count = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += walkDir(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      if (processHtmlFile(fullPath)) {
        count++;
      }
    }
  }
  return count;
}

console.log('[optimize_render_blocking] Optimizing HTML pages to eliminate render-blocking CSS...');
const dirs = [
  path.join(__dirname, '..', '.next', 'server', 'app'),
  path.join(__dirname, '..', '.next', 'standalone', '.next', 'server', 'app'),
];

let totalOptimized = 0;
for (const dir of dirs) {
  const count = walkDir(dir);
  totalOptimized += count;
  if (count > 0) {
    console.log(`[optimize_render_blocking] Optimized ${count} HTML files in ${dir}`);
  }
}

console.log(`[optimize_render_blocking] Complete! Total pages optimized: ${totalOptimized}`);
