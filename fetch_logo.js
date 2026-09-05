const https = require('https');
const fs = require('fs');
const url = 'https://www.newsghuru.com';

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/<img[^>]*src=["']([^"']*)["'][^>]*alt=["']news[\s-]*ghuru[\s-]*logo["']/i) || data.match(/<img[^>]*src=["']([^"']*logo[^"']*)["']/i);
    if (match) {
      let logoUrl = match[1];
      if (logoUrl.startsWith('/')) {
        logoUrl = 'https://www.newsghuru.com' + logoUrl;
      }
      console.log('Found logo URL:', logoUrl);
      
      const file = fs.createWriteStream('public/images/news-ghuru-logo.png');
      https.get(logoUrl, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log('Downloaded logo successfully!');
        });
      });
    } else {
      console.log('No logo found in the HTML');
    }
  });
}).on('error', (err) => {
  console.log('Error: ', err.message);
});
