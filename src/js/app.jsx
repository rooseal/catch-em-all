import React from 'react'
import ReactDOM from 'react-dom'

import * as pokemonService from './services/pokemon-service'
import Controls from './controls'
import PokeList from './poke-list'
import PokeDetails from './poke-details'

import '../scss/main.scss'

export class CatchEmAll extends React.Component {
  state = {
    team: [],
    releaseMode: false,
    view: 'team',
    selectedPokemon: undefined
  }

  componentDidMount () {
    pokemonService.getPokemonTeam()
      .then(team => this.setState({
        team
      }, () => console.log(this.state.team)))
  }

  render () {
    const { view, team, releaseMode, selectedPokemon } = this.state

    return (
      <div className={`app-container ${releaseMode ? 'release-mode' : ''}`}>
        <h1>Collect all pokemons</h1>
        {
          view === 'details' && selectedPokemon !== undefined
            ? <PokeDetails pokemon={selectedPokemon} />
            : <PokeList team={team} onRelease={this.handleRelease} onDetails={this.handleViewPokemon} releaseMode={releaseMode} />
        }
        <Controls
          onRandom={this.handleRandom}
          onRelease={this.handleActivateRelease}
        />
      </div>
    )
  }

  handleViewPokemon = pokemonID => {
    this.setState(state => ({
      selectedPokemon: state.team.find(pokemon => pokemon.id === pokemonID),
      view: 'details'
    }))
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

  handleRelease = (pokemonID) => {
    this.setState(state => {
      return {
        team: state.team.filter(pokemon => pokemon.id !== pokemonID)
      }
    })
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
