import { FastifyInstance } from 'fastify';
import { createPost, deletePost, findByIdPost, findPost, updatePost } from '../controllers/posts';



export default async function postRoutes(server: FastifyInstance) {
  server.post('/',{preHandler: server.authenticate}, createPost);
  server.get('/:brandId', findPost);
  server.get('/:brandId/:id',{preHandler: server.authenticate}, findByIdPost);
  server.put('/:id',{preHandler: server.authenticate}, updatePost);
  server.delete('/:id',{preHandler: server.authenticate}, deletePost);
}
