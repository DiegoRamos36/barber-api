import { PrismaClient, User as user } from "@prisma/client";

const prisma = new PrismaClient();

export type User = Omit<user, 'created_at' | 'id'>

export async function create(user: User) {
    return await prisma.user.create({
        data: user
    })
}

export async function findById(id: string) {
    return await prisma.user.findUnique({
        where: {
            id: Number(id)
        }
    })
}

export async function update(id: string, data: Partial<User>) {
    return await prisma.user.update({
        where: {
            id: Number(id)
        },
        data
    })
}

export async function remove(id: string) {
    return await prisma.user.delete({
        where: {
            id: Number(id)
        }
    })
}
