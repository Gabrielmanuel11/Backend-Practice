const express = require('express')

const server = express()

server.get('/', (request, response) => {
  response.send('Express is working!\\nYou are on index page.')
})

server.get('/articles', (req, res) => {
    res.send('You are on "articles" page.')
  })

const PORT = 3000

server.listen(PORT, () => {
  console.log(`Express server started on <http://localhost>:${PORT}/`)
})