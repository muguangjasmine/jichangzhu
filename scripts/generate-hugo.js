const fs = require('fs');
const path = require('path');

console.log('🚀 开始生成标准 Hugo 项目结构与文章...');

// 确保目录存在
const dirs = [
  'archetypes',
  'assets/css',
  'assets/js',
  'content/start',
  'content/choose',
  'content/recommended',
  'content/airport-directory',
  'content/clients',
  'content/troubleshooting',
  'content/coupons',
  'content/faq',
  'layouts/_default',
  'layouts/partials',
  'layouts/shortcodes',
  'static',
  'themes'
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
});

// 1. 生成 hugo.toml
const hugoToml = `baseURL = 'https://jichangzhu.cyou/'
languageCode = 'zh-cn'
title = '机场主手册｜jichangzhu.cyou'
theme = ''

[params]
  description = '面向新手的代理订阅与客户端配置实用指南。核心解决机场怎么选、新手买机场、Clash订阅导入、节点选择与连接失败故障排查。'
  author = '机场主手册'
  tgLink = 'https://t.me/+bzZZ2fG31ntkY2U1'

[languages]
  [languages.zh]
    languageName = '简体中文'
    weight = 1

[menu]
  [[menu.main]]
    identifier = 'start'
    name = '新手开始'
    url = '/start/'
    weight = 1
  [[menu.main]]
    identifier = 'choose'
    name = '机场怎么选'
    url = '/choose/'
    weight = 2
  [[menu.main]]
    identifier = 'recommended'
    name = '四家主推'
    url = '/recommended/'
    weight = 3
  [[menu.main]]
    identifier = 'airport-directory'
    name = '28家资料库'
    url = '/airport-directory/'
    weight = 4
  [[menu.main]]
    identifier = 'clients'
    name = '客户端教程'
    url = '/clients/'
    weight = 5
  [[menu.main]]
    identifier = 'troubleshooting'
    name = '故障排查'
    url = '/troubleshooting/'
    weight = 6
  [[menu.main]]
    identifier = 'coupons'
    name = '优惠码'
    url = '/coupons/'
    weight = 7
  [[menu.main]]
    identifier = 'faq'
    name = '常见问题'
    url = '/faq/'
    weight = 8

[markup]
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = true
  [markup.tableOfContents]
    endLevel = 3
    ordered = false
    startLevel = 2
`;
fs.writeFileSync('hugo.toml', hugoToml, 'utf8');

// 2. 生成 go.mod
const goMod = `module github.com/muguangjasmine/jichangzhu

go 1.20
`;
fs.writeFileSync('go.mod', goMod, 'utf8');

// 3. 生成 archetypes/default.md
const defaultArchetype = `---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: false
description: ""
tags: []
categories: []
---
`;
fs.writeFileSync('archetypes/default.md', defaultArchetype, 'utf8');

// 4. 加载所有现有文章数据并写入 content/
const startArticles = require('./data/start-articles.js');
const chooseArticles = require('./data/choose-articles.js');
const recArticles = require('./data/recommended-articles.js');
const clientsArticles = require('./data/clients-articles.js');
const troubleArticles = require('./data/troubleshooting-articles.js');
const otherArticles = require('./data/other-articles.js');

function writeHugoArticle(relPath, meta, body) {
  const hugoPath = relPath.replace('pages/', 'content/').replace('.mdx', '.md');
  const dir = path.dirname(hugoPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const dateStr = '2026-10-01';
  const mdContent = `---
title: "${meta.title.replace(/"/g, '\\"')}"
description: "${meta.description.replace(/"/g, '\\"')}"
date: ${dateStr}
draft: false
---

# ${meta.h1 || meta.title}

${body.trim()}
`;
  fs.writeFileSync(hugoPath, mdContent, 'utf8');
}

startArticles.forEach(a => writeHugoArticle(a.path, a.meta, a.content));
chooseArticles.forEach(a => writeHugoArticle(a.path, a.meta, a.content));
recArticles.forEach(a => writeHugoArticle(a.path, a.meta, a.content));
clientsArticles.forEach(a => writeHugoArticle(a.path, a.meta, a.content));
troubleArticles.forEach(a => writeHugoArticle(a.path, a.meta, a.content));
Object.values(otherArticles).forEach(a => writeHugoArticle(a.path, a.meta, a.content));

// 5. 生成各个分区的 _index.md
const sections = [
  { dir: 'content/start', title: '新手开始', desc: '第一次买机场、订阅链接基础知识与常见新手误区解答。' },
  { dir: 'content/choose', title: '机场怎么选', desc: '机场套餐、流量配额、线路类型与节点选择标准全解析。' },
  { dir: 'content/recommended', title: '四家主推', desc: '梯子云、暮光加速、飞猫云、微风网络核心特性深度对比。' },
  { dir: 'content/clients', title: '客户端教程', desc: 'Clash Verge、Clash Meta、小火箭 Shadowrocket 等全平台客户端配置。' },
  { dir: 'content/troubleshooting', title: '故障排查', desc: '节点连接失败、订阅更新报错、DNS 污染及系统代理残留解决方案。' }
];

sections.forEach(s => {
  const content = `---
title: "${s.title}"
description: "${s.desc}"
---

欢迎查阅 **${s.title}** 专栏。以下为本专栏收录的全部保姆级实操指南：
`;
  fs.writeFileSync(path.join(s.dir, '_index.md'), content, 'utf8');
});

// 6. 生成 28家机场资料库 content/airport-directory/index.md
const airportsData = JSON.parse(fs.readFileSync('data/airports.json', 'utf8'));
const directoryMd = `---
title: "28家常用机场资料库：官网注册、优惠码与套餐节点核验｜机场主手册"
description: "收录28家常用机场官网正规注册链接、实时优惠码、起步价格、线路类型、节点覆盖与客户端支持情况。支持搜索与场景筛选。"
layout: "directory"
---
`;
fs.writeFileSync('content/airport-directory/index.md', directoryMd, 'utf8');

// 7. 生成 50 问 FAQ content/faq/index.md
const faqsTs = fs.readFileSync('data/faqs.ts', 'utf8');
const faqList = [];
const faqMatches = [...faqsTs.matchAll(/{\s*id:\s*(\d+),\s*category:\s*"([^"]+)",\s*question:\s*"([^"]+)",\s*answer:\s*"([^"]+)"\s*}/g)];
faqMatches.forEach(m => {
  faqList.push({ id: m[1], category: m[2], question: m[3], answer: m[4] });
});

let faqMd = `---
title: "新手常见问题速查 50 问（完全展开版）｜机场主手册"
description: "汇集50个新手机场常见疑问，完全展开无需点击折叠。涵盖买机场、节点选择、Clash/小火箭配置、延迟高排错等全流程。"
---

# 新手机场常见问题速查 50 问（完全展开版）

为了方便新手读者快速定位问题，本页面汇集了 **50 个高频疑问** 并全部保持**直接展开状态**（无需点击折叠或手风琴），你可以通过浏览或使用浏览器搜索键（\`Ctrl + F\`）快速定位解决方案。

---

`;

let currentCat = '';
faqList.forEach(f => {
  if (f.category !== currentCat) {
    currentCat = f.category;
    faqMd += `\n## 【${currentCat}】相关疑问\n\n`;
  }
  faqMd += `### Q${f.id}：${f.question}\n\n**解答：** ${f.answer}\n\n`;
});
fs.writeFileSync('content/faq/index.md', faqMd, 'utf8');

console.log('✅ content/ 文章与目录生成完毕！');
