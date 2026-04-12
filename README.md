# MyAfriMall - Backend

The backend API for MyAfriMall, a shipping and logistics platform enabling seamless delivery to over 300 countries from Nigeria.

Built with Node.js, Express, TypeScript, and MongoDB.

## Features

- **User Registration** - Create account with first name, last name, email, phone, and password
- **User Login** - Authenticate with email and password, receive JWT token
- **JWT Authentication** - Token-based auth via Authorization header or HTTP-only cookies
- **Dashboard Data** - Protected endpoint serving overview stats, growth data, and recent shipments
- **Password Hashing** - Passwords hashed with bcrypt (12 salt rounds)
- **Input Validation** - Request validation using express-validator

## Tech Stack

- **Runtime**: Node.js 22.x
- **Framework**: Express 5
- **Language**: TypeScript
- **Database**: MongoDB (via Mongoose)
- **Auth**: JSON Web Tokens (jsonwebtoken) + bcryptjs
- **Validation**: express-validator

## Project Structure

```
src/
  config/
    index.ts          # Environment configuration
  middleware/
    auth.ts           # JWT authentication middleware
  models/
    User.ts           # User schema and model (Mongoose)
  routes/
    auth.ts           # Auth routes (register, login, me, logout)
    dashboard.ts      # Dashboard data route (protected)
  index.ts            # Express app setup and MongoDB connection
```

## API Endpoints

### Authentication

| Method | Endpoint             | Auth     | Description               |
| ------ | -------------------- | -------- | ------------------------- |
| POST   | `/api/auth/register` | Public   | Create a new user account |
| POST   | `/api/auth/login`    | Public   | Login and receive JWT     |
| GET    | `/api/auth/me`       | Required | Get current user profile  |
| POST   | `/api/auth/logout`   | Public   | Clear auth cookie         |

### Dashboard

| Method | Endpoint          | Auth     | Description              |
| ------ | ----------------- | -------- | ------------------------ |
| GET    | `/api/dashboard`  | Required | Get dashboard data       |

### Health

| Method | Endpoint       | Auth   | Description        |
| ------ | -------------- | ------ | ------------------ |
| GET    | `/api/health`  | Public | Server health check |

### Request/Response Examples

**Register**
```json
POST /api/auth/register
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+2348012345678",
  "password": "securePassword123"
}

Response (201):
{
  "message": "Account created successfully",
  "token": "eyJhbGciOiJIUzI1...",
  "user": {
    "_id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+2348012345678"
  }
}
```

**Login**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (200):
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1...",
  "user": { ... }
}
```

## Getting Started

### Prerequisites

- Node.js 22.x
- MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your MongoDB connection string and JWT secret

# Start the development server
npm run dev
```

The server starts on [http://localhost:8000](http://localhost:8000).

### Environment Variables

| Variable       | Default                                | Description                  |
| -------------- | -------------------------------------- | ---------------------------- |
| `PORT`         | `8000`                                 | Server port                  |
| `MONGODB_URI`  | `mongodb://localhost:27017/myafrimall` | MongoDB connection string    |
| `JWT_SECRET`   | `myafrimall-jwt-secret`                | Secret key for signing JWTs  |
| `JWT_EXPIRES_IN` | `7d`                                 | JWT expiration duration      |
| `CLIENT_URL`   | `http://localhost:4096`                | Frontend URL (for CORS)      |

## Scripts

| Command          | Description                          |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Start dev server with nodemon + ts-node |
| `npm run build`  | Compile TypeScript to `dist/`        |
| `npm run start`  | Run compiled production build        |
