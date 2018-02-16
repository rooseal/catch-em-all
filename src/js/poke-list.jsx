import React from 'react'
import PokeItem from './poke-item'

export default props => (
  <div>
    <h2>List of your pokemons</h2>
    <div className='pokemon-container'>
      { props.team.map(pokemon => <PokeItem key={pokemon.id} {...pokemon} onAction={props.releaseMode ? props.onRelease : props.onDetails} />) }
    </div>
  </div>
)
