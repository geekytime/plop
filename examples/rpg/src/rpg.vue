<template>
  <div class="rpg"></div>
</template>

<script>
import { Game } from './game/game.js'
export default {
  name: 'RPG',
  async mounted () {
    const game = new Game()
    await game.start()
    this.$el.append(game.systems.renderer.view)
  }
}
</script>

<style lang="less">
.rpg {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

  canvas {
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
  }
}
</style>
