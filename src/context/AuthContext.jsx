import { createContext, useContext, useEffect, useState } from 'react'
import { getMe, loginUser, registerUser } from '../api/auth'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        setLoading(false)
        return
      }

      try {
        const currentUser = await getMe()
        setUser(currentUser)
      } catch (error) {
        localStorage.removeItem('token')
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (username, password) => {
    const data = await loginUser({ username, password })
    localStorage.setItem('token', data.token)
    setUser(data.user)
  }

  const register = async (username, email, password) => {
    const data = await registerUser({ username, email, password })
    localStorage.setItem('token', data.token)
    setUser(data.user)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
