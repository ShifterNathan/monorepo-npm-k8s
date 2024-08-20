import fastify from 'fastify';

const server = fastify();

server.get('/', (req, reply) => {
    return reply.send('User Service --- your ip is: ' + req.ip);
});

server.get('/liveness', (_, reply) => {
    return reply.send('OK');
});

server.get('/readiness', (_, reply) => {
    return reply.send('OK');
});

server.listen({ port: process.env.PORT, host: '0.0.0.0' }, (err, address) => {
    if (err) throw err;
    process.stdout.write(`Process listening on ${address}`);
});


