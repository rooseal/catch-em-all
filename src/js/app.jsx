import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router, Link } from 'react-router-dom'

import * as pokemonService from './services/pokemon-service'

import Controls from './controls'
import PokeList from './poke-list'
import PokeDetails from './details/poke-details'

import '../scss/main.scss'

export class CatchEmAll extends React.Component {
  state = {
    team: [],
    releaseMode: false,
    view: 'details',
    selectedPokemon: undefined
  }

  componentDidMount () {
    pokemonService.getPokemonTeam()
      .then(team => this.setState({
        team,
        selectedPokemon: team[0]
      }))
  }

  render () {
    const { view, team, releaseMode, selectedPokemon } = this.state

    return (
      <Router>
        <div className={`app-container ${releaseMode ? 'release-mode' : ''}`}>
          <h1>Collect all pokemons</h1>

          <Route exact path="/" render={props => <PokeList {...props} team={team} onRelease={this.handleRelease} onDetails={this.handleViewPokemon} releaseMode={releaseMode} />} />
          <Route path="/pokemon/:id" render={props => <PokeDetails {...props} team={team} />} />

          <Controls
            onRandom={this.handleRandom}
            onRelease={this.handleActivateRelease}
          />
        </div>
      </Router>
    )
  }

  handleRandom = () => {
    const pokemon = pokemonService.getRandom()
      .then(pokemon => this.setState(state => {
        const { team } = state
        team.push(pokemon)
        return {
          team
        }
      }))
  }

  handleRelease = (pokemonID, e) => {
    this.setState(state => {
      return {
        team: state.team.filter(pokemon => pokemon.id !== pokemonID)
      }
    }, pokemonService.saveTeam(this.state.team))

    e.preventDefault()
  }

  handleActivateRelease = () => {
    this.setState(state => ({
      releaseMode: !state.releaseMode
    }), () => console.log(`${this.state.releaseMode ? 'Activate' : 'Deactivate'} release mode`))
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
