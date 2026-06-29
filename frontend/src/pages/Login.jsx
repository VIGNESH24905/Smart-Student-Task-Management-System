import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginStudent, loginAdmin } from '../services/api'
import '../App.css'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // ✅ FIXED: Clear old login data when login page loads
  useEffect(() => {
    localStorage.removeItem('student')
    localStorage.removeItem('admin')
  }, [])

  const handleLogin = async () => {
    setError('')
    if (!form.email || !form.password) {
      setError('Please fill all fields')
      return
    }
    setLoading(true)
    try {
      // First try Admin login
      try {
        const adminRes = await loginAdmin({
          username: form.email,
          password: form.password
        })
        if (adminRes.data?.adminId) {
          localStorage.setItem('admin', JSON.stringify(adminRes.data))
          window.location.href = '/admin/dashboard'
          return
        }
      } catch {
        // Not admin, try student login
      }

      // Then try Student login
      const studentRes = await loginStudent({
        email: form.email,
        password: form.password
      })
      if (studentRes.data?.studentId) {
        localStorage.setItem('student', JSON.stringify(studentRes.data))
        window.location.href = '/dashboard'
      } else {
        setError('Invalid credentials. Please try again.')
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password')
    }
    setLoading(false)
  }

  return (
    <div className="auth-page">

      {/* Left Side */}
      <div className="auth-left">
        <div className="auth-logo">🎓</div>
        <h1 className="auth-title">Smart Student</h1>
        <h2 className="auth-subtitle">Task Management System</h2>
        <p className="auth-tagline">Organize. Plan. Achieve.</p>
      </div>

      {/* Right Side */}
      <div className="auth-right">
        <div className="auth-card">
          <h2 className="card-title">Welcome Back!</h2>
          <p className="card-subtitle">Login to continue</p>

          {/* Error Message */}
          {error && <div className="alert alert-error">{error}</div>}

          {/* Email / Username Field */}
          <div className="form-group">
            <label>Email / Username</label>
            <input
              type="text"
              placeholder="Enter your email or username"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <div className="label-row">
              <label>Password</label>
              <span className="forgot">Forgot password?</span>
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              marginTop: 4, padding: '12px 22px',
              border: 'none', borderRadius: 8,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 600, fontSize: 15,
              color: '#fff', width: '100%',
              opacity: loading ? 0.7 : 1,
              background: 'linear-gradient(135deg,#4f8ef7,#7c5bf7)',
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {/* Info Box */}
          <div style={{
            marginTop: 16, padding: '12px 14px',
            background: '#f8fafc', borderRadius: 8,
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              fontSize: 12, color: '#64748b',
              fontWeight: 600, marginBottom: 6
            }}>
              How to login:
            </div>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>
              👨‍🎓 <strong>Student</strong> → Enter your email + password
            </div>
            <div style={{ fontSize: 12, color: '#64748b' }}>
              🛡️ <strong>Admin</strong> → Enter your username + password
            </div>
          </div>

          {/* Register Link */}
          <p className="auth-switch">
            Don't have an account?{' '}
            <span onClick={() => navigate('/register')}>Register</span>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Login