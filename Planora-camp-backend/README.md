# Project Backend – Node.js + Express + MongoDB

This is the backend service for the **Dynamic Due Tasks & Projects Management System**.  
It handles authentication, projects, tasks, reminders, email notifications, and dashboard APIs.

---

## 1️⃣ Prerequisites

# Make sure the following are installed on the system:

- Node.js (v18 or above)
https://nodejs.org/

- MongoDB Atlas account or local MongoDB

- Git

## 2️⃣ Clone the Repository
- git clone https://github.com/your-username/planora.git
- cd planora/backend

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- Nodemailer
- Mailtrap (Development)
- Gmail SMTP (Production)
- node-cron
- JWT Authentication
- Multer (File Uploads)
- Day.js

---

## 📁 Folder Structure
- src/
│
├── controllers/ # Request handling logic
├── models/ # Mongoose schemas
├── routes/ # API routes
├── middlewares/ # Auth, multer, error handlers
├── utils/ # Mail, helpers
├── cron/ # Scheduled jobs
├── config/ # DB and environment config
├── app.js # Express app
└── index.js # Server entry point


---

## ⚙️ Environment Variables

Create a `.env` file in the backend root.

- ```env
- PORT=8000
- MONGODB_URI=your_mongodb_atlas_url
- JWT_SECRET=your_jwt_secret
- 
- NODE_ENV=development
- 
- # Mailtrap (DEV)
- MAIL_HOST=sandbox.smtp.mailtrap.io
- MAIL_PORT=2525
- MAIL_USER=your_mailtrap_user
- MAIL_PASS=your_mailtrap_pass
- 
- # Gmail (PROD)
- GMAIL_USER=yourgmail@gmail.com
- GMAIL_APP_PASSWORD=your_gmail_app_password


## 📦 Install Dependencies - To download all the packages required for the project in package.json file
npm install

## ▶️ Run the Server
- Development Mode
npm run dev

- Production Mode
npm start


## 📧 Email System (Mailtrap + Gmail)

- Development → Uses Mailtrap (safe testing)
- Production → Uses real Gmail SMTP
- Automatically switched using NODE_ENV
- No code changes required.

## ⏰ Cron Job – Project Due Reminders

- Runs daily at 9 AM
- Sends reminder emails:
- 🟡 One day before due date
- 🔴 On the due date
- Emails sent to:
- Project creator
- All project members

- Cron file:
src/cron/projectReminder.cron.js

## 📊 Dashboard APIs

Backend provides APIs for:

Total projects

Due today / due tomorrow

Completed tasks

Pending tasks

User-specific analytics

## 🧪 Error Handling

- Centralized error middleware
- Proper HTTP status codes (400, 401, 403, 404, 409, 422, 500)
- Meaningful error messages
- Async error handling using try/catch

## 🐞 Debugging Tips

- Use console.log() in cron & mail services
- Check MongoDB Atlas logs
- Use Postman for API testing
- Enable nodemon logs during development

## 🔐 Security Features

- JWT-based authentication
- Password hashing
- Protected routes
- Secure environment variables
- File upload validation


## 🧪 Common Issues & Fixes
❌ MongoDB not connecting

✔ Check MONGODB_URI
✔ Ensure IP is whitelisted in MongoDB Atlas

❌ Emails not sending via Gmail

✔ Use App Password
✔ Enable 2-Step Verification
✔ Check EMAIL_HOST and EMAIL_PORT

❌ CORS issues

✔ Ensure frontend URL is allowed in backend CORS config