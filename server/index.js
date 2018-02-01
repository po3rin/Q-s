'use strict'

require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true }))

const server = app.listen(3000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env)
})

app.post('/:message', (req, res) => {
  let options = {
    url: process.env.END_POINT,
    form: `payload={"text": "${req.params.message}", "username": "Q-s","icon_emoji": ":ghost:", "channel": "#qs-notification"}`,
    json :true
  }
  request.post(options, function(error, response, body){
    if (!error && response.statusCode == 200) {
      console.log(response.statusCode = 200)
    } else {
      console.log('error: '+ response.statusCode + body)
    }
  })
  res.send('ok');
})
