<template>
  <b-row>
    <b-col>
      <b-card-group deck>
        <b-card title="Sprinkle Donut"
                img-src="https://www.donutbar.com/wp-content/uploads/2017/05/donut-bar-homers.png"
                img-alt="Sprinkle Donut"
                img-top
                style="max-width:15rem;"
                class="mb-2"
                v-for="n in 4">
          <p class="card-text">This is a pink donut with multi-color sprinkles</p>
          <b-button href="#" variant="primary">Save Donut</b-button>
        </b-card>
      </b-card-group>
    </b-col>
  </b-row>
</template>

<style>

</style>

<script>
  import { db } from '@/services/firebase'
  const donutsDb = db.ref('donuts')

  export default {
    name: 'feed',
    data () {
      return {
        test: 'hello world!',
        donuts: {}
      }
    },
    firebase: {
      donuts: {
        source: donutsDb,
        // Optional, allows you to handle any errors.
        cancelCallback (err) {
          console.error(err)
        }
      }
    }
  }
</script>
