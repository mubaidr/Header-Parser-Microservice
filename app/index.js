var express = require('express')
var path = require('path')

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
  res.send('Running!')
})

app.use('*', function (req, res) {
  res.end('NOT IMPLEMENTED: 404!')
})

app.listen(port)
