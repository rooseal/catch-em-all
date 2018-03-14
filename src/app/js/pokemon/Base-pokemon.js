import multipliers from '../../../../data/pokemon/multipliers'

function convertEvFromData (evs = []) {
  return evs.reduce((map, evString) => {
    const normalEvString = evString.replace('Special ', 'sp')
    const parts = normalEvString.split(' ')
    map[parts[1]] = parts[0]
    return map
  }, {})
}

class BasePokemon {
  static abilities = {}

  init (pokemonData) {
    this.name = pokemonData.name
    this.types = pokemonData.type
    this.baseStats = pokemonData.stats
    this.height = pokemonData.height
    this.training = {
      ev: convertEvFromData(pokemonData.training.ev),
      catchRate: pokemonData.training.catchRate,
      baseExp: pokemonData.training.baseExp,
      growthRate: pokemonData.training.growthRate
    }
    this.abilityList = pokemonData.abilities
  }

  get abilityList () {
    console.log('Inside abilityList', BasePokemon.abilities, this.name)
    return BasePokemon.abilities[this.name]
  }

  set abilityList (abilities) {
    if (BasePokemon.abilities[this.name] === undefined) {
      BasePokemon.abilities[this.name] = abilities
    }
  }

  get baseExperience () {
    // Need exp rate table for proper implementation
    return this.experience !== undefined ? this.experience : 500
  }

  static get growthRates () {
    return Object.freeze({
      SLOW: 'Slow',
      MEDIUM_SLOW: 'Medium Slow',
      MEDIUM_FAST: 'Medium Fast',
      FAST: 'Fast',
      ERRATIC: 'Erratic',
      FLUCTUATING: 'Fluctuating'
    })
  }

  static getMultiplier (attackType, defender) {
    return defender.type.reduce((multi, type) => multi * (multipliers[attackType].attack[type] || 1), 1)
  }

  static calculateExpGain (defeated) {
    return defeated.baseExp * defeated.level / 7
  }

  randomAbilities ({ amount = 1, max = undefined } = {}) {
    let chosen = []

    console.log('abilityList', this.abilityList)

    let filteredAbilities = max !== undefined ? this.abilityList.filter(ability => ability.level <= max) : this.abilities
    let amountAbil = filteredAbilities.length

    for (let i = 0; i < Math.min(amount, amountAbil); i++) {
      chosen.push(filteredAbilities.splice(Math.floor(Math.random() * filteredAbilities.length), 1).pop())
    }

    return chosen
  }

  calculateMaxHealth () {
    let { base, ivs, evs } = this.stats
    return Math.floor((2 * base.hp + ivs.hp + evs.hp) * this.level / 100 + this.level + 10)
  }

  preparation () {
    this.currentHealth = this.calculateMaxHealth()

    return this
  }

  createIVs () {
    return Object.keys(this.baseStats).reduce((ivs, statName) => {
      ivs[statName] = Math.floor(Math.random() * 31)
      return ivs
    }, {})
  }

  createCharacteristic () {
    // To be written
  }
}

export default BasePokemon
