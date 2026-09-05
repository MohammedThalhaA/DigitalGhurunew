const fs = require('fs');
const pagePath = 'app/(marketing)/courses/[slug]/page.tsx';
let page = fs.readFileSync(pagePath, 'utf8');

const newCourses = require('./new_courses_data.js');
const newCoursesStr = Object.entries(newCourses).map(([key, data]) => {
  return `  "${key}": ${JSON.stringify(data, null, 4)}`;
}).join(',\n');

// Find the last closing brace of courseMap
const courseMapStart = page.indexOf('const courseMap: Record<string, CourseData> = {');
let openBraces = 0;
let insertionPoint = -1;

for (let i = courseMapStart; i < page.length; i++) {
  if (page[i] === '{') openBraces++;
  if (page[i] === '}') {
    openBraces--;
    if (openBraces === 0) {
      insertionPoint = i;
      break;
    }
  }
}

if (insertionPoint !== -1) {
  page = page.slice(0, insertionPoint) + ',\n' + newCoursesStr + '\n' + page.slice(insertionPoint);
  fs.writeFileSync(pagePath, page, 'utf8');
  console.log('Successfully injected courses into courseMap');
} else {
  console.error('Could not find insertion point');
}
