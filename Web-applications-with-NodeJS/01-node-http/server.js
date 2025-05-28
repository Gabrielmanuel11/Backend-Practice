const http = require('node:http')

const server = http.createServer((request, response) => {
    const path = request.url

  switch (path) {
    case '/':
      response.writeHead(200)
      response.write('You are on index page!')
      break;
    case '/articles':
      response.writeHead(200)
      response.write('You are on "articles" page!')
      break;
    default:
      response.writeHead(404)
      response.write('Path not found!')
      break;
  }

    response.end()
  })

const PORT = 3000

server.listen(PORT, () => {
  console.log(`Server runing on <http://localhost>:${PORT}/`)
})