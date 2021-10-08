import { Loader as PixiLoader } from 'pixi.js'

export class Loader {
  constructor () {
    this.pixiLoader = new PixiLoader()
  }

  loadAll (assets) {
    return new Promise((resolve, reject) => {
      this.pixiLoader.add(assets)
      this.pixiLoader.onError.add(reject)
      this.pixiLoader.load(resolve)
    })
  }
}
