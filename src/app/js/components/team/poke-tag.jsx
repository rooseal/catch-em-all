import React from 'react'

const PokeTag = props => {
  const { pokemon = {}, onClick = () => {}, empty = false, right, style = {}, onMouseOver = () => {}, onMouseOut = () => {} } = props
  console.log('Poketag', pokemon)
  return (
    empty
      ? (
        <div className="battle-pokemon empty" onClick={onClick} style={{textAlign: 'center'}}>
          <span className="decorative1" style={{color: 'royalblue'}}>?</span>
        </div>
      )
      : (
        <div className="poke-tag-container-2" onMouseOver={onMouseOver.bind(null, pokemon)} onMouseOut={onMouseOut.bind(null, pokemon)} onClick={onClick.bind(null, pokemon)}>
          <div className="image" style={{backgroundImage: `url(https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.number}.png)`}} />
          <div className="poke-tag-info">
            <h2 style={{margin: '0'}}>{pokemon.name}</h2>
            <div className="flex-parent">
              { pokemon.types.map(type => <span key={type} className={`${type}-text style`}>{type}</span>) }
            </div>
            <div>Level {pokemon.level}</div>
          </div>
        </div>
      )
  )
}

export default PokeTag
