<template>
  <div>
    <b-row class="justify-content-center">
      <b-col md="8">
          <h2>Please Log In</h2>
          <b-form @submit.prevent="login">
            <b-form-group id="email"
                          label="Email address">
              <b-form-input id="email"
                            type="email"
                            v-model="form.email"
                            required
                            placeholder="Email">
              </b-form-input>
            </b-form-group>
            <b-form-group id="password"
                          label="Password">
              <b-form-input id="password"
                            type="password"
                            v-model="form.password"
                            required
                            placeholder="Password">
              </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
          </b-form>
        <hr>
        <p>No account? <router-link to="/signup">Sign up here</router-link></p>
        </b-col>
    </b-row>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'login',
    data () {
      return {
        form: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      login () {
        firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password)
          .then(user => {
            this.$store.dispatch('authenticate', user)
            this.$router.push('/home')
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
