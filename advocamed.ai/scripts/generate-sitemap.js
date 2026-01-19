
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup paths in ES Module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Read the external data store
const jsonPath = path.resolve(__dirname, '../data/hospitals.json');
const rawData = fs.readFileSync(jsonPath, 'utf8');
const hospitals = JSON.parse(rawData);

const DOMAIN = 'https://www.advocamed.com';

// 2. Static Pages & Blog Posts
// QA Fix: Added missing blog posts to ensure full indexing
const staticPages = [
  '',
  '/blog',
  '/about', // NEW: Added About page
  '/hospitals',
  '/contact-us',
  '/privacy-policy',
  '/blog/trump-healthcare-plan-2026', // NEW: Newsjacking Post
  '/blog/how-to-dispute-medical-bill-errors',
  '/blog/explanation-of-benefits-guide',
  '/blog/how-to-apply-charity-care-2025',
  '/blog/understanding-cpt-codes',
  '/blog/no-surprises-act-guide',
  '/blog/medical-bill-negotiation-scripts',
  '/blog/itemized-bill-secret-weapon',
  '/blog/medical-debt-statute-limitations'
];

const generateSitemap = () => {
  console.log(`🔍 Generating sitemap for ${hospitals.length} hospitals...`);

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
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>
  `).join('')}
</urlset>`;

  const publicPath = path.resolve(__dirname, '../public/sitemap.xml');

  const dir = path.dirname(publicPath);
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(publicPath, sitemap);
  console.log(`✅ Sitemap updated! Total URLs: ${staticPages.length + hospitals.length}`);
};

generateSitemap();
