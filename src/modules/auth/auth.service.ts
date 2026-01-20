import { JWT_SECRET } from "../../common/utils/env.js";
import { generateJWT } from "../../common/utils/jwt.js";

export class AuthService {
    public async register(email: string, password: string) {
        return { id: "1", email };
    }
        // Dummy implementation for registration

    public async login(email: string, password: string): Promise<string> {
        // Dummy implementation for login
        if (email === "iZb7w@example.com" && password === "password") {
            return await generateJWT({ id: "1", email }, JWT_SECRET);
        }
        throw new Error("Invalid credentials");
    }
}