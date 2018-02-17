import React from 'react'
import PokeItem from './poke-item'

import { Link } from 'react-router-dom'

export default props => (
  <div>
    <h2>List of your pokemons</h2>
    <div className='pokemon-container'>
      {
        props.team.map(pokemon => (
          <div key={pokemon.id} onClickCapture={props.releaseMode ? props.onRelease.bind(null, pokemon.id) : undefined} className={'pokemon-list-entry ' + pokemon.type[0]}>
            <Link to={`/pokemon/${pokemon.id}`}>
              <PokeItem pokemon={pokemon} />
            </Link>
          </div>
        ))
      }
    </div>
  </div>
)
