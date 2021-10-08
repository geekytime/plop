import Vue from 'vue'
import App from './App.vue'
import { Game } from './game/game.js'
import './main.less'

Vue.config.productionTip = false

const init = async () => {
  const game = new Game()
  await game.start()

  new Vue({
    provide: { game },
    render: h => h(App)
  }).$mount('#app')
}

init()
