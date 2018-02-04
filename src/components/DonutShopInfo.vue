<template>
    <b-row>
      <b-col>
        <b-card v-bind:title="shopInfo.name"
                class="mb-2">
          <p class="card-text">
            {{ shopInfo.address }}
          </p>
          <b-button href="#" variant="primary" @click="recordFavoriteShop">Favorite this Shop</b-button>
        </b-card>
      </b-col>
    </b-row>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'donutShopInfo',
    props: ['shopInfo'],
    data () {
      return {
        //
      }
    },
    methods: {
      /**
       * Perform GetOrCreate operation on the shop user is adding to Favorites
       * @param placeId
       * @returns {Promise<any>}
       * @private
       */
      findShopRef_ (placeId) {
        return firebase.database().ref('shops').child(placeId).once('value')
          .then(shopObj => {
            if (shopObj.exists()) {
              return Promise.resolve(shopObj.ref)
            }

            let payload = {}
            payload[placeId] = {shop_name: this.shopInfo.name}

            return shopObj.ref.parent.update(payload)
              .then(() => {
                console.log('created')
                return Promise.resolve(shopObj.ref)
              })
          })
      },

      recordFavoriteShop () {
        /**
         * Record shop as favorited for user (first pass saves user to shop, second pass
         * saves shop to user)
         * @type {string}
         */
        const uid = firebase.auth().currentUser.uid

        this.findShopRef_(this.shopInfo.placeId)
          .then(shopRef => {
            return shopRef.child('favorite_for').transaction(favoriteFor => {
              // Check if favorite_for collection exists on Shop. If not, create it.
              if (favoriteFor === null) {
                let payload = {}
                payload[uid] = true
                return payload
              } else {
                // Toggle user favorite
                if (favoriteFor[uid]) {
                  favoriteFor[uid] = null
                  return favoriteFor
                }
                favoriteFor[uid] = true
                return favoriteFor
              }
            })
          })
          .then(success => {
            console.log(success)
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped>

</style>
