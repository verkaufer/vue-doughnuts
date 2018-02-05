<template>
    <b-row>
      <b-col>
        <b-card v-bind:title="shopInfo.name"
                class="mb-2">
          <p class="card-text">
            {{ shopInfo.address }}
          </p>
          <b-button href="" variant="primary" @click.prevent="recordFavoriteShop">Favorite this Shop</b-button>
          <b-badge variant="success" v-show="saved">Saved</b-badge>
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
        saved: false
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
        firebase.database().ref('users/' + uid).child('favorites').once('value')
          .then(favorites => {
            return favorites.ref.update({[this.shopInfo.placeId]: true})
          })
          .then(() => {
            this.saved = true
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
