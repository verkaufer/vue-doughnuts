<template>
    <b-row>
      <b-col>
        <h3>Your Favorite Donut Shops</h3>
        <b-alert variant="danger"
                 dismissible
                 :show="error"
                 @dismissed="clearError">
          Whoops! We encountered an error. Please refresh the page to try again.
        </b-alert>
        <strong v-if="requestPending">Loading...</strong>

        <div v-if="!requestPending">
          <div v-if="!favorites.length">
            <h4>Looks like you haven't saved any Donut Shops!</h4>
            <p><router-link to="Home">Go find your favorites</router-link></p>
          </div>

          <div v-if="favorites.length > 0">
            <b-card-group columns class="mb-3">
              <b-card v-for="(favorite, index) in favorites"
                      border-variant="primary"
                      v-bind:header="favorite.data.name"
                      header-bg-variant="primary"
                      header-text-variant="white"
                      align="center">
                <p class="card-text">
                  <span>{{favorite.data.approxLocation}}</span>
                  <br>
                  <b-button size="sm"
                            :href="google_maps_link_root + favorite.id"
                            rel="noopener noreferrer"
                            target="_blank">Google Maps</b-button>
                  <b-button size="sm" @click="deleteFavorite(favorite.id)" variant="danger">Remove</b-button>
                </p>
              </b-card>
            </b-card-group>
          </div>
        </div>

      </b-col>
    </b-row>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'favorites',
    mounted: function () {
      this.loadFavoritesMetadata()
    },
    data () {
      return {
        favorites: [],
        requestPending: true,
        google_maps_link_root: 'https://www.google.com/maps/place/?q=place_id:'
      }
    },
    computed: {
      ...mapGetters([
        'user',
        'saveStatus',
        'error'
      ])
    },
    methods: {
      // Loading favorites should be moved into Vuex, but do we want
      // to really store all this json info there??
      loadFavoritesMetadata () {
        this.$firestore
          .collection('users')
          .doc(this.user.uid)
          .collection('favorites')
          .where('created_on', '>', 0)
          .get()
          .then(favoritesSnapshot => {
            this.loading = false
            favoritesSnapshot.forEach(favorite => {
              this.favorites.push({
                'id': favorite.id,
                'data': favorite.data()
              })
            })
          })
          .catch(() => {
            this.setError('Encountered issue when loading favorite shops. Please try again.')
          })
          .then(() => {
            this.requestPending = false
          })
      },
      deleteFavorite (shopId) {
        this.removeFavoriteShop({userID: this.user.uid, shopId: shopId})
        this.favorites = this.favorites.filter(favorite => favorite.id !== shopId)
      },
      ...mapActions([
        'removeFavoriteShop',
        'clearError',
        'setError'
      ])
    }
  }
</script>

<style scoped>

</style>
