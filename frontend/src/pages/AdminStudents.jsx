import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import AdminNavbar from '../components/AdminNavbar'
import { getAllStudents, deleteStudent } from '../services/api'
import '../App.css'

const AdminStudents = () => {
  const navigate = useNavigate()
  const admin = JSON.parse(localStorage.getItem('admin') || 'null')
  const [students, setStudents] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!admin) { navigate('/admin/login'); return }
    load()
  }, [])

  const load = () =>
    getAllStudents().then(r => setStudents(r.data)).catch(() => {})

  const handleDelete = async (id) => {
    if (window.confirm('Delete this student?')) {
      await deleteStudent(id); load()
    }
  }

  const filtered = students.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="app-layout">
      <AdminSidebar />
      <div className="main-area">
        <AdminNavbar title="Students" />
        <div className="content">
          <div className="page-card">
            <div className="page-header">
              <h2>All Students ({students.length})</h2>
              <input
                style={{
                  padding: '9px 14px', border: '1px solid #d1d5db',
                  borderRadius: 8, fontSize: 14, outline: 'none', width: 220
                }}
                placeholder="🔍 Search students..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0
                  ? <tr><td colSpan={4} style={{ textAlign: 'center', padding: 32, color: '#64748b' }}>No students found</td></tr>
                  : filtered.map(s => (
                    <tr key={s.studentId}>
                      <td style={{ color: '#64748b' }}>#{s.studentId}</td>
                      <td style={{ fontWeight: 600 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 32, height: 32, borderRadius: '50%',
                            background: 'linear-gradient(135deg,#4f8ef7,#7c5bf7)',
                            color: '#fff', fontWeight: 700, fontSize: 13,
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}>
                            {s.name?.[0]?.toUpperCase()}
                          </div>
                          {s.name}
                        </div>
                      </td>
                      <td style={{ color: '#64748b' }}>{s.email}</td>
                      <td>
                        <button className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(s.studentId)}>
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminStudents