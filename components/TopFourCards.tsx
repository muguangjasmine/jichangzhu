import React from 'react'

export interface AirportCardProps {
  id: string
  name: string
  tagline: string
  badge: string
  price: string
  traffic: string
  line: string
  coupon: string
  targetUsers: string
  clientCompat: string
  pros: string[]
  cons: string[]
  url: string
}

export const TOP_FOUR_AIRPORTS: AirportCardProps[] = [
  {
    id: '01',
    name: '梯子云 LadderCloud',
    tagline: '新手试错成本极低的月付企业专线方案',
    badge: '月付体验推荐',
    price: '¥25/月',
    traffic: '125GB/月',
    line: '企业专线（香港、日本、新加坡、美国）',
    coupon: 'tiziyun',
    targetUsers: '第一次购买机场的新手、月付习惯用户、查资料与日常轻量办公主力',
    clientCompat: 'Clash Verge Rev、Clash Meta、小火箭、v2rayN、sing-box 全平台兼容',
    pros: ['支持单月小额支付验证网络', '企业专线抗晚高峰拥堵', '通用订阅一键导入多端'],
    cons: ['不适合每月需要数TB超大流量的下载大户'],
    url: 'https://tiziyun3.ladderaff.com/#/?code=KVyNkFYU'
  },
  {
    id: '02',
    name: '暮光加速 Twilight',
    tagline: '低延迟抗抖动的纯内网专线方案',
    badge: '专线稳定推荐',
    price: '约¥20/月',
    traffic: '约120GB/月',
    line: 'IEPL纯专线（亚太主流低延迟核心节点）',
    coupon: 'mm88',
    targetUsers: '注重网络平稳度、希望月度预算控制在20元左右的上班族与学生',
    clientCompat: 'Windows / Mac / Android / iOS 主流通用客户端全支持',
    pros: ['内网专线物理过境低延迟', '月付资费亲民适中', '常用网页秒级响应'],
    cons: ['高峰期高并发并发连接数有合理限制'],
    url: 'https://varnexa.twilightaff.com/#/?code=9wp1Pt82'
  },
  {
    id: '03',
    name: '飞猫云 FlyCat',
    tagline: '轻度查资料免每月手动续费的年付之选',
    badge: '轻量年付推荐',
    price: '¥84/年起',
    traffic: '约50GB/月年付档',
    line: 'IEPL内网专线（香港、日本、新加坡等）',
    coupon: 'flycat888',
    targetUsers: '日常每月流量需求不大、查阅文档与学术资料、不想月月转账的读者',
    clientCompat: 'Clash Verge Rev、Shadowrocket、Clash Meta 完美支持',
    pros: ['年均摊单月成本低至7元', '内网专线保障连通率', '适合做主力轻量通道或稳固备用'],
    cons: ['单月配额固定，突发大流量需求需额外升档'],
    url: 'https://flycat1.flycatvipaff.cc/#/?code=TgFJ4DF5'
  },
  {
    id: '04',
    name: '微风网络 Breezenet',
    tagline: '多档位弹性套餐与复杂网络智能分流方案',
    badge: '弹性多档推荐',
    price: '以结算页为准',
    traffic: '多流量档位可选',
    line: 'BGP专线（亚太及欧美主流混合线路）',
    coupon: '注册即享原价',
    targetUsers: '对带宽档位有不同需求、需要跨多设备与多宽带环境备用的用户',
    clientCompat: '支持 Shadowsocks / V2Ray 协议订阅链接直导',
    pros: ['多档期与多规格流量灵活自选', 'BGP多线接入适应电信联通移动宽带', '适合作为网络应急保障'],
    cons: ['套餐较多，购买前需仔细查看结算页具体档位规则'],
    url: 'https://edp01.breezenetaff.com/#/?code=3PgTsmnp'
  }
]

export default function TopFourCards() {
  return (
    <div style={{ margin: '2rem 0' }}>
      <div style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '0.75rem',
        padding: '1rem 1.25rem',
        marginBottom: '1.5rem',
        fontSize: '0.9rem',
        color: '#475569'
      }}>
        <strong>选购说明与定位声明：</strong>
        以下四家服务商系根据“新手试用成本、专线稳定性、年付均摊和弹性档位”等不同实际使用场景整理推荐。本站不将主推顺序作为已独立实测的客观速度排名，建议新手首选月付周期，在本地网络环境下先跑通连接后再长期使用。
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.25rem'
      }}>
        {TOP_FOUR_AIRPORTS.map((item) => (
          <div
            key={item.id}
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '0.875rem',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
              position: 'relative'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#2563eb',
                  background: '#eff6ff',
                  padding: '2px 8px',
                  borderRadius: '4px'
                }}>
                  {item.badge}
                </span>
                {item.coupon && (
                  <span className="badge-red" title="结账时输入此优惠码">
                    优惠码: {item.coupon}
                  </span>
                )}
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0.25rem 0', color: '#0f172a' }}>
                {item.name}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                {item.tagline}
              </p>

              <div style={{
                background: '#f1f5f9',
                borderRadius: '0.5rem',
                padding: '0.75rem',
                fontSize: '0.85rem',
                marginBottom: '0.75rem',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem'
              }}>
                <div>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '0.75rem' }}>参考资费</span>
                  <strong style={{ color: '#0f172a' }}>{item.price}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '0.75rem' }}>月度流量</span>
                  <strong style={{ color: '#0f172a' }}>{item.traffic}</strong>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '0.75rem' }}>网络线路</span>
                  <span style={{ color: '#334155' }}>{item.line}</span>
                </div>
              </div>

              <div style={{ fontSize: '0.825rem', marginBottom: '0.5rem' }}>
                <strong style={{ color: '#334155' }}>适合人群：</strong>
                <span style={{ color: '#475569' }}>{item.targetUsers}</span>
              </div>

              <div style={{ fontSize: '0.825rem', marginBottom: '0.75rem' }}>
                <strong style={{ color: '#334155' }}>优势特点：</strong>
                <ul style={{ margin: '0.25rem 0 0 1rem', padding: 0, color: '#475569' }}>
                  {item.pros.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <a
                href={item.url}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="btn-action btn-primary"
                style={{ width: '100%', boxSizing: 'border-box' }}
              >
                前往官网查看与注册 →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
