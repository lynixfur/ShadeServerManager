// ShadeServerManager made with Shadowmanes & created by Shadowmanes!

import FileType from 'file-type'
import extractZip from 'extract-zip'
import tar from 'tar'

export async function Extract (pathToArchive, targetDirectory) {
  const fileTypeDetails = await FileType.fromFile(pathToArchive)

  switch (fileTypeDetails.mime) {
    case 'application/gzip':
      return tar.extract({
        cwd: targetDirectory,
        strict: true,
        file: pathToArchive
      })
    case 'application/zip':
      return extractZip(pathToArchive, { dir: targetDirectory })
    default:
      throw new Error('Archive format not recognised')
  }
}
