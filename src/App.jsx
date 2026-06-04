import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ContactsPage from './pages/ContactsPage'
import ChatPage from './pages/ChatPage'
import GroupCreatePage from './pages/GroupCreatePage'

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/contacts" element={<ProtectedRoute><ContactsPage /></ProtectedRoute>} />
        <Route path="/chat/:roomId" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path="/groups/new" element={<ProtectedRoute><GroupCreatePage /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App
