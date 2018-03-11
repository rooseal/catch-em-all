import React from 'react'

const PokeItem3 = props => {
  const { pokemon = {}, onClick = () => {}, empty = false } = props

  return (
    <div className={'poke-3-container'} onClick={onClick.bind(null, pokemon)}>
      <img className="poke-3-image" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.number}.png`} />
      <div className="flex-parent">
        <h3 style={{paddingRight: '55px'}}>{pokemon.name}</h3>
        <h3 style={{paddingLeft: '55px'}}>{pokemon.category}</h3>
      </div>
      <div className="poke-3-info">
        <span className="alt-level">
          { pokemon.level }
        </span>
      </div>
      <div className="short-seperator" />
      <div className="poke-3-text">
        <p style={{width: '100%'}}>
          {
            pokemon.text ||
            <button className="animated">Select pokemon</button>
          }
        </p>
      </div>
      <div className="short-seperator" />
    </div>
  )
}

export default PokeItem3
