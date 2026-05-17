# AtomQuest Portal 🚀

AtomQuest is a premium goal-tracking and performance management portal designed for Admins, Managers, and Employees. It features real-time progress visualization, sleek modern design systems, role-based dashboards, and interactive audit tools.

---

## 📁 Repository Structure

- `frontend/`: Vite-based React single-page application (SPA).
- `backend/`: Express server powered by Prisma ORM and SQLite.
- `render.yaml`: Render Blueprint configuration file for seamless, one-click production deployment.

---

## 🛠️ Local Development

### 1. Prerequisite Setup
Ensure you have [Node.js](https://nodejs.org/) installed.

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Generate the Prisma Client and initialize the SQLite database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   *The backend will run on `http://localhost:5001`.*

### 3. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:5175`.*

---

## 🌐 Production Deployment on Render

This project contains a `render.yaml` blueprint configuration which simplifies the deployment process.

### One-Click Blueprint Deployment
1. Push this repository to your GitHub account (done automatically via the setup commands).
2. Go to the [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** and select **Blueprint**.
4. Connect this GitHub repository.
5. Render will automatically read the `render.yaml` file, detect both the backend web service (`shreya-atom-backend`) and the frontend static site (`shreya-atom-frontend`), and configure the environment variables (`VITE_API_URL`) to link them perfectly.
6. Click **Approve** to deploy both services simultaneously.

---

## ⚠️ Important Note on SQLite

By default, the backend uses **SQLite** (`dev.db`).
> [!WARNING]
> Render's Web Services have ephemeral filesystems. This means that any data changes (like adding users, check-ins, or goals) made at runtime will be lost when the Render backend container restarts or redeploys.

### How to Switch to a Persistent Database (e.g., PostgreSQL)
To ensure your database is persistent:
1. Create a free **PostgreSQL Database** on Render.
2. In `backend/prisma/schema.prisma`, change the database provider to `postgresql`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. In your Render Dashboard, add the `DATABASE_URL` environment variable pointing to your Render PostgreSQL connection string under the `shreya-atom-backend` service.
4. Run `npx prisma db push` or let the automatic build command run it to sync your schema with PostgreSQL.
