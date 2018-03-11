import React from 'react'

import PokeItem from '../team/poke-item-3'
import PokeAbilities from './poke-abilities-2'
import PokeStats from './poke-stats'

export default props => {
  const { pokemon } = props

  if (pokemon === undefined) return <div>Pokemon not found</div>

  return (
    <div className="pokemon-details-new">
      <div style={{width: '100%', margin: '0', textAlign: 'center'}}>
        <PokeItem pokemon={pokemon} />
      </div>
      <PokeAbilities abilities={pokemon.abilities} />
      <PokeStats stats={pokemon.stats} />
    </div>
  )
}
