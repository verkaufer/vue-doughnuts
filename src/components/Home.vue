<template>
  <div id="google-map" class="map-panel">
    <b-row>
      <b-col>
        <b-form @submit.prevent="findDonuts" inline>
          <b-input id="zip_search"
                   placeholder="Enter your ZIP Code"
                   class="mb-2 mr-sm-2 form-control"
                   v-model="userZipCode"
          />
          <b-button variant="primary"
                    class="mb-2 mr-sm-2 form-control"
                    @click.prevent="findDonuts">Search</b-button>
        </b-form>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <gmap-map
          :center="center"
          :zoom="13"
          style="height:300px;position:relative;"
          ref="map"
          @click="infoWindow.open=false">
          <gmap-info-window :options="infoWindow.options"
                            :position="infoWindow.pos"
                            :opened="infoWindow.open"
                            @closeclick="resetSelectedInfoWindow">
            <span v-html="infoWindow.displayableContent"></span>
          </gmap-info-window>
          <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="false"
            @click="center=m.position;showInfoWindow(m,index)"
          ></gmap-marker>
        </gmap-map>
      </b-col>
    </b-row>
    <donut-shop-info :shop-info="infoWindow.content" :key="infoWindow.content.placeId" v-if="infoWindow.open"></donut-shop-info>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapGetters } from 'vuex'

  import PlaceFinderService from '@/services/places'
  import DonutShopInfo from '@/components/DonutShopInfo'
  import {geocoderAPIPath} from '@/services/configs'

  export default {
    components: {
      DonutShopInfo
    },
    data () {
      return {
        userZipCode: null,
        center: {lat: 45.5231, lng: -122.6765},
        markers: [],
        currentMarkerIndex: null,
        infoWindow: {
          content: '',
          pos: { lat: 0, lng: 0 },
          open: false,
          options: {
            pixelOffset: {
              width: 0,
              height: -35
            }
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    ready: function () {
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.handleResize)
    },
    methods: {
      handleResize (event) {
        this.$gmapDefaultResizeBus.$emit('resize')
      },
      showInfoWindow (marker, index) {
        // Don't update if the clicked marker is already selected
        if (index === this.currentMarkerIndex) { return }
        this.resetSelectedInfoWindow()
        this.infoWindow.pos = marker.position
        this.infoWindow.content = marker.infoText
        this.infoWindow.displayableContent = this.formatInfoWindow(marker.infoText.name, marker.infoText.address)
        this.infoWindow.open = true
        this.currentMarkerIndex = index
      },
      findDonuts () {
        let self = this
        axios({
          method: 'get',
          url: geocoderAPIPath(this.userZipCode)
        }).then(response => {
          // Update map to show the ZIP we looked up
          self.center = response.data.results[0].geometry.location
          return response.data.results[0].geometry.location
        }).then(geolocation => {
          const placesSearchService = new PlaceFinderService(self.$refs.map.$mapObject)
          return placesSearchService
                    .findPlaces(geolocation)
                    .then(placesSearchService.buildMarkers)
        }).then(markers => {
          self.markers = markers
        }).catch(err => {
          /* es-lint disable */
          console.log(err)
        })
      },
      formatInfoWindow (name, address) {
        return '<div><h3>' + name + '</h3><address>' + address + '</address></div>'
      },
      resetSelectedInfoWindow () {
        this.infoWindow.open = false
        this.currentMarkerIndex = null
      }
    }
  }
</script>

<style>
.map-panel {
    flex: 4 1 80%;
}
gmap-map {
  width: 100%;
  height: 30%;
  display: block;
}

#zip_search {
  flex-grow: 1;
}
</style>
