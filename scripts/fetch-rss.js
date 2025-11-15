import path from 'path';
import { fileURLToPath } from 'url';
import { fetchLatestPosts, persistPosts, RSS_URL } from './rss-utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_FILE = path.join(__dirname, '../src/content/blog/feed.json');

async function fetchRSS() {
  try {
    console.log('Fetching RSS feed from:', RSS_URL);
    const latestPosts = await fetchLatestPosts();
    await persistPosts(latestPosts, OUTPUT_FILE);

    console.log(`✅ Successfully fetched ${latestPosts.length} blog posts`);
    console.log('Posts saved to:', OUTPUT_FILE);

    return latestPosts;
  } catch (error) {
    console.error('Error fetching RSS:', error);
    process.exit(1);
  }
}

// Run the script
fetchRSS();
