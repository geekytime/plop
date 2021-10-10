import { Tilemap } from '../utils/tilemap.js'
import { Transform } from '../components/transform.js'

export class Terrains {
  init () {}

  async createTerrain ({ mapData } = {}) {
    const { renderer } = this.game.systems
    this.entity = this.game.entities.createEntity()
    this.entity.addComponent(new Transform())
    this.mapData = mapData

    const { atlasName, tiles, tileTypes, tileSize } = mapData
    const tilemap = new Tilemap({ atlasName, tileSize })

    tiles.forEach((tileRow, rowIndex) => {
      tileRow.forEach((tileCode, tileIndex) => {
        const { type, textures } = tileTypes[tileCode]
        tilemap.addTile({ type, textures, x: rowIndex, y: tileIndex })
      })
    })

    this.entity.transform.addChild(tilemap.tilemap)

    if (renderer) {
      renderer.viewport.addChild(this.entity.transform)
    }

    // read tile atlas
    // add TerrainMap component with map data
    // add Transform
    // create PixiTileMap and add to renderer
  }

  update () {
    // update PixiTileMap with latest map data
  }
}
