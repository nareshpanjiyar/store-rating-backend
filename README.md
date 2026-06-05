# Store Rating Platform - Backend

A role-based Store Rating Platform backend built using Node.js, Express.js, Prisma ORM, and PostgreSQL.

## Live Frontend

https://store-rating-prod.vercel.app/

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Refresh Token Support
* Change Password
* Session Management

### User Roles

* ADMIN
* USER
* STORE_OWNER

### Admin Features

* Dashboard Statistics
* Create Users
* Create Stores
* View Users
* View Stores
* Update User Roles
* Delete Users
* Cascade Delete Related Records

### User Features

* Browse Stores
* Search Stores
* View Store Details
* Submit Ratings
* Update Ratings

### Store Owner Features

* View Store Dashboard
* View Store Ratings
* View Average Rating

---

## Tech Stack

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Zod Validation
* Swagger Documentation

---

## Environment Variables

Create a .env file:

DATABASE_URL=your_postgresql_connection

JWT_SECRET=your_jwt_secret

JWT_REFRESH_SECRET=your_refresh_secret

PORT=8080

---

## Installation

Clone Repository

git clone <repository-url>

cd store-rating-backend

Install Dependencies

npm install

---

## Database Setup

Generate Prisma Client

npx prisma generate

Apply Schema

npx prisma db push

Or

npx prisma migrate dev

---

## Run Application

Development

npm run dev

Production

npm start

---

## API Documentation

Swagger

http://localhost:8080/api-docs

---

## Health Check

GET /health

Response

{
"status": "healthy"
}

---

## Authentication

JWT Bearer Token Required

Authorization: Bearer <token>

---

## Deployment

Backend can be deployed on:

* Render
* Railway
* Fly.io
* AWS
* DigitalOcean

Database:

* Neon PostgreSQL

---

## Author

Naresh Panjiyar

MIT World Peace University

B.Tech Computer Engineering
