import pokemonData from '../../../../data/pokemon/pokemon.json'
import multipliers from '../../../../data/pokemon/multipliers.json'

import Pokemon from '../pokemon/Pokemon-class'

import { stall } from './service-helper'
import uuid from 'uuid/v1'

import { getBaseData } from './api-service'

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
    ].map(pokemon => new Pokemon(getBaseData(pokemon)))

    saveTeam(initialTeam)
    resolve(initialTeam)
  })
}

// Clean up the get random and delete the fully random
export async function getFullyRandom () {
  let baseData = await getBaseData(Object.keys(pokemonData)[Math.floor(Math.random() * Object.keys(pokemonData).length)])
  return new Pokemon(baseData, {
    level: Math.ceil(Math.random() * 10)
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

    resolve(new Pokemon(getBaseData(pokemon)))
  })
}

export function getNumber (name) {
  return pokemonData[name].number
}

export function saveTeam (team) {
  if (window.localStorage === undefined) return console.log(`Warning - Can't save your data, please upgrade to a browser with local storage`)

  window.localStorage.setItem(lsKeys.pokemonTeam, JSON.stringify(team))
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
