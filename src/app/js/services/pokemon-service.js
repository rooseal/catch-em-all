import pokemonData from '../../../../data/pokemon/pokemon.json'
import multipliers from '../../../../data/pokemon/multipliers.json'

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

function newPokemon (pokemonName, level = 3) {
  let pokemon = pokemonData[pokemonName]

  console.log(`Creating new pokemon: ${pokemonName}`)

  return Object.assign(
    {},
    pokemon,
    {
      id: uuid(),
      name: pokemonName,
      nickName: pokemonName,
      level: level,
      abilities: randomAbilities(pokemon.abilities, { amount: 4, max: level })
    }
  )
}

function randomAbilities (abilities, { amount = 1, max = undefined } = {}) {
  let chosen = []

  abilities = max !== undefined ? abilities.filter(ability => ability.level <= max) : abilities

  for (let i = 0; i < Math.max(amount, abilities.length); i++) {
    chosen.push(abilities.splice(Math.floor(Math.random() * abilities.length), 1).pop())
  }

  return chosen
}

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
    ].map(pokemon => newPokemon(pokemon))

    saveTeam(initialTeam)
    resolve(initialTeam)
  })
}

// Clean up the get random and delete the fully random
export function getFullyRandom () {
  return new Promise((resolve, reject) => {
    resolve(newPokemon(Object.keys(pokemonData)[Math.floor(Math.random() * Object.keys(pokemonData).length)], Math.ceil(Math.random() * 10)))
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

    resolve(newPokemon(pokemon))
  })
}

export function getNumber (name) {
  return pokemonData[name].number
}

export function getAttackMultiplier (attackType, defendingPokemon) {
  let multiplier = 1
  let types = typeof defendingPokemon === 'string' ? pokemonData[defendingPokemon].type : defendingPokemon.type

  if (types === undefined) throw new Error('Defending pokemon could not be found in the pokedex')

  types.forEach(type => {
    let tmpMultiplier = multipliers[attackType].attack[type]
    if (tmpMultiplier) {
      multiplier *= tmpMultiplier
    }
  })

  console.log('Multiplier:', multiplier)

  return multiplier
}

export function attack (attacker, defender) {
  console.log(`${attacker.name} attacks ${defender.name}`)
  let attack = chooseAttack(attacker)
  let attackDamage = calculateDamage(attacker, attack, defender)

  console.log('Attack Damage', attackDamage)

  return {
    damage: attackDamage,
    ability: attack.name
  }
}

export function calculateExpGain (defeated) {
  return defeated.baseExp * defeated.level / 7
}

export function chooseAttack (pokemon) {
  console.log('Choose Attack', pokemon)
  let { abilities } = pokemon

  // Just choose a random ability for now
  return abilities[Math.floor(Math.random() * abilities.length)]
}

export function calculateDamage (attacker, attack, defender) {
  let critical = Math.random() > 0.9

  return Math.floor((((2 * attacker.level * (critical ? 2 : 1) / 5 + 2) * 100 * (attacker.stats.attack / defender.stats.defense) / 50) + 2) * getAttackMultiplier(attack.type.toLowerCase(), defender))
}

export function saveTeam (team) {
  if (window.localStorage === undefined) return console.log(`Warning - Can't save your data, please upgrade to a browser with local storage`)

  window.localStorage.setItem(lsKeys.pokemonTeam, JSON.stringify(team))
}

export function getStartHealth (pokemon) {
  try {
    return pokemon.stats.hp + (pokemon.level * 10)
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
