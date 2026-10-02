const fs = require('fs');
const path = require('path');

const dir = '../haojichang.cfd/content/airports';
let haojichangMap = {};

if (fs.existsSync(dir)) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') && f !== '_index.md');
  for (const f of files) {
    const text = fs.readFileSync(path.join(dir, f), 'utf8');
    const match = text.match(/---([\s\S]*?)---/);
    if (match) {
      const y = match[1];
      const get = (k) => {
        const m = y.match(new RegExp('^' + k + ':\\s*"?([^\\r\\n"]+)"?', 'm'));
        return m ? m[1].trim() : '';
      };
      const name = get('airport_name');
      const aff = get('aff_url');
      if (name) {
        haojichangMap[name] = {
          name,
          en: get('en_name'),
          price: get('price_ref'),
          traffic: get('traffic_month'),
          line: get('network_line'),
          coupon: get('coupon_code'),
          aff: aff,
          target: get('target_users'),
          protocol: get('protocol'),
          node_regions: get('node_regions')
        };
      }
    }
  }
}

// Now read airports_raw.txt
const rawLines = fs.readFileSync('./airports_raw.txt', 'utf8').split('\n').filter(l => l.trim());
const finalAirports = [];

rawLines.forEach((line, index) => {
  const parts = line.split('：');
  if (parts.length >= 2) {
    const namePart = parts[0].trim();
    const urlPart = parts.slice(1).join('：').trim();
    
    // Look up in haojichangMap
    let matched = null;
    for (const k of Object.keys(haojichangMap)) {
      if (namePart.includes(k) || k.includes(namePart)) {
        matched = haojichangMap[k];
        break;
      }
    }

    // Default values if missing
    let price = '待核实';
    let traffic = '待核实';
    let lineType = '待核实';
    let coupon = '注册即享原价';
    let target = '新手日常查资料、轻量办公与多端分流';
    let client = 'Shadowsocks / V2Ray / Clash';
    let status = '待核实';
    let scenario = '轻度查资料与日常网页浏览';

    if (matched) {
      if (matched.price && matched.price !== '以结算页为准') price = matched.price;
      else if (matched.price === '以结算页为准') price = '以结算页为准';
      
      if (matched.traffic && matched.traffic !== '待核实') traffic = matched.traffic;
      if (matched.line && matched.line !== '待核实') lineType = matched.line;
      if (matched.coupon && matched.coupon !== '待核实' && matched.coupon !== '') coupon = matched.coupon;
      if (matched.target) target = matched.target;
      if (matched.protocol) client = matched.protocol;
      status = '已核验';
    }

    // Specific overrides for top 4:
    if (index === 0) { // 梯子云
      price = '¥25/月';
      traffic = '125GB/月';
      lineType = '企业专线';
      coupon = 'tiziyun';
      scenario = '新手首次购买、日常文字查资料与办公主力';
      target = '第一次购买机场的新手、月付习惯用户、查资料与日常轻量办公主力';
      client = 'Clash Verge Rev / Clash Meta / 小火箭 / v2rayN';
      status = '官方核验';
    } else if (index === 1) { // 暮光加速
      price = '约¥20/月';
      traffic = '约120GB/月';
      lineType = 'IEPL纯专线';
      coupon = 'mm88';
      scenario = '看重专线低延迟稳定抗抖动、日常办公';
      target = '看重专线稳定度、希望月付控制在20元左右的新手读者';
      client = 'Clash Verge Rev / Clash Meta / 小火箭 / v2rayN';
      status = '官方核验';
    } else if (index === 2) { // 飞猫云
      price = '¥84/年起';
      traffic = '约50GB/月年付档';
      lineType = 'IEPL内网专线';
      coupon = 'flycat888';
      scenario = '长期低频轻度查资料、省心免月付';
      target = '明确日常每月用量较小、不想每月手动续费的轻度长期用户';
      client = 'Clash Verge Rev / Clash Meta / 小火箭 / v2rayN';
      status = '官方核验';
    } else if (index === 3) { // 微风网络
      price = '以结算页为准';
      traffic = '多流量档位可选';
      lineType = 'BGP专线';
      coupon = '注册即享原价';
      scenario = '网络环境复杂、多端灵活备用与弹性档位';
      target = '需要灵活多档位套餐、看重BGP智能分流与备用应急的用户';
      client = 'Clash Verge Rev / Clash Meta / 小火箭 / v2rayN';
      status = '官方核验';
    }

    finalAirports.push({
      id: String(index + 1).padStart(2, '0'),
      name: namePart,
      url: urlPart,
      coupon: coupon,
      price: price,
      traffic: traffic,
      line: lineType,
      scenario: scenario,
      target: target,
      client: client,
      status: status
    });
  }
});

fs.writeFileSync('./data/airports.json', JSON.stringify(finalAirports, null, 2), 'utf8');
console.log('Successfully generated data/airports.json with', finalAirports.length, 'airports');
