import pty from 'node-pty'
import fs, { createWriteStream } from 'fs'
import { access, mkdir, chmod, appendFile } from 'fs/promises'
import { Extract } from './Extract';
import axios from 'axios';
import { file } from 'tmp-promise'
import { Logger } from '../logger/Logger';
import path from 'path';

let globalConfig = fs.readFileSync('./configs/shade.json');
let parsedGlobalConfig = JSON.parse(globalConfig.toString());
let downloadUrl = null;

export class SteamCmd {
    
    static async DownloadSteamCMD() {
        switch (process.platform) {
            case 'win32':
              downloadUrl =
                'https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip'
              break
            case 'darwin':
              downloadUrl =
                'https://steamcdn-a.akamaihd.net/client/installer/steamcmd_osx.tar.gz'
              break
            case 'linux':
              downloadUrl =
                'https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz'
              break
            default:
              throw new Error(`Platform "${process.platform}" is not supported`)
          }

        Logger(downloadUrl,1)

        await mkdir(parsedGlobalConfig.SteamCmdDir, { recursive: true })

        const tempFile = await file()

        try {
            // Download the archive and stream it into the temp file
            const responseStream = await axios.get(downloadUrl, {
              responseType: 'stream'
            })
      
            const tempFileWriteStream = createWriteStream(tempFile.path)
      
            responseStream.data.pipe(tempFileWriteStream)
            await new Promise(resolve => {
              tempFileWriteStream.on('finish', resolve)
            })
      
            // Extract the Steam CMD executable from the archive
            await Extract(tempFile.path, path.resolve(parsedGlobalConfig.SteamCmdDir))
          } finally {
            // Cleanup the temp file
            await tempFile.cleanup()
          }
    }

}