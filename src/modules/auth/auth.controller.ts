import { Hono } from "hono";

export const authController = new Hono()
    .post("/register", async (c) => {

    })
    .post('/login', async (c) => {
        const payload = await c.req.json();
        console.log(payload);

        return c.json({
            message: 'login endpoint hit',
            payload
        });
    })
