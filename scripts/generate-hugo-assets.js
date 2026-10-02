const fs = require('fs');
const path = require('path');

// 确保 static/css 和 static/js 目录存在
if (!fs.existsSync('static/css')) fs.mkdirSync('static/css', { recursive: true });
if (!fs.existsSync('static/js')) fs.mkdirSync('static/js', { recursive: true });

// 1. static/css/main.css
const cssContent = `
/* Base Reset & Typography */
:root {
  --primary: #2563eb;
  --primary-hover: #1d4ed8;
  --bg-color: #f8fafc;
  --text-color: #0f172a;
}

html.dark {
  --bg-color: #0f172a;
  --text-color: #f8fafc;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: var(--bg-color);
  color: var(--text-color);
  line-height: 1.6;
}

a {
  color: inherit;
}

/* Header */
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #e2e8f0;
}
html.dark .site-header {
  background: rgba(15, 23, 42, 0.85);
  border-color: #334155;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 0.55rem 1.1rem;
  min-height: 38px;
  border-radius: 0.5rem;
  text-decoration: none !important;
  transition: all 0.2s ease;
  white-space: nowrap;
  box-sizing: border-box;
}

.btn-primary {
  background-color: #0284c7;
  color: #ffffff !important;
  border: 1px solid #0284c7;
}
.btn-primary:hover {
  background-color: #0369a1;
}

.btn-secondary {
  background-color: #4f46e5;
  color: #ffffff !important;
  border: 1px solid #4f46e5;
}
.btn-secondary:hover {
  background-color: #4338ca;
}

.btn-outline {
  background-color: #ffffff;
  color: #0284c7 !important;
  border: 1px solid #38bdf8;
}
html.dark .btn-outline {
  background-color: #1e293b;
  color: #38bdf8 !important;
}

.btn-light {
  background-color: #f1f5f9;
  color: #1e293b !important;
  border: 1px solid #cbd5e1;
}
html.dark .btn-light {
  background-color: #334155;
  color: #f8fafc !important;
  border-color: #475569;
}

.btn-ghost {
  background: #ffffff;
  color: #475569 !important;
  border: 1px solid #cbd5e1;
}
html.dark .btn-ghost {
  background: #1e293b;
  color: #cbd5e1 !important;
  border-color: #475569;
}

/* Markdown Tables */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.25rem 0;
  display: block;
  overflow-x: auto;
}
table th, table td {
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  text-align: left;
}
html.dark table th, html.dark table td {
  border-color: #334155;
}
table th {
  background-color: #f1f5f9;
  font-weight: 600;
}
html.dark table th {
  background-color: #1e293b;
}

/* Utilities */
.max-w-6xl { max-width: 72rem; }
.max-w-5xl { max-width: 64rem; }
.max-w-4xl { max-width: 56rem; }
.max-w-3xl { max-width: 48rem; }
.max-w-2xl { max-width: 42rem; }
.max-w-xl { max-width: 36rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.flex { display: flex; }
.grid { display: grid; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.justify-center { justify-content: center; }
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 0.75rem; }
.gap-4 { gap: 1rem; }
.gap-6 { gap: 1.5rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.py-8 { padding-top: 2rem; padding-bottom: 2rem; }
.py-10 { padding-top: 2.5rem; padding-bottom: 2.5rem; }
.p-6 { padding: 1.5rem; }
.p-5 { padding: 1.25rem; }
.p-8 { padding: 2rem; }
.rounded-xl { border-radius: 0.75rem; }
.rounded-2xl { border-radius: 1rem; }
.rounded-md { border-radius: 0.375rem; }
.rounded-lg { border-radius: 0.5rem; }
.rounded-full { border-radius: 9999px; }
.text-center { text-align: center; }
.font-extrabold { font-weight: 800; }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.font-medium { font-weight: 500; }
.text-xs { font-size: 0.75rem; }
.text-sm { font-size: 0.875rem; }
.text-base { font-size: 1rem; }
.text-lg { font-size: 1.125rem; }
.text-xl { font-size: 1.25rem; }
.text-2xl { font-size: 1.5rem; }
.text-3xl { font-size: 1.875rem; }
.no-underline { text-decoration: none; }
.block { display: block; }
.hidden { display: none; }
.w-full { width: 100%; }
.flex-1 { flex: 1 1 0%; }
.flex-wrap { flex-wrap: wrap; }
.shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
.border { border-width: 1px; border-style: solid; }
.border-2 { border-width: 2px; border-style: solid; }
.border-t { border-top-width: 1px; border-top-style: solid; }
.border-b { border-bottom-width: 1px; border-bottom-style: solid; }

@media (min-width: 768px) {
  .md\\:flex { display: flex; }
  .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .md\\:text-3xl { font-size: 1.875rem; }
  .md\\:text-base { font-size: 1rem; }
  .md\\:p-10 { padding: 2.5rem; }
}

@media (min-width: 640px) {
  .sm\\:block { display: block; }
}
`;
fs.writeFileSync('static/css/main.css', cssContent, 'utf8');

// 2. static/js/main.js
const jsContent = `
document.addEventListener('DOMContentLoaded', () => {
  // Theme Switcher
  const toggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');
  
  function updateThemeDisplay(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      if (themeIcon) themeIcon.textContent = '🌙';
      if (themeText) themeText.textContent = '深色';
    } else {
      document.documentElement.classList.remove('dark');
      if (themeIcon) themeIcon.textContent = '☼';
      if (themeText) themeText.textContent = '浅色';
    }
  }

  const isDark = document.documentElement.classList.contains('dark');
  updateThemeDisplay(isDark);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isNowDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isNowDark ? 'dark' : 'light');
      updateThemeDisplay(isNowDark);
    });
  }
});
`;
fs.writeFileSync('static/js/main.js', jsContent, 'utf8');

// 3. static/js/directory.js (Airport Directory filter)
const dirJsContent = `
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('airports-grid');
  const input = document.getElementById('airport-search-input');
  if (!container || !window.AIRPORTS_DATA) return;

  function renderAirports(list) {
    container.innerHTML = list.map(item => \`
      <div class="card p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="font-bold text-base text-slate-900 dark:text-white">\${item.id}. \${item.name}</span>
            <span class="\${item.coupon && item.coupon !== '待核实' ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'} text-xs px-2 py-0.5 rounded font-semibold">
              \${item.coupon || '原价享直降'}
            </span>
          </div>
          <div class="space-y-1 text-xs text-slate-600 dark:text-slate-300 mb-4">
            <p><strong>起步价格：</strong> \${item.price}</p>
            <p><strong>包含流量：</strong> \${item.traffic}</p>
            <p><strong>线路类型：</strong> \${item.lines}</p>
            <p><strong>适用场景：</strong> \${item.scene}</p>
            <p><strong>核验状态：</strong> <span class="text-emerald-600 dark:text-emerald-400 font-semibold">\${item.status}</span></p>
          </div>
        </div>
        <div>
          <a href="\${item.url}" target="_blank" rel="sponsored nofollow noopener" class="btn btn-primary w-full text-center block">
            查看当前套餐 (官网)
          </a>
        </div>
      </div>
    \`).join('');
  }

  renderAirports(window.AIRPORTS_DATA);

  if (input) {
    input.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        renderAirports(window.AIRPORTS_DATA);
        return;
      }
      const filtered = window.AIRPORTS_DATA.filter(item => 
        item.name.toLowerCase().includes(q) ||
        (item.coupon && item.coupon.toLowerCase().includes(q)) ||
        (item.lines && item.lines.toLowerCase().includes(q)) ||
        (item.scene && item.scene.toLowerCase().includes(q))
      );
      renderAirports(filtered);
    });
  }
});
`;
fs.writeFileSync('static/js/directory.js', dirJsContent, 'utf8');

console.log('✅ 静态资源与 JS 脚本生成完毕！');
