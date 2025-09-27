import { PrismaClient, Post as posts } from "@prisma/client";

const prisma = new PrismaClient();

export type Post = Omit<posts, 'id' | 'created_at'| 'updated_at'>

export async function create(post: Post) {
    const { userId, brandId, ...postWithoutUserId } = post;
  
    return await prisma.post.create({
      data: {
        ...postWithoutUserId,
        user: {
          connect: { id: userId }
        },
        brand: {
          connect: {
            id: brandId
          }
        }
      }
    });
  }
  

export async function findAll(brandId: string) {
    return await prisma.post.findMany({
      where: {
        brandId: Number(brandId)
      }
    });

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
  
    const { brandId, ...restWithoutBrand } = rest;
    const updateData = {
      ...restWithoutBrand,
      ...(userId !== undefined && { user: { connect: { id: userId } } }),
      ...(brandId !== undefined && { brand: { connect: { id: brandId } } }),
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
