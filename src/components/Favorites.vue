<template>
    <b-row>
      <b-col>
        <h3>Your Favorite Donut Shops</h3>
        <div v-for="favorite in favorites" :key="favorite.id">
          <p>{{favorite.data.name}} (placeID: {{favorite.id}})</p>
        </div>
      </b-col>
    </b-row>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'favorites',
    created: function () {
      this.loadFavorites()
    },
    data () {
      return {
        favorites: []
      }
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    methods: {
      loadFavorites () {
        this.$firestore
          .collection('users')
          .doc(this.user.uid)
          .collection('favorites')
          .where('created_on', '>', 0)
          .get()
          .then(favoritesSnapshot => {
            favoritesSnapshot.forEach(favorite => {
              this.favorites.push({
                'id': favorite.id,
                'data': favorite.data()
              })
            })
          })
      }
    }
  }
</script>

<style scoped>

</style>
