import pokemonData from '../../../data/pokemon/pokemon-new.json'
import uuid from 'uuid/v1'

const lsKeys = {
  pokemonTeam: 'cea-pokemon-team'
}

/**
 *Image sources
 *-------------------
 *https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.number}.png
 *https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.number}.png
 *-------------------
 */

function newPokemon (pokemonName) {
  return Object.assign(
    {},
    pokemonData[pokemonName],
    {
      name: pokemonName,
      level: 3,
      id: uuid(),
      abilities: randomAbilities(pokemonData[pokemonName].abilities, 4)
    }
  )
}

function randomAbilities (abilities, amount = 1) {
  let chosen = []
  abilities = Array.from(abilities)

  for (let i = 0; i < amount; i++) {
    chosen.push(abilities.splice(Math.floor(Math.random() * abilities.length), 1).pop())
  }

  return chosen
}

export function getPokemonData () {
  return pokemonData
}

export function getPokemonTeam () {
  return new Promise((resolve, reject) => {
    const pokemons = getPokemonData()
    let initialTeam

    if (window.localStorage) {
      let serializedTeam = window.localStorage.getItem(lsKeys.pokemonTeam)

      if (serializedTeam !== null) {
        return resolve(JSON.parse(serializedTeam))
      }
    }

    initialTeam = [
      'charmander',
      'pikachu',
      'pidgey',
      'mankey'
    ].map(pokemon => newPokemon(pokemon))

    saveTeam(initialTeam)
    resolve(initialTeam)
  })
}

export function getRandom () {
  return new Promise((resolve, reject) => {
    const pokemons = getPokemonData()

    let r = Math.floor(Math.random() * Object.keys(pokemons).length)
    let pokemon = Object.keys(pokemons)[r]

    resolve(newPokemon(pokemon))
  })
}

export function getNumber (name) {
  return pokemonData[name].number
}

export function saveTeam (team) {
  if (window.localStorage === undefined) return console.log(`Warning - Can't save your data, please upgrade to a browser with local storage`)

  window.localStorage.setItem(lsKeys.pokemonTeam, JSON.stringify(team))
}
