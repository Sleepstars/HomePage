import fs from 'node:fs/promises';
import path from 'node:path';

export const RSS_URL = 'https://blog.sleepstars.net/rss.xml';

export function parseRSS(xml) {
  const posts = [];
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
      const description = descriptionMatch ? descriptionMatch[1] || descriptionMatch[2] : '';

      posts.push({
        title: title.trim(),
        link: link.trim(),
        pubDate: pubDate ? new Date(pubDate).toISOString() : null,
        description: description.trim().substring(0, 200)
      });
    }
  }

  posts.sort((a, b) => {
    if (!a.pubDate) return 1;
    if (!b.pubDate) return -1;
    return new Date(b.pubDate) - new Date(a.pubDate);
  });

  return posts;
}

export async function fetchLatestPosts(fetchImpl = fetch) {
  const response = await fetchImpl(RSS_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch RSS: ${response.status} ${response.statusText}`);
  }

  const xml = await response.text();
  return parseRSS(xml).slice(0, 5);
}

export async function persistPosts(posts, outputFile) {
  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  await fs.writeFile(outputFile, JSON.stringify(posts, null, 2));
}
