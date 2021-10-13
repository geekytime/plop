<template>
  <div id="app">
    <router-view> </router-view>
    <Nav />
  </div>
</template>

<script>
import Nav from './nav.vue'

export default {
  name: 'App',
  components: {
    Nav
  }
}
</script>

<style lang="less">
#app {
  position: fixed;
  width: 100%;
  height: 100%;
  font-family: monospace;
}
</style>
