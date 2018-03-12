import React from 'react'

import { getPokemonList } from '../../services/pokemon-service'

class Pokedex extends React.Component {
  state = {
    pokeList: [],
    pokePerPage: 51,
    loading: false
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScrollEnd)
    this.handleLoadData()
  }

  handleLoadData = async (state = this.state) => {
    this.setState({
      loading: true
    })

    console.log('Start loading', state.pokeList.length, state.pokeList.length + state.pokePerPage)

    let newList = await getPokemonList(state.pokeList.length + 1, state.pokeList.length + state.pokePerPage + 1)

    console.log('loading done', newList)

    this.setState({
      loading: false,
      pokeList: state.pokeList.concat(newList)
    })

    return newList
  }

  handleScrollEnd = () => {
    let scrollTop = window.scrollY + window.innerHeight
    let height = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)

    if (height - scrollTop <= 400) {
      if (!this.state.loading) {
        this.handleLoadData()
      }
    }
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScrollEnd)
  }

  render () {
    let { pokeList } = this.state

    return (
      <div className="flex-grid new-poke-list">
        { pokeList.map(pokemon => {
          return (
            <div key={pokemon.name} className={`new-pokemon ${pokemon.type[0]}`}>
              <h2>{pokemon.name}</h2>
              <img className="new-pokemon-image" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.number}.png`} />
            </div>
          )
        })}
      </div>
    )
  }
}

export default Pokedex
