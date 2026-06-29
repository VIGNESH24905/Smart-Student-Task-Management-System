import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { getTimetablesByStudent, addTimetable, deleteTimetable } from '../services/api'
import '../App.css'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const timeSlots = [
  { label: '9:00 - 10:00',  start: '09:00', isBreak: false },
  { label: '10:00 - 11:00', start: '10:00', isBreak: false },
  { label: '11:00 - 11:15', start: '11:00', isBreak: true, breakLabel: 'Break' },
  { label: '11:15 - 12:00', start: '11:15', isBreak: false },
  { label: '12:00 - 1:00',  start: '12:00', isBreak: false },
  { label: '1:00 - 2:00',   start: '13:00', isBreak: true, breakLabel: 'Lunch Break' },
  { label: '2:00 - 3:00',   start: '14:00', isBreak: false },
  { label: '3:00 - 4:00',   start: '15:00', isBreak: false },
  { label: '4:00 - 4:15',   start: '16:00', isBreak: true, breakLabel: 'Break' },
  { label: '4:15 - 5:00',   start: '16:15', isBreak: false },
]

const Timetable = () => {
  const navigate = useNavigate()
  const student = JSON.parse(localStorage.getItem('student') || 'null')
  const [items, setItems] = useState([])
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({
    subjectName: '', day: 'Monday', startTime: '09:00', endTime: '10:00'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const classSlots = timeSlots.filter(t => !t.isBreak)

  useEffect(() => {
    if (!student) { navigate('/login'); return }
    load()
  }, [])

  const load = () => {
    getTimetablesByStudent(student.studentId)
      .then(r => setItems(r.data))
      .catch(err => console.error('Error:', err))
  }

  const handleSave = async () => {
    if (!form.subjectName) { setError('Subject name is required'); return }
    setLoading(true)
    setError('')
    try {
      await addTimetable({
        subjectName: form.subjectName,
        day: form.day,
        startTime: form.startTime,
        endTime: form.endTime,
        student: { studentId: student.studentId }
      })
      setModal(false)
      setForm({ subjectName: '', day: 'Monday', startTime: '09:00', endTime: '10:00' })
      load()
    } catch {
      setError('Failed to save. Try again.')
    }
    setLoading(false)
  }

  const getCell = (startTime, day) =>
    items.find(item => item.day === day && item.startTime?.substring(0, 5) === startTime)

  const getBreakStyle = (breakLabel) => {
    if (breakLabel === 'Lunch Break') {
      return { bg: '#fef9ec', text: '#d97706' }
    }
    return { bg: '#f0f7ff', text: '#4f8ef7' }
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-area">
        <Navbar title="Timetable" />
        <div className="content">

          {modal && (
            <div className="modal-overlay">
              <div className="modal-box">
                <div className="modal-title">Add Timetable Entry</div>
                {error && <div className="alert alert-error">{error}</div>}
                <div className="form-group">
                  <label>Subject Name</label>
                  <input
                    placeholder="e.g. Mathematics"
                    value={form.subjectName}
                    onChange={e => setForm({ ...form, subjectName: e.target.value })}
                  />
                </div>
                <div className="form-grid-3">
                  <div className="form-group">
                    <label>Day</label>
                    <select
                      value={form.day}
                      onChange={e => setForm({ ...form, day: e.target.value })}
                    >
                      {days.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Start Time</label>
                    <select
                      value={form.startTime}
                      onChange={e => setForm({ ...form, startTime: e.target.value })}
                    >
                      {classSlots.map(t => (
                        <option key={t.start} value={t.start}>
                          {t.label.split(' - ')[0]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>End Time</label>
                    <select
                      value={form.endTime}
                      onChange={e => setForm({ ...form, endTime: e.target.value })}
                    >
                      {classSlots.map(t => (
                        <option key={t.start} value={t.start}>
                          {t.label.split(' - ')[1]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-ghost"
                    onClick={() => { setModal(false); setError('') }}>
                    Cancel
                  </button>
                  <button className="btn btn-blue" onClick={handleSave} disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="page-card">
            <div className="page-header">
              <h2>Timetable</h2>
              <button className="btn btn-blue" onClick={() => setModal(true)}>
                + Add Entry
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ minWidth: 130 }}>Time</th>
                    {days.map(d => (
                      <th key={d} style={{ minWidth: 110 }}>{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map(slot => {

                    // Break Row
                    if (slot.isBreak) {
                      const style = getBreakStyle(slot.breakLabel)
                      return (
                        <tr key={slot.start}>
                          <td style={{
                            fontWeight: 700,
                            color: '#94a3b8',
                            fontSize: 12,
                            padding: '8px 14px',
                            whiteSpace: 'nowrap',
                            background: '#f8fafc'
                          }}>
                            {slot.label}
                          </td>
                          {days.map(day => (
                            <td key={day} style={{
                              background: style.bg,
                              textAlign: 'center',
                              fontSize: 12,
                              fontWeight: 600,
                              color: style.text,
                              padding: '8px 4px'
                            }}>
                              {slot.breakLabel}
                            </td>
                          ))}
                        </tr>
                      )
                    }

                    // Normal Class Row
                    return (
                      <tr key={slot.start}>
                        <td style={{
                          fontWeight: 600,
                          color: '#64748b',
                          whiteSpace: 'nowrap',
                          padding: '12px 14px'
                        }}>
                          {slot.label}
                        </td>
                        {days.map(day => {
                          const cell = getCell(slot.start, day)
                          return (
                            <td key={day} style={{ padding: '10px 14px' }}>
                              {cell ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                  <span style={{
                                    fontWeight: 600,
                                    color: '#fff',
                                    background: 'linear-gradient(135deg,#4f8ef7,#7c5bf7)',
                                    padding: '4px 10px',
                                    borderRadius: 6,
                                    fontSize: 13,
                                    whiteSpace: 'nowrap'
                                  }}>
                                    {cell.subjectName}
                                  </span>
                                  <button
                                    style={{
                                      background: 'none',
                                      border: 'none',
                                      cursor: 'pointer',
                                      color: '#ef4444',
                                      fontSize: 14,
                                      fontWeight: 700,
                                      padding: 2
                                    }}
                                    onClick={async () => {
                                      await deleteTimetable(cell.timetableId)
                                      load()
                                    }}
                                  >✕</button>
                                </div>
                              ) : (
                                <span style={{ color: '#e2e8f0' }}>—</span>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {items.length === 0 && (
              <p style={{
                textAlign: 'center',
                color: '#64748b',
                padding: '20px 0',
                fontSize: 14
              }}>
                No timetable entries yet. Click "+ Add Entry" to add subjects.
              </p>
            )}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 20, marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 14, height: 14, borderRadius: 3, background: '#f0f7ff', border: '2px solid #4f8ef7' }} />
              <span style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>Break</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 14, height: 14, borderRadius: 3, background: '#fef9ec', border: '2px solid #d97706' }} />
              <span style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>Lunch Break</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Timetable