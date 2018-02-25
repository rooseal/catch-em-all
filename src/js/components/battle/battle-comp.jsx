import React from 'react'

import * as pokemonService from '../../services/pokemon-service'

class BattleComp extends React.Component {
  state = {
    opponents: []
  }

  componentDidMount () {
    this.joinInterval = setInterval(this.handleJoin, 2000)
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

  render () {
    console.log(this.state.opponents)
    return (
      <React.Fragment>
        <h2>This is the battle vs computer screen</h2>
        <div className="flex-parent battle-poke-list pokedex" style={{flexWrap: 'wrap'}}>
          { this.state.opponents.map(opponent => (
            <div key={opponent.id} className={`battle-pokemon ${opponent.type[0]}`}>
              <span className="level">{opponent.level}</span>
              <h2>{opponent.name}</h2>
              <img className="battle-pokemon-image" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${opponent.number}.png`} />
            </div>
          ))
          }
        </div>
      </React.Fragment>
    )
  }
}

export default BattleComp
