# UITogether

A student community web app for university students: find study buddies, match
with them, and connect over Telegram/Viber once both sides agree — plus
university competitions/events, lost & found, and fun polls.

```
Student A  →  Interested  →  Student B  →  Accept  →  Mutual match  →  Contact unlocked
```

## Repository layout

```
UITogether/
├── backend/     Node.js + Express + MySQL REST API
└── frontend/    plain HTML/CSS/JS app (no framework, no build step)
```

Two independent applications. The frontend talks to the backend only over
HTTP, and never to MySQL directly:

```
Frontend (:5500)  ->  Backend API (:5050)  ->  MySQL (MAMP :8889)
```

Nothing is mixed between the two folders.

## Getting started

**1. Backend** (put your MySQL password in `backend/.env` first — the only
manual step; the schema is generated for you):

```bash
cd backend && npm install && npm run db:setup && npm run dev
```

**2. Frontend** — serve it statically with `frontend/` as the web root:

```bash
cd frontend && python3 -m http.server 5500 --bind 127.0.0.1
```

Then open <http://localhost:5500/index.html>.

Full instructions, the API reference and security notes:
[backend/README.md](backend/README.md) · [frontend/README.md](frontend/README.md).

## Stack

- **Backend:** Node.js, Express, MySQL (`mysql2`), REST
- **Auth:** JWT + bcrypt (UITogether account passwords — *not* Google OAuth,
  though only `@gmail.com` addresses may register)
- **Frontend:** plain HTML/CSS/JavaScript — no framework, no build step
