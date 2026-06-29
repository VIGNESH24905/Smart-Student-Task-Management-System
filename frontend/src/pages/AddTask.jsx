import React, { useState } from 'react'
import { addTask, updateTask } from '../services/api'
import '../App.css'

const AddTask = ({ student, task, onClose, onSaved, isModal }) => {
  const [form, setForm] = useState(task || {
    taskName: '', description: '', deadline: '', priority: 'Medium', status: 'Pending'
  })
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    if (!form.taskName) { alert('Task name is required'); return }
    setLoading(true)
    try {
      if (task) await updateTask(task.taskId, form)
      else await addTask({ ...form, student: { studentId: student.studentId } })
      onSaved()
    } catch { alert('Failed to save task') }
    setLoading(false)
  }

  const content = (
    <div className={isModal ? 'modal-box' : 'page-card'}>
      <div className={isModal ? 'modal-title' : ''} style={!isModal ? { fontSize: 20, fontWeight: 700, marginBottom: 20 } : {}}>
        {task ? 'Edit Task' : 'Add New Task'}
      </div>
      <div className="form-group">
        <label>Task Name</label>
        <input placeholder="Enter task name" value={form.taskName}
          onChange={e => setForm({ ...form, taskName: e.target.value })} />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea placeholder="Enter task description" value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })} />
      </div>
      <div className="form-grid-3">
        <div className="form-group">
          <label>Deadline</label>
          <input type="date" value={form.deadline}
            onChange={e => setForm({ ...form, deadline: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Priority</label>
          <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
            <option>High</option><option>Medium</option><option>Low</option>
          </select>
        </div>
        <div className="form-group">
          <label>Status</label>
          <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
            <option>Pending</option><option>In Progress</option><option>Completed</option>
          </select>
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-blue" onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : 'Save Task'}
        </button>
      </div>
    </div>
  )

  return isModal ? <div className="modal-overlay">{content}</div> : content
}

export default AddTask