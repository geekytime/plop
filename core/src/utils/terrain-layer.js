export class TerrainLayer {
  constructor ({ tilemap, layerData }) {
    this.tilemap = tilemap
    this.layerData = layerData
    this.populateTilemap()
  }

  populateTilemap () {
    for (let i = 0; i < this.layerData.length; i++) {
      this.tilemap.addTile(this.layerData[i])
    }
  }
}
