var express = require('express')
var path = require('path')
var os = require('os');

var app = express()
var port = process.env.PORT || 9000

app.use(express.static(path.join(__dirname, 'public')))

app.use('*', (req, res, next) => {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).end()
  } else {
    console.log('Request at: ' + new Date().toUTCString())
    next()
  }
})

app.get('/', (req, res, next) => {
  var data = {
    ip: req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress,
    os: os.platform() + ', ver: ' + os.release(),
    lang: req.headers["accept-language"]
  }
  res.send(data)
})

app.use('*', function (req, res) {
  res.end('NOT IMPLEMENTED: 404!')
})

app.listen(port)
