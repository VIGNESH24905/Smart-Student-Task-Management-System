# 📚 Smart Student Task Management System

A modern **Full-Stack Student Task Management System** built using **Spring Boot**, **React (Vite)**, and **MySQL**. This application helps students organize academic tasks, stay updated with announcements and events, manage class timetables, and receive email notifications.

---

## 🚀 Project Overview

The **Smart Student Task Management System** is designed to simplify academic management for students and administrators.

Students can:

* Register and log in securely
* Manage daily academic tasks
* View announcements
* Check upcoming events
* Access weekly timetables
* Track pending tasks

Administrators can:

* Manage students
* Create announcements
* Schedule events
* Manage tasks
* Maintain timetables
* Send email notifications

---

## ✨ Features

### 👨‍🎓 Student Module

* Student Registration
* Student Login
* Dashboard
* Add, Edit & Delete Tasks
* View Announcements
* View Events
* View Timetable
* Upcoming Events
* Pending Tasks Summary
* Email Notifications

---

### 👨‍💼 Admin Module

* Admin Login
* Dashboard
* Manage Students
* Manage Tasks
* Manage Announcements
* Manage Events
* Manage Timetable
* Send Email Notifications

---

## 🛠 Tech Stack

### Frontend

* React.js
* Vite
* HTML5
* CSS3
* JavaScript
* Axios

### Backend

* Spring Boot
* Spring Data JPA
* Spring MVC
* REST API
* Maven

### Database

* MySQL

### Development Tools

* VS Code
* IntelliJ IDEA
* Postman
* Git
* GitHub

---

## 📂 Project Structure

```text
SmartStudentTaskManagement
│
├── backend
│   └── studenttaskmanagement
│       ├── src
│       ├── pom.xml
│       └── application.properties
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/VIGNESH24905/Smart-Student-Task-Management-System.git
```

---

### Backend Setup

Navigate to the backend folder:

```bash
cd backend/studenttaskmanagement
```

Configure MySQL database in `application.properties`.

Create a database named:

```sql
student_task_management
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

Backend runs at:

```text
http://localhost:8081
```

---

### Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## 📡 REST API Endpoints

### Student

| Method | Endpoint               |
| ------ | ---------------------- |
| POST   | /api/students/register |
| POST   | /api/students/login    |
| GET    | /api/students          |

### Tasks

| Method | Endpoint        |
| ------ | --------------- |
| GET    | /api/tasks      |
| POST   | /api/tasks      |
| PUT    | /api/tasks/{id} |
| DELETE | /api/tasks/{id} |

### Announcements

| Method | Endpoint           |
| ------ | ------------------ |
| GET    | /api/announcements |
| POST   | /api/announcements |

### Events

| Method | Endpoint    |
| ------ | ----------- |
| GET    | /api/events |
| POST   | /api/events |

### Timetable

| Method | Endpoint       |
| ------ | -------------- |
| GET    | /api/timetable |
| POST   | /api/timetable |

---

## 📷 Application Screenshots

Add screenshots here after uploading them.

```
screenshots/
│
├── login.png
├── register.png
├── dashboard.png
├── tasks.png
├── announcements.png
├── events.png
├── timetable.png
└── admin-dashboard.png
```

Example:

```md
## Login Page

![Login](screenshots/login.png)

## Dashboard

![Dashboard](screenshots/dashboard.png)
```

---

## 🎯 Future Enhancements

* JWT Authentication
* Role-Based Authorization
* Attendance Management
* Assignment Submission
* Mobile Application
* Cloud Deployment (AWS / Render)
* Push Notifications
* Analytics Dashboard

---

## 👨‍💻 Developer

**Vignesh P**

B.Tech – Artificial Intelligence and Data Science

Karpagam Institute of Technology

GitHub:
https://github.com/VIGNESH24905

---

## ⭐ If you like this project

Please give this repository a ⭐ on GitHub.
