import { join } from 'path'
import mkdirp from 'mkdirp'
import spritesheet from 'spritesheet-js'

export class AssetPipeline {
  constructor ({ rootInDir, rootOutDir }) {
    this.rootInDir = rootInDir
    this.rootOutDir = rootOutDir
  }

  async createAtlas ({ inGlob, outDir, sheetName }) {
    const fullOutDir = join(this.rootOutDir, outDir)
    const fullInGlob = join(this.rootInDir, inGlob)

    const options = {
      format: 'pixi',
      path: fullOutDir,
      name: sheetName,
      powerOfTwo: true,
      padding: 2
    }
    console.log('CREATING', fullInGlob)
    await mkdirp(fullOutDir)

    return new Promise((resolve, reject) => {
      spritesheet(fullInGlob, options, error => {
        if (error) {
          return reject(error)
        }
        console.log('COMPLETE', fullInGlob)
        resolve()
      })
    })
  }

  async createCharacter ({ inDir, outDir, name }) {
    return Promise.all([
      this.createCharacterFacing({ inDir, outDir, name, facing: 'north' }),
      this.createCharacterFacing({ inDir, outDir, name, facing: 'south' }),
      this.createCharacterFacing({ inDir, outDir, name, facing: 'east' }),
      this.createCharacterFacing({ inDir, outDir, name, facing: 'west' })
    ])
  }

  async createCharacterFacing ({ inDir, outDir, name, facing }) {
    const inGlob = join(inDir, `${name}/${facing}/*.png`)
    const outDirWithName = join(outDir, `${name}`)
    const sheetName = `${name}-${facing}`
    return this.createAtlas({ inGlob, outDir: outDirWithName, sheetName })
  }
}
