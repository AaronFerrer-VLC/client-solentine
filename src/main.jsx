import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProviderWrapper } from './contexts/auth.context.jsx'
import { GoogleMapsProvider } from './contexts/GoogleMapsContext.jsx'
import { ToastProvider } from './contexts/ToastContext.jsx'
import { initSentry } from './config/sentry.js'

// Inicializar Sentry antes que nada
initSentry();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProviderWrapper>
      <Router>
        <GoogleMapsProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </GoogleMapsProvider>
      </Router>
    </AuthProviderWrapper>
  </StrictMode>,
)
