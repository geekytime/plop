import { Tilemap } from '../utils/tilemap.js'
import { Transform } from '../components/transform.js'

export class Terrains {
  init () {}

  async createTerrain ({ mapData } = {}) {
    const { renderer } = this.game.systems
    this.entity = this.game.entities.createEntity()
    this.entity.addComponent(new Transform())
    this.mapData = mapData

    const { terrain } = mapData
    const tilemap = new Tilemap({ atlas: terrain.atlas })

    terrain.tiles.forEach((tileRow, rowIndex) => {
      tileRow.forEach((tile, tileIndex) => {
        const { type, textures } = terrain.atlas.tileTypes[tile.key]
        tilemap.addTile({ type, textures, x: rowIndex, y: tileIndex })
      })
    })

    this.entity.transform.addChild(tilemap.tilemap)

    if (renderer) {
      renderer.viewport.addChild(this.entity.transform)
    }
  }

  update () {
    // update PixiTileMap with latest map data
  }
}
