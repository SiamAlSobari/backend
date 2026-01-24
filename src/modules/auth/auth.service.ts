import { HTTPException } from "hono/http-exception";
import { JWT_SECRET } from "../../common/utils/env.js";
import { hashPassword, verifyPassword } from "../../common/utils/hash.js";
import { generateJWT } from "../../common/utils/jwt.js";
import type { UserRepository } from "../user/user.repository.js";

export class AuthService {
    constructor(
        private userRepo: UserRepository
    ) { }

    public async register(email: string, password: string, name: string) {
        const existingUser = await this.userRepo.findByEmail(email);
        if (existingUser) {
            throw new Error("User already exists");
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        const newUser = await this.userRepo.createUser(email, hashedPassword, name);
        return newUser;
    }

    public async login(email: string, password: string) {
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            throw new HTTPException(401, { message: "Invalid email or password" });
        }

        // Verifikasi password
        const isPasswordValid = await verifyPassword(user.password, password);
        if (!isPasswordValid) {
            throw new HTTPException(401, { message: "Invalid email or password" });
        }

        // Generate JWT
        const payload = { id: user.id, email: user.email, name: user.name };
        const token = await generateJWT(payload, JWT_SECRET);

        return { token };
    }
}