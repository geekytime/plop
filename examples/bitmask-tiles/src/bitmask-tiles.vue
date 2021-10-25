<template>
  <div class="bitmask-tiles"></div>
</template>

<script>
import { Game } from './game.js'

export default {
  name: 'BitmaskTilesExample',
  async mounted () {
    const game = new Game()
    await game.start()
    this.$el.append(game.systems.renderer.view)
  }
}
</script>

<style lang="less">
.bitmask-tiles {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 2em;

  canvas {
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
  }
}
</style>
