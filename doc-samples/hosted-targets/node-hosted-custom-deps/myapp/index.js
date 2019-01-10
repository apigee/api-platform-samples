var express = require('express')
const sayHello = require('say-hello')
var app = express()

app.get('/', function (req, res) {
  res.json({ hello: "Hello World! Hola Mundo! Bonjour le monde!" })
})

app.get('/hello/:language', function (req, res) {
  var language = req.params.language
  var message = "This is how you say hello in " + language + ": "
  switch (language.toLowerCase()) {
    case 'spanish':
      message += sayHello.spanish()
      break
    case 'french':
      message += sayHello.french()
      break
    case 'english':
      message += sayHello.english()
      break
    default:
      message = "Sorry, unable say hello in the language: " + language
  }
  res.json({ hello: message })
})

var server = app.listen(process.env.PORT || 9000, function () {
    console.log('Listening on port %d', server.address().port)
})
