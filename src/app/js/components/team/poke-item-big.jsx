import React from 'react'

const PokeItem = props => {
  const { pokemon = {}, onClick = () => {}, empty = false } = props

  return (
    <div className={'poke-3-container'} onClick={onClick.bind(null, pokemon)}>
      { empty
        ? <span className="poke-3-image">?</span>
        : <img className="poke-3-image" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.number}.png`} />
      }
      <div className="flex-parent">
        <h3 style={{paddingRight: '55px'}}>{pokemon.name}</h3>
        <h3 style={{paddingLeft: '55px'}}>{pokemon.category}</h3>
      </div>
      <div className="poke-3-info">
        {
          !empty && (
            <React.Fragment>
              <span><small>
                Level { pokemon.level }
              </small></span>
              { pokemon.types.map(type => <span key={type} className={`${type}-text`}><small>{type}</small></span>) }
            </React.Fragment>
          )
        }
      </div>
      <div className="short-seperator" />
      <div className="poke-3-text">
        <p style={{width: '100%'}}>
          {
            empty ? <button className="animated">Select pokemon</button> : pokemon.text
          }
        </p>
      </div>
      <div className="short-seperator" />
    </div>
  )
}

export default PokeItem
