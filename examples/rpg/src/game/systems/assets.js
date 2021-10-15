import { Loader } from '@plop/core'

export class Assets {
  async init () {
    this.loader = new Loader({ scaleMode: 'pixelated' })
    return this.loader.loadAll([
      'assets/rpg/ent/char/reaper/reaper-north.json',
      'assets/rpg/ent/char/reaper/reaper-south.json',
      'assets/rpg/ent/char/reaper/reaper-east.json',
      'assets/rpg/ent/char/reaper/reaper-west.json',
      'assets/rpg/tile/ashlands-dirt.json'
    ])
  }
}
