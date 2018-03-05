import Vue from 'vue'
import Router from 'vue-router'

import { store } from '@/store'

import Home from '@/components/Home'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Favorites from '@/components/Favorites'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: Favorites,
      meta: {
        requireAuthentication: true
      }
    }
  ]
})

/**
 * Perform check before entering routes requiring authentication
 */
router.beforeEach((to, from, next) => {
  if (!to.matched.some(r => r.meta.requireAuthentication)) {
    return next()
  }
  if (!store.getters.authenticated) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  store.dispatch('clearError')
})

export default router
