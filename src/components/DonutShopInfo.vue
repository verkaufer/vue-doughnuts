<template>
    <b-row>
      <b-col>
        <b-card v-bind:title="shopInfo.name"
                class="mb-2">
          <p class="card-text">
            {{ shopInfo.address }}
          </p>
          <p>
            <b-button v-if="!favoriteShop" href="" variant="primary" @click.prevent="recordFavoriteShop">Favorite Shop</b-button>
            <b-button v-if="favoriteShop" href="" variant="danger" @click.prevent="deleteFavorite">Unfavorite Shop</b-button>
          </p>
        </b-card>
      </b-col>
    </b-row>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'donutShopInfo',
    props: ['shopInfo'],
    data () {
      return {
        favoriteShop: false
      }
    },
    computed: {
      ...mapGetters([
        'user',
        'isFavorite'
      ])
    },
    beforeMount: function () {
      this.favoriteShop = this.isFavorite(this.shopInfo.placeId)
    },
    methods: {
      recordFavoriteShop () {
        /**
         * Record shop as a favorite for currentUser
         * @type {string}
         */
        this.newFavoriteShop({userID: this.user.uid, shop: this.shopInfo})
        this.favoriteShop = true
      },
      deleteFavorite () {
        this.removeFavoriteShop({userID: this.user.uid, shop: this.shopInfo})
        this.favoriteShop = false
      },
      ...mapActions([
        'newFavoriteShop',
        'removeFavoriteShop'
      ])
    }
  }
</script>

<style scoped>

</style>
