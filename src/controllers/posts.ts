import { FastifyRequest, FastifyReply } from "fastify";
import { hasProps } from "../utils/hasProps";
import { create, findAll, findById, Post, remove, update } from "../models/posts";

export async function createPost (req: FastifyRequest, res: FastifyReply) {
    const data = req.body as Post

    if(!hasProps(data, ['title', 'description', 'image', 'userId'])) {
        return res.status(400).send({message: 'Verifique os dados e tente novamente!'})
    }

    try {
    const post = await create(data)
    
    if(!post) throw new Error(`Falha ao criar post`);

    return res.status(201).send({success: true, message: "Post criado com sucesso!"})
    } catch(error) {
        return res.status(422).send({success: false, message: `Erro: ${error}`})
    }
        
}

export async function updatePost (req: FastifyRequest, res: FastifyReply) {
    const {id} = req.params as {id: string};
    const data = req.body as Partial<Post>;

    try {
        const post = await update(id,data)
        
        if(!post) throw new Error(`Falha ao atualizar post`);
    
        return res.status(201).send({success: true, message: "Post atualizado com sucesso!"})
        } catch(error) {
            return res.status(422).send({success: false, message: `Erro: ${error}`})
        }

}

export async function deletePost (req: FastifyRequest, res: FastifyReply) {
    const {id} = req.params as {id: string};

    try {
        const post = await remove(id)
        
        if(!post) throw new Error(`Falha ao remover post`);
    
        return res.status(200).send({success: true, message: "Post removido com sucesso!"})
        } catch(error) {
            return res.status(422).send({success: false, message: `Erro: ${error}`})
        }

}

export async function findPost (_req: FastifyRequest, res: FastifyReply) {
    try {
        const posts = await findAll();
        if(!posts) throw new Error(`Nenhum post encontrado!`);
        return res.status(200).send({success: true, posts: posts})
    } catch(error) {
        return res.status(422).send({success: false, message: `Erro: ${error}`})
    }
    
}

export async function findByIdPost(req: FastifyRequest, res: FastifyReply) {
    const {id} = req.params as {id: string}

    try {
        const posts = await findById(id);
        if(!posts) throw new Error(`Nenhum post encontrado com esse ID!`);
        return res.status(200).send({success: true, posts: posts})
    } catch(error) {
        return res.status(422).send({success: false, message: `Erro: ${error}`})
    }
}



