# Server Flow Document

## 1. Entry point
- `server/src/app.ts`
- Load environment variables
- Connect to MongoDB via `infra/db/mongo.ts`
- Create Express app
- Apply global middleware (JSON parser, CORS, logger, etc.)
- Mount routes (e.g., `/api/auth`)
- Start server `app.listen(PORT)`

## 2. Config
- `server/src/core/config/config.ts`
- Holds values `PORT`, `MONGO_URI`, `JWT_SECRET`, etc.

## 3. Database connect
- `server/src/infra/db/mongo.ts`
- `mongoose.connect(MONGO_URI)`
- `connect()` / `disconnect()` helper functions

## 4. Middleware
- `server/src/core/middleware/auth.ts`
    - `Authorization: Bearer <token>` extraction
    - `jsonwebtoken.verify` token check
    - Attach `req.user`
    - Reject unauthorized (401/403)
- `app.ts` likely includes body parser, CORS, and global error handler

## 5. Auth module
- `server/src/modules/auth/auth.model.ts` (User schema)
- `server/src/modules/auth/auth.service.ts` (business domain)
    - `register`: hash password (`bcrypt`), create user
    - `login`: validate password, generate JWT (`jsonwebtoken`)
    - other user operations
- `server/src/modules/auth/auth.controller.ts`
    - HTTP route handlers for login/register/me

## 6. Request lifecycle
1. HTTP request arrives at Express
2. Global middleware runs (json, cors, etc.)
3. Route + auth middleware runs
4. Controller method executes
5. Service logic performs DB operations
6. Model accesses MongoDB via Mongoose
7. Response sent to client

## 7. Auth flow example (`/api/auth/login`)
1. Client `POST /api/auth/login`
2. `auth.controller.login` called
3. `auth.service.login` finds user + `bcrypt.compare`
4. Generate JWT token on success
5. Response: `{ user, token }`

## 8. Development tooling
- Backend dependencies:
    - `express`, `mongoose`, `jsonwebtoken`, `bcrypt`, `dotenv`, `tsyringe`, `reflect-metadata`
- Dev dependencies:
    - `typescript`, `ts-node-dev`, `@types/*`
- Debug launch config in `.vscode/launch.json`
- Run with:
    - `cd server && npx ts-node-dev --inspect --transpile-only src/app.ts`

## 9. Optional improvements
- Add `auth.routes.ts` for route definitions
- Centralized error handler middleware
- Input validation (`Joi` / `class-validator`)
- Integration tests (Jest + supertest)
- Role-based access and refresh tokens
- OpenAPI documentation
