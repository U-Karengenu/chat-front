import { Route, Routes, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import AccountPage from './pages/AccountPage'
import VideosPage from './pages/VideosPage'

// App sets up the page routes for the website.
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/videos" element={<VideosPage />} />
      </Routes>
    </Layout>
  )
}

export default App
