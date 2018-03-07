import React from 'react'

const PokeTag2 = props => {
  const { pokemon = {}, onClick = () => {}, empty = false, right, style = {}, onMouseOver = () => {}, onMouseOut = () => {} } = props

  return (
    empty
      ? (
        <div className="battle-pokemon empty" onClick={onClick} style={{textAlign: 'center'}}>
          <span className="decorative1" style={{color: 'royalblue'}}>?</span>
        </div>
      )
      : (
        <div onMouseOver={onMouseOver.bind(null, pokemon)} onMouseOut={onMouseOut.bind(null, pokemon)} style={{transition: 'all 0.5s', cursor: 'pointer', border: '1px solid gray', width: '23%', display: 'flex', margin: '1%', boxSizing: 'border-box', ...style}} onClick={onClick.bind(null, pokemon)}>
          <div style={{height: '78px', width: '78px', backgroundSize: '78px', marginRight: '20px', backgroundImage: `url(https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.number}.png)`}} />
          <div className="poke-tag-info">
            <h2 style={{margin: '0'}}>{pokemon.name}</h2>
            <div className="flex-parent">
              { pokemon.type.map(type => <span key={type} style={{fontWeight: 'bold', fontSize: '1.4em', marginRight: '1em'}} className={`${type}-text`}>{type}</span>) }
            </div>
            <div>Level {pokemon.level}</div>
          </div>
        </div>
      )
  )
}

export default PokeTag2
