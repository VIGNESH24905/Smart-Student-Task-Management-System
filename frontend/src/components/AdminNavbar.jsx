import React from 'react'

const AdminNavbar = ({ title }) => {
  const admin = JSON.parse(localStorage.getItem('admin') || '{}')
  return (
    <div style={{
      background: '#fff', padding: '14px 28px',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #e8ecf0',
      position: 'sticky', top: 0, zIndex: 50
    }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, color: '#1a1f36' }}>{title}</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ fontSize: 14, color: '#64748b' }}>
          Admin: <strong style={{ color: '#1a1f36' }}>{admin?.username}</strong>
        </span>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg,#ef4444,#dc2626)',
          color: '#fff', fontWeight: 700, fontSize: 15,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {admin?.username?.[0]?.toUpperCase()}
        </div>
      </div>
    </div>
  )
}

export default AdminNavbar