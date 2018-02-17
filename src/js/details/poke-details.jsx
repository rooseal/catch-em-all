import React from 'react'

import PokeSummary from './poke-summary'
import PokeAbilities from './poke-abilities'
import PokeStats from './poke-stats'

export default props => {
  const { team, match } = props
  const pokemon = team.find(member => member.id === match.params.id)

  if (pokemon === undefined) return <div>Pokemon not found</div>

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
