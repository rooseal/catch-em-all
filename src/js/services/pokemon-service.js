import pokemonData from '../../../data/pokemon/pokemon.json'
import multipliers from '../../../data/pokemon/multipliers.json'
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
  let pokemon = pokemonData[pokemonName]
  let maxLevelAbilities

  pokemon.evolutions.forEach((evolution, i, a) => {
    if (evolution.name === pokemonName) {
      if (a.length >= i + 1) {
        maxLevelAbilities = -1
      } else {
        maxLevelAbilities = a[i + 1].level
      }
    }
  })

  return Object.assign(
    {},
    pokemon,
    {
      name: pokemonName,
      level: 3,
      id: uuid(),
      abilities: randomAbilities(pokemon.abilities, 4, maxLevelAbilities)
    }
  )
}

function randomAbilities (abilities, amount, max) {
  let chosen = []
  let random
  let tmp

  if (max !== -1) {
    for (let i = 0; i < amount; i++) {
      do {
        random = Math.floor(Math.random() * abilities.length)
        tmp = abilities.slice(random, 1).pop()
      } while (tmp.level >= max)

      chosen.push(abilities.splice(random, 1).pop())
    }
  } else {
    for (let i = 0; i < amount; i++) {
      chosen.push(abilities.splice(Math.floor(Math.random() * abilities.length), 1).pop())
    }
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
    let pokemon

    do {
      let r = Math.floor(Math.random() * Object.keys(pokemons).length)
      pokemon = Object.keys(pokemons)[r]
      console.log(`Trying for pokemon: ${pokemon}`)
    } while (pokemons[pokemon].evolutions[0].name !== pokemon)

    resolve(newPokemon(pokemon))
  })
}

export function getNumber (name) {
  return pokemonData[name].number
}

export function getAttackMultiplier (attackType, defendingPokemon) {
  let multiplier = 1
  let types = getPokemonData()[defendingPokemon]

  if (types === undefined) throw new Error('Defending pokemon could not be found in the pokedex')

  types.forEach(type => {
    let tmpMultiplier = multipliers[attackType].attack[type]
    if (tmpMultiplier) {
      multiplier *= tmpMultiplier
    }
  })
}

export function saveTeam (team) {
  if (window.localStorage === undefined) return console.log(`Warning - Can't save your data, please upgrade to a browser with local storage`)

  window.localStorage.setItem(lsKeys.pokemonTeam, JSON.stringify(team))
}
