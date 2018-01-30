// Test Functions

const request = require('request')
const functions = require('firebase-functions')

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.notification = functions.database.ref('room/{name}/stop').onWrite(event => {
  const val = event.data.val()
  console.log(val)
  return request.post(
    "",
    {json: {text: `${event.params.name} change !!`}}
  )
})

// let payload = {
//   form: {
//       token: '',
//       channel: 'qs-notification',
//       username: 'abctail30',
//       attachments: JSON.stringify([
//         {
//           "color": "#36a64f",
//           "pretext": "Q'sで聞き手から反応がありました",
//           "author_name": "Q's",
//           "author_link": "http://qiita.com/daikiojm",
//           "title": "Q's notification",
//           "text": "待ってが押されました"
//         }
//       ])
//   }
// }
//
// exports.addMessage = functions.https.onRequest((req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text
//
//   request.post(slack_endpoint, payload, (error, response, body) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(body);
//     }
//   })
//   // Push the new message into the Realtime Database using the Firebase Admin SDK.
//   admin.database().ref('/room').push({original: original}).then(snapshot => {
//     // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//     res.redirect(303, snapshot.ref)
//     return false
//   }).catch(e => {
//     return e
//   })
// })
