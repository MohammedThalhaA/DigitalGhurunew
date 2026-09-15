const fs = require('fs');
const path = require('path');

function checkImage(file) {
  if (fs.existsSync(file)) {
    const stats = fs.statSync(file);
    console.log(`${file}: ${stats.size} bytes`);
  } else {
    console.log(`${file} not found`);
  }
}

checkImage(path.join(__dirname, 'public', 'logo-final dG.webp'));
checkImage(path.join(__dirname, 'public', 'resources', 'student portal.png'));
