import { PrismaClient, Post } from "@prisma/client";

const prisma = new PrismaClient();

export async function create(post: any) {
    return await prisma.post.create({
        data: post
    })
}

export async function findAll() {
    return await prisma.post.findMany();

}

export async function findById(id: string) {
    return await prisma.post.findUnique({
        where: {
            id: Number(id)
        }
    })
}

export async function update(id: string, data: Partial<Post>) {
    return await prisma.post.update({
        where: {
            id: Number(id)
        },
        data
    })
}

export async function remove(id: string) {
    return await prisma.post.delete({
        where: {
            id: Number(id)
        }
    })
}
