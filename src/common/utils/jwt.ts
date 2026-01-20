import { sign } from "hono/utils/jwt/jwt";

export async function generateJWT(payload: object, secret: string, options?: object){
        const token = await sign(
        {
            ...payload,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 2, // 2hari
        },
        secret
    );
    return token;
}