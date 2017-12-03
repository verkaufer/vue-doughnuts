<template>
    <b-row>
      <b-col>
        <b-card v-bind:title="shopInfo.name"
                class="mb-2">
          <p class="card-text">
            {{ shopInfo.address }}
          </p>
          <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>
      </b-col>
    </b-row>
</template>

<script>
  export default {
    name: 'donutShopInfo',
    props: ['shopInfo'],
    data () {
      return {
        //
      }
    }
  }
</script>

<style scoped>

</style>
