import Firebase from 'firebase'

let db = null

const init = function init () {
  db = Firebase.database()
}

export default { init, db }
