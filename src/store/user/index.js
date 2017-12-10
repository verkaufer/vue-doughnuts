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
    authenticate ({commit}, payload) {
      commit('setUser', payload)
    },
    logout ({commit}) {
      commit('setUser', null)
    },
    updateAuthState ({commit}, payload) {
      commit('setUser', payload)
    }
  }
}
