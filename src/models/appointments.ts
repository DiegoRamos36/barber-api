import { PrismaClient, Appointment } from "@prisma/client";

const prisma = new PrismaClient();

export async function create(appointment: Appointment) {
    return await prisma.appointment.create({
        data: appointment
    })
}

export async function findAll() {
    return await prisma.appointment.findMany();

}

export async function findById(id: string) {
    return await prisma.post.findUnique({
        where: {
            id: Number(id)
        }
    })
}

export async function update(id: string, data: Partial<Appointment>) {
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
