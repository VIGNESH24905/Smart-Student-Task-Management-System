import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerStudent } from '../services/api'
import '../App.css'

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [msg, setMsg] = useState({ text: '', type: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      setMsg({ text: 'Please fill all fields', type: 'error' }); return
    }
    setLoading(true)
    try {
      const res = await registerStudent(form)
      if (res.data?.studentId) {
        setMsg({ text: 'Registered successfully! Redirecting...', type: 'success' })
        setTimeout(() => navigate('/login'), 1500)
      }
    } catch (err) {
      setMsg({ text: err.response?.data?.error || 'Registration failed', type: 'error' })
    }
    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-logo">🎓</div>
        <h1 className="auth-title">Smart Student</h1>
        <h2 className="auth-subtitle">Task Management System</h2>
        <p className="auth-tagline">Organize. Plan. Achieve.</p>
      </div>
      <div className="auth-right">
        <div className="auth-card">
          <h2 className="card-title">Create Account</h2>
          <p className="card-subtitle">Register to get started</p>
          {msg.text && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
          <div className="form-group">
            <label>Full Name</label>
            <input placeholder="Enter your name" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Create a password" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })} />
          </div>
          <button className="btn btn-blue btn-full" onClick={handleRegister} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
          <p className="auth-switch">
            Already have an account?{' '}
            <span onClick={() => navigate('/login')}>Login</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register