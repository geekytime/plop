import { Application, Container } from 'pixi.js'
import debounce from 'debounce'
import randomInt from 'random-int'
import { Transform } from '../components/transform.js'

const pixiDefaults = {
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
  antialias: true,
  powerPreference: 'high-performance'
}

export class Renderer {
  constructor ({ pixiOptions = {} } = {}) {
    this.pixiSettings = {
      ...pixiDefaults,
      ...pixiOptions
    }
  }

  init () {
    this.entities = this.game.entities

    const pixiSettings = {
      ...this.pixiSettings,
      width: this.width,
      height: this.height
    }

    this.app = new Application(pixiSettings)
    this.app.stage = new Container()
    this.stage = this.app.stage

    this.doResize()

    const debouncedHandleResize = debounce(this.handleResize, 50)
    window.addEventListener('resize', debouncedHandleResize)
    this.entities.on('entityAddComponent', this.checkForTransforms)
  }

  checkForTransforms = ({ entity, component, componentName }) => {
    if (component instanceof Transform) {
      this.stage.addChild(entity.transform)
    }
  }

  handleResize = event => {
    this.needsResize = true
  }

  update () {
    if ((this.didResize = true)) {
      this.didResize = false
    }

    if (this.needsResize) {
      this.doResize()
      this.didResize = true
    }
  }

  doResize () {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.app.renderer.resize(this.width, this.height)
    this.stage.scale.set(1)
    this.needsResize = false
    this.didResize = true
  }

  get view () {
    return this.app.view
  }

  getCenter () {
    const x = this.width / 2
    const y = this.height / 2
    return { x, y }
  }

  getRandomPoint ({ padding = { x: 100, y: 100 } } = {}) {
    const x = randomInt(0 + padding.x, this.width - padding.x)
    const y = randomInt(0 + padding.y, this.height - padding.y)
    return { x, y }
  }

  getRatio () {
    return this.width / this.height
  }
}
