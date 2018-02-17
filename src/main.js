// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from './router'
import {firebaseConfig, googleMapsAPI} from './services/configs'
import { store } from '@/store'

import BootstrapVue from 'bootstrap-vue'
import VueFire from 'vuefire'
import * as VueGoogleMaps from 'vue2-google-maps'
import firebase from 'firebase'
import 'firebase/firestore'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueFire)
Vue.use(VueGoogleMaps, {
  load: googleMapsAPI
})

Vue.config.productionTip = false

const firebaseApp = firebase.initializeApp(firebaseConfig)
Vue.prototype.$firebaseApp = firebaseApp
Vue.prototype.$firestore = firebaseApp.firestore()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  created () {
    this.$firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('updateAuthState', user)
      }
    })
  },
  template: '<App/>',
  components: { App },
  watch: {
    '$route' (to, from) {
    // Call resizePreserveCenter() on all maps
      Vue.$gmapDefaultResizeBus.$emit('resize')
    }
  }
})
