import pokemonData from '../../../../data/pokemon/pokemon.json'
import multipliers from '../../../../data/pokemon/multipliers.json'

import Pokemon from '../pokemon/pokemon'

import { stall } from './service-helper'
import uuid from 'uuid/v1'

const lsKeys = {
  pokemonTeam: 'cea-pokemon-team'
}

const starterPokemon = [
  'charmander',
  'pikachu',
  'pidgey',
  'mankey'
]

/**
 *Image sources
 *-------------------
 *https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.number}.png
 *https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.number}.png
 *-------------------
 */

export function getPokemonTeam () {
  return new Promise((resolve, reject) => {
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
    ].map(pokemon => Pokemon(pokemon))

    saveTeam(initialTeam)
    resolve(initialTeam)
  })
}

// Clean up the get random and delete the fully random
export function getFullyRandom () {
  return new Promise((resolve, reject) => {
    resolve(Pokemon(Object.keys(pokemonData)[Math.floor(Math.random() * Object.keys(pokemonData).length)], Math.ceil(Math.random() * 10)))
  })
}

export function getRandom () {
  return new Promise((resolve, reject) => {
    let pokemon

    do {
      let r = Math.floor(Math.random() * Object.keys(pokemonData).length)
      pokemon = Object.keys(pokemonData)[r]
      console.log(`Trying for pokemon: ${pokemon}`)
    } while (pokemonData[pokemon].evolutions[0].name !== pokemon)

    resolve(Pokemon(pokemon))
  })
}

export function getNumber (name) {
  return pokemonData[name].number
}

export function saveTeam (team) {
  if (window.localStorage === undefined) return console.log(`Warning - Can't save your data, please upgrade to a browser with local storage`)

  window.localStorage.setItem(lsKeys.pokemonTeam, JSON.stringify(team))
}

export function getStartHealth (pokemon) {
  try {
    return pokemon.stats.hp + pokemon.level * 3
  } catch (error) {
    throw TypeError('getStartHealth needs a pokemon with a stats property which is an object that contains a hp property which is a number and pokemon also needs a level property which is a number')
  }
}

export async function getPokemonList (start, end) {
  console.log('Get list', start, end)

  await stall(500)

  return Object.keys(pokemonData).reduce((list, name, index, arr) => {
    const pokemon = pokemonData[name]
    if (Number(pokemon.number) >= start && Number(pokemon.number) < Math.min(end, arr.length)) {
      list.push({...pokemon, name: name.replace(/^nidoran.*/, 'nidoran')})
    }
    return list
  }, [])
}

export function getBasePokemon (name) {
  return pokemonData[name]
}
