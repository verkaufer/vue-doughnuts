import {SET_LOADING_STATUS, SET_ERROR, CLEAR_ERROR} from '../mutation_types'

export default {
  state: {
    appLoading: true,
    error: null
  },
  mutations: {
    [SET_LOADING_STATUS] (state, payload) {
      state.appLoading = payload
    },
    [SET_ERROR] (state, payload) {
      state.error = payload
    },
    [CLEAR_ERROR] (state) {
      state.error = null
    }
  },
  actions: {
    clearError ({commit}) {
      commit(CLEAR_ERROR)
    },
    ready ({commit}) {
      commit(SET_LOADING_STATUS, false)
    },
    setError ({commit}, payload) {
      commit(SET_ERROR, payload)
    }
  },
  getters: {
    loading (state) {
      return state.appLoading
    },
    error (state) {
      return state.error
    }
  }
}
