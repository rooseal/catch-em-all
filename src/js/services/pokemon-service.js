import pokemonData from '../../../data/pokemon/pokemon-new.json'
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

export function getNumber (name) {
  return pokemonData[name].number
}
