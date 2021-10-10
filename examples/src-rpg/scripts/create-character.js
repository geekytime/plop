import { join } from 'path'
import { createAtlas } from './create-atlas.js'

export const createCharacter = async ({ inDir, outDir, name }) => {
  return Promise.all([
    createCharacterFacing({ inDir, outDir, name, facing: 'north' }),
    createCharacterFacing({ inDir, outDir, name, facing: 'south' }),
    createCharacterFacing({ inDir, outDir, name, facing: 'east' }),
    createCharacterFacing({ inDir, outDir, name, facing: 'west' })
  ])
}

const createCharacterFacing = async ({ inDir, outDir, name, facing }) => {
  const pngPath = join(inDir, `${name}/${facing}/*.png`)
  const outPath = join(outDir, `${name}`)
  const sheetName = `${name}-${facing}`
  return createAtlas({ pngPath, outPath, sheetName })
}
