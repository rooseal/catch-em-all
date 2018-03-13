const path = require('path')
const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

const pokemonDB = require('../../data/pokemon/pokemon.json')

app.use(cors())
app.use(function (req, res, next) {
  console.log(`${req.method}  ${req.path}`)
  next()
})

app.get('/pokemon/:name', (req, res) => {
  let name = req.params.name

  res.json(pokemonDB[name])
})

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`)
})
