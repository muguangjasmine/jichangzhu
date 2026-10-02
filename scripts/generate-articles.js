const fs = require('fs');
const path = require('path');

function countChineseChars(text) {
  // Strip frontmatter
  const stripped = text.replace(/---[\s\S]*?---/, '').replace(/<[^>]+>/g, '').replace(/```[\s\S]*?```/g, '');
  const matches = stripped.match(/[\u4e00-\u9fa5]/g);
  return matches ? matches.length : 0;
}

// Ensure directories exist
const dirs = [
  'pages/start',
  'pages/choose',
  'pages/recommended',
  'pages/airport-directory',
  'pages/clients',
  'pages/troubleshooting',
  'pages/coupons',
  'pages/faq'
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

console.log('Directories ready.');
