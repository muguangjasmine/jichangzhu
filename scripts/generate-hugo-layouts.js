const fs = require('fs');
const path = require('path');

if (!fs.existsSync('layouts/_default')) fs.mkdirSync('layouts/_default', { recursive: true });
if (!fs.existsSync('layouts/partials')) fs.mkdirSync('layouts/partials', { recursive: true });
if (!fs.existsSync('layouts/airport-directory')) fs.mkdirSync('layouts/airport-directory', { recursive: true });

// 1. layouts/partials/head.html
const headHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ if .IsHome }}{{ .Site.Title }}{{ else }}{{ .Title }} – {{ .Site.Title }}{{ end }}</title>
  <meta name="description" content="{{ with .Description }}{{ . }}{{ else }}{{ .Site.Params.description }}{{ end }}">
  <link rel="canonical" href="{{ .Permalink }}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="{{ if .IsHome }}{{ .Site.Title }}{{ else }}{{ .Title }}{{ end }}">
  <meta property="og:description" content="{{ with .Description }}{{ . }}{{ else }}{{ .Site.Params.description }}{{ end }}">
  <meta property="og:url" content="{{ .Permalink }}">
  <meta property="og:type" content="{{ if .IsPage }}article{{ else }}website{{ end }}">
  <meta property="og:site_name" content="机场主手册">
  
  <!-- CSS -->
  <link rel="stylesheet" href="/css/main.css">
  <script>
    // Theme initialization
    const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  </script>
</head>
<body class="bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors">
`;
fs.writeFileSync('layouts/partials/head.html', headHtml, 'utf8');

// 2. layouts/partials/header.html
const headerHtml = `<header class="site-header">
  <div class="header-inner max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
    <div class="header-left flex items-center gap-6">
      <a href="/" class="brand-logo flex items-center gap-2 text-xl font-extrabold text-slate-900 dark:text-white no-underline">
        <span class="badge-tag bg-blue-600 text-white text-xs px-2 py-0.5 rounded">手册</span>
        <span>机场主手册</span>
      </a>
      <nav class="main-nav hidden md:flex items-center gap-4 text-sm font-medium">
        {{ range .Site.Menus.main }}
          <a href="{{ .URL }}" class="nav-link text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 no-underline">{{ .Name }}</a>
        {{ end }}
      </nav>
    </div>
    <div class="header-right flex items-center gap-3">
      <!-- Search Input -->
      <div class="search-box relative hidden sm:block">
        <input type="text" id="site-search-input" placeholder="全站搜索教程、排错..." class="search-input text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
      <!-- Theme Switch -->
      <button id="theme-toggle" class="theme-btn text-xs px-2.5 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer flex items-center gap-1.5" title="切换主题">
        <span id="theme-icon">☼</span>
        <span id="theme-text">主题</span>
      </button>
      <!-- Contact TG -->
      <a href="{{ .Site.Params.tgLink }}" target="_blank" rel="sponsored nofollow noopener" class="tg-btn text-xs font-semibold px-3 py-1.5 rounded-md border border-blue-200 bg-blue-50 text-blue-600 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-300 flex items-center gap-1.5 no-underline">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .36z"/></svg>
        <span>联系 TG</span>
      </a>
    </div>
  </div>
</header>
`;
fs.writeFileSync('layouts/partials/header.html', headerHtml, 'utf8');

// 3. layouts/partials/footer.html
const footerHtml = `<footer class="site-footer bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-10 mt-16 text-center text-sm text-slate-600 dark:text-slate-400">
  <div class="max-w-4xl mx-auto px-4">
    <p class="mb-4 leading-relaxed">
      机场主手册提供新手机场选择、订阅导入、节点选择、客户端设置、机场优惠码与 28 家机场资料库。套餐与服务以各官网结算页为准。
    </p>
    <div class="flex justify-center flex-wrap gap-4 my-3 text-xs">
      <a href="/privacy/" class="hover:underline text-slate-700 dark:text-slate-300">隐私政策</a>
      <a href="/disclaimer/" class="hover:underline text-slate-700 dark:text-slate-300">免责声明</a>
      <a href="/sitemap-html/" class="hover:underline text-slate-700 dark:text-slate-300">站点地图</a>
      <a href="{{ .Site.Params.tgLink }}" target="_blank" rel="sponsored nofollow noopener" class="hover:underline text-blue-600 dark:text-blue-400 font-semibold">联系 Telegram</a>
    </div>
    <p class="mt-4 text-xs text-slate-400">
      © {{ now.Format "2006" }} 机场主手册 jichangzhu.cyou · 保留所有权利
    </p>
  </div>
</footer>
<script src="/js/main.js"></script>
</body>
</html>
`;
fs.writeFileSync('layouts/partials/footer.html', footerHtml, 'utf8');

// 4. layouts/_default/baseof.html
const baseofHtml = `{{ partial "head.html" . }}
{{ partial "header.html" . }}
<main class="main-content max-w-5xl mx-auto px-4 py-8">
  {{ block "main" . }}{{ end }}
</main>
{{ partial "footer.html" . }}
`;
fs.writeFileSync('layouts/_default/baseof.html', baseofHtml, 'utf8');

// 5. layouts/_default/single.html
const singleHtml = `{{ define "main" }}
<article class="article-container bg-white dark:bg-slate-800 rounded-xl p-6 md:p-10 shadow-sm border border-slate-100 dark:border-slate-700/60">
  <div class="article-breadcrumb text-xs text-slate-500 mb-4">
    <a href="/" class="hover:underline">首页</a> / 
    {{ with .Parent }}<a href="{{ .Permalink }}" class="hover:underline">{{ .Title }}</a> / {{ end }}
    <span>正文</span>
  </div>
  
  <div class="article-content prose dark:prose-invert max-w-none">
    {{ .Content }}
  </div>

  <div class="article-footer border-t border-slate-100 dark:border-slate-700/80 pt-6 mt-10 flex justify-between items-center text-xs text-slate-500">
    <div>更新日期：{{ .Date.Format "2006-01-02" }}</div>
    <a href="javascript:history.back()" class="text-blue-600 dark:text-blue-400 hover:underline">← 返回上一页</a>
  </div>
</article>
{{ end }}
`;
fs.writeFileSync('layouts/_default/single.html', singleHtml, 'utf8');

// 6. layouts/_default/list.html
const listHtml = `{{ define "main" }}
<div class="section-container">
  <div class="section-header mb-8 text-center">
    <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">{{ .Title }}</h1>
    {{ with .Description }}<p class="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm">{{ . }}</p>{{ end }}
  </div>

  <div class="article-grid grid gap-4 md:grid-cols-2">
    {{ range .Pages }}
      <a href="{{ .Permalink }}" class="article-card block p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition no-underline">
        <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">{{ .Title }}</h2>
        <p class="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">{{ .Description }}</p>
        <span class="text-xs text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1">阅读全文 →</span>
      </a>
    {{ end }}
  </div>
</div>
{{ end }}
`;
fs.writeFileSync('layouts/_default/list.html', listHtml, 'utf8');

// 7. layouts/index.html (Homepage matching Image 2 & Image 1 content)
const indexHtml = `{{ define "main" }}
<!-- Hero Section -->
<section class="hero-section text-center py-10 px-4 mb-10 rounded-2xl bg-gradient-to-b from-sky-50 to-white dark:from-slate-800 dark:to-slate-900 border border-sky-100 dark:border-slate-700">
  <div class="max-w-3xl mx-auto">
    <span class="badge-pill inline-block text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-300 mb-4">
      面向新手的实用手册
    </span>
    <h1 class="hero-h1 text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-relaxed mb-4">
      欢迎来到机场主手册，我们专注于为第一次接触代理订阅与跨国网络互联的中文读者提供轻量、清晰且完全落地的操作指南。
    </h1>
    <p class="hero-sub text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
      本手册核心解决“新手机场指南：套餐怎么选、第一次买机场注意什么、Clash订阅导入步骤、代理节点怎么选，以及节点连接失败怎么办”。我们不做任何 AI 账号解锁或影视流媒体解锁话题，全站定位于纯粹的代理订阅配置与节点选择手册。
    </p>
    <div class="hero-btns flex flex-wrap justify-center gap-2.5">
      <a href="#featured-airports" class="btn btn-primary">查看四家主推推荐</a>
      <a href="/choose/" class="btn btn-outline">机场怎么选</a>
      <a href="/recommended/" class="btn btn-secondary">比较4家主推机场</a>
      <a href="/airport-directory/" class="btn btn-light">查看全部28家机场</a>
      <a href="/clients/" class="btn btn-ghost">客户端入门</a>
    </div>
  </div>
</section>

<!-- Quick Navigation Table -->
<section class="quick-nav-section mb-12 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200/80 dark:border-slate-700">
  <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-4">快速导航：新手最常查找的内容</h2>
  <div class="table-responsive overflow-x-auto">
    <table class="w-full text-left text-sm border-collapse">
      <thead>
        <tr class="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
          <th class="p-3 font-semibold">阶段分类</th>
          <th class="p-3 font-semibold">你可能遇到的痛点</th>
          <th class="p-3 font-semibold">快速解决入口</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
        <tr>
          <td class="p-3 font-bold">第一次买</td>
          <td class="p-3 text-slate-600 dark:text-slate-400">面对几十家服务商不知道哪家靠谱、怕跑路</td>
          <td class="p-3"><a href="/start/first-purchase-guide/" class="text-blue-600 hover:underline">新手避坑与四步购买法</a></td>
        </tr>
        <tr>
          <td class="p-3 font-bold">套餐选择</td>
          <td class="p-3 text-slate-600 dark:text-slate-400">纠结买月付还是年付、不知道要用多少流量</td>
          <td class="p-3"><a href="/start/monthly-vs-yearly/" class="text-blue-600 hover:underline">月付年付试错分析</a> · <a href="/choose/traffic-quota-matching/" class="text-blue-600 hover:underline">流量规划</a></td>
        </tr>
        <tr>
          <td class="p-3 font-bold">导入配置</td>
          <td class="p-3 text-slate-600 dark:text-slate-400">买了套餐不知道订阅链接如何导入软件</td>
          <td class="p-3"><a href="/clients/clash-verge-import-subscription/" class="text-blue-600 hover:underline">Clash Verge 导入教程</a> · <a href="/clients/shadowrocket-import-subscription/" class="text-blue-600 hover:underline">小火箭导入教程</a></td>
        </tr>
        <tr>
          <td class="p-3 font-bold">连不上网</td>
          <td class="p-3 text-slate-600 dark:text-slate-400">节点全部变红、超时、关掉软件后电脑断网</td>
          <td class="p-3"><a href="/troubleshooting/airport-connection-failed/" class="text-blue-600 hover:underline">五步排错指南</a> · <a href="/troubleshooting/system-proxy-reset/" class="text-blue-600 hover:underline">Win代理残留修复</a></td>
        </tr>
        <tr>
          <td class="p-3 font-bold">优惠省钱</td>
          <td class="p-3 text-slate-600 dark:text-slate-400">结账时寻找有效折扣码、核实套餐底价</td>
          <td class="p-3"><a href="/coupons/" class="text-blue-600 hover:underline">机场优惠码怎么用</a> · <a href="/airport-directory/" class="text-blue-600 hover:underline">28家机场资料库</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<!-- Featured Airports Cards -->
<section id="featured-airports" class="featured-section mb-12">
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white">四家主推服务商：不同场景与独立选择</h2>
    <a href="/recommended/" class="text-xs font-semibold text-blue-600 hover:underline">查看完整横向对比 →</a>
  </div>
  
  <div class="grid gap-6 md:grid-cols-2">
    <!-- Card 1: 梯子云 -->
    <div class="card p-6 rounded-xl bg-white dark:bg-slate-800 border-2 border-blue-500/80 shadow-sm relative flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="font-extrabold text-xl text-slate-900 dark:text-white">1. 梯子云 LadderCloud</span>
          <span class="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">优惠码 85折</span>
        </div>
        <p class="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-3">主力推荐 · 高速专线与全协议支持</p>
        <div class="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 mb-4">
          <p><strong>起步价格/流量：</strong> 约 ¥15/月（80G起），支持灵活按月试用</p>
          <p><strong>线路与节点：</strong> BGP 入口 + IEPL 专线，覆盖港台日新美韩主流地区</p>
          <p><strong>适合人群：</strong> 追求全天候低延迟、主力生产力与跨境高频查资料用户</p>
        </div>
      </div>
      <div class="flex gap-2 mt-2">
        <a href="https://tiziyun.net/#/register?code=wLh2jVfP" target="_blank" rel="sponsored nofollow noopener" class="btn btn-primary flex-1 text-center">进入官网注册</a>
        <a href="/recommended/laddercloud/" class="btn btn-outline text-center">查看评测</a>
      </div>
    </div>

    <!-- Card 2: 暮光加速 -->
    <div class="card p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm relative flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="font-extrabold text-xl text-slate-900 dark:text-white">2. 暮光加速 Twilight</span>
          <span class="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">优惠码 9折</span>
        </div>
        <p class="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-3">大流量轻量选型 · 节点丰富稳定</p>
        <div class="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 mb-4">
          <p><strong>起步价格/流量：</strong> 约 ¥12/月（100G起），提供年付额外优惠</p>
          <p><strong>线路与节点：</strong> 优质隧道中转线路，晚高峰稳定性良好</p>
          <p><strong>适合人群：</strong> 适合多设备日常查阅技术文档、浏览海外资讯与学术检索</p>
        </div>
      </div>
      <div class="flex gap-2 mt-2">
        <a href="https://muguang.me/#/register?code=xkWd9LzP" target="_blank" rel="sponsored nofollow noopener" class="btn btn-secondary flex-1 text-center">进入官网注册</a>
        <a href="/recommended/twilight/" class="btn btn-outline text-center">查看评测</a>
      </div>
    </div>

    <!-- Card 3: 飞猫云 -->
    <div class="card p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm relative flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="font-extrabold text-xl text-slate-900 dark:text-white">3. 飞猫云 FlyCat</span>
          <span class="bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200 text-xs px-2 py-0.5 rounded-full">原价享直降</span>
        </div>
        <p class="text-xs text-sky-600 dark:text-sky-400 font-semibold mb-3">性价比入门 · 操作简单新手友好</p>
        <div class="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 mb-4">
          <p><strong>起步价格/流量：</strong> 约 ¥9.9/月（50G起），极低门槛体验</p>
          <p><strong>线路与节点：</strong> 优化中转线路，支持一键导入 Clash / 小火箭</p>
          <p><strong>适合人群：</strong> 预算有限、轻量偶发使用及刚接触代理订阅的新手读者</p>
        </div>
      </div>
      <div class="flex gap-2 mt-2">
        <a href="https://feimaoyun.com/#/register?code=fm2026" target="_blank" rel="sponsored nofollow noopener" class="btn btn-primary flex-1 text-center">进入官网注册</a>
        <a href="/recommended/flycat/" class="btn btn-outline text-center">查看评测</a>
      </div>
    </div>

    <!-- Card 4: 微风网络 -->
    <div class="card p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm relative flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="font-extrabold text-xl text-slate-900 dark:text-white">4. 微风网络 Breezenet</span>
          <span class="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">优惠码 9折</span>
        </div>
        <p class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mb-3">稳定老牌中转 · 客服与文档完善</p>
        <div class="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 mb-4">
          <p><strong>起步价格/流量：</strong> 约 ¥18/月（120G起），支持多端同时在线</p>
          <p><strong>线路与节点：</strong> 多线 BGP 入口与专线备份，容灾能力强</p>
          <p><strong>适合人群：</strong> 重视服务持久度、不希望频繁更换订阅链接的长期用户</p>
        </div>
      </div>
      <div class="flex gap-2 mt-2">
        <a href="https://weifengcloud.com/#/register?code=wf888" target="_blank" rel="sponsored nofollow noopener" class="btn btn-secondary flex-1 text-center">进入官网注册</a>
        <a href="/recommended/breezenet/" class="btn btn-outline text-center">查看评测</a>
      </div>
    </div>
  </div>
</section>

<!-- 50 FAQ summary CTA -->
<section class="faq-summary-cta text-center p-8 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
  <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-2">50 个高频问题完全展开速查</h2>
  <p class="text-xs md:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed">
    如果你遇到了具体的设置或名词疑问，可直接访问我们的常见问题速查专栏，页面汇集了 50 个完全展开、不折叠的专业解答，涵盖新手买机场、月付年付、节点延迟、客户端分流及退款维权全流程。
  </p>
  <a href="/faq/" class="btn btn-primary inline-block">查阅 50 问速查专栏 →</a>
</section>
{{ end }}
`;
fs.writeFileSync('layouts/index.html', indexHtml, 'utf8');

// 8. layouts/airport-directory/directory.html (Interactive 28 airports directory)
const directoryLayoutHtml = `{{ define "main" }}
<div class="directory-container">
  <div class="directory-header text-center mb-8">
    <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">28 家常用机场资料库检索与核验</h1>
    <p class="text-slate-600 dark:text-slate-400 text-sm max-w-2xl mx-auto">
      本资料库整理收录 28 家常用机场服务商的正规官网注册入口、已知起步资费、线路规格与优惠代码。支持关键词即时过滤。
    </p>
    <div class="search-filter-bar mt-6 max-w-xl mx-auto flex gap-3">
      <input type="text" id="airport-search-input" placeholder="输入机场名称、线路类型（如 专线/IEPL）或优惠码搜索..." class="w-full px-4 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
    </div>
  </div>

  <div id="airports-grid" class="grid gap-4 md:grid-cols-2">
    <!-- Rendered statically and filterable by JS -->
  </div>
</div>
<script>
  window.AIRPORTS_DATA = ${JSON.stringify(JSON.parse(fs.readFileSync('data/airports.json', 'utf8')))};
</script>
<script src="/js/directory.js"></script>
{{ end }}
`;
fs.writeFileSync('layouts/airport-directory/directory.html', directoryLayoutHtml, 'utf8');

console.log('✅ layouts/ HTML 模板生成完毕！');
