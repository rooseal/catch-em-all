import uuid from 'uuid/v1'
import axios from 'axios'

import BasePokemon from './BasePokemon'

class Pokemon extends BasePokemon {
  constructor (base, {
    level = 3,
    ...presets
  } = {}) {
    super()
    this.level = level
    this.init(base, presets)
  }

  /**
   * Initialize the pokemon
   * @param {Promise | Object} base - The base data
   */
  async init (base, presets) {
    if (base.then !== undefined) {
      base = await base
    }

    super.init(base)

    this.id = presets.id || uuid()
    this.nickName = presets.nickName || base.name
    this.currentAbilities = presets.currentAbilities || this.randomAbilities({ max: this.level })
    this.experience = presets.experience || this.baseExperience
    this.stats = presets.stats = presets.stats || {}
    this.stats.base = presets.stats.base || base.stats
    this.stats.ivs = presets.stats.ivs || this.createIVs(this)
    this.stats.evs = presets.stats.evs || {
      hp: 0,
      attack: 0,
      defense: 0,
      spAttack: 0,
      spDefense: 0,
      speed: 0
    }

    this.preparation()

    console.log('Created pokemon', this)
  }

  attack (opponent) {
    let ability = this.currentAbilities[Math.floor(Math.random() * this.currentAbilities.length)]

    let critical = Math.random() > 0.9 ? 2 : 1
    let a = Math.floor(2 * this.level * critical / 5 + 2)
    let b = Math.floor(a * this.stats.base.attack * ability.power / opponent.stats.base.defense)
    let c = Math.floor(b / 50) + 2

    let damage = c * Pokemon.getMultiplier(ability.type.toLowerCase(), opponent)

    return {
      damage,
      ability: ability.name
    }
  }

  damage (amount) {
    this.currentHealth = Math.max(this.currentHealth - amount, 0)

    return this
  }

  grow () {
    // Add experience

    // Check for level up

    // Check if able to evolve
  }
}

export default Pokemon
