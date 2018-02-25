import React from 'react'
import { Link } from 'react-router-dom'

import PokeItem from './poke-item'

import pokemonService from '../../services/pokemon-service'

const listModes = {
  release: 1,
  select: 2,
  store: 3
}

class PokeList extends React.Component {
  state = {
    mode: listModes.select
  }

  handleToggleRelease = () => {
    this.setState(state => ({
      mode: state.mode === listModes.release ? listModes.select : listModes.release
    }), () => console.log(`${this.state.mode === listModes.release ? 'Activate' : 'Deactivate'} release mode`))
  }

  render () {
    const { team, onRandom, onRelease } = this.props
    const { mode } = this.state

    return (
      <div>
        <h2>List of your pokemons</h2>
        <div className='pokemon-container'>
          {
            team.map(pokemon => (
              <div key={pokemon.id} onClickCapture={mode === listModes.release ? onRelease.bind(this, pokemon.id) : undefined} className={'pokemon-list-entry ' + pokemon.type[0]}>
                <Link to={`/pokemon/${pokemon.id}`}>
                  <PokeItem pokemon={pokemon} />
                </Link>
              </div>
            ))
          }
        </div>
        <div>
          <button onClick={onRandom}>get random pokemon</button>
          <button onClick={onRelease}>release a pokemon</button>
        </div>
      </div>
    )
  }
}

export default PokeList
