import fs from 'fs';

let contentStr = fs.readFileSync('src/data/content.js', 'utf8');

// Find the start and end of the CASE_STUDIES array
const startIndex = contentStr.indexOf('export const CASE_STUDIES = [');
if (startIndex === -1) {
  console.error("CASE_STUDIES not found");
  process.exit(1);
}

// Removing Latur Mahanagar Palika
let idToFind = 'id: "latur-mahanagar-palika"';
let objectStart = contentStr.lastIndexOf('{', contentStr.indexOf(idToFind));
let bracketCount = 1;
let objectEnd = objectStart + 1;
while (bracketCount > 0 && objectEnd < contentStr.length) {
  if (contentStr[objectEnd] === '{') bracketCount++;
  if (contentStr[objectEnd] === '}') bracketCount--;
  objectEnd++;
}
if (contentStr[objectEnd] === ',') objectEnd++; // remove trailing comma
contentStr = contentStr.substring(0, objectStart) + contentStr.substring(objectEnd);

// Removing Nashik Mahanagar Palika
idToFind = 'id: "nashik-mahanagar-palika"';
objectStart = contentStr.lastIndexOf('{', contentStr.indexOf(idToFind));
bracketCount = 1;
objectEnd = objectStart + 1;
while (bracketCount > 0 && objectEnd < contentStr.length) {
  if (contentStr[objectEnd] === '{') bracketCount++;
  if (contentStr[objectEnd] === '}') bracketCount--;
  objectEnd++;
}
if (contentStr[objectEnd] === ',') objectEnd++; // remove trailing comma
contentStr = contentStr.substring(0, objectStart) + contentStr.substring(objectEnd);


// Fix potential double commas or formatting issues simply by writing back
fs.writeFileSync('src/data/content.js', contentStr);
console.log('Successfully removed the two case studies.');
