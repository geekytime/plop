import { Loader as PixiLoader, utils as PixiUtils } from 'pixi.js'
import pathParse from 'path-parse'

export class Loader {
  constructor () {
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
