<template>
  <div id="google-map" class="map-panel">
  <gmap-map
    :center="center"
    :zoom="13"
    style="height:500px;position:relative;"
    ref="map">
    <gmap-info-window :options="infoWindow.options"
                      :position="infoWindow.pos"
                      :opened="infoWindow.open"
                      @closeclick="infoWindow.open=false">
      {{ infoWindow.content }}
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
    <button @click.prevent="findDonuts">Click me</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
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
        this.infoWindow.content = `${marker.infoText.name}\n${marker.infoText.address}`

        if (this.currentMarkerIndex === index) {
          this.infoWindow.open = !this.infoWindow.open
        } else {
          this.infoWindow.open = true
          this.currentMarkerIndex = index
        }
      },
      findDonuts () {
        const pService = new window.google.maps.places.PlacesService(this.$refs.map.$mapObject)
        const request = {
          location: {lat: 45.5231, lng: -122.6765},
          radius: 5000,
          name: 'doughnut',
          type: 'bakery'
        }
        let self = this
        pService.nearbySearch(request, function (results, status) {
          console.log(results)
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {
              console.log(results[0].geometry.location.lat())
              self.markers.push({
                position: new window.google.maps.LatLng(results[i].geometry.location.lat(),
                                                        results[i].geometry.location.lng()),
                infoText: {
                  name: results[i].name,
                  address: results[i].vicinity
                }
              })
            }
          } else {
            console.log(`Encountered error: ${status}`)
          }
        })
      }
    }
  }
</script>

<styles>
  .map-panel {
    flex: 4 1 80%;
  }

  gmap-map {
  width: 100%;
  height: 600px;
  display: block;
}
</styles>
