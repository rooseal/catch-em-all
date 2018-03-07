import React from 'react'

import PokeItem from '../team/poke-item-4'
import Modal from '../modal/modal'
import BattleRoom from './battle-room'

import { Route, Link } from 'react-router-dom'

import * as pokemonService from '../../services/pokemon-service'

class BattleComp extends React.Component {
  state = {
    opponents: []
  }

  componentDidMount () {
    this.joinInterval = setInterval(this.handleJoin, 2000)
  }

  componentWillUnmount () {
    clearInterval(this.joinInterval)
    this.joinInterval = undefined
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
    }, () => {
      clearInterval(this.joinInterval)
      this.joinInterval = undefined
    })
  }

  handleUnselect = () => {
    this.setState({
      selected: undefined
    }, () => {
      this.joinInterval = setInterval(this.handleJoin, 2000)
    })
  }

  handleHighlight = pokemon => {
    this.setState({
      highlighted: pokemon
    })
  }

  handleUnhighlight = pokemon => {
    this.setState({
      highlighted: undefined
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
                <div className="flex-parent">
                  { this.state.opponents.map(opponent => <PokeItem onMouseOver={this.handleHighlight} onMouseOut={this.handleUnhighlight} style={{opacity: this.state.highlighted !== undefined ? this.state.highlighted === opponent ? '1' : '0.2' : '1'}} key={opponent.id} pokemon={opponent} onClick={this.handleSelectOpponent} />) }
                </div>
              </div>
            )
            : <BattleRoom opponent={this.state.selected} onBack={this.handleUnselect} />
        }
      </React.Fragment>
    )
  }
}

export default BattleComp
