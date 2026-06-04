import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <p className="center-text">Loading...</p>

  if (!isAuthenticated) return <Navigate to="/login" />

  return children
}

export default ProtectedRoute
