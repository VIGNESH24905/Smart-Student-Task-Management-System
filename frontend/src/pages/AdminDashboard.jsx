import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import AdminNavbar from '../components/AdminNavbar'
import {
  getAllStudents, getAllTasks,
  getAllAnnouncements, getAllEvents
} from '../services/api'
import '../App.css'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const admin = JSON.parse(localStorage.getItem('admin') || 'null')
  const [students, setStudents] = useState([])
  const [tasks, setTasks] = useState([])
  const [announcements, setAnnouncements] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (!admin) { navigate('/admin/login'); return }
    getAllStudents().then(r => setStudents(r.data)).catch(() => {})
    getAllTasks().then(r => setTasks(r.data)).catch(() => {})
    getAllAnnouncements().then(r => setAnnouncements(r.data)).catch(() => {})
    getAllEvents().then(r => setEvents(r.data)).catch(() => {})
  }, [])

const stats = [
  { label: 'Total Students', value: students.length, color: '#4f8ef7', path: '/admin/students' },
  { label: 'Total Tasks',    value: tasks.length,    color: '#f59e0b', path: '/admin/tasks' },
  { label: 'Announcements',  value: announcements.length, color: '#10b981', path: '/admin/announcements' },
  { label: 'Events',         value: events.length,   color: '#8b5cf6', path: '/admin/events' },
]
  return (
    <div className="app-layout">
      <AdminSidebar />
      <div className="main-area">
        <AdminNavbar title="Admin Dashboard" />
        <div className="content">

          {/* Stats */}
          <div className="stats-row">
            {stats.map(s => (
              <div key={s.label} className="stat-card"
                style={{ borderTop: `3px solid ${s.color}`, cursor: 'pointer' }}
                onClick={() => navigate(s.path)}>
                <div className="stat-label">{s.label}</div>
                <div className="stat-num" style={{ color: s.color }}>{s.value}</div>
                <span className="stat-link">View all →</span>
              </div>
            ))}
          </div>

          <div className="dashboard-grid">
            {/* Recent Students */}
            <div className="dash-card">
              <h3>Recent Students</h3>
              {students.length === 0
                ? <p className="empty">No students registered yet</p>
                : students.slice(0, 5).map(s => (
                  <div key={s.studentId} className="dash-item">
                    <div className="dash-item-icon" style={{ background: '#eff6ff' }}>
                      <span style={{ fontSize: 16 }}>👨‍🎓</span>
                    </div>
                    <div>
                      <div className="dash-item-title">{s.name}</div>
                      <div className="dash-item-sub">{s.email}</div>
                    </div>
                  </div>
                ))}
              <span className="view-all" onClick={() => navigate('/admin/students')}>
                View all students →
              </span>
            </div>

            {/* Recent Announcements */}
            <div className="dash-card">
              <h3>Recent Announcements</h3>
              {announcements.length === 0
                ? <p className="empty">No announcements yet</p>
                : announcements.slice(0, 4).map(a => (
                  <div key={a.announcementId} className="dash-item">
                    <div className="dash-item-icon" style={{ background: '#f0fdf4' }}>
                      <span style={{ fontSize: 16 }}>📢</span>
                    </div>
                    <div>
                      <div className="dash-item-title">{a.title}</div>
                      <div className="dash-item-sub">{a.description}</div>
                    </div>
                  </div>
                ))}
              <span className="view-all" onClick={() => navigate('/admin/announcements')}>
                View all →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard