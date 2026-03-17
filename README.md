# Acronym Assessment 2026

Full-stack app with:
- `backend/`: Express + PostgreSQL (Knex)
- `frontend/`: Nuxt, NuxtUI

## Prerequisites
- Node.js + npm installed
- Local PostgreSQL databse (or hosted)

## Live Production
[https://acronymassessment.syukrandev.com](https://acronymassessment.syukrandev.com/)

# Local Setup

## Backend 
Create `backend/.env`:

```bash
DB_HOST=...
DB_PORT=5432
DB_USER=...
DB_PASSWORD=...
DB_NAME=...
JWT_SECRET=...
PORT=3008
```

Install and run:

```bash
cd backend
npm install
npm run dev
```

### API
- `POST /api/auth/signup`
- `POST /api/auth/login` (has rate limit to prevent abuse)
- `GET /api/user/profile` (protected route - requires `Authorization: Bearer <token>`)

## Frontend
Create `frontend/.env`:

```bash
NUXT_PUBLIC_API_BASE=http://localhost:3008
PORT=3007
HOST=0.0.0.0
```

Install and run:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL (default):
- `http://localhost:3007`

Backend URL (default):
- `http://localhost:3008`

## Notes 
- Pinia (State management): Opt to this this to keep auth state code clean without too much prop-drilling.
- JWT in localStorage: I used JWT because whole apps are simple (login and fetch profile only), it keeps the backend stateless and easy to run without extra session/refresh-token complexity, and the backend still enforces access by verifying the token on protected routes; from UI side I persist the token in localStorage purely for simplicity so the session survives refresh, accepting the trade-off that its less secure than httpOnly cookies (WHICH mitigated by HTTPS and keeping tokens short-lived i.e 15mins onlyy in PROD).
