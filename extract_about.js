const https = require('https');

https.get('https://digitalscholar.in/about-digital-scholar/', (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => {
    // Basic regex extraction of text between heading and paragraph tags
    const tags = data.match(/<(h[1-6]|p)[^>]*>(.*?)<\/\1>/gi);
    if (tags) {
      const text = tags.map(t => t.replace(/<[^>]+>/g, '').trim()).filter(t => t.length > 0).join('\n\n');
      require('fs').writeFileSync('about_us_clean.txt', text);
      console.log('Extracted cleanly');
    }
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
