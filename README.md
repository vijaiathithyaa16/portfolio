# Vijai Athithyaa S — Portfolio

A full-stack personal portfolio showcasing my projects, skills, and background —
built from the ground up with a plain HTML/CSS/JS frontend and a Node/Express +
PostgreSQL backend.

**Live site:** [portfolio.vercel.app](https://frontend-semi17.vercel.app)

---

## About

I'm a Computer Science and Engineering student who builds things end to end —
from desktop software and embedded hardware to full-stack web platforms. This
site is both a showcase of that work and a project in its own right: a real
frontend/backend/database stack, deployed and live.

## Features

- Projects and skills pulled dynamically from a PostgreSQL database via a REST API
- Working contact form that stores messages server-side
- Responsive, single-page layout with smooth scroll navigation
- Clean separation between frontend (static) and backend (API), deployed independently

## Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Frontend   | HTML, CSS, JavaScript (no framework) |
| Backend    | Node.js, Express                     |
| Database   | PostgreSQL                           |
| Hosting    | Vercel (frontend), Railway (backend + DB) |

## Featured Projects

- **Campus Placement Management System** — Java Swing desktop app with MySQL/JDBC, built as a course project
- **Offline-First E-Waste Collector & EPR Compliance Platform** — hackathon project (Megathon, Reverse Logistics track) with a WhatsApp-integrated chatbot interface
- **Solar-Powered PCM Vaccine Cold Chain** — startup concept combining phase-change materials, Peltier cooling, and ESP32 control logic

See the [live site]((https://frontend-semi17.vercel.app)) for full details on each.
<!-- TODO: replace with your actual Vercel URL -->

## Running Locally

```bash
# Backend
cd backend
npm install
cp .env.example .env   # fill in DATABASE_URL
npm run seed
npm run dev

# Frontend (separate terminal)
cd frontend
npx serve .
```

Full setup and deployment notes are in [`SETUP.md`](./SETUP.md).
<!-- TODO: if you keep both READMEs, rename your current dev-setup README.md to SETUP.md so this one takes its place -->

## Contact

<!-- TODO: add your real links -->
- GitHub: [vijaiathithyaa16](https://github.com/vijaiathithyaa16)
- LinkedIn: [Vijai Athithyaa S](https://www.linkedin.com/in/vijai-athithyaa-s-004482381/)
- Email: vijaiathithyaa1612@gmail.com
