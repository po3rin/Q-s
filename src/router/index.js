import Vue from 'vue'
import Router from 'vue-router'
import Start from '@/components/Start'
import Room from '@/components/Room'
import Store from '@/store/index.js'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Start
    },
    {
      path: '/room/:name',
      name: 'Room',
      component: Room,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !Store.getters.status) {
    next({
      path: '/'
    })
  } else {
    next()
  }
})

export default router
