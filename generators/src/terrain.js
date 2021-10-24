export const terrain = ({ layerDefs, width, height }) => {
  const layerDatas = layerDefs.map(({ algorithm, options }) => {
    const layerData = algorithm(options)
    return layerData
  })
  return layerDatas
}
