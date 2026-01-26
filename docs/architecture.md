# ApiScan – System Architecture

ApiScan is an AI-driven autonomous API testing platform designed with a
decoupled, scalable architecture.

---

## 🧩 Core Components

### 1. Frontend (Next.js)
- User authentication
- Project & spec management
- Blueprint review
- Test run visualization

📍 Tech: Next.js, Tailwind, Axios

---

### 2. Backend (FastAPI)
- Auth (JWT)
- Project, spec, blueprint APIs
- Test run orchestration
- Database persistence

📍 Tech: FastAPI, SQLAlchemy, PostgreSQL

---

### 3. Worker (Celery)
- AI reasoning
- Blueprint generation
- Test execution orchestration
- Async & scalable

📍 Tech: Celery, Redis, Python

---

### 4. Runner (Docker Sandbox)
- Isolated test execution
- Executes generated test cases
- No access to core system

📍 Tech: Docker, Pytest, Requests

---

### 5. Infrastructure
- PostgreSQL → persistence
- Redis → async queues
- Docker → isolation

---

## 🔁 High-Level Flow

User → Frontend  
Frontend → Backend (JWT)  
Backend → Worker (Celery)  
Worker → Runner (Docker)  
Results → Backend → Frontend

---

## 🧠 Design Principles

- Separation of concerns
- Zero trust execution
- Human-in-the-loop AI
- Async by default
- Secure by design
