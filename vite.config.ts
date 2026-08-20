/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'

const mdxPlugin = mdx({ jsxImportSource: 'react' })

export default defineConfig({
  base: '/',
  plugins: [
    {
      enforce: 'pre' as const,
      ...mdxPlugin,
      // @mdx-js/rollup strips the query from ids, so `*.mdx?raw` modules
      // (Vite loads them as `export default "<source>"`) would get recompiled
      // as MDX and posts.ts would receive a component instead of the raw
      // source. Skip any queried id so ?raw stays a plain string.
      transform(value, id) {
        if (id.includes('?')) return undefined
        return mdxPlugin.transform.call(this, value, id)
      },
    },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
  },
})
