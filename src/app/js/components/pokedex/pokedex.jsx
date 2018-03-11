import React from 'react'

import * as pokemonService from '../../services/pokemon-service'

class Pokedex extends React.Component {
  state = {
    start: 0,
    amount: 51,
    recentlyLoaded: false
  }

  handleLoadData = e => {
    let scrollTop = window.scrollY + window.innerHeight
    let height = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)

    if (height - scrollTop <= 400) {
      if (!this.state.recentlyLoaded) {
        this.setState(state => ({
          amount: Math.min(state.amount + 51, (Object.keys(pokemonService.getPokemonData()).length)),
          recentlyLoaded: true
        }), () => setTimeout(() => this.setState({
          recentlyLoaded: false
        }), 500))
      }
    }
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleLoadData)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleLoadData)
  }

  render () {
    let pokemonNames = Object.keys(pokemonService.getPokemonData()).slice(this.state.start, this.state.start + this.state.amount)

    return (
      <div className="flex-grid new-poke-list">
        { pokemonNames.map(pokemonName => {
          let pokemon = pokemonService.getPokemonData()[pokemonName]

          return (
            <div key={pokemonName} className={`new-pokemon ${pokemon.type[0]}`}>
              <h2>{pokemonName}</h2>
              <img className="new-pokemon-image" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.number}.png`} />
            </div>
          )
        })}
      </div>
    )
  }
}

export default Pokedex
