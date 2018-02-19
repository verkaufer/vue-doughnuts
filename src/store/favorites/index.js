import Vue from 'vue'

export default {
  state: {
    favorites: []
  },
  mutations: {
    initFavorites (state, payload) {
      state.favorites = [...payload]
    },
    addFavorite (state, payload) {
      state.favorites.push(payload)
    },
    removeFavorite (state, payload) {
      state.favorites = state.favorites.filter(favorite => favorite !== payload)
    },
    clearAllFavorites (state, payload) {
      state.favorites = []
    }
  },
  getters: {
    favorites: (state) => { return state.favorites },
    isFavorite: (state) => (shopId) => { return state.favorites.indexOf(shopId) > -1 }
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
        .get()
        .then(favorites => {
          favorites.forEach(favorite => {
            allFavorites.push(favorite.id)
          })
          commit('initFavorites', allFavorites)
        })
    },
    /**
     * Saves reference to shop by placeID and appends placeID to store
     * @param commit
     * @param payload Obj {userID: string, shop: {Obj}}
     */
    newFavoriteShop ({commit}, payload) {
      const { userID, shop } = payload
      Vue.prototype.$firestore
          .collection('users')
          .doc(userID)
          .collection('favorites')
          .doc(shop.placeId)
          .set({
            name: shop.name,
            created_on: Date.now()
          })
          .then(() => {
            commit('addFavorite', shop.placeId)
          })
          .catch(err => {
            console.log(err)
          })
    },
    /**
     * Delete shop with placeID from Firebase and filter from store.
     * @param commit
     * @param payload Obj {userID: string, shop: { Obj }}
     */
    removeFavoriteShop ({commit}, payload) {
      const { userID, shop } = payload
      Vue.prototype.$firestore
        .collection('users')
        .doc(userID)
        .collection('favorites')
        .doc(shop.placeId)
        .delete()
        .then(() => {
          commit('removeFavorite', shop.placeId)
        })
    },
    clearFavorites ({commit}) {
      commit('clearAllFavorites')
    }
  }
}
