import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './presentation/App'
import { LanguageProvider } from './infrastructure/i18n/language-context'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
)
