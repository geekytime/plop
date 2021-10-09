import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import './main.less'
import { routes } from './routes.js'

Vue.use(VueRouter)
Vue.config.productionTip = false
const router = new VueRouter({
  routes
})

const init = async () => {
  new Vue({
    render: h => h(App),
    router
  }).$mount('#app')
}

init()
