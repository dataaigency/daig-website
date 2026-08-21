import type { ComponentType } from 'react'
import type { MDXProps } from 'mdx/types'

type MdxModule = {
  default: ComponentType<MDXProps>
  meta: { title: string; date: string; tags: string[]; lang: string; summary: string }
}

export type Post = MdxModule['meta'] & { slug: string; Component: ComponentType<MDXProps>; minutes: number }

const modules = import.meta.glob<MdxModule>('../content/work/*.mdx', { eager: true })

const WORDS_PER_MINUTE = 200

/** Whole minutes of reading for a piece of prose. Never returns 0. */
export function readingMinutes(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

/** Walks a compiled MDX element tree and collects its text. Code blocks are
 *  skipped (nobody reads them at prose speed) and child components are left
 *  alone: we take the text they were given, we do not render them. */
function collectText(node: unknown, out: string[]): void {
  if (node === null || node === undefined || typeof node === 'boolean') return
  if (typeof node === 'string' || typeof node === 'number') {
    out.push(String(node))
    return
  }
  if (Array.isArray(node)) {
    for (const child of node) collectText(child, out)
    return
  }
  const element = node as { type?: unknown; props?: { children?: unknown } }
  if (element.type === 'pre') return
  if (element.props && 'children' in element.props) collectText(element.props.children, out)
}

// The MDX source is not readable at runtime: the ?raw query is compiled away by
// the MDX plugin, so reading time is measured on the component's own text. One
// pass per post is enough, hence the cache.
const minutesBySlug = new Map<string, number>()

function minutesFor(slug: string, Component: ComponentType, fallback: string): number {
  const cached = minutesBySlug.get(slug)
  if (cached !== undefined) return cached
  let text = fallback
  try {
    const parts: string[] = []
    collectText((Component as (props: Record<string, unknown>) => unknown)({}), parts)
    if (parts.length > 0) text = parts.join(' ')
  } catch {
    // a post that cannot be walked still gets a sensible minimum
  }
  const minutes = readingMinutes(text)
  minutesBySlug.set(slug, minutes)
  return minutes
}

// UTC keeps the rendered day identical everywhere, including the prerender
const dateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

/** "2026-08-18" as "18 Aug 2026". Unparseable dates are returned untouched. */
export function formatPostDate(date: string): string {
  const parsed = new Date(date)
  return Number.isNaN(parsed.getTime()) ? date : dateFormat.format(parsed)
}

export function getPosts(): Post[] {
  return Object.entries(modules)
    .map(([path, mod]) => {
      const slug = path.split('/').pop()!.replace(/\.mdx$/, '')
      return {
        ...mod.meta,
        slug,
        minutes: minutesFor(slug, mod.default, mod.meta.summary),
        Component: mod.default,
      }
    })
    .sort((a, b) => b.date.localeCompare(a.date))
}
