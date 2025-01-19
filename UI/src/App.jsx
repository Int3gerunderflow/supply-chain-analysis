import { useState} from 'react'
import axios from "axios"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AuthProvider from './components/auth'
import Routes from './components/routes'
import './App.css'

function App() {


  return (
    <>
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </>
  )
}

export default App
