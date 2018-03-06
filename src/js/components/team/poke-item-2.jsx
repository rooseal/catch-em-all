import React from 'react'

const PokeTag = props => {
  const { pokemon = {}, onClick = () => {}, empty = false, right } = props

  return (
    empty
      ? (
        <div className="battle-pokemon empty" onClick={onClick} style={{textAlign: 'center'}}>
          <span className="decorative1" style={{color: 'royalblue'}}>?</span>
        </div>
      )
      : (
        <div className={`poke-tag-container ${right ? 'right' : ''}`} onClick={onClick.bind(null, pokemon)}>
          {
            right
              ? (
                <React.Fragment>
                  <div className="poke-tag-info">
                    <h2>{pokemon.name}</h2>
                    <div className="flex-parent">
                      {
                        pokemon.type.map(type => <div className={`type small ${type}`}>{type}</div>)
                      }
                    </div>
                  </div>
                  <div className={`poke-tag-img right ${pokemon.type[0]}`} style={{backgroundImage: `url(https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.number}.png)`}}>
                    <div className="poke-level">{pokemon.level}</div>
                  </div>
                </React.Fragment>
              )
              : (
                <React.Fragment>
                  <div className={`poke-tag-img ${pokemon.type[0]}`} style={{backgroundImage: `url(https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.number}.png)`}}>
                    <div className="poke-level">{pokemon.level}</div>
                  </div>
                  <div className="poke-tag-info">
                    <h2>{pokemon.name}</h2>
                    <div className="flex-parent">
                      {
                        pokemon.type.map(type => <div className={`type small ${type}`}>{type}</div>)
                      }
                    </div>
                  </div>
                </React.Fragment>
              )
          }
        </div>
      )
  )
}

export default PokeTag
