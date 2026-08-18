import type { ComponentType } from 'react'

type MdxModule = {
  default: ComponentType
  meta: { title: string; date: string; tags: string[]; lang: string; summary: string }
}

export type Post = MdxModule['meta'] & { slug: string; Component: ComponentType }

const modules = import.meta.glob<MdxModule>('../content/work/*.mdx', { eager: true })

export function getPosts(): Post[] {
  return Object.entries(modules)
    .map(([path, mod]) => ({
      ...mod.meta,
      slug: path.split('/').pop()!.replace(/\.mdx$/, ''),
      Component: mod.default,
    }))
    .sort((a, b) => b.date.localeCompare(a.date))
}
