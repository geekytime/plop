import { Loader } from '@plop/core'

export class Assets {
  async init () {
    this.loader = new Loader()
    return this.loader.loadAll('assets/aquarium/spritesheet.json')
  }
}
