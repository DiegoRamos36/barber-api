import { PrismaClient, User as user } from "@prisma/client";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

export type User = Omit<user, 'created_at' | 'id'>

export async function create(user: User) {
    const parseUser: User = {
         name: user.name,
         password: await bcrypt.hash(user.password, 10),
         phone: user.phone,
         role: user.role,
         brandId: user.brandId
    }
    const {brandId, ...parsedUser} = parseUser
    
    return await prisma.user.create({
        data: {
            ...parsedUser,
            brand: {
                connect: {id: Number(brandId)}
            }
        }
    })
}

export async function findByPhoneAndPassword({phone, password, brandId}: {phone: string, password: string, brandId: string}) {
   const user = await prisma.user.findUnique({
    where: {
        phone_brandId: {
            phone: phone,
            brandId: Number(brandId)
        }
    }
   })
   
   if(!user) return null

   const isValidPassword = await bcrypt.compare(password, user.password)

   if (!isValidPassword) return null

   return user;

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
