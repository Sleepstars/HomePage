// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import { fetchLatestPosts, persistPosts, RSS_URL } from './scripts/rss-utils.js';

const BLOG_FEED_FILE = fileURLToPath(new URL('./src/content/blog/feed.json', import.meta.url));

/**
 * @param {import('astro').AstroIntegrationLogger} logger
 */
async function syncBlogFeed(logger) {
  try {
    logger.info(`Syncing blog feed from ${RSS_URL}`);
    const posts = await fetchLatestPosts();
    await persistPosts(posts, BLOG_FEED_FILE);
    logger.info(`Blog feed updated with ${posts.length} entries.`);
  } catch (error) {
    logger.warn(`Failed to update blog feed: ${error instanceof Error ? error.message : error}`);
  }
}

const blogFeedIntegration = {
  name: 'sleepstars-blog-feed-sync',
  hooks: {
    /** @param {{ logger: import('astro').AstroIntegrationLogger }} context */
    'astro:build:setup': async ({ logger }) => {
      await syncBlogFeed(logger);
    }
  }
};

// https://astro.build/config
export default defineConfig({
  site: 'https://sleepstars.net',
  vite: {
    plugins: [tailwindcss()]
  },

	integrations: [mdx(), blogFeedIntegration],

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true
    }
	}
});
