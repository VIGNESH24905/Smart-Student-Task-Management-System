import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { getAllEvents, addEvent, deleteEvent } from '../services/api'
import '../App.css'

const Events = () => {
  const navigate = useNavigate()
  const student = JSON.parse(localStorage.getItem('student') || 'null')
  const [items, setItems] = useState([])
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ eventName: '', eventDate: '', description: '' })

  useEffect(() => {
    if (!student) { navigate('/login'); return }
    load()
  }, [])

  const load = () => getAllEvents().then(r => setItems(r.data)).catch(() => {})

  const handleSave = async () => {
    if (!form.eventName) { alert('Event name is required'); return }
    await addEvent(form)
    setModal(false); setForm({ eventName: '', eventDate: '', description: '' }); load()
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-area">
        <Navbar title="Events" />
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
                  <button className="btn btn-blue" onClick={handleSave}>Save</button>
                </div>
              </div>
            </div>
          )}
          <div className="page-card">
            <div className="page-header">
              <h2>Events</h2>
              <button className="btn btn-blue" onClick={() => setModal(true)}>+ Add Event</button>
            </div>
            <table className="data-table">
              <thead>
                <tr><th>Event Name</th><th>Date</th><th>Description</th><th>Actions</th></tr>
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
                          onClick={async () => { await deleteEvent(e.eventId); load() }}>🗑️</button>
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

export default Events