import { FastifyInstance } from 'fastify';
import { createUser, login } from '../controllers/user';



export default async function userRoutes(server: FastifyInstance) {
  server.post('/register', createUser);
  server.post('/login', login)
}
