import { LayerData } from '@plop/core'

export const generateTerrainFull = ({ width, height }) => {
  const layerData = new LayerData({ width, height })
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      layerData.set(x, y, 1)
    }
  }
  return layerData
}
