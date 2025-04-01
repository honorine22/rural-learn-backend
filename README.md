NestJS + Prisma + PostgreSQL + JWT Setup

This guide helps you set up a NestJS project using Prisma ORM, PostgreSQL, and JWT authentication.

Prerequisites

Ensure you have the following installed:

Node.js (LTS recommended)

PostgreSQL

Docker (optional, for containerized DB)

Prisma CLI (npm i -g prisma)

Project Setup

Clone Repository & Install Dependencies

git clone <your-repo-url>
cd <your-repo>
npm install

Setup Environment Variables

Create a .env file in the project root and add the following:

# Database Connection
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME?schema=public"

# JWT Authentication
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="1h"

Set up Prisma and Database

npx prisma migrate dev --name init
npx prisma generate

Run the Application

npm run start:dev

Project Structure

📂 src
 ├── modules/
 ├── prisma/            # Prisma schema & database config
 ├── auth/              # JWT authentication logic
 ├── main.ts            # Entry point
 ├── app.module.ts      # Root module

Available Commands

Command

Description

npm run start

Start application

npm run start:dev

Start in development mode

npm run build

Build application

npm run format

Format code

npx prisma studio

Open Prisma GUI

npx prisma migrate dev

Run migrations

API Authentication

Login

Endpoint: POST /auth/login

Request Body:

{
  "email": "user@example.com",
  "password": "password123"
}

Response:

{
  "access_token": "your-jwt-token"
}

Protected Route (Example)

Endpoint: GET /users/profile

Headers:

{
  "Authorization": "Bearer your-jwt-token"
}

Docker Setup (Optional)

To run PostgreSQL in Docker:

docker-compose up -d

docker-compose.yml (if needed):

version: '3.8'
services:
  postgres:
    image: postgres:latest
    restart: always
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: database_name
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:

License

This project is licensed under the MIT License.

