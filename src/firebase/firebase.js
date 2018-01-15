import Firebase from 'firebase'
let config = {
  apiKey: 'AIzaSyDnnZXHf7NoCSqmePfaIWYS3CWTjcHFj5s',
  authDomain: 'seraweb-a1070.firebaseapp.com',
  databaseURL: 'https://seraweb-a1070.firebaseio.com',
  projectId: 'seraweb-a1070',
  storageBucket: 'seraweb-a1070.appspot.co',
  messagingSenderId: '796844217901'
}
const FirebaseApp = Firebase.initializeApp(config)
export default FirebaseApp
