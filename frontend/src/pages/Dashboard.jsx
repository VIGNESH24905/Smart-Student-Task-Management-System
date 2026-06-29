import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { getTasksByStudent, getAllAnnouncements, getAllEvents } from '../services/api'
import '../App.css'

const Dashboard = () => {
  const navigate = useNavigate()
  const student = JSON.parse(localStorage.getItem('student') || 'null')
  const [tasks, setTasks] = useState([])
  const [announcements, setAnnouncements] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!student) { navigate('/login'); return }
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [tasksRes, annRes, eventsRes] = await Promise.all([
        getTasksByStudent(student.studentId),
        getAllAnnouncements(),
        getAllEvents()
      ])
      setTasks(tasksRes.data || [])
      setAnnouncements(annRes.data || [])
      setEvents(eventsRes.data || [])
    } catch (err) {
      console.error('Error loading dashboard:', err)
    }
    setLoading(false)
  }

  const totalTasks = tasks.length
  const pendingTasks = tasks.filter(t => t.status === 'Pending').length
  const completedTasks = tasks.filter(t => t.status === 'Completed').length
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length

  const stats = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      color: '#4f8ef7',
      bg: '#eff6ff',
      icon: '📋',
      path: '/tasks',
      linkText: 'View all tasks'
    },
    {
      label: 'Pending Tasks',
      value: pendingTasks,
      color: '#f59e0b',
      bg: '#fef9ec',
      icon: '⏳',
      path: '/tasks',
      linkText: 'View pending'
    },
    {
      label: 'Completed Tasks',
      value: completedTasks,
      color: '#10b981',
      bg: '#f0fdf4',
      icon: '✅',
      path: '/tasks',
      linkText: 'View completed'
    },
    {
      label: 'Upcoming Events',
      value: events.length,
      color: '#8b5cf6',
      bg: '#f5f3ff',
      icon: '📅',
      path: '/events',
      linkText: 'View all events'
    },
  ]

  if (loading) {
    return (
      <div className="app-layout">
        <Sidebar />
        <div className="main-area">
          <Navbar title="Dashboard" student={student} />
          <div className="content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
            <div style={{ textAlign: 'center', color: '#64748b' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Loading dashboard...</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-area">
        <Navbar title="Dashboard" student={student} />
        <div className="content">

          {/* Welcome Banner */}
          <div style={{
            background: 'linear-gradient(135deg,#4f8ef7,#7c5bf7)',
            borderRadius: 14, padding: '20px 24px', marginBottom: 24,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>
                Welcome , {student?.name}! 👋
              </div>
              <div style={{ color: '#c7d7fe', fontSize: 14, marginTop: 4 }}>
                You have {pendingTasks} pending tasks and {inProgressTasks} in progress.
              </div>
            </div>
            <div style={{ fontSize: 48 }}>🎓</div>
          </div>

          {/* Stat Cards */}
          <div className="stats-row">
            {stats.map(s => (
              <div key={s.label} className="stat-card"
                style={{ borderTop: `3px solid ${s.color}`, cursor: 'pointer' }}
                onClick={() => navigate(s.path)}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div className="stat-label">{s.label}</div>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: s.bg, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: 18
                  }}>{s.icon}</div>
                </div>
                <div className="stat-num" style={{ color: s.color }}>{s.value}</div>
                <span className="stat-link">{s.linkText} →</span>
              </div>
            ))}
          </div>
          {/* Task Progress Bar */}
          {totalTasks > 0 && (
            <div style={{
              background: '#fff', borderRadius: 14, padding: '20px 24px',
              marginBottom: 24, border: '1px solid #e8ecf0',
              boxShadow: '0 1px 4px rgba(0,0,0,.06)'
            }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1f36', marginBottom: 14 }}>
                Task Progress
              </div>
              <div style={{ display: 'flex', gap: 0, height: 12, borderRadius: 6, overflow: 'hidden', marginBottom: 12 }}>
                {completedTasks > 0 && (
                  <div style={{
                    width: `${(completedTasks / totalTasks) * 100}%`,
                    background: '#10b981'
                  }} />
                )}
                {inProgressTasks > 0 && (
                  <div style={{
                    width: `${(inProgressTasks / totalTasks) * 100}%`,
                    background: '#4f8ef7'
                  }} />
                )}
                {pendingTasks > 0 && (
                  <div style={{
                    width: `${(pendingTasks / totalTasks) * 100}%`,
                    background: '#f59e0b'
                  }} />
                )}
              </div>
              <div style={{ display: 'flex', gap: 20 }}>
                {[
                  { label: 'Completed', value: completedTasks, color: '#10b981' },
                  { label: 'In Progress', value: inProgressTasks, color: '#4f8ef7' },
                  { label: 'Pending', value: pendingTasks, color: '#f59e0b' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color }} />
                    <span style={{ fontSize: 12, color: '#64748b' }}>
                      {item.label}: <strong style={{ color: '#1a1f36' }}>{item.value}</strong>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Announcements and Events Grid */}
          <div className="dashboard-grid">

            {/* Announcements */}
            <div className="dash-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3>Recent Announcements</h3>
                <span style={{ fontSize: 12, color: '#64748b' }}>
                  {announcements.length} total
                </span>
              </div>
              {announcements.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>📢</div>
                  <p style={{ color: '#64748b', fontSize: 14 }}>No announcements yet</p>
                </div>
              ) : announcements.slice(0, 4).map((a, i) => {
                const colors = ['#eff6ff', '#f5f3ff', '#fff7ed', '#f0fdf4']
                return (
                  <div key={a.announcementId} className="dash-item">
                    <div className="dash-item-icon" style={{ background: colors[i % 4] }}>
                      📢
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="dash-item-title" style={{
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                      }}>
                        {a.title}
                      </div>
                      <div className="dash-item-sub" style={{
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                      }}>
                        {a.description}
                      </div>
                    </div>
                  </div>
                )
              })}
              <span className="view-all" onClick={() => navigate('/announcements')}>
                View all announcements →
              </span>
            </div>

            {/* Events */}
            <div className="dash-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3>Upcoming Events</h3>
                <span style={{ fontSize: 12, color: '#64748b' }}>
                  {events.length} total
                </span>
              </div>
              {events.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>📅</div>
                  <p style={{ color: '#64748b', fontSize: 14 }}>No events yet</p>
                </div>
              ) : events.slice(0, 4).map((e, i) => {
                const colors = ['#f5f3ff', '#f0fdf4', '#eff6ff', '#fff7ed']
                return (
                  <div key={e.eventId} className="dash-item">
                    <div className="dash-item-icon" style={{ background: colors[i % 4] }}>
                      📅
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="dash-item-title" style={{
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                      }}>
                        {e.eventName}
                      </div>
                      <div className="dash-item-sub">{e.eventDate}</div>
                    </div>
                  </div>
                )
              })}
              <span className="view-all" onClick={() => navigate('/events')}>
                View all events →
              </span>
            </div>
          </div>

          {/* Recent Tasks */}
          <div className="dash-card" style={{ marginTop: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3>Recent Tasks</h3>
              <button className="btn btn-blue btn-sm" onClick={() => navigate('/tasks')}>
                View All Tasks
              </button>
            </div>
            {tasks.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📋</div>
                <p style={{ color: '#64748b', fontSize: 14, marginBottom: 12 }}>
                  No tasks yet. Start adding your assignments!
                </p>
                <button className="btn btn-blue" onClick={() => navigate('/tasks')}>
                  + Add First Task
                </button>
              </div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Task Name</th>
                    <th>Priority</th>
                    <th>Deadline</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.slice(0, 5).map(t => (
                    <tr key={t.taskId}>
                      <td style={{ fontWeight: 600 }}>{t.taskName}</td>
                      <td>
                        <span className={`badge badge-${t.priority?.toLowerCase()}`}>
                          {t.priority}
                        </span>
                      </td>
                      <td style={{ color: '#64748b' }}>{t.deadline}</td>
                      <td>
                        <span className={`badge badge-${t.status?.toLowerCase().replace(' ', '')}`}>
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

export default Dashboard