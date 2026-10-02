import React from 'react'
import Head from 'next/head'
import { FAQS_50 } from '../data/faqs'

export default function FaqList() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS_50.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }

  // Group by categories
  const categories = Array.from(new Set(FAQS_50.map(item => item.category)))

  return (
    <div style={{ margin: '2rem 0' }}>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div style={{
        background: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderRadius: '0.75rem',
        padding: '1.25rem',
        marginBottom: '2rem',
        color: '#1e3a8a',
        fontSize: '0.9rem',
        lineHeight: 1.6
      }}>
        <strong>全站常见问题速查（50题完整直读）：</strong>
        本页面汇集新手买机场、套餐选择、订阅链接导入、Clash 与小火箭配置、网络排错等核心实操问题。所有问答均完全展开展示（无隐藏折叠），答案精简可落地，直接提供可执行解决方案。
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {categories.map((cat, catIdx) => {
          const catFaqs = FAQS_50.filter(f => f.category === cat)
          return (
            <div key={cat} style={{ borderBottom: catIdx < categories.length - 1 ? '1px solid #e2e8f0' : 'none', paddingBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                <span style={{
                  background: '#2563eb',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '4px'
                }}>
                  板块 {catIdx + 1}
                </span>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a', fontWeight: 700 }}>
                  {cat}
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {catFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    id={`faq-${faq.id}`}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.625rem',
                      padding: '1.25rem',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '0.5rem' }}>
                      <span style={{
                        background: '#eff6ff',
                        color: '#2563eb',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        flexShrink: 0
                      }}>
                        Q{faq.id}
                      </span>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#0f172a', fontWeight: 600, lineHeight: 1.4 }}>
                        {faq.question}
                      </h4>
                    </div>

                    <div style={{
                      paddingLeft: '2.4rem',
                      fontSize: '0.925rem',
                      color: '#334155',
                      lineHeight: 1.65
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>
                          步骤：
                        </span>
                        <div>{faq.answer}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
