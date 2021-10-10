import { Application, Container } from 'pixi.js'
import debounce from 'debounce'
import randomInt from 'random-int'
import { Transform } from '../components/transform.js'
import { Viewport } from 'pixi-viewport'

const pixiDefaults = {
  backgroundColor: 0,
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
    this.resizeState = 'needsResize'
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

    this.viewport = new Viewport({
      screenWidth: this.width,
      screenHeight: this.height,
      // TODO: Fix the world size!
      worldWidth: 128 * 48,
      worldHeight: 128 * 48,
      noTicker: true,
      interaction: this.app.renderer.plugins.interaction
    })
    this.viewport.wheel()

    this.stage.addChild(this.viewport)

    this.doResize()

    const debouncedHandleResize = debounce(this.handleResize, 50)
    window.addEventListener('resize', debouncedHandleResize)
    this.entities.on('entityAddComponent', this.checkForTransforms)
  }

  checkForTransforms = ({ entity, component, componentName }) => {
    if (component instanceof Transform) {
      this.viewport.addChild(entity.transform)
    }
  }

  handleResize = event => {
    this.resizeState = 'needsResize'
  }

  update () {
    if (this.resizeState === 'needsResize') {
      this.doResize()
    }
    this.viewport.update()
  }

  doResize () {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.app.renderer.resize(this.width, this.height)
    this.stage.scale.set(1)
    this.viewport.screenWidth = this.width
    this.viewport.screenHeight = this.height
    this.resizeState = 'noResize'
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
