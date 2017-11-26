import Vue from 'vue'
import Router from 'vue-router'

// import Feed from '@/components/Feed'
import Home from '@/components/Home'

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
