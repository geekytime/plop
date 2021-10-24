import { LayerData } from '@plop/core'
import { Map } from 'rot-js'

export const generateTerrainCellular = ({
  width,
  height,
  baseProbability = 0.5,
  iterations = 10
}) => {
  const map = generateMap({ width, height, baseProbability, iterations })
  return mapToLayerData({ map, width, height })
}

const generateMap = ({
  width,
  height,
  baseProbability = 0.5,
  iterations = 10
}) => {
  const map = new Map.Cellular(width, height)
  map.randomize(baseProbability)
  for (let i = 0; i < iterations; i++) {
    map.create()
  }
  return map
}

const doIteration = map => {
  return new Promise(resolve => {
    map.create(resolve)
  })
}

const mapToLayerData = ({ map, width, height }) => {
  const layerData = new LayerData({ width, height })
  map._map.forEach((row, x) => {
    row.forEach((value, y) => {
      if (value) {
        layerData.set(x, y, 1)
      }
    })
  })
  return layerData
}
