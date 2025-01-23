import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuthProvider from './components/auth'
import Routes from './components/routes'

createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  </React.Fragment>
)
