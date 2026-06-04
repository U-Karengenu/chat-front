import axios from 'axios'

// This is the base URL for the Django backend.
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
})

// Before every request, check if there is a token in localStorage.
// If there is a token, attach it to the request headers.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Token ${token}`
  }

  return config
})

export default api
