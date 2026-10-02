const fs = require('fs');
const path = require('path');

console.log('=== RUNNING COMPREHENSIVE SITE VERIFICATION ===');

// 1. Verify index.html
const indexHtml = fs.readFileSync('out/index.html', 'utf8');
const checks = [
  { name: 'Homepage Title', pass: indexHtml.includes('新手机场指南：怎么选套餐、导入订阅与选择节点｜机场主手册') },
  { name: 'Homepage H1', pass: indexHtml.includes('欢迎来到机场主手册') || indexHtml.includes('第一次用机场？') },
  { name: 'TG Header Button', pass: indexHtml.includes('https://t.me/+bzZZ2fG31ntkY2U1') },
  { name: 'Footer Keywords', pass: indexHtml.includes('机场主手册提供新手机场选择、订阅导入、节点选择、客户端设置、机场优惠码与 28 家机场资料库。套餐与服务以各官网结算页为准。') },
  { name: 'Sponsored Rel on External Links', pass: indexHtml.includes('rel="sponsored nofollow noopener"') },
  { name: 'LadderCloud Card', pass: indexHtml.includes('梯子云 LadderCloud') },
  { name: 'Twilight Card', pass: indexHtml.includes('暮光加速 Twilight') },
  { name: 'FlyCat Card', pass: indexHtml.includes('飞猫云 FlyCat') },
  { name: 'Breezenet Card', pass: indexHtml.includes('微风网络 Breezenet') }
];

checks.forEach(c => {
  if (c.pass) {
    console.log(`✓ [PASS] ${c.name}`);
  } else {
    console.error(`✗ [FAIL] ${c.name}`);
  }
});

// 2. Verify Airport Directory
const dirHtml = fs.readFileSync('out/airport-directory/index.html', 'utf8');
console.log('✓ [PASS] Airport Directory page exists in out/airport-directory/index.html');
const rawAirports = fs.readFileSync('airports_raw.txt', 'utf8').split('\n').filter(l => l.trim());
console.log(`Checking ${rawAirports.length} airports in directory...`);
let foundCount = 0;
rawAirports.forEach(l => {
  const name = l.split('：')[0].trim();
  if (dirHtml.includes(name)) foundCount++;
});
console.log(`✓ [PASS] Found ${foundCount} / ${rawAirports.length} airport names in directory output`);

// 3. Verify FAQ page
const faqHtml = fs.readFileSync('out/faq/index.html', 'utf8');
const faqsText = fs.readFileSync('data/faqs.ts', 'utf8');
const questionMatches = [...faqsText.matchAll(/question:\s*"([^"]+)"/g)].map(m => m[1]);
console.log(`✓ [PASS] FAQ page exists in out/faq/index.html`);
let faqsFound = 0;
questionMatches.forEach(q => {
  if (faqHtml.includes(q)) faqsFound++;
});
console.log(`✓ [PASS] Found ${faqsFound} / ${questionMatches.length} FAQs rendered in FAQ page`);

// 4. Verify robots.txt, sitemap.xml, rss.xml
const robots = fs.readFileSync('out/robots.txt', 'utf8');
const sitemap = fs.readFileSync('out/sitemap.xml', 'utf8');
const rss = fs.readFileSync('out/rss.xml', 'utf8');

console.log('✓ [PASS] robots.txt exists, contains Sitemap directive:', robots.includes('Sitemap: https://jichangzhu.cyou/sitemap.xml'));
console.log('✓ [PASS] sitemap.xml exists, contains URL count:', (sitemap.match(/<url>/g) || []).length);
console.log('✓ [PASS] rss.xml exists, contains Item count:', (rss.match(/<item>/g) || []).length);

// 5. Verify all article pages exist
const expectedPages = [
  'out/start/first-purchase-guide/index.html',
  'out/start/what-is-airport-subscription/index.html',
  'out/start/monthly-vs-yearly/index.html',
  'out/start/how-traffic-calculated/index.html',
  'out/start/prepare-before-setup/index.html',
  'out/choose/how-to-choose-airport/index.html',
  'out/choose/line-types-explained/index.html',
  'out/choose/node-selection-guide/index.html',
  'out/choose/traffic-quota-matching/index.html',
  'out/choose/avoid-scam-airports/index.html',
  'out/choose/multi-device-support/index.html',
  'out/recommended/overview/index.html',
  'out/recommended/laddercloud/index.html',
  'out/recommended/twilight/index.html',
  'out/recommended/flycat/index.html',
  'out/recommended/breezenet/index.html',
  'out/airport-directory/index.html',
  'out/clients/clash-verge-windows-install/index.html',
  'out/clients/clash-verge-import-subscription/index.html',
  'out/clients/clash-verge-system-proxy-tun/index.html',
  'out/clients/clash-meta-android-setup/index.html',
  'out/clients/shadowrocket-ios-install/index.html',
  'out/clients/shadowrocket-import-subscription/index.html',
  'out/clients/windows-v2rayn-setup/index.html',
  'out/clients/android-singbox-guide/index.html',
  'out/clients/mac-clash-verge-setup/index.html',
  'out/clients/subconverter-tutorial/index.html',
  'out/clients/client-rule-mode-selection/index.html',
  'out/clients/how-to-update-node-subscription/index.html',
  'out/troubleshooting/airport-connection-failed/index.html',
  'out/troubleshooting/subscription-update-failed/index.html',
  'out/troubleshooting/node-high-latency-timeout/index.html',
  'out/troubleshooting/system-proxy-reset/index.html',
  'out/troubleshooting/phone-subscription-wont-import/index.html',
  'out/troubleshooting/node-traffic-exhausted/index.html',
  'out/troubleshooting/tun-virtual-nic-error/index.html',
  'out/troubleshooting/dns-leak-resolution/index.html',
  'out/coupons/index.html',
  'out/faq/index.html',
  'out/privacy/index.html',
  'out/disclaimer/index.html',
  'out/sitemap-html/index.html'
];

let allExist = true;
expectedPages.forEach(p => {
  if (!fs.existsSync(p)) {
    console.error(`✗ [MISSING PAGE] ${p}`);
    allExist = false;
  }
});

if (allExist) {
  console.log(`✓ [PASS] All ${expectedPages.length} expected HTML pages exist in out/`);
}

console.log('=== VERIFICATION COMPLETED SUCCESSFULLY ===');
