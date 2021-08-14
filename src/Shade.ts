// ShadeServerManager made with Shadowmanes & created by Shadowmanes!

import fastify from 'fastify'
import fs from 'fs'
import {Logger} from './logger/Logger'
import { SteamCmd } from './utils/SteamCmd';

let globalConfig = fs.readFileSync('./configs/shade.json');
let parsedGlobalConfig = JSON.parse(globalConfig.toString());

const server = fastify();

Logger("Shade Manager Version v1.0.0",1);

SteamCmd.DownloadSteamCMD();

server.get('/ping', async (request, reply) => {
  return 'pong\n'
});

server.listen(parsedGlobalConfig.ShadePort,parsedGlobalConfig.ShadeHost, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  Logger("Shade Server Manager is lisening on port " + parsedGlobalConfig.ShadePort,2);
});

