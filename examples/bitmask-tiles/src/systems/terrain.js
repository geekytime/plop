import randomInt from 'random-int'
import { TilemapBitmask8 } from '@plop/core'
import { TerrainLayer } from '@plop/core'
import { terrain } from '@plop/generators'
import { terrainLayerDefs } from './terrain-layer-defs.js'

export class Terrain {
  async init () {
    const tileSize = 16

    const layerDatas = terrain({ layerDefs: terrainLayerDefs })
    this.addTerrainLayer({
      tileSize,
      baseTextureName: 'grass-green-tiles-8bit',
      layerData: layerDatas[0]
    })
    // this.addTerrainLayer({
    //   tileSize,
    //   baseTextureName: 'splatter-gravel',
    //   layerData: layerDatas[1]
    // })
  }

  addTerrainLayer ({ tileSize, baseTextureName, layerData }) {
    const tilemap = new TilemapBitmask8({
      tileSize,
      layerData,
      baseTextureName
    })

    tilemap.update()

    const { renderer } = this.game.systems
    renderer.viewport.addChild(tilemap.tilemap)
  }

  getRandomTile () {}

  update () {}
}
