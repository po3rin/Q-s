import Firebase from 'firebase'
let config = {
  apiKey: 'AIzaSyB70Y11A5-dL2a0aNLSVres7JEKYAfR7ZM',
  authDomain: 'realtimepresentation.firebaseapp.com',
  databaseURL: 'https://realtimepresentation.firebaseio.com',
  projectId: 'realtimepresentation',
  storageBucket: 'realtimepresentation.appspot.com',
  messagingSenderId: '473866063351'
}
const FirebaseApp = Firebase.initializeApp(config)
export default FirebaseApp
