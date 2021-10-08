<template>
  <div id="app">
    <Game />
  </div>
</template>

<script>
import Game from './components/game.vue'
import Perf from './components/perf.vue'

export default {
  name: 'App',
  components: {
    Game,
    Perf
  }
}
</script>

<style lang="less">
#app {
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>
