<template>
  <div id="app">

    <b-container>
    <div class="top-nav">
      <b-navbar toggleable="md" type="light">

        <b-nav-toggle target="nav_collapse"></b-nav-toggle>

        <b-navbar-brand href="#">DonutTracker</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">
          <b-nav is-nav-bar>
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item>Donuts</b-nav-item>
            <b-nav-item to="/feed">Feed</b-nav-item>
            <b-nav-item v-if="!authenticated" to="/login">Login</b-nav-item>
            <b-nav-item v-if="authenticated" @click="logout">Logout</b-nav-item>
            <b-nav-item></b-nav-item>
            <b-nav-text class="ml-right" v-if="authenticated">Hello, {{ user.email }}</b-nav-text>
          </b-nav>
        </b-collapse>
      </b-navbar>
    </div>
      <main role="main">

        <div id="content-panel">
          <router-view></router-view>
        </div>
        <b-row>
          <b-col lg="6">
            <h4>Subheading</h4>
            <p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>

            <h4>Subheading</h4>
            <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>

            <h4>Subheading</h4>
            <p>Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
          </b-col>
          <b-col lg="6">
            <h4>Subheading</h4>
            <p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>

            <h4>Subheading</h4>
            <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>

            <h4>Subheading</h4>
            <p>Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
          </b-col>
        </b-row>

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
  import { mapGetters } from 'vuex'

  export default {
    name: 'app',
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'authenticated',
        'user'
      ])
    },
    methods: {
      logout () {
        this.$firebaseApp.auth().signOut()
          .then(() => {
            this.$store.dispatch('logout')
            this.$router.push('/login')
          })
      }
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
