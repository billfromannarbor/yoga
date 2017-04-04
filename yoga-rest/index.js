"use strict"

const express = require("express")
const app = express()
const utl = require("util")

app.get('/', function (req, res) {
  res.send('Hello World!')
})

var server = app.listen(7100, function() {
  var host = server.address().address
  var port = server.address().port
  
  console.log("Listening on host: %s and port: %s", host, port)
  console.log(server.address())
  //console.log('Example app listening at http://%s:%s', host, port)
})