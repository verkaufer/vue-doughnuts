<template>
  <div>
    <b-row class="justify-content-center">
      <b-col md="8">
          <h2>Sign Up</h2>
          <div v-show="form.errors.length > 0">
            <b-alert v-for="(errorMsg, code) in form.errors" :key="errorMsg.code" show variant="danger">
              {{ errorMsg.details }}
            </b-alert>
          </div>
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
  import { mapActions } from 'vuex'

  export default {
    name: 'signup',
    data () {
      return {
        form: {
          email: '',
          password: '',
          errors: []
        },
        submittingForm: false
      }
    },
    methods: {
      createUser () {
        this.submittingForm = true
        this.$firebaseApp.auth().createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then(user => {
            this.authenticate(user)
            return user
          })
          .then(user => {
            return this.$firestore.collection('users').doc(user.uid).set({
              email: user.email
            })
          })
          .then(() => {
            this.$router.push('/home')
          })
          .catch(err => {
            console.log(err)
            this.form.errors.push({details: err.message, code: err.code})
          })
          .then(() => {
            this.submittingForm = false
          })
      },
      ...mapActions([
        'authenticate'
      ])
    }
  }
</script>

<style scoped>

</style>
