import { PrismaClient, Appointment as appointment } from "@prisma/client";

const prisma = new PrismaClient();

export type Appointment = Omit<appointment, 'id' | 'created_at' | 'updated_at'>

export async function create(appointment: Appointment) {
    const {brandId, ...appointments} = appointment
    return await prisma.appointment.create({
        data: {
            ...appointments,
            brand: {
                connect: { id: appointment.brandId}
            }
        }
    })
}

export async function findAll(brandId: string) {
    return await prisma.appointment.findMany({
        where: {
            brandId: Number(brandId)
        }
    });

}

export async function findById(id: string, brandId: string) {
    return await prisma.post.findUnique({
        where: {
            id: Number(id),
            brandId: Number(brandId)
        }
    })
}

export async function update(id: string, data: Partial<appointment>) {
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
