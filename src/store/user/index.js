export default {
  state: {
    user: null,
    authenticated: false
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      state.authenticated = !!state.user
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    authenticated (state) {
      return state.authenticated
    }
  },
  actions: {
    authenticate ({commit, dispatch}, payload) {
      commit('setUser', payload)
      dispatch('loadFavorites', payload.uid)
    },
    logout ({commit, dispatch}) {
      commit('setUser', null)
      dispatch('clearFavorites')
    },
    updateAuthState ({commit}, payload) {
      return new Promise((resolve, reject) => {
        commit('setUser', payload)
        resolve()
      })
    }
  }
}
