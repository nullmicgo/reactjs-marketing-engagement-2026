import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { PasswordGate } from './PasswordGate.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PasswordGate>
        <App />
      </PasswordGate>
    </BrowserRouter>
  </StrictMode>,
)
