import { PrismaClient, Post as posts } from "@prisma/client";

const prisma = new PrismaClient();

export type Post = Omit<posts, 'id' | 'created_at'| 'updated_at'>

export async function create(post: Post) {
    const { userId, ...postWithoutUserId } = post;
  
    return await prisma.post.create({
      data: {
        ...postWithoutUserId,
        user: {
          connect: { id: userId }
        }
      }
    });
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
    const { userId, ...rest } = data;
  
    const updateData = {
      ...rest,
      ...(userId !== undefined && { user: { connect: { id: userId } } }),
    };
  
    return await prisma.post.update({
      where: { id: Number(id) },
      data: updateData,
    });
  }
  

export async function remove(id: string) {
    return await prisma.post.delete({
        where: {
            id: Number(id)
        }
    })
}
