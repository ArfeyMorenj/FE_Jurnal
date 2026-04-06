import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SectionProvider } from './contexts/useSectionContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SectionProvider> 
      <App />
    </SectionProvider>
  </StrictMode>,
)
