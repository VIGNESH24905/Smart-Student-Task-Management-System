import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { getTasksByStudent, updateTask, deleteTask } from '../services/api'
import AddTask from './AddTask'
import '../App.css'

const Tasks = () => {
  const navigate = useNavigate()
  const student = JSON.parse(localStorage.getItem('student') || 'null')
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editTask, setEditTask] = useState(null)

  useEffect(() => {
    if (!student) { navigate('/login'); return }
    loadTasks()
  }, [])

  const loadTasks = () => {
    getTasksByStudent(student.studentId).then(r => setTasks(r.data)).catch(() => {})
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this task?')) {
      await deleteTask(id); loadTasks()
    }
  }

  const filtered = tasks.filter(t => {
    const matchFilter = filter === 'All' || t.status === filter
    const matchSearch = t.taskName?.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const priorityClass = p => ({ High: 'badge-high', Medium: 'badge-medium', Low: 'badge-low' }[p] || '')
  const statusClass = s => ({ Pending: 'badge-pending', Completed: 'badge-completed', 'In Progress': 'badge-progress' }[s] || '')

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-area">
        <Navbar title="Tasks" />
        <div className="content">
          {showForm && (
            <AddTask
              student={student}
              task={editTask}
              onClose={() => { setShowForm(false); setEditTask(null) }}
              onSaved={() => { setShowForm(false); setEditTask(null); loadTasks() }}
              isModal={true}
            />
          )}
          <div className="page-card">
            <div className="page-header">
              <div>
                <h2>Tasks</h2>
                <div className="filter-tabs" style={{ marginTop: 10 }}>
                  {['All', 'Pending', 'Completed'].map(f => (
                    <button key={f} className={`filter-tab ${filter === f ? 'active' : ''}`}
                      onClick={() => setFilter(f)}>{f}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <input
                  style={{ padding: '9px 14px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', width: 200 }}
                  placeholder="🔍 Search tasks..." value={search}
                  onChange={e => setSearch(e.target.value)} />
                <button className="btn btn-blue"
                  onClick={() => { setEditTask(null); setShowForm(true) }}>
                  + Add New Task
                </button>
              </div>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Task Name</th><th>Description</th><th>Priority</th>
                  <th>Deadline</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0
                  ? <tr><td colSpan={6} style={{ textAlign: 'center', padding: 32, color: '#64748b' }}>No tasks found</td></tr>
                  : filtered.map(t => (
                    <tr key={t.taskId}>
                      <td style={{ fontWeight: 600 }}>{t.taskName}</td>
                      <td style={{ color: '#64748b' }}>{t.description}</td>
                      <td><span className={`badge ${priorityClass(t.priority)}`}>{t.priority}</span></td>
                      <td>{t.deadline}</td>
                      <td><span className={`badge ${statusClass(t.status)}`}>{t.status}</span></td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-ghost btn-sm"
                            onClick={() => { setEditTask(t); setShowForm(true) }}>✏️</button>
                          <button className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(t.taskId)}>🗑️</button>
                        </div>
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

export default Tasks