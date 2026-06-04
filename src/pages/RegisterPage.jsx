import { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const RegisterPage = () => {
  const { register, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isAuthenticated) return <Navigate to="/" />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      await register(username, email, password)
      navigate('/')
    } catch (err) {
      setError('Registration failed. Try another username.')
    }
  }

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-box">
        <h1>Register</h1>
        <p>Create an account to start messaging.</p>

        {error && <div className="error-box">{error}</div>}

        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} required />

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button>Register</button>

        <p className="small-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage
