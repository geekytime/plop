#!/usr/bin/env node -r esm
import { AssetPipeline } from '@plop/assets'
import { join } from 'path'

const start = async () => {
  const rootInDir = join(__dirname, '../assets')
  const rootOutDir = join(__dirname, '../../web/public/assets')
  const assets = new AssetPipeline({
    rootInDir,
    rootOutDir
  })

  await assets.createAtlas({
    inGlob: '**/*.png',
    outDir: 'aquarium',
    sheetName: 'aquarium'
  })
}

start()
  .then(() => {
    console.log('complete')
  })
  .catch(error => {
    console.error(error)
  })
