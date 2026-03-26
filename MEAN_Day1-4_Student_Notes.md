# MEAN Project – Day 1 to Day 4 Notes (Student Style)

---

# SECTION 1 – DETAILED NOTES

## Day 1 – Foundation (Setup + Auth)

### Setup
- Node + TypeScript project
- Key configs:
  - esModuleInterop = true
  - experimentalDecorators = true

IMPORTANT:
- Never run TypeScript using node
- Always use:
  npx ts-node-dev src/app.ts

---

### MongoDB (Atlas)
- Must include DB name in connection string:
  mongodb+srv://.../mean-app

Issue faced:
- Connection failed → DB name missing

---

### Authentication (JWT + bcrypt)

Flow:
Register → hash password → store  
Login → compare password → generate token  

Key points:
- Never store plain password
- Use bcrypt
- JWT contains:
  { id: user._id }

---

### Middleware
- Extract token from header:
  Authorization: Bearer <token>
- Attach:
  req.user

Issue faced:
- /me failed → missing Bearer

---

### Common Issues
- tsconfig incorrect → fixed compilerOptions
- express import error → esModuleInterop
- bcrypt typing → IUser interface
- running .ts via node → error

---

## Day 2 – Architecture

### Layering
Controller → Service → Repository

Controller:
- Handles request/response

Service:
- Business logic

Repository:
- DB access

---

### DTO + Validation
- DTO defines structure
- Validation outside service

---

### Dependency Injection
- Use tsyringe
- Avoid new keyword
- Use container.resolve()

---

### Mongo Optimization
- Index: userId + createdAt
- Pagination: skip + limit

---

## Day 3 – Redis Caching

### Usage
- Only for GET APIs

---

### Cache Key Design
tasks:<userId>:<page>

---

### Flow
Request
→ cache check
→ HIT → return
→ MISS → DB → cache → return

---

### Invalidation
- On write → delete cache

---

### Helpers
- cacheGet
- cacheSet
- cacheDelete
- cacheDeletePattern

---

### Issues faced
- stale data → fixed via invalidation

---

## Day 4 – File Upload + Blob

### Multer
- Use memoryStorage
- Field must be "file"

Issue:
- Unexpected field → wrong key

---

### Azurite
Run:
azurite --skipApiVersionCheck

Issue:
- API version mismatch

---

### Upload Flow
file → multer → buffer → Blob → URL

---

### API Design
Separate APIs:
- POST /tasks
- POST /tasks/upload

---

### Issues faced
- Express handler error → wrong params
- Fixed using req.body

---

# Architecture Evolution

Day 1 → Working app  
Day 2 → Clean design  
Day 3 → Performance  
Day 4 → External integration  

---

# SECTION 2 – QUICK REFERENCE

## Commands
npx ts-node-dev src/app.ts  
azurite --skipApiVersionCheck  
docker run -p 6379:6379 redis  

---

## APIs
POST /register  
POST /login  
GET /me  

POST /tasks  
POST /tasks/upload  
GET /tasks  

---

## Headers
Authorization: Bearer <token>

---

## Cache Key
tasks:<userId>:<page>

---

## Upload (Postman)
Body → form-data  
file → File  
title → Text  

---

## Common Fixes

- Cannot use import → use ts-node-dev  
- Mongo fails → add DB name  
- bcrypt error → IUser typing  
- /me fails → Bearer token  
- Redis stale → invalidate cache  
- Upload fails → key = file  
- Azurite error → skipApiVersionCheck  
- Express error → use req.body  

---

## Golden Rules

1. Never run .ts with node  
2. Never store plain passwords  
3. Never skip cache invalidation  
4. Never mix layers  
5. Never hardcode config  

---

## Mental Model

Auth → Secure  
Architecture → Clean  
Cache → Fast  
Storage → Scalable  

---

End of Notes
