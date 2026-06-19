# Smart City Complaint Portal

A full-stack web application that allows citizens to file civic complaints (like potholes, water leakage, garbage issues, streetlight problems, etc.) and track their resolution status online. Officers and admins can manage, assign, and resolve complaints through dedicated dashboards.

## 🔗 Live Demo

**Website:** [https://smartcity-portal.netlify.app](https://smartcity-portal.netlify.app)

> Note: The backend is hosted on a free server, so the first request might take 30-50 seconds to load if the site has been inactive for a while. Please be patient on first load!

**Test login (Admin):**
- Email: `admin@smartcity.com`
- Password: `admin123`

## 📌 About the Project

Citizens often face difficulty reporting civic issues to the right department and tracking what happens after they complain. This project solves that by giving citizens a simple way to file a complaint, automatically routing it to the correct department using a keyword-based AI service, and letting them track its status in real time.

## ✨ Features

- **Citizen Portal** — Register, log in, file complaints with photos and location, and track status
- **Auto Department Routing** — A Python AI service reads the complaint text and predicts which department it belongs to
- **Officer Dashboard** — View and update assigned complaints
- **Admin Dashboard** — View all complaints, manage departments, post announcements, manage users
- **SLA Tracker** — Tracks how long each complaint has been pending against department deadlines
- **Complaint History** — Full status change log for every complaint
- **Feedback System** — Citizens can rate the resolution after a complaint is closed

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Java, Spring Boot |
| Database | MySQL (hosted on Aiven) |
| AI Service | Python, Flask (keyword-based department prediction) |
| Hosting | Netlify (frontend), Render (backend + AI service) |

## 🏗️ Architecture

```
Frontend (Netlify)
      |
      v
Spring Boot Backend (Render)  <-->  MySQL Database (Aiven)
      |
      v
Flask AI Service (Render) — predicts department from complaint text
```

## 📂 Project Structure

```
smartcity-project/
├── backend/          → Spring Boot REST API
├── frontend/          → HTML, CSS, JS pages
├── ai-service/        → Flask department-prediction service
└── database/          → SQL schema file
```

## 💻 Running Locally

If you want to run this project on your own machine:

1. **Database:** Set up a local MySQL database and run `database/project.sql`
2. **Backend:** Open the `backend/` folder in IntelliJ IDEA, update `application.properties` with your local MySQL credentials, and run the Spring Boot app
3. **AI Service:** Go into `ai-service/`, run `pip install -r requirements.txt`, then `python ai_service.py`
4. **Frontend:** Open `frontend/index.html` directly in your browser, or serve it with Live Server in VS Code

## 👩‍💻 Author

**Astha Tapriya**
BCA Student, Sophia College (Autonomous), Ajmer
