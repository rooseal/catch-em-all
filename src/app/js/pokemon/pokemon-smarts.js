import multipliers from '../../../../data/pokemon/multipliers'

export const PokemonSmarts = function (pokemon) {
  // Internal
  function getMultiplier (attackType, defender) {
    return defender.type.reduce((multi, type) => multi * (multipliers[attackType].attack[type] || 1), 1)
  }
  function chooseAttack () {
    return pokemon.abilities[Math.floor(Math.random() * pokemon.abilities.length)]
  }
  function calculateExpGain (defeated) {
    return defeated.baseExp * defeated.level / 7
  }
  function calculateDamage (attack, defender) {
    let critical = Math.random() > 0.9 ? 2 : 1
    let a = Math.floor(2 * pokemon.level * critical / 5 + 2)
    let b = Math.floor(a * pokemon.stats.attack * attack.power / defender.stats.defense)
    let c = Math.floor(b / 50) + 2

    return c * getMultiplier(attack.type.toLowerCase(), defender)
  }
  function getBaseExperience () {
    return pokemon.experience !== undefined ? pokemon.experience : 500
  }
  function randomAbilities ({ amount = 1, max = undefined } = {}) {
    let chosen = []

    let filteredAbilities = max !== undefined ? pokemon.abilities.filter(ability => ability.level <= max) : pokemon.abilities
    let amountAbil = filteredAbilities.length

    for (let i = 0; i < Math.min(amount, amountAbil); i++) {
      chosen.push(filteredAbilities.splice(Math.floor(Math.random() * filteredAbilities.length), 1).pop())
    }

    return chosen
  }
  function calculateMaxHealth () {
    console.log('Calc max hp', pokemon)
    let { base, ivs, evs } = pokemon.stats
    return Math.floor((2 * base.hp + ivs.hp + evs.hp) * pokemon.level / 100 + pokemon.level + 10)
  }
  function preparation () {
    pokemon.currentHealth = calculateMaxHealth()

    return pokemon
  }
  function createIVs () {
    return Object.keys(pokemon.stats).reduce((ivs, statName) => {
      ivs[statName] = Math.floor(Math.random() * 31)
      return ivs
    }, {})
  }
  function createCharacteristic () {
    // To be written
  }

  // Public methods
  return {
    chooseAttack,
    calculateDamage,
    calculateExpGain,
    getBaseExperience,
    randomAbilities,
    calculateMaxHealth,
    createIVs,
    preparation,
    ...pokemon
  }
}

export default PokemonSmarts
