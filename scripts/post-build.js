const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://jichangzhu.cyou';

// 1. Gather all pages
function getPages(dir, baseRoute = '') {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(getPages(filePath, `${baseRoute}/${file}`));
    } else if (file.endsWith('.mdx') || file.endsWith('.tsx') || file.endsWith('.js')) {
      if (file.startsWith('_')) continue;
      let route = `${baseRoute}/${file.replace(/\.(mdx|tsx|js)$/, '')}`;
      if (route.endsWith('/index')) {
        route = route.slice(0, -6);
      }
      if (route === '') route = '/';
      // Ensure trailing slash if not root
      const finalRoute = route === '/' ? '/' : `${route}/`;
      
      // Read title and description if available
      let title = '机场主手册';
      let desc = '';
      if (file.endsWith('.mdx')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const titleMatch = content.match(/title:\s*"([^"]+)"/);
        const descMatch = content.match(/description:\s*"([^"]+)"/);
        if (titleMatch) title = titleMatch[1];
        if (descMatch) desc = descMatch[1];
      }

      results.push({
        route: finalRoute,
        url: `${DOMAIN}${finalRoute}`,
        title,
        desc,
        lastmod: new Date().toISOString().split('T')[0]
      });
    }
  }
  return results;
}

const allPages = getPages('pages');
// Deduplicate by route
const uniquePages = [];
const seenRoutes = new Set();
for (const p of allPages) {
  if (!seenRoutes.has(p.route)) {
    seenRoutes.add(p.route);
    uniquePages.push(p);
  }
}

// 2. Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml
`;

// 3. Generate sitemap.xml
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniquePages.map(p => `  <url>
    <loc>${p.url}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${p.route === '/' ? '1.0' : p.route.includes('/airport-directory/') ? '0.9' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>
`;

// 4. Generate rss.xml
const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>机场主手册</title>
    <link>${DOMAIN}</link>
    <description>面向新手的代理订阅与客户端配置实用指南</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${DOMAIN}/rss.xml" rel="self" type="application/rss+xml"/>
${uniquePages.filter(p => p.route !== '/' && !p.route.includes('/privacy') && !p.route.includes('/disclaimer')).slice(0, 30).map(p => `    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${p.url}</link>
      <guid>${p.url}</guid>
      <description><![CDATA[${p.desc}]]></description>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>`).join('\n')}
  </channel>
</rss>
`;

// Ensure public directory exists
if (!fs.existsSync('public')) fs.mkdirSync('public', { recursive: true });

fs.writeFileSync('public/robots.txt', robotsTxt, 'utf8');
fs.writeFileSync('public/sitemap.xml', sitemapXml, 'utf8');
fs.writeFileSync('public/rss.xml', rssXml, 'utf8');

console.log('Generated robots.txt, sitemap.xml (with', uniquePages.length, 'pages), and rss.xml into public/');

// If out directory exists (after build), copy into out
if (fs.existsSync('out')) {
  fs.writeFileSync('out/robots.txt', robotsTxt, 'utf8');
  fs.writeFileSync('out/sitemap.xml', sitemapXml, 'utf8');
  fs.writeFileSync('out/rss.xml', rssXml, 'utf8');
  console.log('Copied SEO files to out/');
}
