import { getPosts } from './lib/posts'

export const SITE_URL = 'https://dataaigency.com'

export const BRAND = 'Data Aigency'

export type Meta = { title: string; description: string }

const FALLBACK: Meta = {
  title: BRAND,
  description:
    'Data and AI architecture consulting: lakehouses, dbt pipelines and governed AI adoption for small and mid-sized teams.',
}

const META: Record<string, Meta> = {
  '/': {
    title: 'Data architecture consulting: lakehouse, AI-ready data and governance | Data Aigency',
    description:
      'Independent data architecture consulting: lakehouse platforms, automated reporting pipelines and AI-ready foundations. Built properly, secured from day one, handed over completely.',
  },
  '/services': {
    title: 'Lakehouse, DataOps, MLOps and LLMOps consulting | Data Aigency',
    description:
      'Lakehouse architecture on Microsoft Fabric or BigQuery, automation and DataOps with dbt, AI-ready data and MLOps, and governed LLMOps from first use case to production.',
  },
  '/services/lakehouse-architecture': {
    title: 'Lakehouse architecture consulting | Data Aigency',
    description:
      'One governed lakehouse on Microsoft Fabric or BigQuery: a single source of truth that does the work of a data warehouse and a data lake, with governance and a semantic layer from day one.',
  },
  '/services/automation-dataops': {
    title: 'Automation and DataOps consulting | Data Aigency',
    description:
      'Automated reporting your team can trust. Pipelines built with dbt, orchestrated with Airflow or Fabric, tested and monitored so analysts get their hours back.',
  },
  '/services/ai-ready-data-mlops': {
    title: 'AI-ready data and MLOps consulting | Data Aigency',
    description:
      'AI-ready data with lineage on everything: feature stores, training sets and analytics layers, so machine learning starts on day one instead of after months of wrangling.',
  },
  '/services/ai-governance-llmops': {
    title: 'AI governance and LLMOps consulting | Data Aigency',
    description:
      'AI in production one use case at a time, with access control, evaluation and audit logging built in. Practical EU AI Act readiness on Azure AI Foundry or the stack you already have.',
  },
  '/work': {
    title: 'Data architecture case studies and writing | Data Aigency',
    description:
      'Case studies and plain-spoken writing on lakehouse architecture, dbt, data governance and practical AI adoption.',
  },
  '/about': {
    title: 'Data and AI architecture consultant | Data Aigency',
    description:
      'Senior data and AI hands, end to end. Vadim Lucas on lakehouse design, dbt, data governance and AI adoption that survives handover.',
  },
  '/contact': {
    title: 'Book a free intake call | Data Aigency',
    description:
      'Book a free 30-minute intake call. We discuss your data stack, the problems you are hitting and the solutions worth considering. No deck, no obligations.',
  },
}

/** Title/description for a single MDX post, kept in one place so the
 *  pre-rendered head and the client-side document.title agree. */
export function metaForPost(post: { title: string; summary: string }): Meta {
  return { title: `${post.title} | ${BRAND}`, description: post.summary }
}

export function metaFor(path: string): Meta {
  // GitHub Pages serves directory routes with a trailing slash (/services/),
  // so normalize before lookup to keep titles correct on hydration.
  const normalized = path.replace(/\/+$/, '') || '/'
  const staticMeta = META[normalized]
  if (staticMeta) return staticMeta

  const pageMatch = normalized.match(/^\/work\/page\/(\d+)$/)
  if (pageMatch) {
    const work = META['/work']
    return {
      title: `Data architecture case studies and writing, page ${pageMatch[1]} | ${BRAND}`,
      description: work.description,
    }
  }

  const slug = normalized.startsWith('/work/') ? normalized.slice('/work/'.length) : null
  if (slug) {
    const post = getPosts().find((p) => p.slug === slug)
    if (post) return metaForPost(post)
  }

  return FALLBACK
}
