const firebaseConfig = {
  apiKey: 'AIzaSyB6ljDyHPS9yTcH3ghRFRyvpuLqCqFh8Oc',
  authDomain: 'vuedonuts.firebaseapp.com',
  databaseURL: 'https://vuedonuts.firebaseio.com',
  projectId: 'vuedonuts',
  storageBucket: 'vuedonuts.appspot.com',
  messagingSenderId: '1080064941587'
}

const geocoderAPIPath = (zipCode) => `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode},US`

export {firebaseConfig, geocoderAPIPath}
