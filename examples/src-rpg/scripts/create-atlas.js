import { join } from 'path'
import mkdirp from 'mkdirp'
import spritesheet from 'spritesheet-js'

export const createAtlas = async ({ pngPath, outPath, sheetName }) => {
  const fullOutPath = join(__dirname, outPath)
  const fullPngPath = join(__dirname, pngPath)

  const options = {
    format: 'pixi',
    path: fullOutPath,
    name: sheetName,
    powerOfTwo: true,
    padding: 2
  }
  console.log('CREATING', fullPngPath)
  await mkdirp(fullOutPath)

  return new Promise((resolve, reject) => {
    spritesheet(fullPngPath, options, error => {
      if (error) {
        return reject(error)
      }
      console.log('COMPLETE', fullPngPath)
      resolve()
    })
  })
}
