import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router'
import Nav from './Nav'
import Footer from './Footer'
import { metaFor } from '../seo'
import './components.css'

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = metaFor(pathname).title
  }, [pathname])

  return (
    <div className="layout">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
