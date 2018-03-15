const path = require('path')
const fs = require('fs')
const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

const pokemonDB = require('../../data/pokemon/pokemon.json')

app.use(cors())
app.use(bodyParser())
app.use(function (req, res, next) {
  console.log(`${req.method}  ${req.path}`)
  next()
})

app.get('/pokemon/:name', (req, res) => {
  let name = req.params.name

  res.json({...pokemonDB[name], name})
})

app.get('/pokemons/:start/:end', (req, res) => {
  let start = req.params.start
  let end = req.params.end
  
  let list = Object.keys(pokemonDB)
    .slice(start, end)
    .map(pokemonName => ({
      ...pokemonDB[pokemonName],
      name: pokemonName
    }))

  res.json(list)
})

app.post('/team/:name', (req, res) => {
  let team = req.body.team
  let user = req.params.name

  if(name === undefined) {
    res.status(500).json({
      error: {
        text: `Can't save your data.`
      }
    })
  }

  try {
    team = JSON.parse(team)
  } catch (error) {
    res.status(500).json({
      error: `Can't save your data.`
    })
  }

  let dataPath = path.join(__dirname, 'data', name)

  if (!fs.existsSync(dataPath)) {
    fs.mkdir(dataPath, error => {
      if (error) console.log(`Error creating data directory`)
      res.status(500).json({
        error: `Can't save your data`
      })
      
    })
  }


})

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`)
})
