# NestJS + Prisma + PostgreSQL + JWT Setup

This guide helps you set up a **NestJS** project with **Prisma ORM**, **PostgreSQL**, and **JWT authentication**.

## Prerequisites

Ensure you have the following installed:

- **Node.js** (LTS recommended)
- **PostgreSQL**
- **Prisma CLI** (`npm i -g prisma`)

## Project Setup

### Clone Repository & Install Dependencies

```sh
git clone <repo-url>
cd <repo-folder>
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root with:

```ini
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME?schema=public"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="1h"
```

### Set up Prisma & Database

```sh
npx prisma migrate dev --name init
npx prisma generate
```

### Run the Application

```sh
npm run start:dev
```

## Project Structure

```
📂 src
├── modules/
├── prisma/        # Prisma schema & database config
├── auth/          # JWT authentication logic
├── main.ts        # Entry point
├── app.module.ts  # Root module
```

## Available Commands

| Command                  | Description               |
| ------------------------ | ------------------------- |
| `npm run start`          | Start application         |
| `npm run start:dev`      | Start in development mode |
| `npm run build`          | Build application         |
| `npm run format`         | Format code               |
| `npx prisma studio`      | Open Prisma GUI           |
| `npx prisma migrate dev` | Run database migrations   |

## License

This project is licensed under the **MIT License**.
