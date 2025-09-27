import Fastify from 'fastify';
import postRoutes from './routes/postsRoutes';
import appointmentRoutes from './routes/appointments';
import jwt from '@fastify/jwt';




const server = Fastify({
  logger: true,
});

server.register(jwt, {
  secret: process.env.JWT_SECRET
});

const port = Number(process.env.PORT) | 3000;

server.decorate("authenticate", async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.status(401).send({ success: false, message: "Não autorizado" });
  }
});

server.register(postRoutes, {prefix: '/posts'})
server.register(appointmentRoutes, {prefix: '/appointments'});




const start = async () => {
  try {
    await server.listen({port: port});
    console.log(`🚀 Server is running at ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
