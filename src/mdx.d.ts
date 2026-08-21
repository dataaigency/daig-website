declare module '*.mdx' {
  import type { ComponentType } from 'react'
  import type { MDXProps } from 'mdx/types'
  export const meta: { title: string; date: string; tags: string[]; lang: string; summary: string }
  const MDXComponent: ComponentType<MDXProps>
  export default MDXComponent
}
