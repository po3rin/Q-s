import Vue from 'vue'
import Router from 'vue-router'
import Start from '@/components/Start'
import Room from '@/components/Room'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Start
    },
    {
      path: '/room/:name',
      name: 'Room',
      component: Room
    }
  ]
})
