import Vue from 'vue'
import Router from 'vue-router'
import Start from '@/components/Start'
import Registration from '@/components/registration/Registration'
import Login from '@/components/login/Login'
import Main from '@/components/main/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Start
    },
    {
      path: '/registration/',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/login/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main/',
      name: 'Main',
      component: Main
    }
  ]
})
