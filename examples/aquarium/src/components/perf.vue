<script>
export default {
  inject: ['game']
}
</script>

<template>
  <div class="perf">
    <div>
      <span class="label">FPS:</span>
      <span class="val">{{ game.perf.fps }}</span>
    </div>
    <div>
      <span class="label">REN: </span>
      <span class="val">{{ game.perf.render.elapsed }}</span>
    </div>
  </div>
</template>

<style lang="less">
.perf {
  position: fixed;
  right: 0px;
  top: 0px;

  .label {
    display: inline-block;
    width: 3em;
  }

  .val {
    display: inline-block;
    width: 3em;
  }
}
</style>
