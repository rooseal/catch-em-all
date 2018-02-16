import pokemonData from '../../../data/pokemon/pokemon.json'
import uuid from 'uuid/v1'

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
      id: uuid()
    }
  )
}

export function getPokemonData () {
  return pokemonData
}

export function getPokemonTeam () {
  return new Promise((resolve, reject) => {
    const pokemons = getPokemonData()

    let initialTeam = [
      'charmander',
      'pikachu',
      'pidgey',
      'mankey'
    ]

    resolve(initialTeam.map(pokemon => newPokemon(pokemon)))
  })
}

export function getRandom () {
  return new Promise((resolve, reject) => {
    const pokemons = getPokemonData()

    let r = Math.floor(Math.random() * 151)
    let pokemon = Object.keys(pokemons)[r]

    resolve(newPokemon(pokemon))
  })
}
