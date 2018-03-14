import React from 'react'
import { Link } from 'react-router-dom'

import PokeItem from './poke-item-big'
import Context from '../ui/context/context'

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
        {
          mode === listModes.release &&
            <p className="important">Click pokemon to release into the wild</p>
        }
        <div className='flex-grid pokemon-container'>
          {
            team.map(pokemon => (
              <div
                key={pokemon.id}
                onClickCapture={mode === listModes.release ? onRelease.bind(this, pokemon.id) : undefined}
                className={`${mode === listModes.release ? 'release-mode' : ''}`}
              >
                <Link to={`/pokemon/${pokemon.id}`}>
                  <PokeItem pokemon={pokemon} />
                </Link>
              </div>
            ))
          }
        </div>

        <div>
          <Context>
            <button className="side-button" onClick={onRandom}>get random pokemon</button>
            <button className="side-button" onClick={this.handleToggleRelease}>release a pokemon</button>
          </Context>
        </div>
      </div>
    )
  }
}

export default PokeList
