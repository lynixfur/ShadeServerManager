// ShadeServerManager made with Shadowmanes & created by Shadowmanes!

import fastify from 'fastify'

const server = fastify();
let testvar = false;

server.get('/ping', async (request, reply) => {
  testvar = !testvar;
  return 'pong\n'
});

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
});

const delay = ms => new Promise(res => setTimeout(res, ms));

async function test() {
  while(true) {
    console.log("Shade Test : " + testvar)
    await delay(500);
  }
};

test();