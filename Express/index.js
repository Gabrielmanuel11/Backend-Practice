const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/first', (req, res) => {
    res.send('This is my first page')
})

app.get('/second', (req, res) => {
    res.send('This is my second page')
})

//Route with parameters
app.get('/hello/:name/:position', (req, res) => {
    res.send('Hello my name is '+ req.params.name 
        + ' and I am '+ req.params.position)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})