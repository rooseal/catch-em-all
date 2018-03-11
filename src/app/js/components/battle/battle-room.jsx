import React from 'react'

import TeamProvider from '../../services/team-provider'
import PokeItem from '../team/poke-item-3'
import PokeTag from '../team/poke-item-4'
import Modal from '../ui/modal/modal'
import Context from '../ui/context/context'

import { Link } from 'react-router-dom'

const errors = {
  noPokemon: 'You still have to chose your own pokemon to battle'
}

class BattleRoom extends React.Component {
  state = {
    opponent: this.props.opponent,
    pokemon: this.props.pokemon
  }

  openSelectModal = () => this.setState({
    selectModal: true
  })

  selectPokemon = pokemon => this.setState(state => ({
    pokemon,
    error: state.error && state.error === errors.noPokemon ? undefined : state.error,
    selectModal: false
  }))

  handleStart = () => {
    let { onStart } = this.props

    if (this.state.pokemon === undefined || this.state.opponent === undefined) {
      this.setState({
        error: errors.noPokemon
      })
      return
    }

    onStart(this.state.pokemon, this.state.opponent)
  }

  render () {
    const { opponent, onBack } = this.props

    return (
      <TeamProvider.Consumer>
        {context => {
          return (
            <div>
              <h2>Battle Room</h2>
              { this.state.error && <p className="error">{ this.state.error }</p> }
              <div className="flex-parent" style={{justifyContent: 'space-around'}}>
                <PokeItem pokemon={this.state.opponent} empty={this.state.opponent === undefined} />
                <div className="battle-menu">
                  <div className="decorative1" style={{margin: '50px 0'}}>vs</div>
                  <button className="animated" onClick={this.handleStart}>Start battle</button>
                  <button className="animated" onClick={onBack}>To Lobby</button>
                </div>
                <PokeItem pokemon={this.state.pokemon} right empty={this.state.pokemon === undefined} onClick={this.openSelectModal}/>
              </div>
              {
                this.state.selectModal && (
                  <div>
                    {
                      <Modal onClose={() => this.setState({selectModal: false})}>
                        <div style={{backgroundColor: 'white', width: '900px'}}>
                          <h2>Select a pokemon to fight</h2>
                          <div className="flex-grid">
                            { context.team.map(pokemon => <PokeTag key={pokemon.id} pokemon={pokemon} onClick={this.selectPokemon} />) }
                          </div>
                        </div>
                      </Modal>
                    }
                  </div>
                )
              }
              <Context>
                <button onClick={onBack}>Back to Lobby</button>
                <button onClick={this.handleStart}>Start battle</button>
              </Context>
            </div>
          )
        }}
      </TeamProvider.Consumer>
    )
  }
}

export default BattleRoom
