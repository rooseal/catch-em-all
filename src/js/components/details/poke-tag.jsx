import React from 'react'

const PokeTag = props => {
  const { opponent, onClick = () => {} } = props

  return (
    <div className={`battle-pokemon ${opponent.type[0]}`} onClick={onClick.bind(null, opponent)}>
      <span className="level">{opponent.level}</span>
      <h2>{opponent.name}</h2>
      <img className="battle-pokemon-image" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${opponent.number}.png`} />
    </div>
  )
}

export default PokeTag
