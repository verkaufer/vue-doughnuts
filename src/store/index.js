import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import shared from './shared'
import favorites from './favorites'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    user: user,
    shared: shared,
    favorites: favorites
  }
})
