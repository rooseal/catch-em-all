import React from 'react'

import PokeTag from '../details/poke-tag'

import * as pokemonService from '../../services/pokemon-service'

class BattleComp extends React.Component {
  state = {
    opponents: []
  }

  componentDidMount () {
    this.joinInterval = setInterval(this.handleJoin, 2000)
  }

  handleJoin = () => {
    if (this.state.opponents.length >= 11) {
      if (this.joinInterval !== undefined) {
        clearInterval(this.joinInterval)
        this.joinInterval = undefined
      }
    }
    pokemonService.getFullyRandom()
      .then(pokemon => {
        this.setState(state => ({
          state: state.opponents.push(pokemon)
        }))
      })
  }

  handleSelectOpponent = opponent => {
    this.setState({
      selected: opponent
    })
  }

  render () {
    return (
      <React.Fragment>
        {
          this.state.selected === undefined
            ? (
              <div>
                <h2>Lobby</h2>
                <div className="flex-parent battle-poke-list pokedex" style={{flexWrap: 'wrap'}}>
                  { this.state.opponents.map(opponent => <PokeTag key={opponent.id} opponent={opponent} onClick={this.handleSelectOpponent} />) }
                </div>
              </div>
            )
            : (
              <div>
                <h2>Battle Room</h2>
                <PokeTag key={this.state.selected.id} opponent={this.state.selected} />
              </div>
            )
        }
      </React.Fragment>
    )
  }
}

export default BattleComp
