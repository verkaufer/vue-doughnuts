import Vue from 'vue'
import * as types from '../mutation_types'

export default {
  state: {
    favorites: [],
    saveStatus: null
  },
  mutations: {
    [types.INIT_FAVORITES] (state, payload) {
      state.favorites = [...payload]
    },
    [types.ADD_FAVORITE] (state, payload) {
      state.favorites.push(payload)
    },
    [types.REMOVE_FAVORITE] (state, payload) {
      state.favorites = state.favorites.filter(favorite => favorite !== payload)
    },
    [types.CLEAR_ALL_FAVORITES] (state) {
      state.favorites = []
    },
    [types.SET_SAVE_STATUS] (state, status) {
      state.saveStatus = status
    }
  },
  getters: {
    favorites: (state) => { return state.favorites },
    isFavorite: (state) => (shopId) => { return state.favorites.indexOf(shopId) > -1 },
    saveStatus: (state) => { return state.saveStatus }
  },
  actions: {
    /**
     * Query for all favorites. Save array of placeIDs to store.
     * @param commit
     * @param state
     * @param userID String
     */
    loadFavorites ({commit, state}, userID) {
      let allFavorites = []
      Vue.prototype.$firestore
        .collection('users')
        .doc(userID)
        .collection('favorites')
        .where('created_on', '>', 0)
        .get()
        .then(favorites => {
          favorites.forEach(favorite => {
            allFavorites.push(favorite.id)
          })
          commit(types.INIT_FAVORITES, allFavorites)
        })
    },
    /**
     * Saves reference to shop by placeID and appends placeID to store
     * @param commit
     * @param payload Obj {userID: string, shop: {Obj}}
     */
    newFavoriteShop ({commit}, payload) {
      const { userID, shop } = payload
      commit(types.SET_SAVE_STATUS, 'pending')
      Vue.prototype.$firestore
          .collection('users')
          .doc(userID)
          .collection('favorites')
          .doc(shop.placeId)
          .set({
            name: shop.name,
            approxLocation: shop.approxLocation,
            created_on: Date.now()
          })
          .then(() => {
            commit(types.ADD_FAVORITE, shop.placeId)
            commit(types.SET_SAVE_STATUS, 'success')
          })
          .catch(err => {
            console.log(err)
            commit(types.SET_SAVE_STATUS, 'failed')
          })
    },
    /**
     * Delete shop with placeID from Firebase and filter from store.
     * @param commit
     * @param payload Obj {userID: string, shop: { Obj }}
     */
    removeFavoriteShop ({commit}, payload) {
      const { userID, shopId } = payload
      commit(types.SET_SAVE_STATUS, 'pending')
      Vue.prototype.$firestore
        .collection('users')
        .doc(userID)
        .collection('favorites')
        .doc(shopId)
        .delete()
        .then(() => {
          commit(types.REMOVE_FAVORITE, shopId)
        })
        .catch(() => {
          commit(types.SET_SAVE_STATUS, 'failed')
        })
    },
    clearFavorites ({commit}) {
      commit(types.CLEAR_ALL_FAVORITES)
    },
    resetSaveStatus ({commit}) {
      commit(types.SET_SAVE_STATUS, null)
    }
  }
}
