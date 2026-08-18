import type { ReactNode } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import './components.css'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  )
}
