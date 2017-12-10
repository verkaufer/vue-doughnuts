<template>
  <div>
    <b-row class="justify-content-center">
      <b-col md="8">
          <h2>Sign Up</h2>
          <b-form @submit.prevent="createUser">
            <b-form-group id="email"
                          label="Email address">
              <b-form-input id="email"
                            type="email"
                            v-model="form.email"
                            required
                            placeholder="Email"
                            description="Your information will not be shared.">
              </b-form-input>
            </b-form-group>
            <b-form-group id="password"
                          label="Set Password">
              <b-form-input id="password"
                            type="password"
                            v-model="form.password"
                            required
                            placeholder="Password">
              </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
          </b-form>
        </b-col>
    </b-row>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'signup',
    data () {
      return {
        form: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      createUser () {
        firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then(user => {
            this.$store.dispatch('authenticate', user)
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
