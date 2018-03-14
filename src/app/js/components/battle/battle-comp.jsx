import React from 'react'

import PokeTag from '../team/poke-tag'
import Modal from '../ui/modal/modal'
import BattleRoom from './battle-room'
import BattleField from './battle-field'

import { Route, Link, Redirect } from 'react-router-dom'

import * as pokemonService from '../../services/pokemon-service'

const viewStates = {
  BATTLE: Symbol('battle'),
  ROOM: Symbol('room'),
  LOBBY: Symbol('lobby')
}

class BattleComp extends React.Component {
  state = {
    opponents: [],
    viewState: viewStates.LOBBY
  }

  // Todo: Rewrite to timeouts
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
          opponents: [...state.opponents, pokemon]
        }))
      })
  }

  handleSelect = opponent => {
    this.setState({
      selected: opponent,
      viewState: viewStates.ROOM
    }, () => {
      clearInterval(this.joinInterval)
      this.joinInterval = undefined
    })
  }

  handleUnselect = () => {
    this.setState({
      selected: undefined,
      viewState: viewStates.LOBBY
    }, () => {
      this.joinInterval = setInterval(this.handleJoin, 2000)
    })
  }

  handleStart = (pokemon, opponent) => {
    this.setState({
      opponent,
      pokemon,
      viewState: viewStates.BATTLE
    })
  }

  // Todo: Extract highlight code into a seperate grid component which also handles the sizing
  handleHighlight = pokemon => {
    this.setState({
      highlighted: pokemon
    })
  }

  // Todo: Extract highlight code into a seperate grid component which also handles the sizing
  handleUnhighlight = pokemon => {
    this.setState({
      highlighted: undefined
    })
  }

  // Todo: Extract highlight code into a seperate grid component which also handles the sizing
  render () {
    console.log('Battle comp opponent', this.state.opponents)
    return (
      <React.Fragment>
        {
          this.state.viewState === viewStates.LOBBY
            ? (
              <div>
                <h2>Lobby</h2>
                <div className="flex-parent">
                  { this.state.opponents.map(opponent => <PokeTag onMouseOver={this.handleHighlight} onMouseOut={this.handleUnhighlight} style={{opacity: this.state.highlighted !== undefined ? this.state.highlighted === opponent ? '1' : '0.2' : '1'}} key={opponent.id} pokemon={opponent} onClick={this.handleSelect} />) }
                </div>
              </div>
            )
            : this.state.viewState === viewStates.ROOM
              ? <BattleRoom opponent={this.state.selected} onBack={this.handleUnselect} onStart={this.handleStart} />
              : this.state.viewState === viewStates.BATTLE
                ? <BattleField opponent={this.state.selected} player={this.state.pokemon} />
                : <Redirect to='/battle' />
        }
      </React.Fragment>
    )
  }
}

export default BattleComp
