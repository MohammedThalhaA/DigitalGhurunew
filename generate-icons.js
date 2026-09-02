const fs = require('fs');
const icons = require('simple-icons');

const list = [
  'siGoogleads', 'siMeta', 'siSemrush', 'siGoogleanalytics', 'siWordpress', 
  'siCanva', 'siMailchimp', 'siHootsuite', 'siOpenai', 'siAnthropic', 
  'siMidjourney', 'siZapier'
];

list.forEach(i => {
  if (icons[i]) {
    const slug = i.replace('si', '').toLowerCase();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#${icons[i].hex}"><path d="${icons[i].path}"/></svg>`;
    fs.writeFileSync('public/tools/' + slug + '.svg', svg);
    console.log('Wrote', slug);
  } else {
    console.log('MISSING', i);
  }
});
