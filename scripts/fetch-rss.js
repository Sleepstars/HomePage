import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RSS_URL = 'https://blog.sleepstars.net/rss.xml';
const OUTPUT_FILE = path.join(__dirname, '../src/data/blog-posts.json');

async function fetchRSS() {
  try {
    console.log('Fetching RSS feed from:', RSS_URL);
    const response = await fetch(RSS_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS: ${response.status} ${response.statusText}`);
    }

    const xml = await response.text();
    const posts = parseRSS(xml);

    // Keep only the latest 5 posts
    const latestPosts = posts.slice(0, 5);

    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write to JSON file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(latestPosts, null, 2));

    console.log(`✅ Successfully fetched ${latestPosts.length} blog posts`);
    console.log('Posts saved to:', OUTPUT_FILE);

    return latestPosts;
  } catch (error) {
    console.error('Error fetching RSS:', error);
    process.exit(1);
  }
}

function parseRSS(xml) {
  const posts = [];

  // Simple regex-based XML parsing for RSS items
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  const titleRegex = /<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/;
  const linkRegex = /<link>(.*?)<\/link>/;
  const pubDateRegex = /<pubDate>(.*?)<\/pubDate>/;
  const descriptionRegex = /<description><!\[CDATA\[(.*?)\]\]><\/description>|<description>(.*?)<\/description>/;

  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const item = match[1];

    const titleMatch = item.match(titleRegex);
    const linkMatch = item.match(linkRegex);
    const pubDateMatch = item.match(pubDateRegex);
    const descriptionMatch = item.match(descriptionRegex);

    if (titleMatch && linkMatch) {
      const title = titleMatch[1] || titleMatch[2];
      const link = linkMatch[1];
      const pubDate = pubDateMatch ? pubDateMatch[1] : null;
      const description = descriptionMatch ? (descriptionMatch[1] || descriptionMatch[2]) : '';

      posts.push({
        title: title.trim(),
        link: link.trim(),
        pubDate: pubDate ? new Date(pubDate).toISOString() : null,
        description: description.trim().substring(0, 200) // Keep first 200 chars
      });
    }
  }

  // Sort by date (newest first)
  posts.sort((a, b) => {
    if (!a.pubDate) return 1;
    if (!b.pubDate) return -1;
    return new Date(b.pubDate) - new Date(a.pubDate);
  });

  return posts;
}

// Run the script
fetchRSS();
