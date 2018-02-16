import React from 'react'

export default props => (
  <p className={'pokemon-list-entry ' + props.type[0]} onClick={e => typeof props.onAction === 'function' && props.onAction(props.id)}>
    <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${props.number}.png`} />
    {props.name}
    <span>{props.level}</span>
  </p>
)
