import Vue from 'vue'
import Router from 'vue-router'

// import Feed from '@/components/Feed'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Signup from '@/components/Signup'

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
    }
    // {
    //   path: '/feed',
    //   name: 'Feed',
    //   component: Feed,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
  ]
})

export default router
