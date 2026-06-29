import React from 'react'

const Navbar = ({ title }) => {
  const student = JSON.parse(localStorage.getItem('student') || '{}')

  return (
    <div style={{
      background: '#fff', padding: '14px 28px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderBottom: '1px solid #e8ecf0', position: 'sticky', top: 0, zIndex: 50
    }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, color: '#1a1f36' }}>{title}</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ fontSize: 14, color: '#64748b' }}>
          Welcome, <strong style={{ color: '#1a1f36' }}>{student?.name}</strong>
        </span>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg,#4f8ef7,#7c5bf7)',
          color: '#fff', fontWeight: 700, fontSize: 15,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {student?.name?.[0]?.toUpperCase()}
        </div>
      </div>
    </div>
  )
}

export default Navbar