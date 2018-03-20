const fs = require('fs')
const path = require('path')

// Path
const pathToData = './data/pokemon/'

// Filenames
const pokemonDataString = 'pokemon.json'
const abilitiesDataString = 'abilities.json'

// Ability list
let abilities = [

]

try {
  fs.readFile(path.join(pathToData, pokemonDataString), 'utf-8', (err, data) => {
    if (err) return console.log(`Couldn't load ${pokemonDataString} file`)
    
    const pokemon = JSON.parse(data)
    const included = {}

    abilities = Object.keys(pokemon).reduce((acc, name) => {
      
      const pokemonAbilities = pokemon[name].abilities.filter(ability => {
        if(included[ability.name] === undefined) {
          included[ability.name] = true
          delete ability.level
          return true
        }
        return false
      })
      

      acc = acc.concat(pokemonAbilities)

      
      return acc
    }, [])

    fs.writeFile(path.join(pathToData, abilitiesDataString), JSON.stringify(abilities, null, 2), err => {
      if (err) return console.errror(`Couldn't write file ${abilitiesDataString}`)

      console.log('Abilities successfully written')
    })
  })
} catch (Error) {
  console.error(`Couldn't load ${pokemonDataString} file`)
}