import React from 'react'
import ReactDOM from 'react-dom'

import * as pokemonService from './pokemon-service'

import '../scss/main.scss'

export class CatchEmAll extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      team: []
    }

    this.pokeData = pokemonService.getPokemonData()

    this.handleRandom = this.handleRandom.bind(this)
  }

  componentDidMount () {
    this.setState({
      team: pokemonService.getPokemonTeam()
    })
  }

  handleRandom () {
    let pokemon
    let r = Math.floor(Math.random() * 151)
    let { team } = this.state

    Object.keys(this.pokeData).forEach((poke, i) => {
      if (i === r) {
        pokemon = Object.assign({}, this.pokeData[poke], {name: poke, level: 3})
      }
    })

    team.push(pokemon)

    this.setState({
      team
    })
  }

  renderPokemon (pokemon) {
    let basePokemon = this.pokeData[pokemon.name]

    console.log(basePokemon)

    return (
      <p key={pokemon.name + pokemon.id} className={'pokemon-list-entry ' + basePokemon.type[0]}>
        <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${basePokemon.number}.png`} />
        {pokemon.name}
        <span>{pokemon.level}</span>
      </p>
    )
  }

  render () {
    return (
      <div className='app-container'>
        <h1>Collect all pokemons</h1>
        <h2>List of your pokemons</h2>
        <div className='pokemon-container'>
          {
            this.state.team.map(pokemon => this.renderPokemon(pokemon))
          }
        </div>
        <button onClick={this.handleRandom}>get random pokemon</button>
        <button>release a pokemon</button>
        <button>go to battle map</button>
      </div>
    )
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
