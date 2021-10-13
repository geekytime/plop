<template>
  <div class="nav">
    <router-link to="aquarium">Aquarium</router-link>
    <router-link to="rpg">RPG</router-link>
  </div>
</template>

<style lang="less">
.nav {
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 1em;
  gap: 1em;
  width: 100%;
  height: 30px;
  top: 0;
  left: 0;
  color: white;
  background-color: black;
  a,
  a:visited {
    color: white;
  }
}
</style>
