const fastify = require('fastify')({
    logger: true
})

fastify.get('/', function (request, reply) {
    reply.send()
})

// Run the server!
fastify.listen(3000, (err, address) => {
    if (err) throw err
    // Server is now listening on ${address}
  })