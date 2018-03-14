import uuid from 'uuid/v1'
import axios from 'axios'

import { PokemonSmarts } from './pokemon-smarts'

export const growthRates = {
  SLOW: 'Slow',
  MEDIUM_SLOW: 'Medium Slow',
  MEDIUM_FAST: 'Medium Fast',
  FAST: 'Fast',
  ERRATIC: 'Erratic',
  FLUCTUATING: 'Fluctuating'
}

const Pokemon = async function (name, {
  level = 3
}) {
  // Fetch base pokemon and extend the PokemonSmarts
  let base = await axios.get(`http://localhost:3000/pokemon/${name}`).then(res => res.data)

  console.log('Base', base)

  // Give the pokemon some smarts
  let full = PokemonSmarts(base)

  // Create Unique pokemon
  full = Object.assign(full, {
    id: uuid(),
    level: level,
    name: name,
    nickName: name,
    abilities: full.randomAbilities({ max: level }),
    experience: full.getBaseExperience(base.training.growthRate, level),
    stats: {
      base: base.stats,
      ivs: full.createIVs(),
      evs: {
        hp: 0,
        attack: 0,
        defense: 0,
        spAttack: 0,
        spDefense: 0,
        speed: 0
      }
    }
  })

  // Internal
  function attack (opponent) {
    return full.calculateDamage(full.chooseAttack(), opponent)
  }

  function grow () {
    // Add experience

    // Check for level up

    // Check if able to evolve
  }

  console.log('full', full)

  // Public methods
  return {
    ...base,
    id: full.id,
    level: full.level,
    name: full.name,
    nickName: full.nickName,
    abilities: full.abilities,
    stats: full.stats,
    experience: full.experience,
    preparation: full.preparation,
    maxHealth: full.calculateMaxHealth,
    attack,
    grow
  }
}

export default Pokemon
