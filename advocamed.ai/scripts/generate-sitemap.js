import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.resolve(__dirname, '../data/hospitals.json');
const hospitals = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const blogPath = path.resolve(__dirname, '../data/blogPosts.ts');
const blogContent = fs.readFileSync(blogPath, 'utf8');
const blogIds = [...blogContent.matchAll(/id:\s*"([^"]+)"/g)].map(m => m[1]);

const DOMAIN = 'https://www.advocamed.com';
const today = new Date().toISOString().split('T')[0];

const staticPages = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: '/hospitals', priority: '0.9', changefreq: 'weekly' },
  { path: '/blog', priority: '0.9', changefreq: 'daily' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact-us', priority: '0.7', changefreq: 'monthly' },
  { path: '/disclaimer', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.6', changefreq: 'monthly' },
  { path: '/terms', priority: '0.6', changefreq: 'monthly' }
];

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(p => `  <url>
    <loc>${DOMAIN}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
${blogIds.map(id => `  <url>
    <loc>${DOMAIN}/blog/${id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${id.includes('2026') ? '0.9' : '0.8'}</priority>
  </url>`).join('\n')}
${hospitals.map(h => `  <url>
    <loc>${DOMAIN}/hospital/${h.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

  const publicPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(publicPath, sitemap);
  console.log(`✅ Sitemap updated! Total URLs: ${staticPages.length + blogIds.length + hospitals.length}`);
};

generateSitemap();
