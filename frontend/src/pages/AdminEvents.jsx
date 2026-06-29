import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import AdminNavbar from '../components/AdminNavbar'
import { getAllEvents, addEvent, deleteEvent } from '../services/api'
import '../App.css'

const AdminEvents = () => {
  const navigate = useNavigate()
  const admin = JSON.parse(localStorage.getItem('admin') || 'null')
  const [items, setItems] = useState([])
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ eventName: '', eventDate: '', description: '' })

  useEffect(() => {
    if (!admin) { navigate('/admin/login'); return }
    load()
  }, [])

  const load = () =>
    getAllEvents().then(r => setItems(r.data)).catch(() => {})

  const handleSave = async () => {
    if (!form.eventName) { alert('Event name is required'); return }
    await addEvent(form)
    setModal(false)
    setForm({ eventName: '', eventDate: '', description: '' })
    load()
  }

  return (
    <div className="app-layout">
      <AdminSidebar />
      <div className="main-area">
        <AdminNavbar title="Events" />
        <div className="content">
          {modal && (
            <div className="modal-overlay">
              <div className="modal-box">
                <div className="modal-title">Add Event</div>
                <div className="form-group">
                  <label>Event Name</label>
                  <input placeholder="Event name" value={form.eventName}
                    onChange={e => setForm({ ...form, eventName: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" value={form.eventDate}
                    onChange={e => setForm({ ...form, eventDate: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea placeholder="Description" value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-ghost" onClick={() => setModal(false)}>Cancel</button>
                  <button className="btn btn-blue" onClick={handleSave}>Add Event</button>
                </div>
              </div>
            </div>
          )}

          <div className="page-card">
            <div className="page-header">
              <h2>Events</h2>
              <button className="btn btn-blue" onClick={() => setModal(true)}>
                + Add Event
              </button>
            </div>

            <div style={{
              background: '#f0fdf4', border: '1px solid #bbf7d0',
              borderRadius: 8, padding: '12px 16px', marginBottom: 20,
              fontSize: 13, color: '#15803d'
            }}>
              📅 Events added here will be visible to ALL students on their dashboard.
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0
                  ? <tr><td colSpan={4} style={{ textAlign: 'center', padding: 32, color: '#64748b' }}>No events yet</td></tr>
                  : items.map(e => (
                    <tr key={e.eventId}>
                      <td style={{ fontWeight: 600 }}>{e.eventName}</td>
                      <td>{e.eventDate}</td>
                      <td style={{ color: '#64748b' }}>{e.description}</td>
                      <td>
                        <button className="btn btn-danger btn-sm"
                          onClick={async () => { await deleteEvent(e.eventId); load() }}>
                          🗑️
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

export default AdminEvents