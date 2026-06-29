import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import AdminNavbar from '../components/AdminNavbar'
import { getAllTasks, getAllStudents } from '../services/api'
import '../App.css'

const AdminTasks = () => {
  const navigate = useNavigate()
  const admin = JSON.parse(localStorage.getItem('admin') || 'null')
  const [tasks, setTasks] = useState([])
  const [students, setStudents] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!admin) { navigate('/login'); return }
    load()
  }, [])

  const load = async () => {
    setLoading(true)
    try {
      const [tasksRes, studentsRes] = await Promise.all([
        getAllTasks(),
        getAllStudents()
      ])
      setTasks(tasksRes.data || [])
      setStudents(studentsRes.data || [])
    } catch (err) {
      console.error('Error:', err)
    }
    setLoading(false)
  }

  // Get student name by id
  const getStudentName = (task) => {
    if (task.student?.name) return task.student.name
    const found = students.find(s => s.studentId === task.student?.studentId)
    return found?.name || 'Unknown'
  }

  const filtered = tasks.filter(t => {
    const matchFilter = filter === 'All' || t.status === filter
    const matchSearch = t.taskName?.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const priorityClass = p => ({
    High: 'badge-high', Medium: 'badge-medium', Low: 'badge-low'
  }[p] || '')

  const statusClass = s => ({
    Pending: 'badge-pending',
    Completed: 'badge-completed',
    'In Progress': 'badge-progress'
  }[s] || '')

  return (
    <div className="app-layout">
      <AdminSidebar />
      <div className="main-area">
        <AdminNavbar title="All Tasks" />
        <div className="content">

          {/* Stats Row */}
          <div className="stats-row" style={{ marginBottom: 20 }}>
            {[
              { label: 'Total Tasks', value: tasks.length, color: '#4f8ef7' },
              { label: 'Pending', value: tasks.filter(t => t.status === 'Pending').length, color: '#f59e0b' },
              { label: 'In Progress', value: tasks.filter(t => t.status === 'In Progress').length, color: '#4f8ef7' },
              { label: 'Completed', value: tasks.filter(t => t.status === 'Completed').length, color: '#10b981' },
            ].map(s => (
              <div key={s.label} className="stat-card"
                style={{ borderTop: `3px solid ${s.color}` }}>
                <div className="stat-label">{s.label}</div>
                <div className="stat-num" style={{ color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>

          <div className="page-card">
            <div className="page-header">
              <div>
                <h2>All Student Tasks</h2>
                <div className="filter-tabs" style={{ marginTop: 10 }}>
                  {['All', 'Pending', 'In Progress', 'Completed'].map(f => (
                    <button key={f}
                      className={`filter-tab ${filter === f ? 'active' : ''}`}
                      onClick={() => setFilter(f)}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <input
                style={{
                  padding: '9px 14px', border: '1px solid #d1d5db',
                  borderRadius: 8, fontSize: 14, outline: 'none', width: 220
                }}
                placeholder="🔍 Search tasks..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: 40, color: '#64748b' }}>
                Loading tasks...
              </div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Task Name</th>
                    <th>Student</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Deadline</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{
                        textAlign: 'center', padding: 32, color: '#64748b'
                      }}>
                        No tasks found
                      </td>
                    </tr>
                  ) : filtered.map(t => (
                    <tr key={t.taskId}>
                      <td style={{ fontWeight: 600 }}>{t.taskName}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{
                            width: 28, height: 28, borderRadius: '50%',
                            background: 'linear-gradient(135deg,#4f8ef7,#7c5bf7)',
                            color: '#fff', fontWeight: 700, fontSize: 12,
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}>
                            {getStudentName(t)?.[0]?.toUpperCase()}
                          </div>
                          <span style={{ fontSize: 13, fontWeight: 500 }}>
                            {getStudentName(t)}
                          </span>
                        </div>
                      </td>
                      <td style={{ color: '#64748b', fontSize: 13 }}>
                        {t.description?.length > 30
                          ? t.description.substring(0, 30) + '...'
                          : t.description}
                      </td>
                      <td>
                        <span className={`badge ${priorityClass(t.priority)}`}>
                          {t.priority}
                        </span>
                      </td>
                      <td style={{ color: '#64748b' }}>{t.deadline}</td>
                      <td>
                        <span className={`badge ${statusClass(t.status)}`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminTasks