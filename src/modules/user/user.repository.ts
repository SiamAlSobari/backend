import { prisma } from "../../common/utils/db.js";

export class UserRepository {
    public async createUser(email: string, password: string, name: string) {
        return await prisma.user.create({
            data: {
                email,
                password,
                name,
            },
        });
    }

    public async findByEmail(email: string) {
        return await prisma.user.findFirst({
            where: { email },
        });
    }
}