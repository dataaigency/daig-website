declare module '*.mdx' {
  import type { ComponentType } from 'react'
  export const meta: { title: string; date: string; tags: string[]; lang: string; summary: string }
  const MDXComponent: ComponentType
  export default MDXComponent
}
