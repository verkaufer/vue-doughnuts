export default
class PlaceFinderService {
  /**
   * Build configurations and inject mapInstance
   * @param mapInstance Vue $ref to Google Map iFrame
   */
  constructor (mapInstance) {
    this.placesServiceInstance = new window.google.maps.places.PlacesService(mapInstance)
    this.OKResponse = window.google.maps.places.PlacesServiceStatus.OK

    this.requestConfig = {
      location: {lat: null, lng: null},
      radius: 5000,
      name: 'doughnut',
      type: 'bakery'
    }
  }

  /**
   * Builds a query object and sends to GoogleMaps PlacesInstance.
   * @param latitudeAndLongitude Object returned by Google Geocoder API
   * @returns {Promise<any>}
   */
  findPlaces (latitudeAndLongitude) {
    const query = Object.assign(this.requestConfig,
                                {location: latitudeAndLongitude})
    return new Promise((resolve, reject) => {
      this.placesServiceInstance.nearbySearch(query, (resp, status) => {
        if (status !== this.OKResponse) {
          /* eslint-disable */
          return reject(resp || "Failed retrieving places from Google API")
        }
        /* eslint-enable */

        resolve(resp)
      })
    })
  }

  /**
   * Builds list of Marker objects to place on the Map.
   * @param placesData Object returned by Google PlacesService look up
   * @returns {Array}
   */
  buildMarkers (placesData) {
    let placeMarkers = []
    for (let i = 0; i < placesData.length; i++) {
      placeMarkers.push({
        position: new window.google.maps.LatLng(placesData[i].geometry.location.lat(),
                                                placesData[i].geometry.location.lng()),
        infoText: {
          name: placesData[i].name,
          address: placesData[i].vicinity,
          placeId: placesData[i].place_id
        }
      })
    }
    return placeMarkers
  }
}
