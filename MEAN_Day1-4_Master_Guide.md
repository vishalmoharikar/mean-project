# MEAN Project (Day 1–4) – Architect-Level Summary + Interview Prep + Restart Guide

---

# 1. Topics Covered (Day 1–4)

## Day 1 – Foundation
- Node + TypeScript setup
- tsconfig (esModuleInterop, decorators)
- MongoDB Atlas connection (with DB name fix)
- JWT Authentication
- Password hashing (bcrypt)
- Middleware (auth with Bearer token)
- Env config (.env)
- Debugging Node vs ts-node-dev (important fix)

## Day 2 – Architecture
- Layering (Controller → Service → Repository)
- DTO + Validation
- Dependency Injection (tsyringe)
- Indexing (Mongo)
- Pagination

## Day 3 – Redis
- Redis setup (ioredis)
- Read-through caching
- Cache key design (user-based)
- Cache invalidation (pattern delete)
- Helper abstraction (cacheGet/cacheSet/cacheDelete)

## Day 4 – File Upload
- Multer (memory storage)
- Azure Blob (Azurite)
- Connection string usage
- Azurite version issue + fix (--skipApiVersionCheck)
- File upload pipeline
- Single vs separate API design
- Task + file integration

---

# 2. Interview Questions

## A. Basic (10)
1. What is JWT and how does it work?
2. Why use bcrypt instead of plain hashing?
3. Difference between require vs import?
4. What is middleware in Express?
5. What is MongoDB indexing?
6. What is Redis used for?
7. What is caching?
8. What is REST API?
9. What is multer used for?
10. What is Blob storage?

---

## B. Intermediate (10)
1. Explain JWT authentication flow.
2. How to securely store passwords?
3. Middleware execution flow in Express?
4. Benefits of repository pattern?
5. How pagination works internally?
6. Cache invalidation strategies?
7. Why TTL is important in Redis?
8. Multer memory vs disk storage?
9. Structuring Node backend (best practices)?
10. Centralized error handling?

---

## C. Advanced (10)
1. How would you scale JWT-based authentication?
2. Design caching for high read systems.
3. Redis vs in-memory cache trade-offs?
4. MongoDB indexing performance trade-offs?
5. Event-driven vs request-response?
6. Benefits of DI in Node?
7. Handling large file uploads efficiently?
8. API rate limiting strategies?
9. Observability basics?
10. Horizontal scaling challenges?

---

## D. Expert (10)
1. Design backend for multi-tenant SaaS
2. Global cache architecture design
3. Distributed locking using Redis
4. CAP theorem trade-offs
5. Microservices vs modular monolith
6. CQRS pattern usage
7. Event sourcing basics
8. Designing idempotent APIs
9. Handling backpressure in systems
10. System design for millions of users

---

# 3. Restart Guide (Step-by-Step with Real Issues + Fixes)

## Step 1 – Setup Project
- npm init, install deps
- Fix tsconfig

Issue:
- tsconfig error → move settings under compilerOptions
- express import error → enable esModuleInterop

---

## Step 2 – Mongo Setup
- Use Atlas connection string

Issue:
- Missing DB name → connection fails

Fix:
- Add `/mean-app` in URI

---

## Step 3 – Auth Setup
- bcrypt + JWT

Issue:
- bcrypt type error

Fix:
- Define IUser interface (password: string)

---

## Step 4 – Middleware
- Bearer token handling

Issue:
- /me not working

Fix:
- Use `Authorization: Bearer <token>`

---

## Step 5 – Running Server

Issue:
- Cannot use import outside module

Cause:
- Running `.ts` with node

Fix:
- Use:
  npx ts-node-dev src/app.ts

---

## Step 6 – Redis

Issue:
- Stale cache

Fix:
- Add cache invalidation on write

---

## Step 7 – File Upload

Issues:
1. Unexpected field → wrong form-data key
2. Azurite API version error

Fix:
- Use key = file
- Run: azurite --skipApiVersionCheck

---

## Step 8 – Task + File Integration

Issue:
- Express handler signature error

Fix:
- Use req.body instead of extra params

---

## Step 9 – API Design

Decision:
- Separate APIs:
  POST /tasks
  POST /tasks/upload

---

# Final Outcome

- Working backend with:
  - Auth
  - Clean architecture
  - Redis caching
  - File upload (Azure Blob local)
- Debugging clarity
- Production mindset

---

End of Document
