
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('airports-grid');
  const input = document.getElementById('airport-search-input');
  if (!container || !window.AIRPORTS_DATA) return;

  function renderAirports(list) {
    container.innerHTML = list.map(item => `
      <div class="card p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="font-bold text-base text-slate-900 dark:text-white">${item.id}. ${item.name}</span>
            <span class="${item.coupon && item.coupon !== '待核实' ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'} text-xs px-2 py-0.5 rounded font-semibold">
              ${item.coupon || '原价享直降'}
            </span>
          </div>
          <div class="space-y-1 text-xs text-slate-600 dark:text-slate-300 mb-4">
            <p><strong>起步价格：</strong> ${item.price}</p>
            <p><strong>包含流量：</strong> ${item.traffic}</p>
            <p><strong>线路类型：</strong> ${item.lines}</p>
            <p><strong>适用场景：</strong> ${item.scene}</p>
            <p><strong>核验状态：</strong> <span class="text-emerald-600 dark:text-emerald-400 font-semibold">${item.status}</span></p>
          </div>
        </div>
        <div>
          <a href="${item.url}" target="_blank" rel="sponsored nofollow noopener" class="btn btn-primary w-full text-center block">
            查看当前套餐 (官网)
          </a>
        </div>
      </div>
    `).join('');
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
