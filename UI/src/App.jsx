import AuthProvider from './components/auth'
import Routes from './components/routes'
import './App.css'
import MapPage from './components/mapPage'

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
