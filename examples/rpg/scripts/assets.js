#!/usr/bin/env node -r esm
import { AssetPipeline } from '@plop/assets'
import { join } from 'path'

const start = async () => {
  const rootInDir = join(__dirname, '../assets')
  const rootOutDir = join(__dirname, '../../web/public/assets')

  const assets = new AssetPipeline({ rootInDir, rootOutDir })

  await assets.createAtlas({
    inGlob: 'tile/ashlands-dirt/*.png',
    outDir: 'rpg/tile',
    sheetName: 'ashlands-dirt'
  })

  await assets.createCharacter({
    inDir: 'ent/char/',
    outDir: 'rpg/ent/char/',
    name: 'reaper'
  })
}

start()
  .then(() => {
    console.log('complete')
  })
  .catch(error => {
    console.error(error)
  })
