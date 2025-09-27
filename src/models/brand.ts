import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient
export async function findById(id:string) {
    return await prisma.brand.findUnique({
        where: {
            id: Number(id)
        }
    })
}