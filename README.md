# Portfolio — Vijai

Full-stack personal portfolio.

- **Frontend:** plain HTML / CSS / JavaScript (`/frontend`)
- **Backend:** Node.js + Express (`/backend`)
- **Database:** PostgreSQL (projects, skills, contact messages)
- **Deploy:** frontend → Vercel, backend + DB → Railway

## Project structure

```
portfolio/
  frontend/
    index.html
    css/style.css
    js/config.js      <- API_BASE_URL lives here
    js/main.js
    vercel.json
  backend/
    server.js
    db.js
    schema.sql
    seed.js
    routes/
      projects.js
      skills.js
      messages.js
    .env.example
```

## 1. Run locally

### Database
Install PostgreSQL locally, or spin up a free instance now on Railway and use
its connection string for local dev too — either works.

Create a database, then:

```bash
cd backend
cp .env.example .env
# edit .env: set DATABASE_URL to your local or Railway connection string
```

### Backend

```bash
cd backend
npm install
npm run seed     # creates tables + inserts your 3 starter projects and skills
npm run dev       # starts the API on http://localhost:5000
```

Check it's alive: open `http://localhost:5000/api/health`.

### Frontend

`frontend/js/config.js` already points at `http://localhost:5000/api` by
default. Just open `frontend/index.html` with a local server, e.g.:

```bash
cd frontend
npx serve .
# or use the VS Code "Live Server" extension
```

(Opening the HTML file directly with `file://` also works for viewing, but a
local server avoids occasional CORS quirks.)

## 2. Deploy the database + backend on Railway

1. Go to railway.app → **New Project** → **Provision PostgreSQL**.
2. Copy the `DATABASE_URL` Railway gives you (Postgres service → **Connect** tab).
3. In the same Railway project, **New → GitHub Repo** (or **Empty Service** +
   deploy from CLI) pointing at the `backend/` folder of this repo.
4. Set environment variables on the backend service:
   - `DATABASE_URL` → the Postgres connection string from step 2
   - `CORS_ORIGIN` → your Vercel frontend URL (you'll get this in step 3 below;
     you can add it after the first deploy and redeploy)
5. Railway auto-detects Node and runs `npm install` + `npm start`. Once it's
   live, note the public backend URL, e.g. `https://portfolio-backend-production.up.railway.app`.
6. Run the seed once against the production DB (from your machine, with
   `DATABASE_URL` in `backend/.env` set to the Railway string):
   ```bash
   cd backend
   npm run seed
   ```

## 3. Deploy the frontend on Vercel

1. Edit `frontend/js/config.js` and set:
   ```js
   const API_BASE_URL = "https://<your-railway-backend-domain>/api";
   ```
2. Push to GitHub, then in Vercel: **New Project** → import the repo → set
   **Root Directory** to `frontend`. Framework preset: "Other" (static site).
3. Deploy. Vercel gives you a URL like `https://your-portfolio.vercel.app`.
4. Go back to Railway and set `CORS_ORIGIN` to that Vercel URL, then redeploy
   the backend so it accepts requests from it.

## API reference

| Method | Route              | Description                  |
|--------|--------------------|-------------------------------|
| GET    | `/api/health`       | Health check                  |
| GET    | `/api/projects`     | List all projects             |
| GET    | `/api/projects/:id` | Get one project               |
| POST   | `/api/projects`     | Create a project              |
| PUT    | `/api/projects/:id` | Update a project              |
| DELETE | `/api/projects/:id` | Delete a project              |
| GET    | `/api/skills`       | List all skills               |
| POST   | `/api/messages`     | Submit the contact form       |

## Adding / editing your own projects

Easiest path: edit the `projects` array in `backend/seed.js` and re-run
`npm run seed` (this truncates and re-inserts, so it's safe to run repeatedly
while you're still curating content). Once the site is live and you want to
add projects without re-seeding, `POST /api/projects` works too — you could
wire up a small admin form later, or just use `curl`/Postman for now.
