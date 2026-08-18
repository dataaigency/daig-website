import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/hanken-grotesk'
import '@fontsource/montserrat/800.css'
import './styles/tokens.css'
import './styles/global.css'
import './i18n'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
// dev index.html only carries the <!--app-html--> comment (not an element),
// so element-presence is the correct "was this pre-rendered?" signal
if (container.firstElementChild) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
