import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Student
export const registerStudent = (data) => api.post('/students', data);
export const loginStudent = (data) => api.post('/students/login', data);
export const getAllStudents = () => api.get('/students');
export const getStudentById = (id) => api.get(`/students/${id}`);
export const updateStudent = (id, data) => api.put(`/students/${id}`, data);
export const deleteStudent = (id) => api.delete(`/students/${id}`);

// Admin
export const loginAdmin = (data) => api.post('/admins/login', data);
export const getAllAdmins = () => api.get('/admins');

// Tasks
export const addTask = (data) => api.post('/tasks', data);
export const getAllTasks = () => api.get('/tasks');
export const getTasksByStudent = (id) => api.get(`/tasks/student/${id}`);
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

// Timetable
export const addTimetable = (data) => api.post('/timetables', data);
export const getTimetablesByStudent = (id) => api.get(`/timetables/student/${id}`);
export const deleteTimetable = (id) => api.delete(`/timetables/${id}`);

// Announcements
export const addAnnouncement = (data) => api.post('/announcements', data);
export const getAllAnnouncements = () => api.get('/announcements');
export const deleteAnnouncement = (id) => api.delete(`/announcements/${id}`);

// Events
export const addEvent = (data) => api.post('/events', data);
export const getAllEvents = () => api.get('/events');
export const deleteEvent = (id) => api.delete(`/events/${id}`);

// Reminders
export const addReminder = (data) => api.post('/reminders', data);
export const getAllReminders = () => api.get('/reminders');
export const deleteReminder = (id) => api.delete(`/reminders/${id}`);