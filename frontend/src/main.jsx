import { createRoot } from 'react-dom/client'
import React from "react"
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "next-themes"


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system">
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
