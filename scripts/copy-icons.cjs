#!/usr/bin/env node
// Copy selected Simple Icons SVGs into public/icons for local use
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'node_modules', 'simple-icons', 'icons');
const DEST_DIR = path.join(ROOT, 'public', 'icons');

const SLUGS = [
  'github',
  'telegram',
  'youtube',
  'mastodon',
  'x',
  'instagram',
  'gmail'
];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function cleanSvg(content) {
  // Remove <title> for size; ensure no fill hardcoding to allow currentColor
  return content
    .replace(/<title>.*?<\/title>/g, '')
    .replace(/\s+fill="#[0-9A-Fa-f]{3,6}"/g, '')
    .replace(/<svg([^>]*?)>/, '<svg$1 fill="currentColor">');
}

function copyIcon(slug) {
  const src = path.join(SRC_DIR, `${slug}.svg`);
  const dest = path.join(DEST_DIR, `${slug}.svg`);
  try {
    const raw = fs.readFileSync(src, 'utf8');
    const cleaned = cleanSvg(raw);
    fs.writeFileSync(dest, cleaned, 'utf8');
    console.log(`Copied: ${slug}`);
  } catch (err) {
    console.error(`Failed to copy icon '${slug}':`, err.message);
    process.exitCode = 1;
  }
}

function main() {
  ensureDir(DEST_DIR);
  SLUGS.forEach(copyIcon);
}

main();
