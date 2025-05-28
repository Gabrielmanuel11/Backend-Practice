const express = require('express')
const path = require('node:path')

const app = express()

const storedUsers = []

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  const title = 'Homepage'
  const message = 'Dynamic mesage through Ejs.'

  res.render('index', { title, message })
})

app.get('/formulario', (req, res) => {
    res.render('form')
  })

  app.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password

  storedUsers.push({ username, password })

  res.redirect('/usuarios')
  })

  app.get('/usuarios', (req, res) => {
    res.render('users', { users: storedUsers })
  })


const PORT = 3000

app.listen(PORT, () => {
  console.log('Server started!')
})