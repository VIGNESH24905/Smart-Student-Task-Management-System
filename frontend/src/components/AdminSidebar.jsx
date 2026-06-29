import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const adminNavItems = [
  { key: 'dashboard',     label: 'Dashboard',     icon: '🏠', path: '/admin/dashboard' },
  { key: 'students',      label: 'Students',       icon: '👨‍🎓', path: '/admin/students' },
  { key: 'tasks',         label: 'All Tasks',      icon: '📋', path: '/admin/tasks' },
  { key: 'announcements', label: 'Announcements',  icon: '📢', path: '/admin/announcements' },
  { key: 'events',        label: 'Events',         icon: '📅', path: '/admin/events' },
]

const AdminSidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // ✅ FIXED: Clear everything and force redirect
  const handleLogout = () => {
    localStorage.removeItem('admin')
    localStorage.removeItem('student')
    window.location.href = '/login' // Force full page reload
  }

  return (
    <div style={{
      width: 220, background: '#1a1f36', position: 'fixed',
      top: 0, left: 0, height: '100vh',
      display: 'flex', flexDirection: 'column', zIndex: 100
    }}>
      {/* Logo */}
      <div style={{
        padding: '22px 18px', display: 'flex',
        alignItems: 'center', gap: 10,
        borderBottom: '1px solid #2d3561'
      }}>
        <div style={{
          width: 36, height: 36,
          background: 'linear-gradient(135deg,#ef4444,#dc2626)',
          borderRadius: 10, display: 'flex',
          alignItems: 'center', justifyContent: 'center', fontSize: 18
        }}>🛡️</div>
        <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, lineHeight: 1.4 }}>
          Admin Portal<br />
          <span style={{ fontSize: 10, opacity: 0.7 }}>Smart Student</span>
        </div>
      </div>

      {/* Nav Items */}
      <nav style={{ padding: '14px 0', flex: 1 }}>
        {adminNavItems.map(item => {
          const isActive = location.pathname === item.path
          return (
            <div key={item.key}
              onClick={() => navigate(item.path)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 18px', cursor: 'pointer',
                color: isActive ? '#fff' : '#8892b0',
                background: isActive
                  ? 'linear-gradient(90deg,#ef4444,#dc2626)'
                  : 'transparent',
                borderRadius: isActive ? '0 24px 24px 0' : 0,
                marginRight: isActive ? 12 : 0,
                fontSize: 14, fontWeight: isActive ? 600 : 400,
                transition: 'all .2s'
              }}>
              <span style={{ fontSize: 16, width: 20, textAlign: 'center' }}>
                {item.icon}
              </span>
              {item.label}
            </div>
          )
        })}
      </nav>

      {/* Logout */}
      <div style={{ borderTop: '1px solid #2d3561', padding: '10px 0' }}>
        <div onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 18px', cursor: 'pointer',
            color: '#ef4444', fontSize: 14, fontWeight: 600,
            transition: 'all .2s'
          }}>
          <span style={{ fontSize: 16 }}>🚪</span>
          Logout
        </div>
      </div>
    </div>
  )
}

export default AdminSidebar