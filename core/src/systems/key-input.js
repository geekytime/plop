export class KeyInput {
  constructor () {
    this.bindings = []
    this.state = {}
  }

  init () {
    window.addEventListener('keydown', this.onKeydown)
    window.addEventListener('keyup', this.onKeyup)
  }

  bind (key, prop) {
    this.state[prop] = {
      pressed: false,
      held: false
    }
    this.bindings.push({
      key,
      prop
    })
  }

  onKeydown = event => {
    this.bindings.forEach(({ key, prop }) => {
      if (event.key === key) {
        if (this.state[prop].pressed) {
          this.state[prop] = {
            pressed: false,
            held: true,
            down: true
          }
        } else {
          this.state[prop] = {
            pressed: true,
            held: false,
            down: true
          }
        }
      }
    })
  }

  onKeyup = event => {
    this.bindings.forEach(({ key, prop }) => {
      if (event.key === key) {
        this.state[prop] = {
          pressed: false,
          held: false,
          down: false
        }
      }
    })
  }

  update () {
    this.bindings.forEach(({ prop }) => {
      if (this.state[prop].pressed) {
        this.state[prop] = {
          pressed: false,
          held: true,
          down: true
        }
      }
    })
  }
}
