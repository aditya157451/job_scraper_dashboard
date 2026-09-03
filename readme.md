# 💼 JobHub — Job Scraper Dashboard

A full-stack **Job Scraper Dashboard** that collects job listings, stores them in PostgreSQL, exposes them through a FastAPI backend, and displays them in a React dashboard.

The application includes **JWT authentication, job search, filtering, pagination, statistics, analytics, and protected job details**.

---

## 🚀 Features

### 🔐 Authentication

* User registration
* User login
* JWT-based authentication
* Password hashing with bcrypt
* Protected dashboard routes
* Protected Jobs API
* Protected Job Details
* Logout functionality

### 🔎 Job Search & Filtering

* Search by job title
* Filter by location
* Filter by company
* Filter by job source
* Clear filters
* Pagination
* Sort jobs by:

  * Newest
  * Job title
  * Company

### 📊 Dashboard & Analytics

* Total jobs
* Total companies
* Total locations
* Jobs by source
* Source distribution
* Job statistics

### 🕷️ Job Scraper

* Python-based scraper
* BeautifulSoup for HTML parsing
* Requests for HTTP requests
* Extracts:

  * Job title
  * Company
  * Location
  * Salary
  * Skills
  * Job URL
* Stores scraped jobs in PostgreSQL
* Duplicate job prevention

---

## 🏗️ Architecture

```text
                Job Website
                    │
                    ▼
             Python Scraper
          Requests + BeautifulSoup
                    │
                    ▼
               PostgreSQL
                 Database
                    │
                    ▼
              FastAPI Backend
                    │
          ┌─────────┴─────────┐
          │                   │
      JWT Auth             Jobs API
          │                   │
          └─────────┬─────────┘
                    │
                    ▼
              React Frontend
                    │
                    ▼
            JobHub Dashboard
```

---

## 🛠️ Tech Stack

### Backend

* Python
* FastAPI
* SQLAlchemy
* PostgreSQL
* Pydantic
* JWT
* Passlib
* bcrypt
* Requests
* BeautifulSoup

### Frontend

* React.js
* Vite
* JavaScript
* React Router
* CSS

### Database

* PostgreSQL

### Development Tools

* VS Code
* Git
* GitHub
* Postman
* pgAdmin
* Swagger / OpenAPI

---

## 📁 Project Structure

```text
JOB_SCRAPPER_DASHBOARD/
│
├── backend/
│   │
│   ├── app/
│   │   ├── routers/
│   │   │   ├── auth.py
│   │   │   └── jobs.py
│   │   │
│   │   ├── scraper/
│   │   │   └── job_scraper.py
│   │   │
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── JobAnalytics.jsx
│   │   │   ├── JobCard.jsx
│   │   │   ├── JobDetails.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── Stats.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── practice_job_site/
│   └── index.html
│
├── .gitignore
└── README.md
```

---

## 🔐 Authentication Flow

```text
New User
   │
   ▼
Register
   │
   ▼
Login
   │
   ▼
JWT Access Token
   │
   ▼
Dashboard
   │
   ├── Jobs API 🔒
   │
   └── Job Details 🔒
```

Users cannot access the dashboard without authentication.

The backend also validates the JWT token before allowing access to protected job endpoints.

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint         | Description            |
| ------ | ---------------- | ---------------------- |
| POST   | `/auth/register` | Register a new user    |
| POST   | `/auth/login`    | Login and receive JWT  |
| GET    | `/auth/me`       | Get authenticated user |

### Jobs

| Method | Endpoint         | Description                            |
| ------ | ---------------- | -------------------------------------- |
| GET    | `/jobs/`         | Get jobs with filtering and pagination |
| GET    | `/jobs/stats`    | Get job statistics                     |
| GET    | `/jobs/{job_id}` | Get a specific job                     |

Protected endpoints require:

```text
Authorization: Bearer <JWT_TOKEN>
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd JOB_SCRAPPER_DASHBOARD
```

### 2. Backend Setup

Go to the backend:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## 🗄️ PostgreSQL Setup

Create a PostgreSQL database:

```text
jobhub
```

Configure your database connection using environment variables.

Example:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/jobhub
```

> Never commit your `.env` file or database password to GitHub.

---

## ▶️ Run Backend

From the `backend` directory:

```bash
uvicorn app.main:app --reload
```

Backend will run at:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

---

## ▶️ Run Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

---

## 🕷️ Run the Scraper

From the backend directory:

```bash
python -m app.scraper.job_scraper
```

The scraper:

1. Fetches the job website
2. Parses job listings
3. Extracts job information
4. Checks for duplicate URLs
5. Saves new jobs to PostgreSQL

Example output:

```text
Skipping duplicate: Python Backend Developer

Skipping duplicate: Django Developer

Skipping duplicate: React Developer

Scraping completed!
New jobs saved: 0
Duplicate jobs skipped: 3
```

---

## 🔎 Search Example

The Jobs API supports query parameters:

```text
/jobs/?search=Python
```

```text
/jobs/?location=Delhi
```

```text
/jobs/?company=Google
```

```text
/jobs/?search=Python&location=Delhi
```

Pagination:

```text
/jobs/?skip=0&limit=5
```

---

## 📊 Example API Response

```json
{
  "total": 104,
  "jobs": [
    {
      "id": 1,
      "title": "Python Backend Developer",
      "company": "Example Company",
      "location": "Bangalore",
      "salary": "₹8 LPA",
      "skills": "Python, FastAPI, PostgreSQL",
      "job_url": "https://example.com/jobs/1",
      "source": "Local Scraper"
    }
  ]
}
```

---

## 🔒 Security

JobHub uses JWT authentication to protect application resources.

Protected resources include:

```text
Dashboard
   ↓
Jobs API
   ↓
Job Statistics
   ↓
Job Details
```

Passwords are stored as hashed passwords rather than plain text.

Sensitive configuration such as database credentials should be stored in `.env`.

---

## 🧪 Testing

The API can be tested using:

* Swagger UI
* Postman
* Browser
* React frontend

Swagger:

```text
http://127.0.0.1:8000/docs
```

---

## 🎯 Learning & Engineering Concepts Demonstrated

This project demonstrates practical experience with:

* REST API development
* FastAPI
* JWT authentication
* Password hashing
* SQLAlchemy ORM
* PostgreSQL
* CRUD-style API design
* Web scraping
* HTML parsing
* Duplicate detection
* Search and filtering
* Pagination
* React components
* React Router
* API integration
* Protected frontend routes
* Frontend/backend integration
* Git and GitHub

---

## 🔮 Future Improvements

Planned improvements include:

* [ ] Centralized API helper
* [ ] Refresh tokens
* [ ] Better JWT secret management
* [ ] Advanced job filtering
* [ ] Automated scheduled scraping
* [ ] Multiple real job sources
* [ ] Saved/bookmarked jobs
* [ ] Job application tracking
* [ ] User-specific saved jobs
* [ ] Email notifications
* [ ] Docker deployment
* [ ] Cloud deployment
* [ ] Improved analytics and charts

---

## 👨‍💻 Author

**Aditya Kumar**

B.Tech — Computer Science & Engineering

Interested in:

* Python Backend Development
* FastAPI
* React.js
* PostgreSQL
* AI/ML
* Full-Stack Development

---

## ⭐ Project

If you find this project useful, consider giving it a ⭐ on GitHub.

````

### Add it to your project

Save this as:

```text
D:\JOB_SCRAPPER_DASHBOARD\README.md
````

Then run:

```powershell
git add README.md
git commit -m "Add project README"
```

After that, we're ready to connect the project to your GitHub repository and push it.
