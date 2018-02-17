import React from 'react'

import { getNumber } from '../services/pokemon-service'

export default props => {
  const { pokemon: { name, category, level, text, type, evolutions } } = props

  return (
    <div className="summary">
      <span className="pokemon-level">{level}</span>
      <h2>{ name }</h2>
      <p>{ category }</p>
      <hr />
      <p>{ text }</p>
      <div style={{width: '100px'}}><h3>Types</h3></div>
      <div className="flex-parent" style={{marginLeft: '10px'}}>
        { type.map(type => <div key={type} className={`type ${type}`}>{ type }</div>)}
      </div>
      <div style={{width: '100px'}}><h3>Evolutions</h3></div>
      <div className="flex-parent evolutions" style={{marginLeft: '10px'}}>
        {
          evolutions.map(evolution => (
            <React.Fragment key={evolution}>
              <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${getNumber(evolution)}.png`} className={`evolution ${name === evolution ? 'active' : ''}`} />
              <div className="arrow-right">&rArr;</div>
            </React.Fragment>
          ))
        }
      </div>
    </div>
  )
}
