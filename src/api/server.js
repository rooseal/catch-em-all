const path = require('path')
const express = require('express')

const app = express()
const port = 3000

const pokemonDB = require('../../data/pokemon/pokemon.json')

app.use(function(req, res, next) {
  console.log('Request for ' + req.path)
  console.log('Request for ' + req.method)
  next()
})

app.get('/pokemon/:name', (req, res) => {
  let name = req.params.name

  res.send(JSON.stringify(pokemonDB[name]))
})

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`)
})