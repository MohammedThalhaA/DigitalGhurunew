const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.next') && !file.includes('.git')) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('c:\\Users\\MOHAMMED THALHA A\\OneDrive\\Desktop\\Digital Ghuru 2\\digital-ghuru\\components\\sections\\course');
files.push('c:\\Users\\MOHAMMED THALHA A\\OneDrive\\Desktop\\Digital Ghuru 2\\digital-ghuru\\app\\(marketing)\\courses\\[slug]\\page.tsx');

const reps = [
  [/in <span[^>]*>Our Campus<\/span>/gi, 'Online & Offline'],
  [/Our Campus is home to major IT/gi, 'The industry is home to major IT'],
  [/<span[^>]*>Our Campus<\/span>\?/gi, 'Online & Offline?'],
  [/Other Our Campus Institutes/gi, 'Other Institutes'],
  [/Our Campus offline \(weekday or weekend\)/gi, 'Offline (weekday or weekend)'],
  [/for Digital Ghuru Our Campus\?/gi, 'for Digital Ghuru?'],
  [/Our Campus Start\?/gi, 'Next Batch Start?'],
  [/Our Campus's only/gi, 'The only'],
  [/across Our Campus, Bangalore, Mumbai, and remote companies/gi, 'across our network'],
  [/Very few Our Campus institutes/gi, 'Very few institutes'],
  [/Top Rated in Our Campus/gi, 'Top Rated Program'],
  [/>Our Campus</gi, '>Online & Offline<'],
  [/"Our Campus"/gi, '"Online & Offline"'],
  [/Our Campus Campus/gi, 'Main Campus'],
  [/Our Campus \/ Hybrid/gi, 'Online / Hybrid'],
  [/— Our Campus/gi, ''],
  [/Our Campus Locations/gi, 'Locations'],
  [/Visit our campus/gi, 'Visit us']
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    reps.forEach(([r, sub]) => {
      content = content.replace(r, sub);
    });
    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Cleaned up Our Campus in', path.basename(file));
    }
  }
});
