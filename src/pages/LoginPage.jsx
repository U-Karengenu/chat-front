import { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isAuthenticated) return <Navigate to="/" />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      await login(username, password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed')
    }
  }

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-box">
        <h1>Login</h1>
        <p>Welcome back. Login to see your chats.</p>

        {error && <div className="error-box">{error}</div>}

        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} required />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button>Login</button>

        <p className="small-text">
          No account? <Link to="/register">Create one</Link>
        </p>
      </form>
    </div>
  )
}

export default LoginPage
