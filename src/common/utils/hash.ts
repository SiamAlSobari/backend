import { hash, verify } from "argon2";

export async function hashPassword(password: string){
    return await hash(password);
}

export async function verifyPassword(hashedPassword: string, plainPassword: string){
    return await verify(hashedPassword, plainPassword);
}