import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '../src/app/App'
import './i18n'

createRoot(document.getElementById('root')!).render(
  <Suspense fallback={null}>
    <StrictMode>
      <App />
    </StrictMode>
  </Suspense>,
)
