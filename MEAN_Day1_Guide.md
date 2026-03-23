# MEAN Project – Day 1 (Start-to-Run Guide)

## Goal
- Working Node + Mongo (Atlas)
- JWT Auth
- Secure password (bcrypt)
- /me protected route

---

## 1. Setup Project

```bash
mkdir mean-project
cd mean-project
mkdir server
cd server
npm init -y
```

---

## 2. Install Dependencies

```bash
npm install express mongoose jsonwebtoken bcrypt dotenv tsyringe reflect-metadata
npm install -D typescript ts-node-dev @types/node @types/express @types/jsonwebtoken @types/bcrypt
```

---

## 3. TypeScript Config

```bash
npx tsc --init
```

Replace tsconfig.json:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

---

## 4. Folder Structure

```
src/
  app.ts
  core/config/
  core/middleware/
  infra/db/
  modules/auth/
```

---

## 5. .env File

```
PORT=3000
MONGO_URI=your_connection_string_with_db_name
JWT_SECRET=supersecret
```

---

## 6. Mongo Connection

```ts
import mongoose from "mongoose";
import { config } from "../../core/config/config";

export const connectDB = async () => {
  const conn = await mongoose.connect(config.mongoUri);
  console.log("Mongo Connected:", conn.connection.host);
};
```

---

## 7. Auth Model

```ts
import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, unique: true, index: true },
  password: { type: String, required: true }
});

export const User = mongoose.model<IUser>("User", userSchema);
```

---

## 8. Auth Service

```ts
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class AuthService {
  async register(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    return User.create({ email, password: hashed });
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user!.password);
    return jwt.sign({ id: user!._id }, config.jwtSecret);
  }
}
```

---

## 9. Middleware

```ts
export const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);
  req.user = jwt.verify(token, config.jwtSecret);
  next();
};
```

---

## 10. Run

```bash
npx ts-node-dev src/app.ts
```

---

## 11. Test Flow

1. POST /register  
2. POST /login → get token  
3. GET /me  

Header:
```
Authorization: Bearer <token>
```

---

## Expected Output

- /health → OK  
- /login → token  
- /me → user id  

---

## Common Fixes

- Add DB name in Mongo URI
- Use esModuleInterop = true
- Use String (not string) in schema
- Use Bearer token format

---

End of Day 1
