<template>
  <div id="app" v-if="!loading">

    <b-container>
    <div class="top-nav">
      <b-navbar toggleable="md" type="light">

        <b-nav-toggle target="nav_collapse"></b-nav-toggle>

        <b-navbar-brand href="/" class="font-weight-bold">DonutTracker 🍩</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/favorites">Favorites</b-nav-item>
            <b-nav-item v-if="!authenticated" to="/login">Login</b-nav-item>
            <b-nav-item v-if="authenticated" @click="logout">Logout</b-nav-item>

            <b-nav-text class="pl-lg-5" v-if="authenticated">Hello, {{ user.email }}</b-nav-text>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
      <main role="main">

        <div id="content-panel">
          <router-view></router-view>
        </div>
      </main>

      <footer class="footer">
        <p>&copy; David G 2017</p>
      </footer>
    </b-container>
  </div>

</template>

<style>
  .top-nav {
    margin-top: 1rem;
    margin-bottom: 3rem;
  }
</style>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'app',
    mounted: function () {
      this.ready()
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'loading',
        'authenticated',
        'user'
      ])
    },
    methods: {
      logout () {
        this.$firebaseApp.auth().signOut()
          .then(() => {
            this.announceLogout()
            this.$router.push('/login')
          })
      },
      ...mapActions({
        ready: 'ready',
        announceLogout: 'logout'
      })
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

@media (min-width: 48em) {
  .container {
    max-width: 46rem;
  }
}

.top-nav {
  margin-bottom: 1rem;
}

#content-panel {
  padding: 2rem 1rem;
  margin-bottom: 2rem;
  background-color: #e9ecef;
  border-radius: 0.3rem;
}
</style>
