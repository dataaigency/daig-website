export const SITE_URL = 'https://dataaigency.com'

const META: Record<string, { title: string; description: string }> = {
  '/': { title: 'data aigency — take agency over your data', description: 'Lakehouses, pipelines and AI-ready foundations — built properly, secured from day one, handed over completely. Data & AI architecture studio.' },
  '/services': { title: 'Services — data aigency', description: 'Lakehouse architecture, pipelines & automation, AI-ready data layers, and phased AI adoption with governance.' },
  '/work': { title: 'Work — data aigency', description: 'Case studies and writing on data architecture and AI adoption.' },
  '/about': { title: 'About — data aigency', description: 'One architect, end to end: the practice of Vadim Van Den Heuvel.' },
  '/contact': { title: 'Contact — data aigency', description: 'Book a free 30-minute data architecture audit.' },
}

export function metaFor(path: string): { title: string; description: string } {
  // GitHub Pages serves directory routes with a trailing slash (/services/),
  // so normalize before lookup to keep titles correct on hydration.
  const normalized = path.replace(/\/+$/, '') || '/'
  return META[normalized] ?? { title: 'data aigency', description: 'Data & AI architecture studio.' }
}
