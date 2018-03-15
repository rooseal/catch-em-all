import React from 'react'

const PokeAbilities = props => {
  const { abilities } = props

  return (
    <div className="abilities">
      <h3>Abilities</h3>
      {
        abilities.map(ability => (
          <div key={ability.name} className="flex-grid">
            <div className="ability">{ability.name}</div>
            <div>
              <div className={`type ${ability.type.toLowerCase()}`}>{ability.type}</div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default PokeAbilities
