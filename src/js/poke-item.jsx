import React from 'react'

export default props => {
  const { pokemon: { id, type, number, name, level } } = props

  return (
    <div>
      <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${number}.png`} />
      {name}
      <span>{level}</span>
    </div>
  )
}
