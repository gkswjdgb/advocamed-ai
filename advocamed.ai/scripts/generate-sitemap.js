import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Data Source (Manually synced with data/hospitals.ts for pSEO strategy)
const hospitals = [
  { slug: "texas-health-resources", updated: "2025-12-27" },
  { slug: "cleveland-clinic", updated: "2025-12-27" },
  { slug: "kaiser-permanente", updated: "2025-12-27" }
];

const DOMAIN = 'https://www.advocamed.com';

// 2. Static Pages
const staticPages = [
  '',
  '/blog',
  '/hospitals', // Added Directory
  '/contact-us',
  '/privacy-policy',
  '/blog/how-to-apply-charity-care-2025',
  '/blog/understanding-cpt-codes',
  '/blog/no-surprises-act-guide'
];

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(url => `
    <url>
      <loc>${DOMAIN}${url}</loc>
      <changefreq>weekly</changefreq>
      <priority>${url === '' ? '1.0' : '0.8'}</priority>
    </url>
  `).join('')}

  ${hospitals
    .map(hospital => `
    <url>
      <loc>${DOMAIN}/hospital/${hospital.slug}</loc>
      <lastmod>${hospital.updated}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>
  `).join('')}
</urlset>`;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const publicPath = path.resolve(__dirname, '../public/sitemap.xml');

  const dir = path.dirname(publicPath);
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(publicPath, sitemap);
  console.log(`✅ Sitemap generated successfully at ${publicPath}`);
  console.log(`📊 Total pages: ${staticPages.length + hospitals.length}`);
};

generateSitemap();
