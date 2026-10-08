# Week 3 Internship Projects — Rolla Dheeraj Koushik

This repository contains my Week 3 internship assignments and practice work for Full Stack Web Development (MERN).

## Week 3 Focus

Week 3 covers full-stack integration and backend practice using:

- React
- Node.js
- Express.js
- MongoDB
- Mongoose
- Axios / Fetch API
- React Router
- Context API
- JWT Authentication
- bcrypt
- Multer
- REST APIs
- Postman

## Projects

| # | Project | Main Concepts |
|---|---|---|
| 1 | User REST API | Express routes, MongoDB, Mongoose |
| 2 | Mongoose Connection Practice | Express + MongoDB connection |
| 3 | CRUD Operations API | Create, read, update, delete |
| 4 | JWT Authentication API | Register, login, JWT, protected route |
| 5 | Postman Route Testing | REST routes + Postman collection |
| 6 | Full Stack To-Do Application | React + Express + MongoDB + JWT + routing |
| 7 | Image Upload Feature | React + Express + Multer + image preview |
| 8 | Task Manager Application | React + Express + MongoDB + login + task filtering |

## Folder Structure

```text
week-3-internship-projects/
├── 01-user-rest-api/
├── 02-mongoose-connection/
├── 03-crud-operations/
├── 04-jwt-authentication/
├── 05-postman-route-testing/
├── 06-fullstack-todo-app/
├── 07-image-upload-feature/
├── 08-task-manager-application/
├── .gitignore
└── README.md
```

## Running Backend-Only Projects

For Projects 1–5:

```bash
cd 01-user-rest-api
npm install
```

Copy `.env.example` to `.env`, add your MongoDB connection string if required, then run:

```bash
npm run dev
```

Use the same process for the other backend projects.

## Running Full-Stack Projects

Projects 6–8 include both frontend and backend code.

Example:

```bash
cd 06-fullstack-todo-app
npm install
npm run install:all
npm run dev
```

For projects using MongoDB/JWT, copy the server `.env.example` file to `.env` and provide your own values.

## Security Note

Real `.env` files are intentionally excluded from GitHub. Only `.env.example` files are included.

## Author

**Rolla Dheeraj Koushik**

B.Tech Computer Science & Engineering (AI & ML)  
SRM University-AP

- GitHub: https://github.com/DheerajKoushik1905
- LinkedIn: https://www.linkedin.com/in/dheeraj-koushik-rolla-3217a4422/

## Purpose

These projects were developed as part of my Week 3 internship work to practice backend development and end-to-end integration between React frontends, Express backends, and MongoDB databases.
