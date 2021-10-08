import { AnimatedSprite as PixiAnimatedSprite, Texture } from 'pixi.js'

export class AnimatedSprite extends PixiAnimatedSprite {
  constructor ({ sequences = {}, activeSequenceName } = {}) {
    const sequencesWithTextures = getTextures(sequences)
    const initialTextures = sequencesWithTextures[activeSequenceName].textures
    super(initialTextures)

    this.sequences = sequencesWithTextures
    this.setActiveSequence(activeSequenceName)
    this.visible = true
  }

  onCreate (entity) {
    entity.transform.addChild(this)
  }

  setActiveSequence (activeSequenceName) {
    if (this.activeSequenceName === activeSequenceName) {
      return
    }
    this.activeSequenceName = activeSequenceName
    this.textures = this.sequences[activeSequenceName].textures
    this.animationSpeed = this.sequences[activeSequenceName].animationSpeed
    this.gotoAndPlay(0)
  }
}

const getTextures = sequences => {
  const names = Object.keys(sequences)
  const withTextures = names.reduce((acc, name) => {
    const sequence = {
      ...sequences[name],
      textures: []
    }
    const { baseName, frameCount } = sequence
    for (let i = 0; i < frameCount; i++) {
      const num = `${i}`.padStart(3, '0')
      const texture = Texture.from(`${baseName}-${num}.png`)
      sequence.textures.push(texture)
    }
    acc[name] = sequence
    return acc
  }, {})
  return withTextures
}
