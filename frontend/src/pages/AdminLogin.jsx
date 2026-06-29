import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginAdmin } from '../services/api'
import '../App.css'

const AdminLogin = () => {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!form.username || !form.password) {
      setError('Please fill all fields'); return
    }
    setLoading(true); setError('')
    try {
      const res = await loginAdmin(form)
      if (res.data?.adminId) {
        localStorage.setItem('admin', JSON.stringify(res.data))
        navigate('/admin/dashboard')
      } else {
        setError('Invalid credentials')
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    }
    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-logo">🛡️</div>
        <h1 className="auth-title">Admin Portal</h1>
        <h2 className="auth-subtitle">Smart Student System</h2>
        <p className="auth-tagline">Manage. Monitor. Control.</p>
      </div>
      <div className="auth-right">
        <div className="auth-card">
          <h2 className="card-title">Admin Login</h2>
          <p className="card-subtitle">Enter your admin credentials</p>
          {error && <div className="alert alert-error">{error}</div>}
          <div className="form-group">
            <label>Username</label>
            <input
              placeholder="Enter username"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <button
            className="btn btn-blue btn-full"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login as Admin'}
          </button>
          <p className="auth-switch">
            Are you a student?{' '}
            <span onClick={() => navigate('/login')}>Student Login</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin