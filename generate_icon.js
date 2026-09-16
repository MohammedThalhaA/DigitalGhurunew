const fs = require('fs');
const img = fs.readFileSync('public/logo-for-logins.png');
const b64 = img.toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <!-- Increased size by ~30% (from 512 to 666) and shifted x/y to keep it centered -->
  <image href="data:image/png;base64,${b64}" width="666" height="666" x="-77" y="-77" preserveAspectRatio="xMidYMid meet"/>
</svg>`;
fs.writeFileSync('app/icon.svg', svg);
console.log('Done larger!');
