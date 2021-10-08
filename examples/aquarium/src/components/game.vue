<template>
  <div class="game"></div>
</template>

<script>
export default {
  name: 'Game',
  inject: ['game'],
  mounted () {
    this.$el.append(this.game.systems.renderer.view)
  }
}
</script>

<style lang="less">
.game {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
