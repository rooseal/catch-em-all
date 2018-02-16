import React from 'react'

export default props => {
  const { pokemon } = props

  return (
    <div className="pokemon-details">
      { JSON.stringify(pokemon) }
      <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.number}.png`} />
      <h2>{pokemon.name}</h2>
    </div>
  )
}
