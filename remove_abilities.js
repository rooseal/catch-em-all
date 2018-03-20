const fs = require('fs')
const path = require('path')

// Path
const pathToData = './data/pokemon/'

// Filenames
const pokemonDataString = 'pokemon.json'
const pokemon2DataString = 'pokemon_new.json'

try {
  fs.readFile(path.join(pathToData, pokemonDataString), 'utf-8', (err, data) => {
    if (err) return console.log(`Couldn't load ${pokemonDataString} file`)
    
    const pokemon = JSON.parse(data)
    const included = {}

    let newPokemon = Object.keys(pokemon).map(name => { 
      let tmpPokemon = pokemon[name]
      tmpPokemon.abilities = tmpPokemon.abilities.map(ability => ({name: ability.name, level: ability.level}))
      return tmpPokemon
    })

    fs.writeFile(path.join(pathToData, pokemon2DataString), JSON.stringify(newPokemon, null, 2), err => {
      if (err) return console.errror(`Couldn't write file ${pokemon2DataString}`)

      console.log('New Pokemon successfully written')
    })
  })
} catch (Error) {
  console.error(`Couldn't load ${pokemonDataString} file`)
}