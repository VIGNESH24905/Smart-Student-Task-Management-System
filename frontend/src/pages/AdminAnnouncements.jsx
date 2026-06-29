import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import AdminNavbar from '../components/AdminNavbar'
import {
  getAllAnnouncements,
  addAnnouncement,
  deleteAnnouncement
} from '../services/api'
import '../App.css'

const AdminAnnouncements = () => {
  const navigate = useNavigate()
  const admin = JSON.parse(localStorage.getItem('admin') || 'null')
  const [items, setItems] = useState([])
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ title: '', description: '' })

  useEffect(() => {
    if (!admin) { navigate('/admin/login'); return }
    load()
  }, [])

  const load = () =>
    getAllAnnouncements().then(r => setItems(r.data)).catch(() => {})

  const handleSave = async () => {
    if (!form.title) { alert('Title is required'); return }
    await addAnnouncement(form)
    setModal(false)
    setForm({ title: '', description: '' })
    load()
  }

  return (
    <div className="app-layout">
      <AdminSidebar />
      <div className="main-area">
        <AdminNavbar title="Announcements" />
        <div className="content">
          {modal && (
            <div className="modal-overlay">
              <div className="modal-box">
                <div className="modal-title">Add Announcement</div>
                <div className="form-group">
                  <label>Title</label>
                  <input placeholder="Enter title" value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea placeholder="Enter description" value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-ghost" onClick={() => setModal(false)}>Cancel</button>
                  <button className="btn btn-blue" onClick={handleSave}>Post Announcement</button>
                </div>
              </div>
            </div>
          )}

          <div className="page-card">
            <div className="page-header">
              <h2>Announcements</h2>
              <button className="btn btn-blue" onClick={() => setModal(true)}>
                + Post Announcement
              </button>
            </div>

            {/* Info box */}
            <div style={{
              background: '#eff6ff', border: '1px solid #bfdbfe',
              borderRadius: 8, padding: '12px 16px', marginBottom: 20,
              fontSize: 13, color: '#1d4ed8'
            }}>
              📢 Announcements posted here will be visible to ALL students on their dashboard.
            </div>

            {items.length === 0
              ? <p className="empty">No announcements yet. Post one for students!</p>
              : items.map((a, i) => (
                <div key={a.announcementId} style={{
                  display: 'flex', gap: 14, padding: '14px 0',
                  borderBottom: '1px solid #f1f5f9', alignItems: 'flex-start'
                }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 10,
                    background: '#eff6ff', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, flexShrink: 0
                  }}>📢</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{a.title}</div>
                    <div style={{ fontSize: 13, color: '#64748b', marginTop: 3 }}>
                      {a.description}
                    </div>
                  </div>
                  <button className="btn btn-danger btn-sm"
                    onClick={async () => {
                      await deleteAnnouncement(a.announcementId); load()
                    }}>🗑️</button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminAnnouncements
