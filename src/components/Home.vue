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
          ref="map">
          <gmap-info-window :options="infoWindow.options"
                            :position="infoWindow.pos"
                            :opened="infoWindow.open"
                            @closeclick="infoWindow.open=false">
            <span v-html="infoWindow.content"></span>
          </gmap-info-window>
          <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center=m.position;toggleInfoWindow(m,index)"
          ></gmap-marker>
        </gmap-map>
      </b-col>
    </b-row>
    <donut-shop-info :shop-info="infoWindow.content" v-show="infoWindow.open"></donut-shop-info>
  </div>
</template>

<script>
  import axios from 'axios'

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
      toggleInfoWindow (marker, index) {
        this.infoWindow.pos = marker.position
        this.infoWindow.content = this.formatInfoWindow(marker.infoText.name, marker.infoText.address)
        if (this.currentMarkerIndex === index) {
          this.infoWindow.open = !this.infoWindow.open
        } else {
          this.infoWindow.open = true
          this.currentMarkerIndex = index
        }
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
