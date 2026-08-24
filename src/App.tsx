import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceDetail, { SERVICE_PAGES } from './pages/ServiceDetail'
import Work from './pages/Work'
import WorkPost from './pages/WorkPost'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        {SERVICE_PAGES.map((page) => (
          <Route key={page.slug} path={`/services/${page.slug}`} element={<ServiceDetail page={page} />} />
        ))}
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<WorkPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
