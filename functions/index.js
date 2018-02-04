//使わなくなった笑。一旦キープ。
'use strict'

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const server = app.listen(3000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env)
})

exports.generateThumbnail = functions.storage.object().onChange(event => {
  console.log('waiiii')
  return
});
