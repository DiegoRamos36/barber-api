import { FastifyRequest, FastifyReply } from "fastify";
import { Brands } from "../utils/brands";
import { findBySlug } from "../models/brand";

export async function getBrandDetails (req: FastifyRequest,res: FastifyReply) {
    const slug = req.body as string
    let brand = slug ? slug : Brands.DEFAULT

    const brandDetails = await findBySlug(brand)

    return res.status(200).send({success:true, data: brandDetails})
}