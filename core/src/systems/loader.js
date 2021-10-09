import { Loader as PixiLoader, utils as PixiUtils } from 'pixi.js'

export class Loader {
  constructor () {
    this.pixiLoader = new PixiLoader()
  }

  loadAll (assets) {
    return new Promise((resolve, reject) => {
      PixiUtils.clearTextureCache()
      this.pixiLoader.add(assets)
      this.pixiLoader.onError.add(reject)
      this.pixiLoader.load(resolve)
    })
  }

  use (middleware) {
    this.pixiLoader.use(middleware)
  }
}
