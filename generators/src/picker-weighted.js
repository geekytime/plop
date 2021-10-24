import weightedRandom from 'weighted-random-object'

export class PickerWeighted {
  constructor ({ weights }) {
    this.weights = weights
  }

  pick () {
    return weightedRandomObject(this.weights)
  }
}
