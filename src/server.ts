import Fastify from 'fastify';

const server = Fastify({
  logger: true,
});

const port = Number(process.env.PORT) | 3000;


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
