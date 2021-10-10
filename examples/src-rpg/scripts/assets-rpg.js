#!/usr/bin/env node -r esm
import { createCharacter } from './create-character.js'
import { createAtlas } from './create-atlas.js'

const start = async () => {
  await createCharacter({
    inDir: '../assets/ent/char/',
    outDir: '../../public/assets/rpg/ent/char/',
    name: 'reaper'
  })
  await createAtlas({
    pngPath: '../assets/tile/ashlands-dirt/*.png',
    outPath: '../../public/assets/rpg/tile',
    sheetName: 'ashlands-dirt'
  })
}

start()
  .then(() => {
    console.log('complete')
  })
  .catch(error => {
    console.error(error)
  })
