import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router, Link } from 'react-router-dom'

import * as pokemonService from '../services/pokemon-service'

import Controls from './controls'
import PokeList from './team/poke-list'
import PokeDetails from './details/poke-details'
import Modal from './modal/modal'
import Pokedex from './pokedex/pokedex'

import '../../scss/main.scss'

export class CatchEmAll extends React.Component {
  state = {
    team: [],
    newPokemons: undefined
  }

  componentDidMount () {
    pokemonService.getPokemonTeam()
      .then(team => this.setState({
        team
      }))
  }

  render () {
    const { team, newPokemons } = this.state

    return (
      <Router>
        <div className={`app-container`}>
          <h1>Collect all pokemons</h1>

          <Controls />

          <Route exact path="/" render={props => <PokeList {...props} team={team} onRelease={this.handleRelease} onRandom={this.handleRandom} />} />
          <Route path="/pokemon/:id" render={props => <PokeDetails {...props} team={team} />} />
          <Route path="/pokedex" component={Pokedex} />

          { newPokemons !== undefined &&

            <Modal onClose={this.handleCloseNewPokeModal} className="modal-content">
              <h2>New Pokemons</h2>
              <div className="flex-parent new-poke-list">
                { newPokemons.map(pokemon => (
                  <div className={`new-pokemon ${pokemon.type[0]}`}>
                    <h2>{pokemon.name}</h2>
                    <img className="new-pokemon-image" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.number}.png`} />
                  </div>
                ))}
              </div>
            </Modal>
          }
        </div>
      </Router>
    )
  }

  /**
   * Add a random pokemon to the team
   */
  handleRandom = () => {
    const pokemon = pokemonService.getRandom()
      .then(pokemon => {
        this.setState(state => {
          const { team } = state
          let newPokemons = []
          team.push(pokemon)
          newPokemons.push(pokemon)
          return {
            team,
            newPokemons
          }
        }, () => pokemonService.saveTeam(this.state.team))
      })
  }

  handleRelease = (pokemonID, e) => {
    this.setState(state => {
      return {
        team: state.team.filter(pokemon => pokemon.id !== pokemonID)
      }
    }, () => pokemonService.saveTeam(this.state.team))

    e.preventDefault()
  }

  /**
   * Action for when the new pokemon modal get's closed
   */
  handleCloseNewPokeModal = () => {
    this.setState({
      newPokemons: undefined
    })
  }
}

ReactDOM.render(
  <CatchEmAll />,
  document.getElementById('reactApp')
)

// Enable hot module reloading for react
if (module.hot) {
  module.hot.accept()
}

// Ideas for further material: react-router, redux, advanced patterns
// Ideas for more fun: battle and trade each other