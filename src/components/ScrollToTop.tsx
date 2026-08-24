import { useEffect } from 'react'
import { useLocation } from 'react-router'

/** Client-side navigation keeps the previous scroll position, so a post
 *  opened from mid-list would start mid-page. Reset to top on every route
 *  change; hash links keep their anchor behavior. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    try {
      window.scrollTo(0, 0)
    } catch {
      /* jsdom has no scrolling */
    }
  }, [pathname, hash])
  return null
}
