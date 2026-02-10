# 📘 Frontend README  

```md
# 🌐 Project Frontend – React Dashboard

This is the frontend for the **Dynamic Due Tasks & Projects Management System**.  
It provides a modern UI for managing projects, tasks, reminders, and dashboards.

---

#  Prerequisites

# Make sure the following are installed on the system:

- Node.js (v18 or above)
https://nodejs.org/

- Git

## Clone the Repository
- git clone https://github.com/your-username/planora.git
- cd planora/frontend


## 🛠 Tech Stack

- React.js
- Vite
- Mantine UI
- Axios
- React Router DOM
- Day.js
- Context API / Hooks

---

## 📁 Folder Structure

src/
│
├── components/ # Reusable UI components
├── pages/ # App pages
├── services/ # API services (Axios)
├── context/ # Auth & global state
├── hooks/ # Custom hooks
├── utils/ # Helpers
├── App.jsx
└── main.jsx


---

## ⚙️ Environment Variables

Create a `.env` file in the frontend root.

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1


## 📦 Install Dependencies
- npm install
▶️ Run the Frontend
- npm run dev
The app will run on:
http://localhost:5173


## 🔗 API Integration
Axios is used for API calls

Centralized API service

Automatic JWT token attachment

Handles 401, 409, 422 errors gracefully

## 📊 Dashboard Features
Overview cards

Due projects summary

Task status tracking

Real-time UI updates

User-specific data

## 🎨 UI & UX
Mantine UI components

Responsive design

Clean dashboard layout

Toast notifications

Loading states & error states

## 🧪 Error Handling
API error messages shown to users

Form validation errors

Network error handling

Unauthorized access handling

## 🐞 Debugging Tips
Use browser DevTools

React DevTools extension

Check Network tab for API calls

Console logs for state debugging

## 🔐 Authentication Flow
User logs in

JWT stored securely

Protected routes enabled

Auto logout on token expiry