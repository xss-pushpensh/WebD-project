<div align="center">

# 🎯 AI Interview Platform

### Full-Stack MERN Application with Google Gemini AI

An intelligent interview preparation platform that generates AI-powered interview questions,
evaluates your answers, parses resumes, and exports detailed PDF reports.

[![Node.js](https://img.shields.io/badge/Node.js-v20+-green?logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-v18+-blue?logo=react)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://mongodb.com)
[![Gemini](https://img.shields.io/badge/Google-Gemini_AI-orange?logo=google)](https://ai.google.dev)

</div>

---

<!-- ============================================================
     HERO BANNER IMAGE
     Place your banner image at: assets/banner.png
     ============================================================ -->

![AI Interview Platform Banner](./assets/banner.png)

---

## 📖 Table of Contents

1. [About the Project](#-about-the-project)
2. [Core Concepts Explained](#-core-concepts-explained)
3. [Features](#-features)
4. [Tech Stack](#-tech-stack)
5. [System Architecture](#-system-architecture)
6. [Screenshots](#-screenshots)
7. [Folder Structure](#-folder-structure)
8. [Getting Started](#-getting-started)
9. [Environment Variables](#-environment-variables)
10. [API Endpoints](#-api-endpoints)
11. [How It Works (End-to-End Flow)](#-how-it-works-end-to-end-flow)
12. [Troubleshooting](#-troubleshooting)
13. [Roadmap](#-roadmap)
14. [Contributing](#-contributing)
15. [License](#-license)

---

## 🚀 About the Project

**AI Interview Platform** is a full-stack web application that simulates a real technical
interview using **Google Gemini AI**. Users can sign up, upload their resume, get
AI-generated interview questions tailored to their profile, submit answers, receive
instant AI evaluation, and download a **PDF performance report**.

### The Problem It Solves

Preparing for interviews is hard without a practice partner. This project gives every
candidate an **on-demand AI interviewer** that:
- Asks relevant questions based on their resume and role
- Evaluates answers in real-time
- Produces a downloadable report to track progress

---

## 🧠 Core Concepts Explained

This section explains the **fundamental building blocks** of the project — useful for
beginners and interviewers reviewing the code.

### 1. What is MERN?

**MERN** = **M**ongoDB + **E**xpress + **R**eact + **N**ode.js

| Layer | Role | In this project |
|---|---|---|
| **MongoDB** | NoSQL database (stores JSON-like documents) | Users, interviews, questions, answers, reports |
| **Express** | Backend web framework for Node.js | REST API routes |
| **React** | Frontend UI library (component-based) | Login, dashboard, interview UI |
| **Node.js** | JavaScript runtime (runs JS on server) | Powers the Express backend |

### 2. How does Authentication work? (JWT)

1. User logs in → server verifies credentials
2. Server signs a **JWT (JSON Web Token)** with a secret key
3. Token is sent to the frontend → stored (localStorage / cookie)
4. Frontend attaches token to every protected request (`Authorization: Bearer <token>`)
5. Backend **middleware** verifies the token before allowing access

**Core idea:** *Stateless auth* — server doesn't remember sessions; the token proves identity.

### 3. How does AI question generation work?

1. Frontend sends resume text / job role to backend
2. Backend builds a **prompt** and calls **Google Gemini** via `@google/genai`
3. Gemini returns a structured list of questions (JSON)
4. Backend saves questions in MongoDB
5. Frontend fetches and renders them

**Core idea:** *LLM as a service* — we don't train a model; we **prompt** one.

### 4. How does PDF generation work?

- **Puppeteer** launches a headless Chromium browser
- Backend renders an HTML template with interview data
- Puppeteer prints it to a **PDF buffer**
- Buffer is streamed to the user as a downloadable file

**Core idea:** *Headless browser = HTML → PDF* (highest fidelity, supports CSS).

### 5. How does resume parsing work?

- User uploads a PDF
- `pdf-parse` extracts raw **text** from the PDF
- Extracted text is sent to Gemini to pull structured fields (skills, projects, etc.)

**Core idea:** *Text extraction first*, then *AI structuring*.

### 6. What is CORS and why does it matter?

**CORS (Cross-Origin Resource Sharing)** is a browser security rule. The frontend
(`localhost:5173`) and backend (`localhost:3000`) are **different origins**, so the
backend must explicitly allow the frontend via the `cors()` middleware with
`origin: FRONTEND_URL`.

**Symptom if misconfigured:** browser blocks the request → *"CORS policy"* error.

### 7. What is Mongoose?

**Mongoose** is an ODM (Object Document Mapper) for MongoDB. It lets you define
**schemas** (structure) for documents and adds validation, middleware, and helpers.

**Core idea:** *MongoDB is schemaless; Mongoose adds safety.*

---

## ✨ Features

- 🔐 **JWT Authentication** — secure signup, login, logout
- 🤖 **AI Question Generation** — powered by Google Gemini
- 📄 **Resume Upload & Parsing** — extracts skills/projects from PDF
- ✅ **Instant AI Evaluation** — scores and feedback per answer
- 📊 **PDF Report Export** — downloadable performance report
- 🕘 **Interview History** — revisit past interviews
- 🛡️ **Protected Routes** — token-based access control
- 📱 **Responsive UI** — works on desktop and mobile

---

## 🛠 Tech Stack

### Frontend
- **React 18** + **Vite**
- **Tailwind CSS** (styling)
- **Axios** (HTTP client)
- **React Router** (routing)

### Backend
- **Node.js 20+**
- **Express.js**
- **Mongoose** (MongoDB ODM)
- **JWT** (jsonwebtoken)
- **bcrypt** (password hashing)
- **@google/genai** (Gemini API)
- **puppeteer** (PDF generation)
- **pdf-parse** (resume parsing)
- **zod** (schema validation)

### Infrastructure
- **MongoDB Atlas** (cloud DB)
- **Google AI Studio** (API keys)

---

## 🏗 System Architecture

<!-- ============================================================
     ARCHITECTURE DIAGRAM
     Place at: assets/architecture.png
     ============================================================ -->

![System Architecture](./assets/architecture.png)

```
┌─────────────────┐        HTTPS         ┌──────────────────┐
│   React (Vite)  │  ───────────────▶   │  Express (Node)  │
│   localhost:5173│  ◀───────────────   │  localhost:3000  │
└─────────────────┘      JSON/JWT        └────────┬─────────┘
                                                   │
                          ┌────────────────────────┼────────────────────────┐
                          ▼                        ▼                        ▼
                  ┌──────────────┐        ┌─────────────────┐      ┌────────────────┐
                  │  MongoDB     │        │  Google Gemini  │      │   Puppeteer    │
                  │  Atlas       │        │  @google/genai  │      │  (PDF render)  │
                  └──────────────┘        └─────────────────┘      └────────────────┘
```

---

## 📸 Screenshots

<!-- ============================================================
     SCREENSHOTS — Replace each with YOUR actual images
     Recommended: 1200×700 or 1440×900 PNG
     ============================================================ -->

### 🔐 Login / Signup
![Login Page](./assets/login.png)

### 🏠 Dashboard
![Dashboard](./assets/dashboard.png)

### 🎤 Interview Session
![Interview Page](./assets/interview.png)

### 📊 PDF Report
![PDF Report](./assets/report.png)

---

## 📁 Folder Structure

```
interview-ai/
├── Backend/
│   ├── controllers/        # Route handlers (business logic)
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express route definitions
│   ├── middleware/         # Auth, error handling
│   ├── utils/              # AI, PDF, resume helpers
│   ├── config/             # DB connection
│   ├── server.js           # Entry point
│   ├── package.json
│   └── .env                # (NOT committed)
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI
│   │   ├── pages/          # Login, Dashboard, Interview
│   │   ├── context/        # Auth context
│   │   ├── services/       # API calls (axios)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env                # (optional)
│
├── assets/                 # README images (banner, screenshots)
├── .gitignore
└── README.md
```

---

## ⚡ Getting Started

### Prerequisites (Manual — must be done by you)

| Requirement | How to get |
|---|---|
| **Node.js v20+** | [nodejs.org](https://nodejs.org) |
| **MongoDB Atlas cluster** | [mongodb.com/atlas](https://www.mongodb.com/atlas) — free tier |
| **Google AI Studio key** | [aistudio.google.com](https://aistudio.google.com) |
| **Git** | [git-scm.com](https://git-scm.com) |

> ⚠️ **MongoDB Atlas IP allowlist:** Apna IP add karna zaroori hai, warna
> `ENOTFOUND` / `ETIMEOUT` error aayega.

---

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/interview-ai.git
cd interview-ai
```

---

### 2️⃣ Backend setup

```bash
cd Backend
npm install
```

Create `Backend/.env`:

```env
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
GOOGLE_API_KEY=your_google_ai_studio_key
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Run the backend:

```bash
npm run dev
```

✅ Expected: `Server running on port 3000` + `MongoDB connected`

---

### 3️⃣ Frontend setup

Open a **new terminal**:

```bash
cd Frontend
npm install
```

*(Optional)* Create `Frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

Run the frontend:

```bash
npm run dev
```

✅ Expected: Vite prints `http://localhost:5173`

---

### 4️⃣ Open in browser

👉 **http://localhost:5173**

---

## 🔐 Environment Variables

### `Backend/.env`

| Variable | Required | Description |
|---|---|---|
| `MONGO_URI` | ✅ | MongoDB Atlas connection string |
| `GOOGLE_API_KEY` | ✅ | Google Gemini API key |
| `PORT` | ⭕ | Server port (default `3000`) |
| `NODE_ENV` | ⭕ | `development` / `production` |
| `FRONTEND_URL` | ✅ | Allowed CORS origin |

### `Frontend/.env` (optional)

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | ⭕ | Backend base URL |

> 🔎 **Verify keys match:** Run `grep -r "process.env" Backend/ --include="*.js"` —
> jo-jo `process.env.XXX` dikhe, **exact wahi naam** `.env` me hona chahiye.

---

## 🔌 API Endpoints

*(Routes may vary — check `Backend/routes/` for exact paths.)*

| Method | Route | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | ❌ | Register new user |
| `POST` | `/api/auth/login` | ❌ | Login, returns JWT |
| `POST` | `/api/auth/logout` | ✅ | Logout |
| `POST` | `/api/interview/start` | ✅ | Generate AI questions |
| `POST` | `/api/interview/answer` | ✅ | Submit + evaluate answer |
| `GET` | `/api/interview/:id` | ✅ | Get interview details |
| `GET` | `/api/interview/history` | ✅ | List past interviews |
| `POST` | `/api/resume/upload` | ✅ | Upload & parse resume |
| `GET` | `/api/report/:id` | ✅ | Download PDF report |

---

## 🔄 How It Works (End-to-End Flow)

```
1. Signup → bcrypt hashes password → saved in MongoDB
2. Login  → JWT issued → stored in frontend
3. Dashboard → user uploads resume (PDF)
4. Backend → pdf-parse extracts text → Gemini structures it
5. User clicks "Start Interview"
6. Backend → builds prompt → Gemini generates questions → saved in DB
7. Frontend renders questions → user answers each
8. Each answer → Gemini evaluates → score + feedback saved
9. After all questions → report compiled
10. "Download Report" → Puppeteer renders HTML → PDF streamed
11. Logout → token cleared → protected routes blocked
```

---

## 🐛 Troubleshooting

| Problem | Cause | Fix |
|---|---|---|
| `ENOTFOUND` / `ETIMEOUT` | Atlas IP not whitelisted | Add your IP in Atlas → Network Access |
| `Authentication failed` | Wrong Mongo credentials | Check username/password in URI |
| `EADDRINUSE :3000` | Port already in use | `lsof -ti:3000 \| xargs kill -9` or change `PORT` |
| CORS error in browser | `FRONTEND_URL` mismatch | Set `FRONTEND_URL=http://localhost:5173` |
| `response.text is not a function` | `@google/genai` version mismatch | Pin version or update call site |
| Puppeteer install fails | Chromium download blocked | `PUPPETEER_SKIP_DOWNLOAD=true npm install` |
| `.env` not loading | File in wrong folder | Must be inside `Backend/` |
| Blank PDF | Template data missing | Log data before `page.setContent()` |

---

## 🗺 Roadmap

- [x] JWT authentication
- [x] AI question generation
- [x] Resume parsing
- [x] PDF report
- [ ] Voice-based interview (Web Speech API)
- [ ] Video recording + analysis
- [ ] Multi-language support
- [ ] Admin dashboard
- [ ] Docker + CI/CD

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/amazing-feature`
3. Commit: `git commit -m "feat: add amazing feature"`
4. Push: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for details.

---

## 🙏 Acknowledgements

- [Google Gemini API](https://ai.google.dev)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- Original inspiration: [ankurdotio/interview-ai-yt](https://github.com/ankurdotio/interview-ai-yt)

---

<div align="center">

**⭐ If this project helped you, give it a star! ⭐**

Made with ❤️ using MERN + Gemini AI

</div>
