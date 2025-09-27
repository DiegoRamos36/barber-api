import { FastifyInstance } from 'fastify';
import { getBrandDetails } from '../controllers/brand';



export default async function brandsRoutes(server: FastifyInstance) {
  server.post('/', getBrandDetails );
}
