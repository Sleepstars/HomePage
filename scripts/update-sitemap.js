import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://sleepstars.net';
const PUBLIC_DIR = path.resolve('public');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');

// Get current timestamp in ISO format
const now = new Date().toISOString();

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Homepage -->
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${SITE_URL}/zh/"/>
    <image:image>
      <image:loc>${SITE_URL}/avatar.webp</image:loc>
      <image:title>Sleepstars - AI enthusiast and indie developer</image:title>
      <image:caption>Professional avatar photo of Sleepstars</image:caption>
    </image:image>
  </url>
  
  <!-- Chinese Homepage -->
  <url>
    <loc>${SITE_URL}/zh/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="zh" href="${SITE_URL}/zh/"/>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/"/>
    <image:image>
      <image:loc>${SITE_URL}/avatar.webp</image:loc>
      <image:title>Sleepstars - AI 爱好者与独立开发者</image:title>
      <image:caption>Sleepstars 的专业头像照片</image:caption>
    </image:image>
  </url>
  
  <!-- Projects Page -->
  <url>
    <loc>${SITE_URL}/projects/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/projects/"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${SITE_URL}/zh/projects/"/>
  </url>
  
  <!-- Chinese Projects Page -->
  <url>
    <loc>${SITE_URL}/zh/projects/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="zh" href="${SITE_URL}/zh/projects/"/>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/projects/"/>
  </url>

</urlset>`;

// Write sitemap to file
fs.writeFileSync(SITEMAP_PATH, sitemap);
console.log('✅ Sitemap updated successfully!');

// Also create an image sitemap
const imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <url>
    <loc>${SITE_URL}/</loc>
    <image:image>
      <image:loc>${SITE_URL}/avatar.webp</image:loc>
      <image:title>Sleepstars - AI enthusiast and indie developer</image:title>
      <image:caption>Professional avatar photo of Sleepstars, AI enthusiast and indie developer</image:caption>
      <image:license>https://sleepstars.net</image:license>
    </image:image>
    <image:image>
      <image:loc>${SITE_URL}/favicon.webp</image:loc>
      <image:title>Sleepstars Website Favicon</image:title>
      <image:caption>Favicon for Sleepstars personal website</image:caption>
    </image:image>
  </url>

</urlset>`;

const imageSitemapPath = path.join(PUBLIC_DIR, 'sitemap-images.xml');
fs.writeFileSync(imageSitemapPath, imageSitemap);
console.log('✅ Image sitemap created successfully!');
