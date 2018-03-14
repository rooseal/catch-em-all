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
    this.init(base)
  }

  /**
   * Initialize the pokemon
   * @param {Promise | Object} base - The base data
   */
  async init (base) {
    if (base.then !== undefined) {
      base = await base
    }

    super.init(base)

    this.id = base.id || uuid()
    this.nickName = base.nickName || base.name
    this.currentAbilities = base.currentAbilities || this.randomAbilities({ max: this.level })
    this.experience = base.experience || this.baseExperience
    this.stats = {}
    this.stats.base = base.stats.base || base.stats
    this.stats.ivs = base.stats.ivs || this.createIVs(this)
    this.stats.evs = base.stats.evs || {
      hp: 0,
      attack: 0,
      defense: 0,
      spAttack: 0,
      spDefense: 0,
      speed: 0
    }

    console.log('Enumerable', JSON.stringify(Pokemon.getUniqueData(this)))
  }

  attack (opponent) {
    let ability = this.abilities[Math.floor(Math.random() * this.abilities.length)]

    let critical = Math.random() > 0.9 ? 2 : 1
    let a = Math.floor(2 * this.level * critical / 5 + 2)
    let b = Math.floor(a * this.baseStats.attack * ability.power / opponent.stats.defense)
    let c = Math.floor(b / 50) + 2

    let damage = c * Pokemon.getMultiplier(ability.type.toLowerCase(), opponent)

    return damage
  }

  grow () {
    // Add experience

    // Check for level up

    // Check if able to evolve
  }
}

export default Pokemon
