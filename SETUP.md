# Portfolio — Setup, Schema & Deployment

Full-stack portfolio for **Aman Jaiman**: React + Tailwind (frontend), Node + Express + MongoDB (backend).

## Folder structure

```
Portfolio/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── data/
│   ├── public/
│   └── package.json
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── scripts/
│   └── package.json
└── SETUP.md
```

## Prerequisites

- Node.js 18+
- MongoDB Atlas cluster (or local MongoDB)

## Database schema (MongoDB)

### Collection: `projects`

| Field        | Type       | Required | Description                          |
|-------------|------------|----------|--------------------------------------|
| `_id`       | ObjectId   | auto     | Primary key                          |
| `title`     | String     | yes      | Project title                        |
| `description` | String   | yes      | Long description                     |
| `techStack` | [String]   | no       | Tags / technologies                  |
| `githubUrl` | String     | no       | Repository link                      |
| `liveUrl`   | String     | no       | Live demo URL                        |
| `order`     | Number     | no       | Sort order (ascending)               |
| `featured`  | Boolean    | no       | Default `true`; `false` hides from public list |
| `createdAt` | Date       | auto     | Mongoose timestamps                  |
| `updatedAt` | Date       | auto     | Mongoose timestamps                  |

### Collection: `messages`

| Field     | Type     | Required | Description        |
|----------|----------|----------|--------------------|
| `_id`    | ObjectId | auto     | Primary key        |
| `name`   | String   | yes      | Sender name        |
| `email`  | String   | yes      | Sender email       |
| `message`| String   | yes      | Body               |
| `read`   | Boolean  | no       | Default `false`    |
| `createdAt` | Date  | auto     | Mongoose timestamps|
| `updatedAt` | Date  | auto     | Mongoose timestamps|

## Backend setup

```bash
cd backend
cp .env.example .env
# Edit .env: MONGODB_URI, ADMIN_TOKEN, CORS_ORIGIN, PORT
npm install
npm run seed    # optional: loads sample projects (wipes existing projects)
npm run dev     # or npm start
```

API runs at `http://localhost:5000` by default.

- **Public:** `GET /api/projects`, `POST /api/messages`, `GET /api/health`
- **Admin (header `Authorization: Bearer <ADMIN_TOKEN>`):**  
  `GET /api/projects/all`, `POST /api/projects`, `PUT /api/projects/:id`, `DELETE /api/projects/:id`, `GET /api/messages`

## Frontend setup

```bash
cd frontend
cp .env.example .env
# Optional: VITE_GITHUB_USERNAME=yourGitHubLogin
# Production: VITE_API_URL=https://your-api-host.com
npm install
npm run dev
```

Open `http://localhost:5173`. Vite proxies `/api` to `http://localhost:5000` in development.

### Resume file

Add `frontend/public/resume.pdf` (replace the placeholder note). The hero button downloads `/resume.pdf`.

### Profile & links

Edit `frontend/src/data/profile.js` (name, email, LinkedIn, GitHub, location, summary).

### Admin UI

Navigate to `/admin`, paste the same value as `ADMIN_TOKEN` from the backend `.env`, then manage projects and read messages.

## SEO & performance

- Meta tags in `frontend/index.html` + per-route `react-helmet-async` on Home.
- Lazy-friendly images for GitHub stats (`loading="lazy"`).
- Production build: `npm run build` in `frontend` — static assets in `frontend/dist`.

## Deployment guide

### Option A — Split hosting (recommended)

1. **Backend:** Deploy to [Railway](https://railway.app), [Render](https://render.com), or [Fly.io](https://fly.io).  
   - Set env: `MONGODB_URI`, `ADMIN_TOKEN`, `PORT`, `CORS_ORIGIN` (your frontend origin, e.g. `https://yourname.vercel.app`).
2. **Frontend:** Deploy `frontend/dist` to [Vercel](https://vercel.com) or [Netlify](https://netlify.com).  
   - Build command: `npm run build`  
   - Output directory: `dist`  
   - Env: `VITE_API_URL=https://your-backend-host.com` (no `/api` suffix; the client appends `/api`).

### Option B — Same origin

Serve the API under the same domain (e.g. reverse proxy: `/api` → Node, `/` → static files). Then you can omit `VITE_API_URL` if the SPA is served from the same host.

### MongoDB Atlas

1. Create a cluster → Database Access (user) → Network Access (allow deployment IPs or `0.0.0.0/0` for testing).  
2. Connection string in `MONGODB_URI` with database name, e.g. `...mongodb.net/portfolio?retryWrites=true&w=majority`.

### After deploy

- Run `npm run seed` once against production URI (or add projects via `/admin`).
- Rotate `ADMIN_TOKEN` to a long random string.
- Update `profile.js` and add a real `resume.pdf`.

## Troubleshooting

| Issue | Check |
|--------|--------|
| Projects show “sample data” | Backend running? Mongo connected? Run `seed`? |
| Contact form error | `POST /api/messages` reachable; CORS includes frontend origin |
| Admin 401 | `ADMIN_TOKEN` matches `Authorization: Bearer ...` |
| GitHub images broken | Set `VITE_GITHUB_USERNAME` to a **public** GitHub username |
