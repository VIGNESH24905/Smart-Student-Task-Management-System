import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import AddTask from './pages/AddTask'
import Announcements from './pages/Announcements'
import Events from './pages/Events'
import Timetable from './pages/Timetable'
import AdminDashboard from './pages/AdminDashboard'
import AdminStudents from './pages/AdminStudents'
import AdminAnnouncements from './pages/AdminAnnouncements'
import AdminEvents from './pages/AdminEvents'
import AdminTasks from './pages/AdminTasks'

// ✅ Route guard for students
const StudentRoute = ({ children }) => {
  const student = localStorage.getItem('student')
  return student ? children : <Navigate to="/login" />
}

// ✅ Route guard for admin
const AdminRoute = ({ children }) => {
  const admin = localStorage.getItem('admin')
  return admin ? children : <Navigate to="/login" />
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Student Routes */}
        <Route path="/dashboard" element={
          <StudentRoute><Dashboard /></StudentRoute>
        } />
        <Route path="/tasks" element={
          <StudentRoute><Tasks /></StudentRoute>
        } />
        <Route path="/tasks/add" element={
          <StudentRoute><AddTask /></StudentRoute>
        } />
        <Route path="/announcements" element={
          <StudentRoute><Announcements /></StudentRoute>
        } />
        <Route path="/events" element={
          <StudentRoute><Events /></StudentRoute>
        } />
        <Route path="/timetable" element={
          <StudentRoute><Timetable /></StudentRoute>
        } />

        {/* Protected Admin Routes */}
        <Route path="/admin/dashboard" element={
          <AdminRoute><AdminDashboard /></AdminRoute>
        } />
        <Route path="/admin/students" element={
          <AdminRoute><AdminStudents /></AdminRoute>
        } />
        <Route path="/admin/tasks" element={
          <AdminRoute><AdminTasks /></AdminRoute>
        } />
        <Route path="/admin/announcements" element={
          <AdminRoute><AdminAnnouncements /></AdminRoute>
        } />
        <Route path="/admin/events" element={
          <AdminRoute><AdminEvents /></AdminRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App