import React from 'react'

import TeamProvider from '../../services/team-provider'
import PokeTag from '../team/poke-item-2'
import Modal from '../modal/modal'

import { Link } from 'react-router-dom'

class BattleRoom extends React.Component {
  state = {
    opponent: this.props.opponent,
    pokemon: this.props.pokemon
  }

  openSelectModal = () => this.setState({
    selectModal: true
  })

  selectPokemon = pokemon => this.setState({
    pokemon,
    selectModal: false
  })

  render () {
    const { opponent, onBack } = this.props

    return (
      <TeamProvider.Consumer>
        {context => {
          return (
            <div>
              <h2>Battle Room</h2>
              <div className="flex-parent" style={{justifyContent: 'space-around'}}>
                <PokeTag pokemon={this.state.opponent} empty={this.state.opponent === undefined} />
                <span className="decorative1">vs</span>
                <PokeTag pokemon={this.state.pokemon} right empty={this.state.pokemon === undefined} onClick={this.openSelectModal}/>
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
              <div style={{marginTop: '50px', textAlign: 'center'}}>
                <button onClick={onBack}>Back to Lobby</button>
                <button>Start battle</button>
              </div>
            </div>
          )
        }}
      </TeamProvider.Consumer>
    )
  }
}

export default BattleRoom
