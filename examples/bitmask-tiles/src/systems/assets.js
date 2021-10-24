import { Loader } from '@plop/core'

export class Assets {
  async init () {
    this.loader = new Loader({ scaleMode: 'pixelated' })
    return this.loader.loadAll(['assets/bitmask-tiles/tfbit-grass-green.json'])
  }
}
