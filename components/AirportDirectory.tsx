import React, { useState, useMemo } from 'react'
import airportsData from '../data/airports.json'

export interface AirportItem {
  id: string
  name: string
  url: string
  coupon: string
  price: string
  traffic: string
  line: string
  scenario: string
  target: string
  client: string
  status: string
}

export default function AirportDirectory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const filteredAirports = useMemo(() => {
    return (airportsData as AirportItem[]).filter((airport) => {
      const matchesSearch =
        airport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        airport.line.toLowerCase().includes(searchTerm.toLowerCase()) ||
        airport.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
        airport.traffic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        airport.scenario.toLowerCase().includes(searchTerm.toLowerCase()) ||
        airport.target.toLowerCase().includes(searchTerm.toLowerCase())

      if (!matchesSearch) return false

      if (filterType === 'zhuanxian') {
        return airport.line.includes('专线') || airport.line.includes('IEPL')
      }
      if (filterType === 'yuefu') {
        return airport.price.includes('/月') || airport.price.includes('月')
      }
      if (filterType === 'verified') {
        return airport.status === '官方核验' || airport.status === '已核验'
      }

      return true
    })
  }, [searchTerm, filterType])

  return (
    <div style={{ margin: '2rem 0' }}>
      <div style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '0.75rem',
        padding: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#0f172a' }}>
          28 家机场资料检索与官网注册链接库
        </h3>
        <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5 }}>
          本资料库收录全网常用 28 家机场服务商注册地址、优惠码及资费快照。前四家为主力核实资料，其余 24 家缺失字段均实事求是标注“待核实”，保留官方最新直达注册地址。请按需筛选对比。
        </p>

        {/* Search and Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ flex: '1 1 240px', position: 'relative' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索机场名称、线路类型（如专线）、价格或适用场景..."
              style={{
                width: '100%',
                padding: '0.65rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid #cbd5e1',
                fontSize: '0.9rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setFilterType('all')}
              style={{
                padding: '0.5rem 0.85rem',
                borderRadius: '0.375rem',
                border: '1px solid #cbd5e1',
                background: filterType === 'all' ? '#2563eb' : '#ffffff',
                color: filterType === 'all' ? '#ffffff' : '#334155',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              全部 ({airportsData.length})
            </button>
            <button
              onClick={() => setFilterType('zhuanxian')}
              style={{
                padding: '0.5rem 0.85rem',
                borderRadius: '0.375rem',
                border: '1px solid #cbd5e1',
                background: filterType === 'zhuanxian' ? '#2563eb' : '#ffffff',
                color: filterType === 'zhuanxian' ? '#ffffff' : '#334155',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              专线线路
            </button>
            <button
              onClick={() => setFilterType('yuefu')}
              style={{
                padding: '0.5rem 0.85rem',
                borderRadius: '0.375rem',
                border: '1px solid #cbd5e1',
                background: filterType === 'yuefu' ? '#2563eb' : '#ffffff',
                color: filterType === 'yuefu' ? '#ffffff' : '#334155',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              月付优选
            </button>
            <button
              onClick={() => setFilterType('verified')}
              style={{
                padding: '0.5rem 0.85rem',
                borderRadius: '0.375rem',
                border: '1px solid #cbd5e1',
                background: filterType === 'verified' ? '#2563eb' : '#ffffff',
                color: filterType === 'verified' ? '#ffffff' : '#334155',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              已核验状态
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#64748b' }}>
        当前筛选出 <strong>{filteredAirports.length}</strong> 家机场服务商
      </div>

      {/* Directory Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.25rem'
      }}>
        {filteredAirports.map((airport) => (
          <div
            key={airport.id}
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '0.75rem',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                  编号 #{airport.id}
                </span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontWeight: 600,
                    background: airport.status === '官方核验' ? '#dcfce7' : airport.status === '已核验' ? '#eff6ff' : '#f1f5f9',
                    color: airport.status === '官方核验' ? '#166534' : airport.status === '已核验' ? '#1d4ed8' : '#64748b'
                  }}
                >
                  {airport.status}
                </span>
              </div>

              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.15rem', color: '#0f172a', fontWeight: 700 }}>
                {airport.name}
              </h4>

              {/* Coupon tag */}
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', marginRight: '6px' }}>优惠码:</span>
                {airport.coupon === '注册即享原价' ? (
                  <span style={{ fontSize: '0.8rem', color: '#475569', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                    注册即享原价
                  </span>
                ) : (
                  <span className="badge-red">
                    {airport.coupon}
                  </span>
                )}
              </div>

              <div style={{
                background: '#f8fafc',
                borderRadius: '0.5rem',
                padding: '0.65rem 0.85rem',
                fontSize: '0.825rem',
                marginBottom: '0.75rem',
                lineHeight: 1.6
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>起步资费：</span>
                  <strong style={{ color: airport.price === '待核实' ? '#94a3b8' : '#0f172a' }}>{airport.price}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>月度流量：</span>
                  <strong style={{ color: airport.traffic === '待核实' ? '#94a3b8' : '#0f172a' }}>{airport.traffic}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>线路类型：</span>
                  <span style={{ color: airport.line === '待核实' ? '#94a3b8' : '#334155' }}>{airport.line}</span>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '0.4rem', lineHeight: 1.4 }}>
                <strong style={{ color: '#334155' }}>适用场景：</strong> {airport.scenario}
              </div>

              <div style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '0.4rem', lineHeight: 1.4 }}>
                <strong style={{ color: '#334155' }}>适合人群：</strong> {airport.target}
              </div>

              <div style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '0.85rem', lineHeight: 1.4 }}>
                <strong style={{ color: '#334155' }}>客户端说明：</strong> {airport.client}
              </div>
            </div>

            <div style={{ marginTop: '0.75rem' }}>
              <a
                href={airport.url}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="btn-action btn-primary"
                style={{ width: '100%', boxSizing: 'border-box' }}
              >
                查看当前套餐与注册 →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
