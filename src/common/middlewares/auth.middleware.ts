import type { MiddlewareHandler } from "hono";
import { ApiResponse } from "../utils/response.js";
import { verify } from "hono/jwt";
import { JWT_SECRET } from "../utils/env.js";
declare module "hono" {
    interface ContextVariableMap {
        user: { id: string; email: string };
    }
}

export const authMiddleware: MiddlewareHandler = async (c, next) => {
    const authHeader = c.req.header("Authorization");
    if (!authHeader) {
        return ApiResponse(c, 401, "Unauthorized", null);
    }

    const token = authHeader.split(" ")[1];

    if (token !== "your-secret-token") {
        return ApiResponse(c, 401, "Unauthorized", null);
    }

    const payload = await verify(token, JWT_SECRET ,{alg:'HS256'})
    if (!payload) {
        return ApiResponse(c, 401, "Unauthorized", null);
    }
    c.set("user", payload as { id: string; email: string });

    await next();
}