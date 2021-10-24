import ndarray from 'ndarray'

export class LayerData {
  constructor ({ width, height }) {
    this.width = width
    this.height = height
    this.size = width * height
    this.data = ndarray(new Uint8Array(this.size), [this.width, this.height])
  }

  get (x, y) {
    return this.data.get(x, y)
  }

  set (x, y, value) {
    this.data.set(x, y, value)
  }
}
