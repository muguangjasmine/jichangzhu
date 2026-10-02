import React from 'react'
import { useRouter } from 'next/router'
import { DocsThemeConfig, useConfig, ThemeSwitch } from 'nextra-theme-docs'

const DOMAIN = 'https://jichangzhu.cyou'

const config: DocsThemeConfig = {
  logo: (
    <span style={{ fontWeight: 800, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ background: '#2563eb', color: '#ffffff', borderRadius: '6px', padding: '2px 8px', fontSize: '0.85rem' }}>手册</span>
      <span style={{ color: '#0f172a' }}>机场主手册</span>
    </span>
  ),
  navbar: {
    extraContent: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <ThemeSwitch />
        <a
          href="https://t.me/+bzZZ2fG31ntkY2U1"
          target="_blank"
          rel="sponsored nofollow noopener"
          className="tg-header-btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: '#2563eb',
            border: '1px solid #bfdbfe',
            borderRadius: '6px',
            padding: '6px 12px',
            background: '#eff6ff',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            minHeight: '36px'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .36z"/>
          </svg>
          <span>联系 TG</span>
        </a>
      </div>
    )
  },
  search: {
    placeholder: '全站搜索教程、节点、排错...',
  },
  head: function Head() {
    const { asPath } = useRouter()
    const { frontMatter } = useConfig()
    const cleanPath = asPath.split('#')[0].split('?')[0]
    const canonicalUrl = `${DOMAIN}${cleanPath === '/' ? '/' : cleanPath}`
    const pageTitle = frontMatter.title
      ? `${frontMatter.title} – 机场主手册`
      : '新手机场指南：怎么选套餐、导入订阅与选择节点｜机场主手册'
    const pageDesc = frontMatter.description || '面向新手的代理订阅与客户端配置实用手册。解决怎么选、怎么买、怎么导入订阅、节点连不上怎么办。'

    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="description" content={pageDesc} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="机场主手册" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <link rel="alternate" type="application/rss+xml" title="机场主手册 RSS" href={`${DOMAIN}/rss.xml`} />
      </>
    )
  },
  footer: {
    text: (
      <div style={{ width: '100%', fontSize: '0.875rem', color: '#64748b', padding: '1rem 0' }}>
        <p style={{ margin: '0 0 0.5rem 0', lineHeight: 1.6 }}>
          机场主手册提供新手机场选择、订阅导入、节点选择、客户端设置、机场优惠码与 28 家机场资料库。套餐与服务以各官网结算页为准。
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', margin: '0.75rem 0' }}>
          <a href="/privacy/" style={{ color: '#475569', textDecoration: 'underline' }}>隐私政策</a>
          <a href="/disclaimer/" style={{ color: '#475569', textDecoration: 'underline' }}>免责声明</a>
          <a href="/sitemap-html/" style={{ color: '#475569', textDecoration: 'underline' }}>站点地图</a>
          <a href="https://t.me/+bzZZ2fG31ntkY2U1" target="_blank" rel="sponsored nofollow noopener" style={{ color: '#2563eb', textDecoration: 'underline' }}>
            联系 Telegram
          </a>
        </div>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>
          © {new Date().getFullYear()} 机场主手册 jichangzhu.cyou · 保留所有权利
        </p>
      </div>
    ),
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – 机场主手册'
    }
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    autoCollapse: true
  },
  gitTimestamp: null
}

export default config
