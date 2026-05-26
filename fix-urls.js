const fs = require('fs');
const path = require('path');
const API_URL_REGEX = /(['"\`])http:\/\/localhost:5000\/api(.*?)\1/g;
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}
const files = walk('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('http://localhost:5000/api') && !file.includes('axios.js')) {
    content = content.replace(API_URL_REGEX, (match, p1, p2) => {
      return `\`\${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}${p2}\``;
    });
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
  }
});
