import randomInt from 'random-int'

export class Terrain {
  async init () {
    const mapData = await this.readMapData()
    this.game.systems.terrains.createTerrain({ mapData })
  }

  async readMapData () {
    const terrainTiles = new Array(128).fill(0).map(() => {
      return new Array(128).fill({ key: 'a' })
    })

    const objectTiles = new Array(128).fill(0).map(() => {
      return new Array(128).fill('').map(() => {
        const chance = randomInt(0, 100)
        if (chance <= 1) {
        }
      })
    })

    return {
      terrain: {
        tiles: terrainTiles,
        atlas: {
          name: 'ashlands-dirt',
          width: 4,
          height: 4,
          tileSize: 48,
          tileTypes: {
            a: {
              type: 'basic',
              textures: [
                {
                  id: 'ashlands-dirt-000.png',
                  weight: 1
                },
                {
                  id: 'ashlands-dirt-001.png',
                  weight: 1
                },
                {
                  id: 'ashlands-dirt-002.png',
                  weight: 1
                },
                {
                  id: 'ashlands-dirt-003.png',
                  weight: 1
                },
                {
                  id: 'ashlands-dirt-004.png',
                  weight: 1
                },
                {
                  id: 'ashlands-dirt-005.png',
                  weight: 1
                },
                {
                  id: 'ashlands-dirt-006.png',
                  weight: 1
                },
                {
                  id: 'ashlands-dirt-007.png',
                  weight: 0.1
                },
                {
                  id: 'ashlands-dirt-008.png',
                  weight: 0.1
                },
                {
                  id: 'ashlands-dirt-009.png',
                  weight: 1
                },
                {
                  id: 'ashlands-dirt-010.png',
                  weight: 1
                },
                {
                  id: 'ashlands-dirt-011.png',
                  weight: 1
                }
              ]
            }
          }
        }
      },
      objects: {
        tiles: objectTiles
      }
    }
  }

  update () {}
}
