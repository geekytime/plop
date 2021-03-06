import { Loader as PixiLoader, utils as PixiUtils } from 'pixi.js'
import * as PIXI from 'pixi.js'
import pathParse from 'path-parse'

export class Loader {
  constructor ({ scaleMode } = {}) {
    if (scaleMode === 'pixelated') {
      PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST
    } else {
      PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR
    }
    this.pixiLoader = new PixiLoader()
  }

  loadAll (assets) {
    return new Promise((resolve, reject) => {
      PixiUtils.clearTextureCache()

      assets.forEach(url => {
        const { name } = pathParse(url)
        this.pixiLoader.add(name, url)
      })

      this.pixiLoader.onError.add(reject)
      this.pixiLoader.load(resolve)
    })
  }

  use (middleware) {
    this.pixiLoader.use(middleware)
  }
}
