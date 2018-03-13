import uuid from 'uuid/v1'
import axios from 'axios'

import { PokemonSmarts } from './pokemon-smarts'
// import { getBasePokemon } from './pokemon-service'

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
  let base = await axios.get(`http://localhost:3000/pokemon/${name}`)

  console.log(base)

  // Give the pokemon some smarts
  let full = PokemonSmarts(base)
  // Create Unique pokemon
  let final = Object.assign({}, full, {
    id: uuid(),
    level: level,
    name: name,
    nickName: name,
    abilities: full.randomAbilities({ max: level }),
    experience: full.getBaseExperience(base.training.growthRate, level)
  })

  // Internal
  function attack (opponent) {
    return final.calculateDamage(final.chooseAttack(), opponent)
  }

  function grow () {
    // Add experience

    // Check for level up

    // Check if able to evolve
  }

  // Public methods
  return {
    id: final.id,
    level: final.level,
    name: final.name,
    nickName: final.nickName,
    abilities: final.abilities,
    experience: final.experience,
    attack,
    grow
  }
}

export default Pokemon
