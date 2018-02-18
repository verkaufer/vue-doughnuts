<template>
    <b-row>
      <b-col>
        <b-card v-bind:title="shopInfo.name"
                class="mb-2">
          <p class="card-text">
            {{ shopInfo.address }}
          </p>
          <p>
            <b-button v-if="!isFavorite" href="" variant="primary" @click.prevent="recordFavoriteShop">Favorite Shop</b-button>
            <b-button v-if="isFavorite" href="" variant="danger" @click.prevent="deleteFavorite">Unfavorite Shop</b-button>
          </p>
        </b-card>
      </b-col>
    </b-row>
</template>

<script>
  export default {
    name: 'donutShopInfo',
    props: ['shopInfo', 'user'],
    data () {
      return {
        saved: false,
        isFavorite: false
      }
    },
    beforeMount: function () {
      this.checkIfShopIsFavorite()
    },
    methods: {
      checkIfShopIsFavorite () {
        this.$firestore
          .collection('users')
          .doc(this.user.uid)
          .collection('favorites')
          .doc(this.shopInfo.placeId)
          .get()
          .then(favoriteRecord => {
            console.log(favoriteRecord)
            this.isFavorite = favoriteRecord.exists
          })
          .catch(err => {
            console.log(err)
          })
      },
      recordFavoriteShop () {
        /**
         * Record shop as a favorite for currentUser
         * @type {string}
         */
        this.$firestore
          .collection('users')
          .doc(this.user.uid)
          .collection('favorites')
          .doc(this.shopInfo.placeId)
          .set({
            name: this.shopInfo.name,
            created_on: Date.now()
          })
          .then(() => {
            this.isFavorite = true
          })
          .catch(err => {
            console.log(err)
          })
      },
      deleteFavorite () {
        this.$firestore
          .collection('users')
          .doc(this.user.uid)
          .collection('favorites')
          .doc(this.shopInfo.placeId)
          .delete()
          .then(() => {
            this.isFavorite = false
          })
      }
    }
  }
</script>

<style scoped>

</style>
