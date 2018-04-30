var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.json({ hello: "Hello World!" })
})

app.get('/hello/:name', function (req, res) {
  var name = req.params.name
  res.json({ hello: "hello " + name })
})

var server = app.listen(process.env.PORT || 9000, function () {
    console.log('Listening on port %d', server.address().port)
})