import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { loginValidation, registerValidation } from "./auth.validation.js";
import { UserRepository } from "../user/user.repository.js";
import { AuthService } from "./auth.service.js";
import { ApiResponse } from "../../common/utils/response.js";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";

const userRepo = new UserRepository();
const authService = new AuthService(userRepo);

export const authController = new Hono()
    .post(
        "/register",
        zValidator("json", registerValidation),
        async (c) => {
            const { name, email, password } = c.req.valid("json");
            const result = await authService.register(name, email, password);
            return ApiResponse(c, 200, "Berhasil Register", result);
        })
    .post(
        "/login",
        zValidator("json", loginValidation),
        async (c) => {
            const { email, password } = c.req.valid("json");
            const result = await authService.login(email, password);
            return ApiResponse(c, 200, "Berhasil Login", result);
        })
    .get("/session",
        authMiddleware,
        async (c) => {
            const user = c.get("user");
            return ApiResponse(c, 200, "Sesi valid", user);
        }
    )
