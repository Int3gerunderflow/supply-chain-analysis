import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuthProvider from './components/auth'
import MapDataProvider from './components/mapData'
import Routes from './components/routes'

createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <AuthProvider>
      <MapDataProvider>
        <Routes/>
      </MapDataProvider>
    </AuthProvider>
  </React.Fragment>
)
