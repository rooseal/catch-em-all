import React from 'react'

export default props => {
  const { pokemon: { id, type, number, name, level } } = props

  return (
    <div className={`pokemon-list-entry ${type[0]}`}>
      <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${number}.png`} />
      {name}
      <span>{level}</span>
    </div>
  )
}
