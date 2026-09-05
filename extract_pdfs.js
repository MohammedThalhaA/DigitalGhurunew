const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const coursesDir = path.join(__dirname, 'public', 'Courses');
const pdfs = [
  'Creative Design and video editing course.pdf',
  'Data Science with AI Course.pdf',
  'React JS Full Stack Development.pdf'
];

async function extractAll() {
  for (const file of pdfs) {
    const filePath = path.join(coursesDir, file);
    if (!fs.existsSync(filePath)) {
      console.log('Not found:', file);
      continue;
    }
    const dataBuffer = fs.readFileSync(filePath);
    try {
      const data = await pdf(dataBuffer);
      const textPath = path.join(__dirname, 'scratch', file.replace('.pdf', '.txt'));
      if (!fs.existsSync(path.join(__dirname, 'scratch'))) {
        fs.mkdirSync(path.join(__dirname, 'scratch'));
      }
      fs.writeFileSync(textPath, data.text, 'utf8');
      console.log('Successfully extracted', file);
    } catch (err) {
      console.error('Error extracting', file, err);
    }
  }
}

extractAll();
