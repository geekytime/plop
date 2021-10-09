#!/usr/bin/env node
const mkdirp = require('mkdirp')
const spritesheet = require('spritesheet-js')
const { join } = require('path')

const start = async () => {
  await createCharacter('reaper')
}

const createCharacter = async name => {
  return Promise.all([
    createCharacterFacing(name, 'north'),
    createCharacterFacing(name, 'south'),
    createCharacterFacing(name, 'east'),
    createCharacterFacing(name, 'west')
  ])
}

const createCharacterFacing = async (name, facing) => {
  const pngPath = join(
    __dirname,
    `../src-rpg/assets/ent/char/${name}/${facing}/*.png`
  )
  const outPath = join(__dirname, `../public/assets/rpg/ent/char/${name}`)
  await mkdirp(outPath)
  const sheetName = `${name}-${facing}`
  return createSheet({ pngPath, outPath, sheetName })
}

const createSheet = async ({ pngPath, outPath, sheetName }) => {
  return new Promise((resolve, reject) => {
    const options = {
      format: 'pixi',
      path: outPath,
      name: sheetName,
      powerOfTwo: true,
      padding: 2
    }
    console.log('CREATING', pngPath)
    spritesheet(pngPath, options, error => {
      if (error) {
        return reject(error)
      }
      console.log('COMPLETE', pngPath)
      resolve()
    })
  })
}

start()
  .then(() => {
    console.log('complete')
  })
  .catch(error => {
    console.error(error)
  })
