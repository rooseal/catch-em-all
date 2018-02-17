import React from 'react'

import PokeSummary from './poke-summary'
import PokeAbilities from './poke-abilities'
import PokeStats from './poke-stats'

export default props => {
  const { pokemon } = props

  return (
    <div className="container pokemon-details">
      <div className="container flex-parent">
        <div className="pokemon-image">
          <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.number}.png`} />
        </div>
        <PokeSummary pokemon={pokemon} />
      </div>
      <div className="container flex-grid">
        <PokeAbilities abilities={pokemon.abilities} />
        <PokeStats stats={pokemon.stats} />
      </div>
    </div>
  )
}
