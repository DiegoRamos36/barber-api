import { FastifyRequest, FastifyReply } from "fastify";
import { findById } from "../models/brand";

export async function getBrandDetails (req: FastifyRequest,res: FastifyReply) {
    const {brandId} = req.body as {brandId: string}

    const brandDetails = await findById(brandId)

    return res.status(200).send({success:true, data: brandDetails})
}