import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './presentation/App'
import { LanguageProvider } from './infrastructure/i18n/language-context'
import { MusicProvider } from './infrastructure/services/music-context'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <MusicProvider>
        <App />
      </MusicProvider>
    </LanguageProvider>
  </React.StrictMode>,
)
