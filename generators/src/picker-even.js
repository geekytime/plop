import randomInt from 'random-int'

export class PickerEven {
  constructor ({ minIndex = 0, maxIndex = 0, values = [] }) {
    if (values.length > 0) {
      this.values = values
    } else {
      this.values = this.generateValues({ minIndex, maxIndex })
    }
  }

  generateValues ({ minIndex, maxIndex }) {
    const values = []
    for (let i = minIndex; i <= maxIndex; i++) {
      values.push(i)
    }
    return values
  }

  pick () {
    const index = randomInt(0, this.values.length - 1)
    return this.values[index]
  }
}
