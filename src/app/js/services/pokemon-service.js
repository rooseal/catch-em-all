import pokemonData from '../../../../data/pokemon/pokemon.json'
import multipliers from '../../../../data/pokemon/multipliers.json'

import Pokemon from '../pokemon/Pokemon'

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

export async function getPokemonTeam () {
  // Check for saved team
  if (window.localStorage) {
    let serializedTeam = window.localStorage.getItem(lsKeys.pokemonTeam)

    if (serializedTeam !== null) {
      let team = await Promise.all(
        JSON.parse(serializedTeam).map(async savedPokemon => {
          let baseData = await getBaseData(savedPokemon.name)
          return new Pokemon(baseData, savedPokemon)
        })
      )

      return team
    }
  }

  // Create new team if none is saved
  let initialTeam = [
    'charmander',
    'pikachu',
    'pidgey',
    'mankey'
  ].map(pokemon => new Pokemon(getBaseData(pokemon)))

  saveTeam(initialTeam)

  return initialTeam
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
    } while (pokemonData[pokemon].evolutions[0].name !== pokemon)

    resolve(new Pokemon(getBaseData(pokemon)))
  })
}

export function getNumber (name) {
  return pokemonData[name].number
}

export function saveTeam (team) {
  if (window.localStorage === undefined) return console.log(`Warning - Can't save your data, please upgrade to a browser with local storage`)

  window.localStorage.setItem(lsKeys.pokemonTeam, JSON.stringify(team.map(pokemon => Pokemon.getUniqueData(pokemon))))
}

export async function getPokemonList (start, end) {
  await stall(500)

  return Object.keys(pokemonData).reduce((list, name, index, arr) => {
    const pokemon = pokemonData[name]
    if (Number(pokemon.number) >= start && Number(pokemon.number) < Math.min(end, arr.length)) {
      list.push({...pokemon, name: name.replace(/^nidoran.*/, 'nidoran')})
    }
    return list
  }, [])
}
