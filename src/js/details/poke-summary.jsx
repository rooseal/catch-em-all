import React from 'react'

import { getNumber } from './services/pokemon-service'

export default props => {
  const { pokemon: { name, category, level, text, type, evolutions } } = props

  return (
    <div className="summary">
      <span className="pokemon-level">{level}</span>
      <h2>{ name }</h2>
      <p>{ category }</p>
      <hr />
      <p>{ text }</p>
      <div className="flex-parent">
        <div style={{width: '100px'}}><h3>Types</h3></div>
        { type.map(type => <div key={type} className={`type ${type}`}>{ type }</div>)}
      </div>
      <div className="flex-parent evolutions">
        <div style={{width: '100px'}}><h3>Evolutions</h3></div>
        {
          evolutions.map(evolution => (
            <React.Fragment key={evolution}>
              <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${getNumber(evolution)}.png`} className="evolution" />
              <div className="arrow-right">&rArr;</div>
            </React.Fragment>
          ))
        }
      </div>
    </div>
  )
}
