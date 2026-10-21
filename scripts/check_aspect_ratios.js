const fs = require('fs');
const path = require('path');

function getDimensions(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    if (buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') {
      const vp8 = buffer.toString('ascii', 12, 16);
      if (vp8 === 'VP8 ') {
        const width = buffer.readUInt16LE(26) & 0x3fff;
        const height = buffer.readUInt16LE(28) & 0x3fff;
        return { width, height };
      } else if (vp8 === 'VP8L') {
        const b0 = buffer[21], b1 = buffer[22], b2 = buffer[23], b3 = buffer[24];
        const width = 1 + (((b1 & 0x3f) << 8) | b0);
        const height = 1 + (((b3 & 0xf) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
        return { width, height };
      } else if (vp8 === 'VP8X') {
        const width = 1 + buffer.readUIntLE(24, 3);
        const height = 1 + buffer.readUIntLE(27, 3);
        return { width, height };
      }
    }
    if (buffer.toString('hex', 0, 8) === '89504e470d0a1a0a') {
      const width = buffer.readUInt32BE(16);
      const height = buffer.readUInt32BE(20);
      return { width, height };
    }
    if (buffer[0] === 0xff && buffer[1] === 0xd8) {
      let offset = 2;
      while (offset < buffer.length) {
        if (buffer[offset] !== 0xff) break;
        const marker = buffer[offset + 1];
        if (marker === 0xc0 || marker === 0xc2) {
          const height = buffer.readUInt16BE(offset + 5);
          const width = buffer.readUInt16BE(offset + 7);
          return { width, height };
        }
        const len = buffer.readUInt16BE(offset + 2);
        offset += 2 + len;
      }
    }
  } catch (e) {
    return null;
  }
  return null;
}

function scanDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      scanDir(filePath, fileList);
    } else if (/\.(webp|png|jpg|jpeg)$/i.test(file)) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const pub = path.join(process.cwd(), 'public');
const allImages = scanDir(pub);
const map = {};
for (const imgPath of allImages) {
  const rel = path.relative(pub, imgPath).replace(/\\/g, '/');
  const dims = getDimensions(imgPath);
  if (dims) {
    map['/' + rel] = dims;
  }
}

console.log('Total images found in public:', Object.keys(map).length);

const htmlPath = path.join(process.cwd(), '.next', 'server', 'app', 'index.html');
if (fs.existsSync(htmlPath)) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const imgRegex = /<img\s+[^>]*>/gi;
  let match;
  console.log('\n=== CHECKING INDEX.HTML RENDERED IMAGES VS SOURCE DIMENSIONS ===');
  let mismatchCount = 0;
  while ((match = imgRegex.exec(html)) !== null) {
    const tag = match[0];
    const srcMatch = tag.match(/src="([^"]+)"/i) || tag.match(/src='([^']+)'/i);
    const widthMatch = tag.match(/width="?(\d+)"?/i);
    const heightMatch = tag.match(/height="?(\d+)"?/i);
    const altMatch = tag.match(/alt="([^"]*)"/i);

    const src = srcMatch ? srcMatch[1] : '';
    const alt = altMatch ? altMatch[1] : '';
    const attrW = widthMatch ? parseInt(widthMatch[1], 10) : null;
    const attrH = heightMatch ? parseInt(heightMatch[1], 10) : null;

    let origUrl = src;
    if (src.includes('url=')) {
      origUrl = decodeURIComponent(src.split('url=')[1].split('&')[0]);
    }

    const nativeDims = map[origUrl];
    if (nativeDims && attrW && attrH) {
      const natRatio = nativeDims.width / nativeDims.height;
      const attrRatio = attrW / attrH;
      const diff = Math.abs(natRatio - attrRatio);
      if (diff > 0.02) {
        mismatchCount++;
        console.log(`❌ MISMATCH: ${origUrl} (${alt})`);
        console.log(`   Native: ${nativeDims.width}x${nativeDims.height} (ratio ${natRatio.toFixed(3)})`);
        console.log(`   Attributes: ${attrW}x${attrH} (ratio ${attrRatio.toFixed(3)}) -> DIFF: ${diff.toFixed(3)}`);
      } else {
        console.log(`✅ MATCH: ${origUrl} (${alt.slice(0, 25)}) -> ${natRatio.toFixed(3)}`);
      }
    } else if (nativeDims && (!attrW || !attrH)) {
      console.log(`⚠️ MISSING ATTR: ${origUrl}`);
    }
  }
  console.log(`\nTotal aspect ratio mismatches found: ${mismatchCount}`);
}
