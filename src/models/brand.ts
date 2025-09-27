import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient
export async function findBySlug(slug:string) {
    return await prisma.brand.findUnique({
        where: {
            slug: slug
        }
    })
}