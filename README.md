# NorthStar Ops Request Tracker

A full-stack Operations Request Management System built using React, FastAPI, and PostgreSQL.

The application helps operations teams manage customer and lead requests through a centralized dashboard with request tracking, filtering, analytics, and lifecycle management.

---

## Features

### Request Management

* Create new requests
* View all requests
* View request details
* Update request information
* Archive requests (Soft Delete)
* View archived requests

### Filtering

Filter requests by:

* Country
* Category
* Priority
* Status
* Assigned Owner
* Archived Status
* Overdue Requests

### Dashboard Analytics

* Total Requests
* Open Requests
* Urgent Requests
* Overdue Requests
* Requests by Country
* Requests by Category
* Requests by Priority
* Requests by Status

### User Experience

* Responsive Dashboard
* Interactive Charts
* Status & Priority Badges
* Toast Notifications
* Loading States
* Empty States
* Confirmation Dialogs
* Clean SaaS-inspired UI

---

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router DOM
* Recharts
* Lucide React
* React Hot Toast

### Backend

* FastAPI
* SQLAlchemy
* Pydantic
* Uvicorn

### Database

* PostgreSQL

### API Testing

* Swagger UI
* Postman

### Version Control

* Git & GitHub

---

## Project Structure

### Backend

```text
backend/
│
├── database/
│   └── db.py
│
├── routes/
│   ├── request_routes.py
│   └── metrics_routes.py
│
├── schemas/
│   └── request_schema.py
│
├── request.py
├── seed.py
├── main.py
├── requirements.txt
└── .env
```

### Frontend

```text
frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── vite.config.js
```

---

## Database Schema

### Request

| Field          | Type     |
| -------------- | -------- |
| request_id     | String   |
| customer_name  | String   |
| email          | String   |
| country        | String   |
| timeZone       | String   |
| category       | String   |
| priority       | String   |
| status         | String   |
| assigned_owner | String   |
| due_date       | Date     |
| notes          | Text     |
| created_at     | DateTime |
| updated_at     | DateTime |
| is_archived    | Boolean  |

---

## API Endpoints

### Requests

| Method | Endpoint               | Description       |
| ------ | ---------------------- | ----------------- |
| GET    | /requests              | Get all requests  |
| POST   | /requests              | Create request    |
| GET    | /requests/{request_id} | Get request by ID |
| PATCH  | /requests/{request_id} | Update request    |
| DELETE | /requests/{request_id} | Archive request   |

### Metrics

| Method | Endpoint | Description         |
| ------ | -------- | ------------------- |
| GET    | /metrics | Dashboard analytics |

---

## Local Setup

### Prerequisites

Install:

* Python 3.11+
* Node.js 18+
* PostgreSQL
* Git

---

## Backend Setup

### Clone Repository

```bash
git clone <repository-url>
cd backend
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Environment

Windows:

```bash
venv\Scripts\activate
```

Linux / Mac:

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://postgres:<password>@localhost:5432/northstar_ops
```

### Run Backend

```bash
uvicorn main:app --reload
```

Backend will run at:

```text
http://localhost:8000
```

Swagger Documentation:

```text
http://localhost:8000/docs
```

---

## Seed Sample Data

Populate the database with sample records:

```bash
python seed.py
```

This inserts sample request records for testing and dashboard analytics.

---

## Frontend Setup

Open a new terminal:

```bash
cd frontend
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

---

## Dashboard Metrics

The dashboard provides:

* Total Requests
* Open Requests
* Urgent Requests
* Overdue Requests
* Requests by Country
* Requests by Category
* Requests by Priority
* Requests by Status

---

## Architecture

```text
React Frontend
      │
      ▼
Axios API Layer
      │
      ▼
FastAPI Backend
      │
      ▼
SQLAlchemy ORM
      │
      ▼
PostgreSQL Database
```

---

## Design Decisions

### Soft Delete

Instead of permanently deleting records, requests are archived using:

```text
is_archived = True
```

This preserves historical data while keeping active request views clean.

### Dynamic Filtering

Filtering is implemented using query parameters to support multiple filter combinations without creating separate endpoints.

### Metrics Aggregation

Dashboard metrics are generated dynamically from database records using SQLAlchemy aggregation functions.

---

## Future Improvements

* Authentication & Authorization
* Role-Based Access Control
* Pagination
* Export to CSV/Excel
* Email Notifications
* Audit Logs
* Docker Deployment
* CI/CD Pipeline
* Unit & Integration Testing

---

## Author

Pavan Kumar Karavadi

Built as a full-stack Operations Request Tracking System using React, FastAPI, and PostgreSQL.

## Additional Documentation

- Architecture Explanation → docs/ARCHITECTURE.md
- API Documentation → docs/API_DOCUMENTATION.md
- Database Schema & Seed Data Guide → docs/DATABASE_SCHEMA_AND_SEEDING.md

## AI Usage Disclosure

AI tools were used to assist with:
- UI brainstorming and designing
- UI Code scaffolding
- Documentation generation
- UI Development guidance
- Reference for debugging

All implementation, integration, testing, debugging, and final verification were completed by the developer.
