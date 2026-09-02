const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.git') && !file.includes('.next')) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.txt')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('.');
let count = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  // We want to replace DigitalGhuru with Digital Ghuru
  // ONLY if it's NOT part of an email, url, or path.
  // We can use a regex that negative-lookbehinds / or @ or - and negative lookaheads .com or / or -
  
  let newContent = content.replace(/(?<![\/@\-])DigitalGhuru(?!\.com|\/|-[a-z])/gi, match => {
    // If it's literally "DigitalGhuru" or "Digitalghuru", replace it with "Digital Ghuru"
    // Keep casing for the first letter
    if (match === 'DigitalGhuru' || match === 'digitalghuru' || match === 'Digitalghuru') {
      return match.charAt(0) + 'igital Ghuru';
    }
    return match;
  });

  if (newContent !== content) {
    fs.writeFileSync(f, newContent);
    count++;
    console.log('Updated', f);
  }
});

console.log('Total files updated:', count);
