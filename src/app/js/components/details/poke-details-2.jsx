import React from 'react'

import PokeItem from '../team/poke-item-big'
import PokeAbilities from './poke-abilities-2'
import PokeStats from './poke-stats'

const PokeDetails = props => {
  const { pokemon } = props

  if (pokemon === undefined) return <div>Pokemon not found</div>

  return (
    <div className="pokemon-details-new">
      <div style={{width: '100%', margin: '0', textAlign: 'center'}}>
        <PokeItem pokemon={pokemon} />
      </div>
      <PokeAbilities abilities={pokemon.currentAbilities} />
      <PokeStats stats={pokemon.stats} />
    </div>
  )
}

export default PokeDetails
