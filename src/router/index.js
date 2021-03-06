import Vue from 'vue'
import Router from 'vue-router'

let HelloWorld = () => import('../components/HelloWorld.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
